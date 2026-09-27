/** All balances and stakes use integer hundredths of a demo credit. */
export function randomInt(max, cryptoSource = crypto) {
  if (!Number.isSafeInteger(max) || max < 1 || max > 0x100000000) throw new Error('Invalid random range');
  const limit = Math.floor(0x100000000 / max) * max;
  const bytes = new Uint32Array(1);
  do { cryptoSource.getRandomValues(bytes); } while (bytes[0] >= limit);
  return bytes[0] % max;
}
export function randomUnit() { return randomInt(0x100000000) / 0x100000000; }
export function parseCredits(value) {
  const raw = String(value).trim();
  if (!/^\d+(\.\d{1,2})?$/.test(raw)) throw new Error('Use a positive amount with up to 2 decimals.');
  const [whole, fraction = ''] = raw.split('.');
  const n = Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
  if (!Number.isSafeInteger(n) || n < 1 || n > 100000000) throw new Error('Choose a stake from 0.01 to 1,000,000 credits.');
  return n;
}
export function payout(stake, multiplier) {
  if (!Number.isSafeInteger(stake) || stake < 1 || !Number.isFinite(multiplier) || multiplier < 0) throw new Error('Invalid payout');
  const result = Math.floor(stake * multiplier + 1e-8);
  if (!Number.isSafeInteger(result)) throw new Error('Payout is too large');
  return result;
}
export function mineMultiplier(mines, revealed) {
  if (!Number.isInteger(mines) || mines < 1 || mines > 20 || !Number.isInteger(revealed) || revealed < 0 || revealed > 25 - mines) throw new Error('Invalid mine count');
  if (!revealed) return 1;
  let survival = 1;
  for (let i = 0; i < revealed; i++) survival *= (25 - mines - i) / (25 - i);
  return 0.97 / survival;
}
export function placeMines(count, rng = randomInt) {
  const cells = Array.from({length:25},(_,i)=>i);
  for (let i = cells.length - 1; i > 0; i--) { const j = rng(i+1); [cells[i],cells[j]]=[cells[j],cells[i]]; }
  return new Set(cells.slice(0,count));
}
export function diceResult(chance, roll = randomInt(10000)) {
  if (!Number.isInteger(chance) || chance < 5 || chance > 95) throw new Error('Invalid chance');
  return {roll:roll/100, win:roll<chance*100, multiplier:0.97/(chance/100)};
}
export const PLINKO = Object.freeze({low:[8,3,1.5,.6,.4,.6,1.5,3,8],high:[25,4,1.5,.3,.2,.3,1.5,4,25]});
export function plinkoResult(risk, rng = randomInt) {
  if (!PLINKO[risk]) throw new Error('Invalid risk');
  const path = Array.from({length:8},()=>rng(2));
  const bin = path.reduce((a,b)=>a+b,0);
  return {path,bin,multiplier:PLINKO[risk][bin]};
}
export function crashPoint(unit = randomUnit()) {
  if (!(unit>=0 && unit<1)) throw new Error('Invalid randomness');
  return Math.min(100,Math.max(1,Math.floor(.97/(1-unit)*100)/100));
}
export const RED = new Set([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]);
export function rouletteResult(choice,number=randomInt(37)) {
  if(!['red','black','green'].includes(choice)) throw new Error('Invalid choice');
  const colour=number===0?'green':RED.has(number)?'red':'black';
  return {number,colour,win:choice===colour,multiplier:choice==='green'?36:2};
}
export function freshLedger() {return {version:1,balance:100000,favourites:[],history:[],credited:[],pending:null,activeBet:null};}
export function loadLedger(storage) {
  try {
    const data=JSON.parse(storage.getItem('bunker-casino:v1'));
    if(!data||data.version!==1||!Number.isSafeInteger(data.balance)||data.balance<0) return freshLedger();
    data.favourites=Array.isArray(data.favourites)?data.favourites.filter(v=>typeof v==='string'):[];
    data.history=Array.isArray(data.history)?data.history.filter(h=>h&&typeof h.id==='string'&&Number.isSafeInteger(h.stake)&&Number.isFinite(h.multiplier)&&Number.isSafeInteger(h.paid)).slice(0,30):[];
    data.credited=Array.isArray(data.credited)?data.credited.filter(h=>/^0x[\da-f]{64}$/i.test(h)):[];
    return data;
  }catch{return freshLedger();}
}
