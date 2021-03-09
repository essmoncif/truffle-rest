const Web3 = require('web3'); 

const provider = `${process.env.HOST_SERVER}:${process.env.PORT_SERVER}`;
const web3 = new Web3(new Web3.providers.HttpProvider(provider));

export default web3;