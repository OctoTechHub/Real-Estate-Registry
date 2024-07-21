import {
  Confirmation as ConfirmationEvent,
  Revoke as RevokeEvent,
  OwnerChanged as OwnerChangedEvent,
  OwnerAdded as OwnerAddedEvent,
  OwnerRemoved as OwnerRemovedEvent,
  RequirementChanged as RequirementChangedEvent,
  Deposit as DepositEvent,
  SingleTransact as SingleTransactEvent,
  MultiTransact as MultiTransactEvent,
  ConfirmationNeeded as ConfirmationNeededEvent
} from "../generated/Contract/Contract"
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
} from "../generated/schema"

export function handleConfirmation(event: ConfirmationEvent): void {
  let entity = new Confirmation(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.operation = event.params.operation

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRevoke(event: RevokeEvent): void {
  let entity = new Revoke(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.operation = event.params.operation

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}


export function handleOwnerChanged(event: OwnerChangedEvent): void {
  let entity = new OwnerChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.oldOwner = event.params.oldOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnerAdded(event: OwnerAddedEvent): void {
  let entity = new OwnerAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnerRemoved(event: OwnerRemovedEvent): void {
  let entity = new OwnerRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.oldOwner = event.params.oldOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRequirementChanged(event: RequirementChangedEvent): void {
  let entity = new RequirementChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newRequirement = event.params.newRequirement

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDeposit(event: DepositEvent): void {
  let entity = new Deposit(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._from = event.params._from
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSingleTransact(event: SingleTransactEvent): void {
  let entity = new SingleTransact(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.value = event.params.value
  entity.to = event.params.to
  entity.data = event.params.data

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMultiTransact(event: MultiTransactEvent): void {
  let entity = new MultiTransact(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.operation = event.params.operation
  entity.value = event.params.value
  entity.to = event.params.to
  entity.data = event.params.data

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleConfirmationNeeded(event: ConfirmationNeededEvent): void {
  let entity = new ConfirmationNeeded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.operation = event.params.operation
  entity.initiator = event.params.initiator
  entity.value = event.params.value
  entity.to = event.params.to
  entity.data = event.params.data

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
