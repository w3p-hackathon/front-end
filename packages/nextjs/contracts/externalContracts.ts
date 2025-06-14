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
      address: "0xb3fb4a8fbc5071182def798f2621d6a209237bb4",
      abi: [
        { type: "constructor", inputs: [], stateMutability: "nonpayable" },
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
      ],
    },
  },
} as const;

export default externalContracts satisfies GenericContractsDeclaration;
