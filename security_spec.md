# Security Specification - AMUSU Elections 2026

## 1. Data Invariants
- A candidate must have a name, post, and faculty category.
- A user can only vote for one candidate per major post (President, Vice President, Secretary, Court Member).
- A user can vote for up to 10 Cabinet Members.
- Only the hardcoded admin (`reach.lastminute@gmail.com`) or users in the `admins` collection can modify candidate data.
- Any user can increment/decrement a candidate's `supportsCount` as part of their voting process.
- All timestamps must be server-generated.

## 2. The "Dirty Dozen" Payloads
1. **Unauthorized Candidate Creation**: A non-admin user trying to create a candidate.
2. **Unauthorized Candidate Update**: A non-admin user trying to change a candidate's name or bio.
3. **Supports Count Hijack**: A user trying to set `supportsCount` to 1,000,000 directly.
4. **Vote Spoofing**: User A trying to write a vote document for User B.
5. **Multiple Votes**: User trying to set two `presidentId` values (impossible in Firestore schema, but trying to bypass UI logic).
6. **Cabinet Over-voting**: User trying to add 11 cabinet member IDs.
7. **Identity Spoofing**: User trying to set `userId` in `votes` document to someone else's UID.
8. **Admin Promotion**: User trying to add themselves to the `admins` collection.
9. **Verified Badge Spoof**: User trying to set `isVerified: true` on their own candidate profile (if they are a candidate).
10. **Timestamp Fraud**: User providing a manual string for `updatedAt` instead of `serverTimestamp()`.
11. **Email Spoofing**: User providing an email in `votes` that doesn't match their auth email.
12. **Orphaned Vote**: Creating a vote for a candidate ID that doesn't exist.

## 3. Test Runner Plan (Conceptual)
Verify that:
- `candidates/{id}` write is denied for `auth.uid != adminUid`.
- `candidates/{id}` update of `supportsCount` is allowed ONLY by +/- 1 in a transaction/batch.
- `votes/{uid}` write is allowed only if `uid == request.auth.uid`.
- `admins/{uid}` write is denied for everyone (bootstrap only).
