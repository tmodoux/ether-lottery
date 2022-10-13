import web3 from './web3';
const Contracts = require('./build/contracts.json');
const Contract = Contracts['Contract.sol'].Contract;

const instance = new web3.eth.Contract(
    Contract.abi,
    '0xe5fe1d8aD682f013dEb21b263494A1932A945e88' // TODO: autofill when building
);

export default instance;