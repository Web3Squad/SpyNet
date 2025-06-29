require('dotenv').config();

module.exports = {
  source: `
    if (args[0] === "${process.env.API_SECRET_KEY}") {
      return Functions.encodeUint256(1)
    } else {
      return Functions.encodeUint256(0)
    }
  `,
  args: [process.env.API_SECRET_KEY],
  secrets: {},
  perNodeSecrets: [],
  walletPrivateKey: process.env.PRIVATE_KEY,
  donId: "avalanche-fuji"
}
