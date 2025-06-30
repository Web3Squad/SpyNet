require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.24",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 43113,
    },
    avalanche: {
      url: "https://api.avax.network/ext/bc/C/rpc",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 43114,
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/81fc172c4d754b5ea3bfb395e5c0cb38", 
      accounts: [process.env.PRIVATE_KEY],
      chainId: 11155111,
    },
  },
};
