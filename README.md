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
- **Type Definitions**: TypeScript definitions are provided in `types/`.

### Useful Snippets


```typescript

import { Keypair, PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";
import { sha256 } from 'js-sha256';

/**
 * Generates a valid ED25519 signature for a given message using the provided Keypair.
 *
 * @param message - The message to be signed as a Uint8Array.
 * @param keypair - The Keypair used to sign the message.
 * @returns The signature as a Uint8Array.
 */
export function generateValidSignature(
    message: Uint8Array,
    keypair: Keypair
  ): Uint8Array {
    const signature = nacl.sign.detached(message, keypair.secretKey);
    return signature;
  }


  /**
 * Derives a challenge Keypair from a passKey string and an NFT mint address PublicKey.
 *
 * @param passKey - A string representing the pass key.
 * @param nftMintAddress - A PublicKey representing the NFT mint address.
 * @returns A Keypair derived from the hashed combination of passKey and nftMintAddress.
 */
export function deriveChallengeKeypair(passKey: string, nftMintAddress: PublicKey): Keypair {

    // Step 1: Convert passKey to a Uint8Array (UTF-8 encoding)
    const passKeyBytes = new TextEncoder().encode(passKey);
  
    // Step 2: Get the bytes of the nftMintAddress PublicKey
    const nftMintAddressBytes = nftMintAddress.toBytes(); // Uint8Array of length 32
  
    // Step 3: Concatenate passKeyBytes and nftMintAddressBytes
    const combinedBytes = new Uint8Array(passKeyBytes.length + nftMintAddressBytes.length);
    combinedBytes.set(passKeyBytes);
    combinedBytes.set(nftMintAddressBytes, passKeyBytes.length);
  
    // Step 4: Hash the combined bytes using SHA-256 to get a 32-byte seed
    const hashHex = sha256(combinedBytes); // Returns a hex string
    const hashBytes = Uint8Array.from(Buffer.from(hashHex, 'hex')); // Convert hex string to Uint8Array
  
    // Step 5: Create a Keypair from the 32-byte seed
    const challengeKeypair = Keypair.fromSeed(hashBytes);
  
    return challengeKeypair;
  }


```


```typescript

Code Example of generating passkey keypair

  // Your passkey and NFT mint address
  const passKey = 'your-secure-passkey';
  const nftMintAddress = new PublicKey('Your NFT Mint Address');
  
  // Generate the challenge Keypair
  const challengeKeypair = deriveChallengeKeypair(passKey, nftMintAddress);
  
  // Now you can use `challengeKeypair` to sign the challenge nonce

```

```typescript

Code Example of Bonding SOL

  // Derive passKeyKeyPair for deriving account keys
  const passkeyKeypair = deriveChallengeKeypair(passKey, nftMintAddress);

  // Fetch PDAs for bondAccount and bondVault
  const bondAccountPDA = await findPDA([Buffer.from("bond"), passkeyKeypair.publicKey.toBuffer()], program.programId);
  const bondVaultPDA = await findPDA([Buffer.from("bond_vault"), bondAccountPDA.toBuffer()], program.programId);

  // Fetch nonce
  let nonce = await getBondNonce(program, bondAccountPDA);

  // Message generation
  const message = Uint8Array.from(nonce.toArray("le", 8));

  // Generate signature
  const signature = generateValidSignature(message, passkeyKeypair);
  const signatureArray = Array.from(signature);

  const latestBlockhash = await connection.getLatestBlockhash();
  const solAmountLamports = bondAmount * LAMPORTS_PER_SOL;

  // Compute SHA-256 hash
  const nftMintAddressBuffer = nftMintAddress.toBuffer();
  const hash = await crypto.subtle.digest("SHA-256", nftMintAddressBuffer);
  const nftHashUint8Array = new Uint8Array(hash);
  const nftHashArray = Array.from(nftHashUint8Array);

  const ed25519Instruction = Ed25519Program.createInstructionWithPrivateKey({
    message,
    privateKey: passkeyKeypair.secretKey.slice(0, 64),
  });

  const bondSignatureIx = await program.methods
    .createSolBond(signatureArray, new anchor.BN(solAmountLamports), nftHashArray)
    .accounts({
      bondAccount: bondAccountPDA,
      bondVault: bondVaultPDA,
      user: wallet.publicKey!,
      publicKey: passkeyKeypair.publicKey,
      sysvarAccount: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
      systemProgram: anchor.web3.SystemProgram.programId,
    } as any)
    .instruction();

  const transaction = new Transaction();
  transaction.recentBlockhash = latestBlockhash.blockhash;
  transaction.feePayer = wallet.publicKey!;
  transaction.add(ed25519Instruction);
  transaction.add(bondSignatureIx);

```

```typescript

Code Example of Unbonding SOL

    //Derive the passkeyKeypair for bondAccountPDA derivation
    const passkeyKeypair = deriveChallengeKeypair(passkey,nftMintAddressPubkey);

    //Bond account
    const bondAccountPDA = findPDA([Buffer.from("bond"), passkeyKeypair.publicKey.toBuffer()], program.programId);

    // Bond vault
    const bondVaultPDA = findPDA([Buffer.from("bond_vault"), bondAccountPDA.toBuffer()], program.programId);

    const feeAccountPDA = findPDA([Buffer.from("fee_account")], program.programId);

    // Fetch nonce
    let nonce = await getBondNonce(program, bondAccountPDA);

   // Create the message (current nonce as 8-byte little-endian)
   const message = Uint8Array.from(nonce.toArray("le", 8));
  
   // Generate a valid signature using the challenge Keypair
   const signature = generateValidSignature(message, passkeyKeypair);

   // Convert Uint8Array to number[]
   const signatureArray = Array.from(signature);
  
   const ed25519Instruction = Ed25519Program.createInstructionWithPrivateKey({
     // The message to be signed
     message: message,
     // The private key as a Buffer (64 bytes for Ed25519)
     privateKey: passkeyKeypair.secretKey.slice(0, 64),
   });

    const latestBlockhash = await connection.getLatestBlockhash();

    const unBondSignatureIx = await program.methods
      .unbondSol(signatureArray)
      .accounts({
        bondAccount: bondAccountPDA, 
        bondVault: bondVaultPDA,
        nftTokenAccount: nftTokenAccountPubkey,
        nftMintAddress: nftMintAddressPubkey,
        feeRecipient: feeAccountPDA,  
        user: wallet.publicKey!,
        publicKey: passkeyKeypair.publicKey,
        sysvarAccount: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
        systemProgram: anchor.web3.SystemProgram.programId,
      } as any)
      .instruction();
  
      const transaction = new Transaction();
            transaction.recentBlockhash = latestBlockhash.blockhash;
            transaction.feePayer = wallet.publicKey!;
            transaction.add(ed25519Instruction);
            transaction.add(unBondSignatureIx);

```

```typescript

Code Example of Bonding Tokens

    // Derive passKey Keypair
    const passkeyKeypair = deriveChallengeKeypair(passKey, nftMintAddress);
  
    // Fetch PDAs for bondAccount and tokenVault
    const bondAccountPDA = findPDA([Buffer.from("bond"), passkeyKeypair.publicKey.toBuffer()], program.programId);
    const tokenVaultPDA = findPDA([Buffer.from("token_vault"), bondAccountPDA.toBuffer()], program.programId);
  
    // Fetch associated token accounts (ATA)
    const userTokenAta = await findAssociatedTokenAddress(wallet.publicKey!, tokenMintAddress, tokenProgram);
    const tokenVaultAta = await findAssociatedTokenAddress(tokenVaultPDA, tokenMintAddress, tokenProgram);

    // Fetch nonce
    let nonce = await getBondNonce(program, bondAccountPDA);
  
    // Message generation
    const message = Uint8Array.from(nonce.toArray("le", 8));
  
    // Generate signature
    const signature = generateValidSignature(message, passkeyKeypair);
    const signatureArray = Array.from(signature);
  
    const latestBlockhash = await connection.getLatestBlockhash();

    const decimals = await getTokenDecimals(tokenMintAddress, connection);
    const tokenAmountToSend = bondAmount * Math.pow(10, decimals);

    // Compute SHA-256 hash
    const nftMintAddressBuffer = nftMintAddress.toBuffer();
    const hash = await crypto.subtle.digest("SHA-256", nftMintAddressBuffer);
    const nftHashUint8Array = new Uint8Array(hash);
    const nftHashArray = Array.from(nftHashUint8Array);
  
    const ed25519Instruction = Ed25519Program.createInstructionWithPrivateKey({
      message,
      privateKey: passkeyKeypair.secretKey.slice(0, 64),
    });
  
    const bondSignatureIx = await program.methods
      .createTokenBond(signatureArray, new anchor.BN(tokenAmountToSend), nftHashArray)
      .accounts({
        bondAccount: bondAccountPDA,
        tokenVault: tokenVaultPDA,
        userTokenAta: userTokenAta,
        tokenMint: tokenMintAddress,
        tokenVaultAta: tokenVaultAta,
        user: wallet.publicKey!, 
        publicKey: passkeyKeypair.publicKey,
        sysvarAccount: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
        systemProgram: anchor.web3.SystemProgram.programId,
        tokenProgram: tokenProgram, 
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      } as any)
      .instruction();
  
    const transaction = new Transaction();
    transaction.recentBlockhash = latestBlockhash.blockhash;
    transaction.feePayer = wallet.publicKey!;
    transaction.add(ed25519Instruction);
    transaction.add(bondSignatureIx);

```

```typescript

Code Example of Unbonding Tokens

    // Derive passKey Keypair
    const passkeyKeypair = deriveChallengeKeypair(passkey, nftMintAddressPubkey);
  
    // Fetch PDAs for bondAccount and tokenVault
    const bondAccountPDA = findPDA([Buffer.from("bond"), passkeyKeypair.publicKey.toBuffer()], program.programId);
    const tokenVaultPDA = findPDA([Buffer.from("token_vault"), bondAccountPDA.toBuffer()], program.programId);
    const feeAccountPDA = findPDA([Buffer.from("fee_account")], program.programId);
    
    // Fetch associated token accounts (ATA)
    const userTokenAccount = await findAssociatedTokenAddress(wallet.publicKey!, tokenMintAddressPubkey, tokenProgramPubkey);
    
    const tokenVaultAta = await findAssociatedTokenAddress(tokenVaultPDA, tokenMintAddressPubkey, tokenProgramPubkey);

    const feeRecipientAta = await findAssociatedTokenAddress(feeAccountPDA, tokenMintAddressPubkey, tokenProgramPubkey);

    // Fetch nonce
    let nonce = await getBondNonce(program, bondAccountPDA);
  
    // Message generation
    const message = Uint8Array.from(nonce.toArray("le", 8));
  
    // Generate signature
    const signature = generateValidSignature(message, passkeyKeypair);
    const signatureArray = Array.from(signature);
  
    const latestBlockhash = await connection.getLatestBlockhash();
   
    const ed25519Instruction = Ed25519Program.createInstructionWithPrivateKey({
      message,
      privateKey: passkeyKeypair.secretKey.slice(0, 64),
    });

    const ubondSigIx = await program.methods.unbondTokens(signatureArray).accounts({
        bondAccount: bondAccountPDA,
        tokenVault: tokenVaultPDA,
        publicKey: passkeyKeypair.publicKey,
        user: wallet.publicKey!,
        userTokenAta: userTokenAccount,
        tokenMint: tokenMintAddressPubkey,
        tokenVaultAta: tokenVaultAta,
        nftMintAddress: nftMintAddressPubkey,
        nftTokenAccount: nftTokenAccountPubkey,
        tokenProgram: tokenProgramPubkey,
        feeRecipient: feeAccountPDA,
        feeRecipientAta: feeRecipientAta,
        sysvarAccount: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: anchor.web3.SystemProgram.programId,
    } as any).instruction();

    const transaction = new Transaction();
    transaction.recentBlockhash = latestBlockhash.blockhash;
    transaction.feePayer = wallet.publicKey!;
    transaction.add(ed25519Instruction);
    transaction.add(ubondSigIx);

```

```typescript

Code Example of securing a NFT

  Coming Soon

```

```typescript

Code Example of releasing a secured NFT

  Coming Soon

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

**A:** The passkey is used to generate a public/private key pair locally. This key pair signs a nonce challenge from the vault, ensuring secure verification without exposing your passkey. This signature is then varified in our on-chain program to ensure it matches the keypair used during bonding. <b>Your passkey is never stored anywhere</b>, assuming you keep your passkey secure on your end. It is not possible to have your passkey compromised.



