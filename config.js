// Public configuration. Never place a private key or seed phrase here.
export const config = Object.freeze({
  // A public Ethereum address on Sepolia is required to enable test deposits.
  // Empty means disabled. Do not use a real-money deposit address.
  depositAddress: '',
  chainId: '0xaa36a7', // Sepolia only; also enforced independently in wallet.js.
  creditsPerTestEth: 100000,
  confirmations: 2,
  maxTestEth: '0.1'
});
