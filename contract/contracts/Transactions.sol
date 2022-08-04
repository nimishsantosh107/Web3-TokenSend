// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.13;

contract Transactions {
    
    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint timestamp;
        string keyword;
    }

    uint private transactionCount;
    TransferStruct[] public transactions;

    event Transfer(address sender, address receiver, uint amount, 
                   string message, uint timestamp, string keyword);

    function addToBlockchain(address payable receiver, uint amount, 
                             string calldata message, string calldata keyword) public {
        
        transactionCount += 1;
        transactions.push(TransferStruct(
            msg.sender,
            receiver,
            amount,
            message,
            block.timestamp,
            keyword
        ));

        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }

    function getAllTransactions() public view returns(TransferStruct[] memory) {
        return transactions;
    }

    function getTransactionCount() public view returns(uint) {
        return transactionCount;
    }


}