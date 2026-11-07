---
title: "Designing an ACID-Compliant Double-Entry Ledger with MongoDB & Node.js"
slug: "designing-acid-compliant-ledger"
subtitle: "Architectural insights from winning 1st Place in the IdeaX 72-Hour FinTech Hackathon"
summary: "How team FinTrace engineered a double-entry atomic bookkeeping ledger using MongoDB replica sessions, distributed mutex locking, and idempotency keys to eliminate financial race conditions."
publishedAt: "2026-11-04"
readTime: "7 min read"
category: "architecture"
tags: ["FinTech", "MongoDB", "Node.js", "System Design", "ACID"]
coverImage: "./cover.webp"
isFeatured: true
isDraft: false
---

# Designing an ACID-Compliant Double-Entry Ledger with MongoDB & Node.js

During the **IdeaX 72-Hour FinTech Hackathon**, our team (**FinTrace**) was tasked with solving one of the most critical vulnerabilities in modern financial software: **ledger inconsistency under concurrent transaction spikes**.

Most developer tutorials demonstrate payments with a naive approach:
```javascript
// ❌ Dangerous anti-pattern: non-atomic state update
await User.findByIdAndUpdate(senderId, { $inc: { balance: -amount } });
await User.findByIdAndUpdate(recipientId, { $inc: { balance: amount } });
```

If the Node process crashes between line 1 and line 2, or if network connectivity drops to the database shard, funds vanish from the sender without ever reaching the recipient. Even worse, concurrent requests can trigger race conditions that allow users to double-spend funds.

In this deep dive, I share the exact architectural principles we implemented to win **1st Place in the FinTech Track**, ensuring strict atomicity and financial integrity.

---

## 1. The Core Principle: Immutable Double-Entry Bookkeeping

In a production financial system, balances are **derived facts**, never raw mutable fields updated in place. Every transaction must be composed of at least two atomic ledger entries:
- **Debit Entry**: Represents an outflow or increase in asset/expense.
- **Credit Entry**: Represents an inflow or increase in liability/equity.

The golden rule of double-entry accounting is that the sum of debits must always equal the sum of credits:

$$\sum \text{Debits} = \sum \text{Credits}$$

```typescript
export interface LedgerEntry {
  readonly id: string;
  readonly transactionId: string;
  readonly accountId: string;
  readonly type: 'DEBIT' | 'CREDIT';
  readonly amountInCents: number;
  readonly currency: 'NPR' | 'USD';
  readonly timestamp: Date;
}
```

> [!NOTE]
> We store all amounts in integer cents (or paisa) rather than floating-point decimals to avoid IEEE 754 precision drift.

---

## 2. Multi-Document ACID Transactions in MongoDB

MongoDB has supported multi-document ACID transactions since version 4.0 via replica set sessions. Wrapping ledger writes in a session ensures that either **both entries commit successfully**, or **neither does**:

```typescript
import mongoose from 'mongoose';

export async function executeTransfer(
  senderAccountId: string,
  recipientAccountId: string,
  amountInCents: number,
  idempotencyKey: string
): Promise<TransactionReceipt> {
  const session = await mongoose.startSession();
  session.startTransaction({
    readConcern: { level: 'snapshot' },
    writeConcern: { w: 'majority', j: true },
  });

  try {
    // 1. Idempotency Check: prevent duplicate billing on network retries
    const existingTx = await Transaction.findOne({ idempotencyKey }).session(session);
    if (existingTx) {
      await session.abortTransaction();
      return existingTx;
    }

    // 2. Lock and verify sender balance
    const sender = await Account.findById(senderAccountId).session(session);
    if (!sender || sender.clearedBalance < amountInCents) {
      throw new Error('INSUFFICIENT_FUNDS');
    }

    // 3. Insert immutable double-entry records
    const txId = new mongoose.Types.ObjectId().toHexString();
    
    await Ledger.insertMany([
      { transactionId: txId, accountId: senderAccountId, type: 'DEBIT', amount: amountInCents },
      { transactionId: txId, accountId: recipientAccountId, type: 'CREDIT', amount: amountInCents }
    ], { session });

    // 4. Update cleared cached balances within same atomic session
    await Account.updateOne(
      { _id: senderAccountId },
      { $inc: { clearedBalance: -amountInCents } },
      { session }
    );
    await Account.updateOne(
      { _id: recipientAccountId },
      { $inc: { clearedBalance: amountInCents } },
      { session }
    );

    // 5. Commit all changes atomically
    await session.commitTransaction();
    return { status: 'SUCCESS', transactionId: txId };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}
```

---

## 3. Distributed Mutex & Idempotency Keys

When a client loses connection right after pressing "Pay", mobile apps often auto-retry the exact same HTTP payload. Without idempotency guards, the customer gets charged twice.

To solve this:
1. Every client request generates a unique UUID `Idempotency-Key` header.
2. The API attempts an atomic insert of the key into an in-memory lock or Redis cache with a 60-second TTL.
3. If an identical key arrives while the initial transaction is executing, the server rejects the concurrent duplicate with an HTTP `409 Conflict`.
4. If the transaction has already committed, the server returns the cached transaction receipt without re-executing ledger writes.

---

## 4. Key Takeaways from the IdeaX Hackathon

Building FinTrace under a 72-hour time constraint taught us valuable engineering lessons:
- **Never store mutable balances without an immutable audit trail**: The ledger is the single source of truth; account balances are materialized views.
- **Fail early and roll back completely**: Transactional sessions with `snapshot` read concerns prevent phantom reads and dirty writes.
- **Always design for automated retries**: Networks are inherently unreliable, and idempotency is non-negotiable in financial software.

By adhering to these principles, our team was awarded **1st Place in the FinTech Track**, proving that clean system design beats hacky shortcuts even in rapid hackathon environments.
