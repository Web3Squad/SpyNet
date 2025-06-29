const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NetSaleCCIPSender", function () {
  let NetSaleCCIPSender;
  let netSaleCCIPSender;
  let owner;
  let buyer;

  const mockCcipRouter = "0x1234567890123456789012345678901234567890";
  const mockNetSaleAvalanche = "0x0987654321098765432109876543210987654321";

  beforeEach(async function () {
    [owner, buyer] = await ethers.getSigners();

    NetSaleCCIPSender = await ethers.getContractFactory("NetSaleCCIPSender");
    netSaleCCIPSender = await NetSaleCCIPSender.deploy(mockCcipRouter, mockNetSaleAvalanche);
  });

  describe("Deploy", function () {
    it("Should deploy successfully", async function () {
      expect(netSaleCCIPSender.address).to.not.equal(ethers.ZeroAddress);
    });

    it("Should set correct CCIP router", async function () {
      expect(await netSaleCCIPSender.ccipRouter()).to.equal(mockCcipRouter);
    });

    it("Should set correct NetSale Avalanche address", async function () {
      expect(await netSaleCCIPSender.netsaleAvalanche()).to.equal(mockNetSaleAvalanche);
    });
  });

  describe("Buy Tokens", function () {
    const ethAmount = ethers.parseEther("1");

    it("Should fail if no ETH is sent", async function () {
      await expect(
        netSaleCCIPSender.connect(buyer).buyTokens()
      ).to.be.revertedWith("Send ETH to buy tokens");
    });
  });
}); 