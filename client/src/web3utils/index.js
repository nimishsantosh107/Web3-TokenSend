import contract from "./Transactions.json";

const NERWORK_ID = 5777;

export const contractABI = contract.abi;
export const contractAddress = contract.networks[NETWORK_ID].address;
