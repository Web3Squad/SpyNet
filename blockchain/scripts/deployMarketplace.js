const hre = require("hardhat");

async function main() {
  const tokenAddress = "0x36F027F6A4B392fC261320d03103F1f12dF83E61";
  const priceFeedAddress = "0x86d67c3D38D2bCeE722E601025C25a575021c6EA";

  const Marketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const marketplace = await Marketplace.deploy(tokenAddress, priceFeedAddress);

  await marketplace.waitForDeployment();
  console.log("✅ Marketplace deployado em:", await marketplace.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
