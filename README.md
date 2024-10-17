# Flex Bonds: Transform Your NFTs into Secure Digital Safes 🔐

Welcome to **Flex Bonds**, the revolutionary platform that turns your NFTs into private digital safes. Protect your assets, enhance your NFT's value, and enjoy unparalleled security—all within a fully decentralized, on-chain and private solution.

---

## Table of Contents

- [Introduction](#introduction)
- [Key Features](#key-features)
- [How It Works](#how-it-works)
  - [Bonding Assets](#bonding-assets)
  - [Passkey Mechanism](#passkey-mechanism)
  - [Unbonding Assets](#unbonding-assets)
- [Benefits](#benefits)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Steps](#steps)
- [Developer Integration](#developer-integration)
  - [Including the IDL and Type Definitions](#including-the-idl-and-type-definitions)
  - [Example Usage](#example-usage)
- [Security Considerations](#security-considerations)
- [FAQ](#faq)

---

## Introduction

**Thought your NFTs are just art? Think again!**

With **Flex Bonds**, your NFTs become more than just digital collectibles—they transform into private safes for your SOL and tokens. Bond your assets to any NFT, add a passkey, and you've got a secret vault known only to you.

- **Invisible Holdings**: Keep your exact asset holdings unknown to prying eyes, hackers, and wallet drainers.
- **Enhanced Security**: Secure your NFTs and bonded assets, making unauthorized transfers impossible.
- **Added Value**: Increase the worth of your NFTs by bonding assets, perfect for gamification or rewards.
- **Marketing Benefits for Projects**: Boost engagement and sales by randomly bonding tokens or SOL to listed NFTs. By publicly announcing the passkeys, you create excitement and a sense of urgency among collectors. This strategy encourages users to purchase NFTs in hopes of unlocking the bonded assets, effectively driving sales and increasing interest in your project.


---

## Key Features

- **Asset Bonding**: Bond SOL or any SPL Token (including Token2022) to any NFT—yours or someone else's.
- **Passkey Protection**: Secure your bonded assets with a passkey known only to you.
- **On-Chain Solution**: 100% decentralized with no off-chain storage or databases.
- **Secure NFTs**: Lock your NFTs to your wallet using our Secure NFT feature.
- **Fren Bonding**: Bond assets to third-party NFTs for gifts, giveaways, or rewards.
- **Developer-Friendly**: Integrate Flex Bonds into your projects with our IDL and type definitions.
- **Cost-Effective**: Bonding, securing, and releasing NFTs are free; unbonding incurs a modest 3.33% fee.

---

## How It Works

### Bonding Assets

1. **Select an NFT**: Choose any NFT—yours or someone else's.
2. **Set a Passkey**: Create a secure passkey. This passkey is never stored on-chain or off-chain.
3. **Bond Assets**: Bond SOL or tokens to the NFT. The assets are stored securely in a vault associated with the NFT.

### Passkey Mechanism

- **Off-Chain Key Generation**: Generate a passkey public/private key pair locally.
- **Secure Signing**: Sign a challenge nonce from the vault to prove knowledge of the passkey without exposing it.
- **Prevent Replay Attacks**: The use of a nonce ensures each transaction is unique and secure.

### Unbonding Assets

1. **Ownership Verification**: Only the NFT owner can initiate unbonding.
2. **Passkey Requirement**: Provide the passkey to unlock the assets.
3. **Secure Retrieval**: Assets are transferred back to your wallet securely.

---

## Benefits

- **Enhanced Security**: Protect your assets from hackers and drainers by making them invisible in wallet balances.
- **Privacy**: Keep your holdings confidential and unknown to potential bad actors.
- **Value Addition**: Increase the intrinsic value of NFTs by bonding assets.
- **Flexibility**: Ideal for gamification, rewards, secure transfers, and more.
- **Community Engagement**: Use Fren Bonding for gifts, giveaways, and surprises.

---

## Getting Started

### Prerequisites

- **Solana Wallet**: Ensure you have a Solana-compatible wallet (e.g., Phantom, Solflare).
- **SOL for Fees**: Have some SOL in your wallet to cover transaction fees.

## Security Considerations

- **Passkey Safety**: Your passkey is crucial. **Do not share it** or lose it. Without it, unbonding assets is impossible.
- **Private Key Management**: Keep your wallet's private keys secure.
- **Transaction Verification**: Always double-check transaction details before approving them in your wallet.

### Steps

#### Access Flex Bonds

- Visit our flexbonds.io or use the code examples below to call on-chain functions locally on your own PC privately.

#### Bond Assets

1. **Select an NFT**: Choose the NFT you wish to bond assets to.
2. **Enter Amount**: Specify the amount of SOL or tokens to bond.
3. **Create Passkey**: Set a secure passkey (store this securely; it's never stored elsewhere).
4. **Confirm Transaction**: Approve the transaction in your wallet.

#### Secure Your NFT

- Use the **Secure NFT** feature to lock your NFT to your wallet, preventing unauthorized transfers.
1. **Select an NFT**: Choose the NFT you wish to secure.
2. **Create Passkey**: Set a secure passkey (Again, store this securely. Don't lose it).
4. **Confirm Transaction**: Approve the transaction in your wallet. 


#### Unbond Assets

1. **Verify Ownership**: Ensure you are the owner of the NFT.
2. **Provide Passkey**: Enter your passkey used during bonding.
3. **Confirm Transaction**: Approve the unbonding transaction in your wallet.

---

## Developer Integration

### Including the IDL and Type Definitions

Integrate Flex Bonds into your project seamlessly.

- **IDL Files**: Available in the `idl/` directory for program interfacing.
- **Type Definitions**: TypeScript definitions provided for robust development.

### Useful Snippets


```typescript
Generating passkey function 

```


```typescript
import { PublicKey } from '@solana/web3.js';
import { deriveChallengeKeypair } from 'flex-bonds-sdk';

// Your passkey and NFT mint address
const passKey = 'your-secure-passkey';
const nftMintAddress = new PublicKey('Your NFT Mint Address');

// Generate the challenge Keypair
const challengeKeypair = deriveChallengeKeypair(passKey, nftMintAddress);

// Now you can use `challengeKeypair` to sign the challenge nonce
```

```typescript
Code Example of Bonding SOL

```

```typescript
Code Example of Unbonding SOL

```

```typescript
Code Example of Bonding Tokens

```

```typescript
Code Example of Unbonding Tokens

```

```typescript
Code Example of securing a NFT

```

```typescript
Code Example of releasing a secured NFT

```


---

## FAQ

### Q1: What happens if I lose my passkey?

**A:** Unfortunately, without the passkey, you cannot unbond the assets. The passkey is never stored on-chain or off-chain, so it's essential to keep it safe and secure.

### Q2: Are there any fees involved?

**A:** Bonding, securing, and releasing NFTs are **free**. Unbonding assets incurs a modest **3.33% fee**.

### Q3: Can I bond assets to someone else's NFT?

**A:** Absolutely! With the **Fren Bond** feature, you can bond SOL or tokens to third-party NFTs—perfect for gifts, giveaways, and more.

### Q4: Is Flex Bonds compatible with all tokens?

**A:** Yes, Flex Bonds fully supports SPL Tokens & **Token2022** tokens.

### Q5: How is my passkey secured during transactions?

**A:** The passkey is used to generate a public/private key pair locally. This key pair signs a nonce challenge from the vault, ensuring secure verification without exposing your passkey. This signature is then varified in our on-chain program to ensure it matches the keypair used during bonding. <b>Your passkey is never stored anywhere</b>, assuming you keep your passkey secure on your end. It is not possible have your passkey compromised.



