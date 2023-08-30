import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

export const publicClient = createPublicClient({
	chain: mainnet,
	transport: http(),
});
// 取得帳號餘額
const balance = await publicClient.getBalance({
	address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
});
console.log(balance);
// 9065643223449644n

// 取得事務數
const transactionCount = await publicClient.getTransactionCount({
	address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
});

console.log(transactionCount);
// 113

// https://etherscan.io/txs?a=0xA0Cf798816D4b9b9866b5330EEa46a18382f251e&f=2
