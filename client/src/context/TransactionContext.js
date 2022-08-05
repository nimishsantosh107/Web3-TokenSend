import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../web3utils";

// utils
const getTransactionContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
    return transactionContract;
};

//exported
export const TransactionContext = React.createContext();

export const TransactionProvider = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentAccount, setCurrentAccount] = useState("");
    const [transactionCount, setTransactionCount] = useState(
        localStorage.getItem("transactionCount")
    );
    const [transactions, setTransactions] = useState([]);

    const [formData, setFormData] = useState({
        addressTo: "",
        amount: "",
        message: "",
    });

    // effects
    useEffect(() => {
        checkIfWalletConnected();
        checkIfTransactionsExist();
    }, [transactionCount]); //run at start of app

    // functions
    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum) return alert("Install Metamask");

            const accounts = await window.ethereum.request({ method: "eth_accounts" });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                getAllTransactions();
            }
            console.log("[1_CHECK]: ", accounts[0]);
        } catch (e) {
            console.error(e);
            throw new Error("[ERR] No window.ethereum object");
        }
    };

    const checkIfTransactionsExist = async () => {
        try {
            if (!window.ethereum) return alert("Install Metamask");
            const transactionContract = getTransactionContract();
            const trxCount = await transactionContract.getTransactionCount();
            window.localStorage.setItem("transactionCount", trxCount);
        } catch (e) {
            console.error(e);
            throw new Error("[ERR] No window.ethereum object");
        }
    };

    const connectWallet = async () => {
        try {
            if (!window.ethereum) return alert("Install Metamask");

            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            setCurrentAccount(accounts[0]);
            console.log("[2_CONNECT]: ", accounts[0]);
        } catch (e) {
            console.error(e);
            throw new Error("[ERR] No window.ethereum object");
        }
    };

    const sendTransaction = async () => {
        try {
            if (!window.ethereum) return alert("Install Metamask");

            const { addressTo, amount, message } = formData;
            const transactionContract = getTransactionContract();
            const parsedAmount = ethers.utils.parseEther(amount)._hex;
            // send ETH
            await window.ethereum.request({
                method: "eth_sendTransaction",
                params: [
                    {
                        from: currentAccount,
                        to: addressTo,
                        gas: "0x5208",
                        value: parsedAmount,
                    },
                ],
            });

            // register trx on blockchain using custom contract
            const trx0 = await transactionContract.addToBlockchain(
                addressTo,
                parsedAmount,
                message,
                "NIL_KEYWORD" //TODO
            );

            // control loading state, wait for trx to finish
            setIsLoading(true);
            console.log(`[3_SEND]: Loading - ${trx0.hash}`);
            await trx0.wait();
            console.log(`[3_SEND]: Success - ${trx0.hash}`);
            setIsLoading(false);

            // set trxCount state
            const trxCount = await transactionContract.getTransactionCount();
            setTransactionCount(trxCount.toNumber());
        } catch (e) {
            console.error(e);
            throw new Error("[ERR] No window.ethereum object");
        }
    };

    const getAllTransactions = async () => {
        try {
            if (!window.ethereum) return alert("Install Metamask");
            const transactionContract = getTransactionContract();
            const availableTransactions = await transactionContract.getAllTransactions();
            const structuredTransactions = availableTransactions.map((trx) => ({
                addressFrom: trx.sender,
                addressTo: trx.receiver,
                amount: parseInt(trx.amount._hex) / 10 ** 18,
                message: trx.message,
                timestamp: new Date(trx.timestamp.toNumber() * 1000).toLocaleString(),
            }));
            setTransactions(structuredTransactions);
        } catch (e) {
            console.error(e);
            throw new Error("[ERR] No window.ethereum object");
        }
    };

    return (
        <TransactionContext.Provider
            value={{
                currentAccount,
                connectWallet,
                sendTransaction,
                transactions,
                formData,
                setFormData,
                isLoading,
            }}
        >
            {props.children}
        </TransactionContext.Provider>
    );
};
