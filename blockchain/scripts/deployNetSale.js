const hre = require("hardhat");

async function main() {
  const tokenAddress = "0x36F027F6A4B392fC261320d03103F1f12dF83E61";

  const NetSale = await hre.ethers.getContractFactory("NetSale");
  const sale = await NetSale.deploy(tokenAddress);

  await sale.waitForDeployment();
  console.log("✅ NetSale deployado em:", await sale.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
