const hre = require("hardhat");

async function main() {
  const router = "0x019C05DbdA48Ed64dC54f9840Fb70d595F68C41F";

  const Validator = await hre.ethers.getContractFactory("APIKeyValidator");
  const validator = await Validator.deploy(router);

  await validator.waitForDeployment();
  console.log("✅ APIKeyValidator deployado em:", await validator.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
