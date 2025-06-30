const hre = require("hardhat");

async function main() {
  const Factory = await hre.ethers.getContractFactory("NFTAssetTokenFactory");
  const factory = await Factory.deploy();

  await factory.waitForDeployment();
  console.log("✅ Fábrica de tokens deployada em:", await factory.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
