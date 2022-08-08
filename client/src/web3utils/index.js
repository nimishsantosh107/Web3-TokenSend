import contract from "./Transactions.json";

const NETWORK_ID = 4;

export const contractABI = contract.abi;
export const contractAddress = contract.networks[NETWORK_ID].address;
