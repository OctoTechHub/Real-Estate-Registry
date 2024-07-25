// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PropertyRegistry {
    struct Property {
        uint256 id;
        string description;
        address owner;
    }

    mapping(uint256 => Property) public properties;
    uint256 public nextPropertyId;

    event PropertyRegistered(uint256 id, address owner, string description);
    event PropertyTransferred(uint256 id, address from, address to);

    function registerProperty(string memory _description) public {
        properties[nextPropertyId] = Property(nextPropertyId, _description, msg.sender);
        emit PropertyRegistered(nextPropertyId, msg.sender, _description);
        nextPropertyId++;
    }

    function transferProperty(uint256 _propertyId, address _newOwner) public {
        require(properties[_propertyId].owner == msg.sender, "Only the owner can transfer the property");
        properties[_propertyId].owner = _newOwner;
        emit PropertyTransferred(_propertyId, msg.sender, _newOwner);
    }

    function getProperty(uint256 _propertyId) public view returns (Property memory) {
        return properties[_propertyId];
    }
}
