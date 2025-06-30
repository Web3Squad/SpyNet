const hre = require("hardhat");

async function main() {
  const router = "0x0a4a53a7c7ec7f3b9828cd06c6e937f34c8b6d4e"; 
  const receiver = "0xa2961Ca8120F2E46B7a3b740822EEE860bF15753";

  const CCIP = await hre.ethers.getContractFactory("NetSaleCCIPSender");
  const sender = await CCIP.deploy(router, receiver); 

  await sender.waitForDeployment();
  console.log("✅ NetSaleCCIPSender deployado em:", await sender.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
