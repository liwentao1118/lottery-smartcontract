const Web3 = require('web3')

const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = "crouch fiction income edge cluster turtle plastic ozone mom predict goddess express";
const provider = new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/b5193966085f4ae0a469a7a77215b0ba");
const web3= new Web3(provider)

