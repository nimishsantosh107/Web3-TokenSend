import contract from "./Transactions.json";

const NETWORK_ID = 5777;

export const contractABI = contract.abi;
export const contractAddress = contract.networks[NETWORK_ID].address;
