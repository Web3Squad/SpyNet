const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const Token = await hre.ethers.getContractFactory("CustomERC20");
  const token = await Token.deploy("Net", "NET", hre.ethers.parseUnits("1000000", 18), deployer.address);

  await token.waitForDeployment();
  console.log("✅ Token NET deployado em:", await token.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
