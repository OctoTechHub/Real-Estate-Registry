import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import {
  Confirmation,
  Revoke,
  OwnerChanged,
  OwnerAdded,
  OwnerRemoved,
  RequirementChanged,
  Deposit,
  SingleTransact,
  MultiTransact,
  ConfirmationNeeded
} from "../generated/Contract/Contract"

export function createConfirmationEvent(
  owner: Address,
  operation: Bytes
): Confirmation {
  let confirmationEvent = changetype<Confirmation>(newMockEvent())

  confirmationEvent.parameters = new Array()

  confirmationEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  confirmationEvent.parameters.push(
    new ethereum.EventParam(
      "operation",
      ethereum.Value.fromFixedBytes(operation)
    )
  )

  return confirmationEvent
}

export function createRevokeEvent(owner: Address, operation: Bytes): Revoke {
  let revokeEvent = changetype<Revoke>(newMockEvent())

  revokeEvent.parameters = new Array()

  revokeEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  revokeEvent.parameters.push(
    new ethereum.EventParam(
      "operation",
      ethereum.Value.fromFixedBytes(operation)
    )
  )

  return revokeEvent
}

export function createOwnerChangedEvent(
  oldOwner: Address,
  newOwner: Address
): OwnerChanged {
  let ownerChangedEvent = changetype<OwnerChanged>(newMockEvent())

  ownerChangedEvent.parameters = new Array()

  ownerChangedEvent.parameters.push(
    new ethereum.EventParam("oldOwner", ethereum.Value.fromAddress(oldOwner))
  )
  ownerChangedEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownerChangedEvent
}

export function createOwnerAddedEvent(newOwner: Address): OwnerAdded {
  let ownerAddedEvent = changetype<OwnerAdded>(newMockEvent())

  ownerAddedEvent.parameters = new Array()

  ownerAddedEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownerAddedEvent
}

export function createOwnerRemovedEvent(oldOwner: Address): OwnerRemoved {
  let ownerRemovedEvent = changetype<OwnerRemoved>(newMockEvent())

  ownerRemovedEvent.parameters = new Array()

  ownerRemovedEvent.parameters.push(
    new ethereum.EventParam("oldOwner", ethereum.Value.fromAddress(oldOwner))
  )

  return ownerRemovedEvent
}

export function createRequirementChangedEvent(
  newRequirement: BigInt
): RequirementChanged {
  let requirementChangedEvent = changetype<RequirementChanged>(newMockEvent())

  requirementChangedEvent.parameters = new Array()

  requirementChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newRequirement",
      ethereum.Value.fromUnsignedBigInt(newRequirement)
    )
  )

  return requirementChangedEvent
}

export function createDepositEvent(_from: Address, value: BigInt): Deposit {
  let depositEvent = changetype<Deposit>(newMockEvent())

  depositEvent.parameters = new Array()

  depositEvent.parameters.push(
    new ethereum.EventParam("_from", ethereum.Value.fromAddress(_from))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return depositEvent
}

export function createSingleTransactEvent(
  owner: Address,
  value: BigInt,
  to: Address,
  data: Bytes
): SingleTransact {
  let singleTransactEvent = changetype<SingleTransact>(newMockEvent())

  singleTransactEvent.parameters = new Array()

  singleTransactEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  singleTransactEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )
  singleTransactEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  singleTransactEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )

  return singleTransactEvent
}

export function createMultiTransactEvent(
  owner: Address,
  operation: Bytes,
  value: BigInt,
  to: Address,
  data: Bytes
): MultiTransact {
  let multiTransactEvent = changetype<MultiTransact>(newMockEvent())

  multiTransactEvent.parameters = new Array()

  multiTransactEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  multiTransactEvent.parameters.push(
    new ethereum.EventParam(
      "operation",
      ethereum.Value.fromFixedBytes(operation)
    )
  )
  multiTransactEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )
  multiTransactEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  multiTransactEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )

  return multiTransactEvent
}

export function createConfirmationNeededEvent(
  operation: Bytes,
  initiator: Address,
  value: BigInt,
  to: Address,
  data: Bytes
): ConfirmationNeeded {
  let confirmationNeededEvent = changetype<ConfirmationNeeded>(newMockEvent())

  confirmationNeededEvent.parameters = new Array()

  confirmationNeededEvent.parameters.push(
    new ethereum.EventParam(
      "operation",
      ethereum.Value.fromFixedBytes(operation)
    )
  )
  confirmationNeededEvent.parameters.push(
    new ethereum.EventParam("initiator", ethereum.Value.fromAddress(initiator))
  )
  confirmationNeededEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )
  confirmationNeededEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  confirmationNeededEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )

  return confirmationNeededEvent
}
