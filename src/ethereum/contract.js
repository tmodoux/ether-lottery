import web3 from './web3';
const Contracts = require('./build/contracts.json');
const Contract = Contracts['Contract.sol'].Contract;

const instance = new web3.eth.Contract(
    Contract.abi,
    '0xfaCDD9Ac4B3e3C7499Bf027784b8Fb111aE31858' // TODO: autofill when building
);

export default instance;