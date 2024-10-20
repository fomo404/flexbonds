/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/flex_bonds.json`.
 */
export type FlexBonds = {
  "address": "7uZ3y31B54wqKHoNJUreGcsfuv5H8AfbQNuq32dKr57u",
  "metadata": {
    "name": "flexBonds",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "docs": [
    "The main program module for Flex Bonds.",
    "Provides functionality to bond and unbond SOL/tokens associated with specific NFTs,",
    "and to secure and release NFTs by changing their authority."
  ],
  "instructions": [
    {
      "name": "changeFeeAccountAuthority",
      "docs": [
        "Changes the authority wallet of the fee account.",
        "",
        "# Arguments",
        "",
        "* `ctx` - Context containing accounts required to change authority.",
        "* `new_auth_wallet` - The public key of the new authority wallet."
      ],
      "discriminator": [
        213,
        60,
        249,
        114,
        233,
        99,
        23,
        135
      ],
      "accounts": [
        {
          "name": "feeAccount",
          "docs": [
            "The fee account PDA derived from seeds `[b\"fee_account\"]`."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  101,
                  101,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "currentAuthWallet",
          "docs": [
            "The current authority wallet that must sign to authorize the change."
          ],
          "signer": true
        }
      ],
      "args": [
        {
          "name": "newAuthWallet",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "createSolBond",
      "docs": [
        "Bonds SOL associated with a specific NFT.",
        "",
        "# Parameters",
        "- `ctx`: The context containing all necessary accounts.",
        "- `sig`: Challenge signature from the wallet, combining passkey and NFT mint address.",
        "- `amount`: Amount of SOL to bond in lamports.",
        "- `account_hash`: Hash of the NFT mint address.",
        "",
        "# Steps",
        "1. Derive the public key from the provided `public_key` account.",
        "2. Check if the `bond_account` is initialized; initialize if not.",
        "3. Verify the provided signature using the `verify_ed25519` function.",
        "4. Transfer the specified amount of SOL from the user to the `bond_vault` PDA.",
        "5. Store the authenticated public key, account hash, and increment the nonce in the `bond_account`."
      ],
      "discriminator": [
        25,
        136,
        202,
        70,
        214,
        4,
        85,
        69
      ],
      "accounts": [
        {
          "name": "bondAccount",
          "docs": [
            "Bond account derived from seeds `[b\"bond\", public_key.key()]`."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  111,
                  110,
                  100
                ]
              },
              {
                "kind": "account",
                "path": "publicKey"
              }
            ]
          }
        },
        {
          "name": "user",
          "docs": [
            "The user bonding the SOL."
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "bondVault",
          "docs": [
            "PDA to hold bonded SOL & tokens derived from `[b\"bond_vault\", bond_account.key()]`."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  111,
                  110,
                  100,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "bondAccount"
              }
            ]
          }
        },
        {
          "name": "publicKey",
          "docs": [
            "Public key account used to sign the challenge."
          ]
        },
        {
          "name": "sysvarAccount",
          "docs": [
            "Sysvar account containing instruction data for signature verification."
          ],
          "address": "Sysvar1nstructions1111111111111111111111111"
        },
        {
          "name": "systemProgram",
          "docs": [
            "The system program."
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "sig",
          "type": {
            "array": [
              "u8",
              64
            ]
          }
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "accountHash",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        }
      ]
    },
    {
      "name": "createTokenBond",
      "discriminator": [
        112,
        186,
        250,
        131,
        152,
        203,
        29,
        105
      ],
      "accounts": [
        {
          "name": "bondAccount",
          "docs": [
            "Bond account derived from seeds `[b\"bond\", public_key.key()]`."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  111,
                  110,
                  100
                ]
              },
              {
                "kind": "account",
                "path": "publicKey"
              }
            ]
          }
        },
        {
          "name": "tokenVault",
          "docs": [
            "PDA derived from `[b\"token_vault\", bond_account.key()]`."
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "bondAccount"
              }
            ]
          }
        },
        {
          "name": "publicKey",
          "docs": [
            "Public key account used to sign the challenge."
          ]
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "userTokenAta",
          "docs": [
            "User's Associated Token Account for the token to be bonded."
          ],
          "writable": true
        },
        {
          "name": "tokenMint",
          "docs": [
            "Mint account for the Token (needed for `transfer_checked`)."
          ],
          "writable": true
        },
        {
          "name": "tokenVaultAta",
          "docs": [
            "Associated Token Account for token_vault's ATA.",
            "Will be created if needed."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "tokenVault"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "tokenMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "sysvarAccount",
          "docs": [
            "Sysvar account containing instruction data for signature verification."
          ],
          "address": "Sysvar1nstructions1111111111111111111111111"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "The Associated Token program."
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "docs": [
            "The system program."
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "sig",
          "type": {
            "array": [
              "u8",
              64
            ]
          }
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "accountHash",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        }
      ]
    },
    {
      "name": "initFeeAccount",
      "docs": [
        "Initializes the fee account PDA and sets the authority wallet.",
        "",
        "# Arguments",
        "",
        "* `ctx` - Context containing accounts required for initialization.",
        "* `auth_wallet` - The public key of the authority wallet."
      ],
      "discriminator": [
        85,
        169,
        185,
        211,
        103,
        153,
        111,
        2
      ],
      "accounts": [
        {
          "name": "feeAccount",
          "docs": [
            "The fee account PDA derived from seeds `[b\"fee_account\"]`."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  101,
                  101,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "user",
          "docs": [
            "The user initializing the fee account."
          ],
          "writable": true,
          "signer": true,
          "address": "CpvpPyg5xEumdQr8E6gKrh6e2e3dRN1xdTfCRMiG7re6"
        },
        {
          "name": "systemProgram",
          "docs": [
            "System program required for account creation."
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "authWallet",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "releaseNft",
      "docs": [
        "Releases an NFT by transferring its ownership back to the user.",
        "",
        "# Parameters",
        "- `ctx`: The context containing all necessary accounts.",
        "- `sig`: Release challenge signature from the wallet.",
        "",
        "# Steps",
        "1. Derive the public key from the provided `public_key` account.",
        "2. Verify the provided signature using the `verify_ed25519` function.",
        "3. Change the authority of the NFT token account back to the user."
      ],
      "discriminator": [
        89,
        200,
        240,
        126,
        97,
        35,
        224,
        112
      ],
      "accounts": [
        {
          "name": "nftVault",
          "docs": [
            "The NFT vault account derived from seeds `[b\"nft_vault\"]`."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  110,
                  102,
                  116,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "publicKey"
              }
            ]
          }
        },
        {
          "name": "nftTokenAccount",
          "docs": [
            "The NFT token account currently owned by the PDA (nft_vault).",
            "- Ensures the NFT is owned by the PDA."
          ],
          "writable": true
        },
        {
          "name": "publicKey",
          "docs": [
            "Public key account used to sign the challenge."
          ]
        },
        {
          "name": "user",
          "docs": [
            "The user unlocking the NFT. Must be the initial signer who locked the NFT."
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "sysvarAccount",
          "docs": [
            "Sysvar account containing instruction data for signature verification."
          ],
          "address": "Sysvar1nstructions1111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "The SPL Token program."
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "docs": [
            "The system program."
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "sig",
          "type": {
            "array": [
              "u8",
              64
            ]
          }
        }
      ]
    },
    {
      "name": "secureNft",
      "docs": [
        "Secures an NFT by transferring its ownership to a PDA (nft_vault).",
        "",
        "# Parameters",
        "- `ctx`: The context containing all necessary accounts.",
        "- `sig`: Challenge signature from the wallet.",
        "",
        "# Steps",
        "1. Derive the public key from the provided `public_key` account.",
        "2. Check if the `nft_vault` is initialized; initialize if not.",
        "3. Verify the provided signature using the `verify_ed25519` function.",
        "4. Change the authority of the NFT token account to the `nft_vault` PDA."
      ],
      "discriminator": [
        31,
        229,
        117,
        63,
        47,
        54,
        153,
        102
      ],
      "accounts": [
        {
          "name": "nftVault",
          "docs": [
            "The NFT vault account derived from seeds `[b\"nft_vault\", user.key()]`."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  110,
                  102,
                  116,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "publicKey"
              }
            ]
          }
        },
        {
          "name": "nftTokenAccount",
          "docs": [
            "The user's specific NFT token account.",
            "- Ensures the NFT is owned by the user."
          ],
          "writable": true
        },
        {
          "name": "publicKey",
          "docs": [
            "Public key account used to sign the challenge."
          ]
        },
        {
          "name": "user",
          "docs": [
            "The user locking the NFT."
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "sysvarAccount",
          "docs": [
            "Sysvar account containing instruction data for signature verification."
          ],
          "address": "Sysvar1nstructions1111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "The SPL Token program."
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "docs": [
            "The system program."
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "sig",
          "type": {
            "array": [
              "u8",
              64
            ]
          }
        }
      ]
    },
    {
      "name": "unbondSol",
      "docs": [
        "Unbonds SOL previously bonded to a specific NFT.",
        "",
        "# Parameters",
        "- `ctx`: The context containing all necessary accounts.",
        "- `sig`: Unbond challenge signature from the wallet.",
        "",
        "# Steps",
        "1. Derive the public key from the provided `public_key` account.",
        "2. Verify the provided signature using the `verify_ed25519` function.",
        "3. Validate the fee recipient account against a stored address.",
        "4. Calculate the fee based on the bonded amount in the `bond_vault`.",
        "5. Ensure the `bond_vault` has sufficient SOL to cover the fee and unbonded amount.",
        "6. Transfer the fee to the `fee_recipient` and the remaining SOL back to the user."
      ],
      "discriminator": [
        181,
        39,
        20,
        231,
        219,
        39,
        232,
        40
      ],
      "accounts": [
        {
          "name": "bondAccount",
          "docs": [
            "The bond account derived from seeds `[b\"bond\", public_key.key()]`."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  111,
                  110,
                  100
                ]
              },
              {
                "kind": "account",
                "path": "publicKey"
              }
            ]
          }
        },
        {
          "name": "bondVault",
          "docs": [
            "PDA to hold bonded SOL derived from `[b\"bond_vault\", bond_account.key()]`."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  111,
                  110,
                  100,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "bondAccount"
              }
            ]
          }
        },
        {
          "name": "nftTokenAccount",
          "docs": [
            "The user's specific NFT token account.",
            "- Ensures the user owns exactly one NFT.",
            "- Ensures the NFT is owned by the user.",
            "- Ensures the NFT mint matches."
          ],
          "writable": true
        },
        {
          "name": "nftMintAddress",
          "docs": [
            "The NFT mint address."
          ]
        },
        {
          "name": "feeRecipient",
          "docs": [
            "The fee recipient account."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  101,
                  101,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "user",
          "docs": [
            "The user unbonding the SOL."
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "publicKey",
          "docs": [
            "Public key account used to sign the challenge."
          ]
        },
        {
          "name": "sysvarAccount",
          "docs": [
            "Sysvar account containing instruction data for signature verification."
          ],
          "address": "Sysvar1nstructions1111111111111111111111111"
        },
        {
          "name": "systemProgram",
          "docs": [
            "The system program."
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "sig",
          "type": {
            "array": [
              "u8",
              64
            ]
          }
        }
      ]
    },
    {
      "name": "unbondTokens",
      "discriminator": [
        158,
        37,
        240,
        11,
        241,
        197,
        56,
        170
      ],
      "accounts": [
        {
          "name": "bondAccount",
          "docs": [
            "Bond account holding bonding information."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  111,
                  110,
                  100
                ]
              },
              {
                "kind": "account",
                "path": "publicKey"
              }
            ]
          }
        },
        {
          "name": "tokenVault",
          "docs": [
            "PDA to hold bonded tokens derived from `[b\"token_vault\", bond_account.key()]`."
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "bondAccount"
              }
            ]
          }
        },
        {
          "name": "publicKey",
          "docs": [
            "Public key account used to sign the challenge."
          ]
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "userTokenAta",
          "docs": [
            "The user's token ata account to receive the unbonded tokens.",
            "unchecked account used to lower stack size"
          ],
          "writable": true
        },
        {
          "name": "tokenMint",
          "docs": [
            "Mint account for the Token (needed for `transfer_checked`)."
          ],
          "writable": true
        },
        {
          "name": "tokenVaultAta",
          "docs": [
            "Token Account for token_vault's ATA.",
            "must exist from token bonding."
          ],
          "writable": true
        },
        {
          "name": "nftMintAddress",
          "docs": [
            "The NFT mint address associated with the bonding."
          ],
          "writable": true
        },
        {
          "name": "nftTokenAccount",
          "docs": [
            "The user's specific NFT token account.",
            "- Ensures the user owns exactly one NFT.",
            "- Ensures the NFT is owned by the user.",
            "- Ensures the NFT mint matches."
          ],
          "writable": true
        },
        {
          "name": "tokenProgram",
          "docs": [
            "Token-2022 or SPL Token Program will be checked in the function."
          ]
        },
        {
          "name": "feeRecipient",
          "docs": [
            "The fee recipient PDA"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  101,
                  101,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "feeRecipientAta",
          "docs": [
            "The fee recipient's token account."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "feeRecipient"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "tokenMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "sysvarAccount",
          "docs": [
            "Sysvar account containing instruction data for signature verification."
          ],
          "address": "Sysvar1nstructions1111111111111111111111111"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "The Associated Token program."
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "docs": [
            "The system program."
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "sig",
          "type": {
            "array": [
              "u8",
              64
            ]
          }
        }
      ]
    },
    {
      "name": "withdrawSolFeeFunds",
      "docs": [
        "Withdraws lamports from the fee account to the auth wallet.",
        "",
        "# Arguments",
        "",
        "* `ctx` - Context containing accounts required to withdraw funds.",
        "* `lamport_amount` - The amount of lamports to withdraw."
      ],
      "discriminator": [
        45,
        186,
        3,
        237,
        13,
        71,
        172,
        241
      ],
      "accounts": [
        {
          "name": "feeAccount",
          "docs": [
            "The fee account PDA derived from seeds `[b\"fee_account\"]`."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  101,
                  101,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "authWallet",
          "docs": [
            "The authority wallet that must sign to authorize the withdrawal."
          ],
          "signer": true
        },
        {
          "name": "recipient",
          "docs": [
            "The recipient account to receive lamports."
          ],
          "writable": true
        },
        {
          "name": "systemProgram",
          "docs": [
            "System program required for transferring lamports."
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "lamportAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdrawTokenFeeFunds",
      "docs": [
        "Withdraws tokens from the fee account.",
        "",
        "# Arguments",
        "",
        "* `ctx` - Context containing accounts required to withdraw funds.",
        "* `amount` - The amount of tokens to withdraw."
      ],
      "discriminator": [
        124,
        110,
        129,
        24,
        38,
        100,
        28,
        61
      ],
      "accounts": [
        {
          "name": "feeAccount",
          "docs": [
            "The fee account PDA derived from seeds `[b\"fee_account\"]`."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  101,
                  101,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "authWallet",
          "docs": [
            "The authority wallet that must sign to authorize the withdrawal."
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "feeAccountAta",
          "writable": true
        },
        {
          "name": "recipient",
          "docs": [
            "The recipient account to receive tokens."
          ],
          "writable": true
        },
        {
          "name": "recipientAta",
          "docs": [
            "The recipient ata account to receive tokens."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "recipient"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "tokenMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "tokenMint",
          "docs": [
            "Mint account for the Token (needed for `transfer_checked`)."
          ],
          "writable": true
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "The Associated Token program."
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "Token-2022 or SPL Token Program will be checked in the function."
          ]
        },
        {
          "name": "systemProgram",
          "docs": [
            "The system program."
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "bondAccount",
      "discriminator": [
        140,
        228,
        237,
        10,
        239,
        187,
        187,
        64
      ]
    },
    {
      "name": "bondVault",
      "discriminator": [
        200,
        230,
        79,
        11,
        214,
        255,
        76,
        25
      ]
    },
    {
      "name": "feeAccount",
      "discriminator": [
        137,
        191,
        201,
        34,
        168,
        222,
        43,
        138
      ]
    },
    {
      "name": "nftVault",
      "discriminator": [
        156,
        179,
        202,
        173,
        111,
        225,
        209,
        88
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "signatureVerificationErrorInvalidAccount",
      "msg": "Signature verification failed. Invalid account."
    },
    {
      "code": 6001,
      "name": "signatureVerificationErrorShort",
      "msg": "Signature verification failed. Sig too short."
    },
    {
      "code": 6002,
      "name": "signatureVerificationErrorAmount",
      "msg": "Signature verification failed. Too many signatures"
    },
    {
      "code": 6003,
      "name": "signatureVerificationErrorZero",
      "msg": "Signature verification failed. Zero padding"
    },
    {
      "code": 6004,
      "name": "signatureVerificationErrorOffset",
      "msg": "Signature verification failed. Offset Error."
    },
    {
      "code": 6005,
      "name": "signatureVerificationErrorU16",
      "msg": "Signature verification failed. U16 Error."
    },
    {
      "code": 6006,
      "name": "signatureVerificationErrorShortInstruct",
      "msg": "Signature verification failed. Short Instruction."
    },
    {
      "code": 6007,
      "name": "signatureVerificationErrorShortPubkey",
      "msg": "Signature verification failed. Short Pubkey."
    },
    {
      "code": 6008,
      "name": "signatureVerificationErrorShortMessage",
      "msg": "Signature verification failed. Short Message."
    },
    {
      "code": 6009,
      "name": "signatureVerificationErrorPubkeyMisMatch",
      "msg": "Signature verification failed. Pubkey MisMatch."
    },
    {
      "code": 6010,
      "name": "signatureVerificationErrorSigMisMatch",
      "msg": "Signature verification failed. Sig MisMatch."
    },
    {
      "code": 6011,
      "name": "signatureVerificationErrorNonceMisMatch",
      "msg": "Signature verification failed. Nonce MisMatch."
    },
    {
      "code": 6012,
      "name": "instructionLoadError",
      "msg": "Failed to load instruction from sysvar."
    },
    {
      "code": 6013,
      "name": "invalidFeeAccount",
      "msg": "Invalid fee account."
    },
    {
      "code": 6014,
      "name": "insufficientFunds",
      "msg": "Insufficient funds."
    },
    {
      "code": 6015,
      "name": "calculationError",
      "msg": "Calculation error."
    },
    {
      "code": 6016,
      "name": "invalidNftAccount",
      "msg": "Invalid NFT account."
    },
    {
      "code": 6017,
      "name": "nonceOverflow",
      "msg": "Nonce increment would overflow."
    },
    {
      "code": 6018,
      "name": "counterOverFlow",
      "msg": "Nonce increment would overflow."
    },
    {
      "code": 6019,
      "name": "invalidAccountOwner",
      "msg": "Invalid account owner."
    },
    {
      "code": 6020,
      "name": "invalidPublicKey",
      "msg": "Invalid pubkey."
    },
    {
      "code": 6021,
      "name": "invalidAccountHash",
      "msg": "Invalid account hash."
    },
    {
      "code": 6022,
      "name": "invalidBondAmount",
      "msg": "Invalid bond amount"
    },
    {
      "code": 6023,
      "name": "invalidDestinationAccount",
      "msg": "Invalid destination account."
    },
    {
      "code": 6024,
      "name": "insufficientFeeFunds",
      "msg": "Insufficient funds in fee account."
    },
    {
      "code": 6025,
      "name": "invalidTokenProgram",
      "msg": "Invalid token program."
    },
    {
      "code": 6026,
      "name": "tokenAccountInitializationFailed",
      "msg": "Failed to initialize token account."
    },
    {
      "code": 6027,
      "name": "tokenTransferFailed",
      "msg": "Token transfer failed."
    },
    {
      "code": 6028,
      "name": "invalidAta",
      "msg": "Invalid Associated Token Account."
    },
    {
      "code": 6029,
      "name": "invalidUserAta",
      "msg": "Invalid User Associated Token Account."
    },
    {
      "code": 6030,
      "name": "invalidFeeAta",
      "msg": "Invalid Fee Account Associated Token Account."
    },
    {
      "code": 6031,
      "name": "invalidTokenVaultAta",
      "msg": "Invalid Token Vault Associated Token Account."
    },
    {
      "code": 6032,
      "name": "ataInitializationFailed",
      "msg": "Associated Token Account creation failed."
    },
    {
      "code": 6033,
      "name": "mathOverflow",
      "msg": "Math operation overflow."
    },
    {
      "code": 6034,
      "name": "noTokensToUnbond",
      "msg": "No tokens to unbond."
    },
    {
      "code": 6035,
      "name": "invalidVaultTokenAccountData",
      "msg": "Invalid account data."
    },
    {
      "code": 6036,
      "name": "invalidMintAccount",
      "msg": "Invalid mint account."
    },
    {
      "code": 6037,
      "name": "invalidTokenAccountOwner",
      "msg": "Invalid account owner."
    }
  ],
  "types": [
    {
      "name": "bondAccount",
      "docs": [
        "Account structure for storing bonding information.",
        "Stores the user's public key, a nonce for replay attack prevention, and the hash of the NFT mint address."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isInitialized",
            "type": "bool"
          },
          {
            "name": "publicKey",
            "type": "pubkey"
          },
          {
            "name": "nonce",
            "type": "u64"
          },
          {
            "name": "accountHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          }
        ]
      }
    },
    {
      "name": "bondVault",
      "docs": [
        "Account structure for storing bonded SOL.",
        "Currently empty but can be expanded in the future if needed."
      ],
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "feeAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authWallet",
            "docs": [
              "The authority wallet's public key."
            ],
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "nftVault",
      "docs": [
        "Account structure for storing NFT vault information.",
        "Stores the user's public key, a nonce for replay attack prevention, and the authority of the NFT before locking."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isInitialized",
            "type": "bool"
          },
          {
            "name": "publicKey",
            "type": "pubkey"
          },
          {
            "name": "nonce",
            "type": "u64"
          },
          {
            "name": "authority",
            "type": "pubkey"
          }
        ]
      }
    }
  ]
};
