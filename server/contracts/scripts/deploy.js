const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const RealEstateRegistry = await ethers.getContractFactory("RealEstateRegistry");
    const registry = await RealEstateRegistry.deploy();

    console.log("RealEstateRegistry deployed to:", registry.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
