require("@nomiclabs/hardhat-ethers");

const YOUR_PRIVATE_KEY = '97a166f457fe86d91c8e1fcf4a860b124299ae9522e7ff6300046d797a32ffb7';

module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/e384c527dbbb48b6a58a975f4dcfd341",
      accounts: [`${YOUR_PRIVATE_KEY}`],
    },
  },
};
