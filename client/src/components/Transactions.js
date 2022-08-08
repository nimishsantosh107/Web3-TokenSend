import React, { useContext } from "react";

import { TransactionContext } from "../context/TransactionContext";

const TransactionCard = ({ addressFrom, addressTo, amount, message, timestamp }) => {
    return (
        <div
            className="bg-[#181918] m-4 flex flex-1 flex-col p-3 rounded-md hover:shadow-2xl
                         2xl:min-w-[450px] 2xl:max-w-[500px]
                         sm:min-w-[270px] sm:max-w-[300px]"
        >
            <div className="flex flex-col items-center w-full mt-3">
                <div className="w-full mb-3 px-3 font-thin">
                    <a
                        href={`https://rinkeby.etherscan.io/address/${addressFrom}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <p className="text-white text-base">
                            From: <b>{addressFrom.slice(0, 10) + "..."}</b>
                        </p>
                    </a>
                    <a
                        href={`https://rinkeby.etherscan.io/address/${addressTo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <p className="text-white text-base">
                            From: <b>{addressTo.slice(0, 10) + "..."}</b>
                        </p>
                    </a>
                    <p className="text-white text-base">
                        Amount: <b>{amount} ETH</b>
                    </p>
                    <p className="text-white text-base">
                        Message: <b>{message}</b>
                    </p>
                    <p className="text-white text-base">
                        Time: <b>{timestamp}</b>
                    </p>
                </div>
            </div>
        </div>
    );
};

const Transactions = (props) => {
    const { currentAccount, transactions } = useContext(TransactionContext);

    return (
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
            <div className="flex flex-col md:p-12 py-12 px-4">
                <h3 className="text-white text-3xl text-center my-2">
                    {currentAccount
                        ? "Latest Transactions"
                        : "Connect your account to see the latest transactions"}
                </h3>
            </div>

            <div className="flex flex-wrap justify-center items-center mt-10">
                {transactions.reverse().map((trx, i) => (
                    <TransactionCard key={i} {...trx} />
                ))}
            </div>
        </div>
    );
};

export default Transactions;
