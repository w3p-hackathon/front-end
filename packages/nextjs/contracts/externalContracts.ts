import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

/**
 * @example
 * const externalContracts = {
 *   1: {
 *     DAI: {
 *       address: "0x...",
 *       abi: [...],
 *     },
 *   },
 * } as const;
 */
const externalContracts = {
  11155111: {
    RewardDistributor: {
      address: "0xd3d2d2642fc82b7fdbc361a5c02679f997902ca9",
      abi: [
        { type: "constructor", inputs: [], stateMutability: "nonpayable" },
        {
          type: "function",
          name: "allowance",
          inputs: [
            { name: "owner", type: "address", internalType: "address" },
            { name: "spender", type: "address", internalType: "address" },
          ],
          outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "approve",
          inputs: [
            { name: "spender", type: "address", internalType: "address" },
            { name: "value", type: "uint256", internalType: "uint256" },
          ],
          outputs: [{ name: "", type: "bool", internalType: "bool" }],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "balanceOf",
          inputs: [{ name: "account", type: "address", internalType: "address" }],
          outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "createReward",
          inputs: [
            { name: "value", type: "uint256", internalType: "uint256" },
            { name: "root", type: "bytes32", internalType: "bytes32" },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "decimals",
          inputs: [],
          outputs: [{ name: "", type: "uint8", internalType: "uint8" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "mint",
          inputs: [
            { name: "recipient", type: "address", internalType: "address" },
            { name: "amt", type: "uint256", internalType: "uint256" },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "name",
          inputs: [],
          outputs: [{ name: "", type: "string", internalType: "string" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "stake",
          inputs: [{ name: "amount", type: "uint256", internalType: "uint256" }],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "symbol",
          inputs: [],
          outputs: [{ name: "", type: "string", internalType: "string" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "totalSupply",
          inputs: [],
          outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "transfer",
          inputs: [
            { name: "to", type: "address", internalType: "address" },
            { name: "value", type: "uint256", internalType: "uint256" },
          ],
          outputs: [{ name: "", type: "bool", internalType: "bool" }],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "transferFrom",
          inputs: [
            { name: "from", type: "address", internalType: "address" },
            { name: "to", type: "address", internalType: "address" },
            { name: "value", type: "uint256", internalType: "uint256" },
          ],
          outputs: [{ name: "", type: "bool", internalType: "bool" }],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "verify",
          inputs: [
            { name: "proof", type: "bytes32[]", internalType: "bytes32[]" },
            { name: "commitment", type: "bytes32", internalType: "bytes32" },
            { name: "secret", type: "bytes32", internalType: "bytes32" },
            { name: "rewardId", type: "uint256", internalType: "uint256" },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "event",
          name: "Approval",
          inputs: [
            { name: "owner", type: "address", indexed: true, internalType: "address" },
            { name: "spender", type: "address", indexed: true, internalType: "address" },
            { name: "value", type: "uint256", indexed: false, internalType: "uint256" },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "Transfer",
          inputs: [
            { name: "from", type: "address", indexed: true, internalType: "address" },
            { name: "to", type: "address", indexed: true, internalType: "address" },
            { name: "value", type: "uint256", indexed: false, internalType: "uint256" },
          ],
          anonymous: false,
        },
        {
          type: "error",
          name: "ERC20InsufficientAllowance",
          inputs: [
            { name: "spender", type: "address", internalType: "address" },
            { name: "allowance", type: "uint256", internalType: "uint256" },
            { name: "needed", type: "uint256", internalType: "uint256" },
          ],
        },
        {
          type: "error",
          name: "ERC20InsufficientBalance",
          inputs: [
            { name: "sender", type: "address", internalType: "address" },
            { name: "balance", type: "uint256", internalType: "uint256" },
            { name: "needed", type: "uint256", internalType: "uint256" },
          ],
        },
        {
          type: "error",
          name: "ERC20InvalidApprover",
          inputs: [{ name: "approver", type: "address", internalType: "address" }],
        },
        {
          type: "error",
          name: "ERC20InvalidReceiver",
          inputs: [{ name: "receiver", type: "address", internalType: "address" }],
        },
        {
          type: "error",
          name: "ERC20InvalidSender",
          inputs: [{ name: "sender", type: "address", internalType: "address" }],
        },
        {
          type: "error",
          name: "ERC20InvalidSpender",
          inputs: [{ name: "spender", type: "address", internalType: "address" }],
        },
      ],
    },
    EventEmitter: {
      address: "0x7919F3A54B28D25E1917c050B1227a72Bf33263B",
      abi: [
        {
          type: "function",
          name: "emitMetricAvailiable",
          inputs: [
            { name: "proof", type: "bytes32", internalType: "bytes32" },
            { name: "metrics", type: "bytes32[3]", internalType: "bytes32[3]" },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "event",
          name: "metricsAvailiable",
          inputs: [
            { name: "proof", type: "bytes32", indexed: false, internalType: "bytes32" },
            { name: "metrics", type: "bytes32[3]", indexed: false, internalType: "bytes32[3]" },
          ],
          anonymous: false,
        },
      ],
    },
  },
} as const;

export default externalContracts satisfies GenericContractsDeclaration;
