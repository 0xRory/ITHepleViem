import { createPublicClient, http } from 'viem';
import { encodeFunctionData } from 'viem';
import { mainnet } from 'viem/chains';

const publicClient = createPublicClient({
	chain: mainnet,
	transport: http(),
});

//https://abi.hashex.org/

const eFD = await encodeFunctionData({
	address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
	abi: [
		{
			constant: true,
			inputs: [{ name: 'who', type: 'address' }],
			name: 'balanceOf',
			outputs: [{ name: '', type: 'uint256' }],
			payable: false,
			stateMutability: 'view',
			type: 'function',
		},
	],
	functionName: 'balanceOf',
	args: ['0xa6a688F107851131F0E1dce493EbBebFAf99203e'],
});
console.log(eFD); // 0x70a08231000000000000000000000000a6a688f107851131f0e1dce493ebbebfaf99203e

const data = await publicClient.call({
	data: eFD,
	to: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
});

console.log('data', data);
// https://www.rapidtables.com/convert/number/hex-to-decimal.html 轉型
