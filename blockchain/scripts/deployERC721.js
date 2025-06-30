const hre = require("hardhat");

async function main() {
  const NFT = await hre.ethers.getContractFactory("CustomERC721");
  const nft = await NFT.deploy("ApiKeyNFT", "API");

  await nft.waitForDeployment();
  console.log("✅ NFT APIKey deployado em:", await nft.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
