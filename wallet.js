export const SEPOLIA='0xaa36a7';
export const addressOK = value => /^0x[0-9a-fA-F]{40}$/.test(value) && !/^0x0{40}$/i.test(value);
export function parseTestEth(value) {
  if(!/^(0|[1-9]\d*)(\.\d{1,18})?$/.test(String(value).trim())) throw new Error('Enter a test ETH amount with up to 18 decimals.');
  const [whole,fraction='']=String(value).trim().split('.');
  const wei=BigInt(whole)*10n**18n+BigInt(fraction.padEnd(18,'0'));
  if(wei<=0n||wei>10n**17n) throw new Error('Test deposits must be greater than 0 and at most 0.1 test ETH.');
  return wei;
}
export function creditsFromWei(wei,rate=100000) {
  const cents=BigInt(wei)*BigInt(rate)*100n/(10n**18n);
  if(cents<1n||cents>BigInt(Number.MAX_SAFE_INTEGER)) throw new Error('Deposit is too small or too large to credit.');
  return Number(cents);
}
export async function ensureSepolia(provider,switchChain=false) {
  if(!provider?.request) throw new Error('Open this site in an Ethereum wallet browser, or use a browser with a wallet extension.');
  let chain=await provider.request({method:'eth_chainId'});
  if(chain.toLowerCase()!==SEPOLIA && switchChain) {
    await provider.request({method:'wallet_switchEthereumChain',params:[{chainId:SEPOLIA}]});
    chain=await provider.request({method:'eth_chainId'});
  }
  if(chain.toLowerCase()!==SEPOLIA) throw new Error('Switch your wallet to Ethereum Sepolia. Deposits on all other networks are disabled.');
}
export async function connect(provider) {
  if(!provider?.request) throw new Error('No browser wallet found. Open this page in your Ethereum wallet’s browser or a desktop browser with a wallet extension.');
  const accounts=await provider.request({method:'eth_requestAccounts'});
  await ensureSepolia(provider,true);
  if(!addressOK(accounts[0])) throw new Error('No wallet account selected.');
  return accounts[0];
}
export async function sendDeposit(provider,recipient,amount) {
  if(!addressOK(recipient)) throw new Error('Testnet deposits are not configured yet. Use free play credits.');
  const wei=parseTestEth(amount);creditsFromWei(wei);
  await ensureSepolia(provider,false);
  const accounts=await provider.request({method:'eth_accounts'});
  if(!addressOK(accounts[0])) throw new Error('Connect your wallet first.');
  if(accounts[0].toLowerCase()===recipient.toLowerCase()) throw new Error('Use a separate test wallet. The sender and receiving address must be different.');
  // Repeat the chain check immediately before opening the wallet’s transaction prompt.
  await ensureSepolia(provider,false);
  const hash=await provider.request({method:'eth_sendTransaction',params:[{from:accounts[0],to:recipient,value:'0x'+wei.toString(16),chainId:SEPOLIA}]});
  if(!/^0x[0-9a-f]{64}$/i.test(hash)) throw new Error('The wallet did not return a valid transaction hash.');
  return {hash:hash.toLowerCase(),from:accounts[0].toLowerCase(),to:recipient.toLowerCase(),wei:wei.toString(),chainId:SEPOLIA};
}
export async function verifyDeposit(provider,pending,confirmations=2) {
  if(!pending||pending.chainId!==SEPOLIA||!/^0x[0-9a-f]{64}$/i.test(pending.hash)||!addressOK(pending.from)||!addressOK(pending.to)||!/^\d+$/.test(pending.wei)) throw new Error('Invalid pending deposit.');
  await ensureSepolia(provider,false);
  const receipt=await provider.request({method:'eth_getTransactionReceipt',params:[pending.hash]});
  if(!receipt) return {state:'pending',confirmations:0};
  if(receipt.status!=='0x1') throw new Error('The test transaction failed. No demo credits were added.');
  if(receipt.transactionHash?.toLowerCase()!==pending.hash.toLowerCase()) throw new Error('Transaction receipt does not match.');
  const tx=await provider.request({method:'eth_getTransactionByHash',params:[pending.hash]});
  if(!tx||tx.hash?.toLowerCase()!==pending.hash.toLowerCase()||tx.from?.toLowerCase()!==pending.from||tx.to?.toLowerCase()!==pending.to||BigInt(tx.value)!==BigInt(pending.wei)||BigInt(tx.chainId)!==11155111n) throw new Error('Deposit details do not match the Sepolia transaction.');
  const block=await provider.request({method:'eth_getBlockByNumber',params:[receipt.blockNumber,false]});
  if(!block||block.hash?.toLowerCase()!==receipt.blockHash?.toLowerCase()) return {state:'pending',confirmations:0};
  const head=BigInt(await provider.request({method:'eth_blockNumber'}));
  const count=Number(head-BigInt(receipt.blockNumber)+1n);
  await ensureSepolia(provider,false);
  return {state:count>=confirmations?'confirmed':'pending',confirmations:Math.max(0,count),wei:pending.wei};
}
export function walletError(error) {
  if(error?.code===4001) return 'Cancelled in your wallet. No credits were added.';
  if(error?.code===4902) return 'Enable the Sepolia test network in your wallet, then connect again.';
  if(error?.code===-32002) return 'A request is already waiting in your wallet. Open your wallet to finish it.';
  return error?.message||'The wallet request could not be completed. Please try again.';
}
