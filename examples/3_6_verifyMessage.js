import { createPublicClient, http, createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';

export const publicClient = createPublicClient({
	chain: mainnet,
	transport: http(),
});

const valid = await publicClient.verifyMessage({
	address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
	message: 'hello world',
	signature:
		'0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c',
});

console.log('valid', valid);
