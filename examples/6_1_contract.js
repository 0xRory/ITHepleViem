import { createPublicClient, http, getContract } from 'viem';
import { mainnet } from 'viem/chains';
import { erc20ABI } from './abi/erc20_abi.js';

export const publicClient = createPublicClient({
	chain: mainnet,
	transport: http(),
});

const contract = getContract({
	address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
	abi: erc20ABI,
	publicClient,
});

const result = await contract.read.totalSupply();
console.log(result);

const balance = await contract.read.balanceOf([
	'0x21a31Ee1afC51d94C2eFcCAa2092aD1028285549',
]);

console.log(balance);
