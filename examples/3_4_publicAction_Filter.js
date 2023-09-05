import { createPublicClient, http, parseAbiItem } from 'viem';
import { mainnet } from 'viem/chains';

const transport = http('https://ethereum-mainnet-rpc.allthatnode.com');

export const publicClient = createPublicClient({
	chain: mainnet,
	transport: transport,
});

// 監聽新區塊的篩選
const filterBlock = await publicClient.createBlockFilter();

const hashes = await publicClient.getFilterChanges({ filterBlock });
// ["0x10d86dc08ac2f18f00ef0daf7998dcc8673cbcf1f1501eeb2fac1afd2f851128", ...]
// 我測試了很多 public rpc 是沒測試出來

// 監聽事件
const filterEvent = await publicClient.createEventFilter({
	address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // 地址
	event: parseAbiItem(
		'event Transfer(address indexed from, address indexed to, uint256 value)'
	), // 監控的 event
	fromBlock: 16330000n, // 開始篩選
	toBlock: 16330050n, // 結束篩選
});

const EventLogs = await publicClient.getFilterChanges({ filterEvent });
// [{ ... }, { ... }, { ... }]

const filterPendingTx = await publicClient.createPendingTransactionFilter();
const txHashes = await publicClient.getFilterChanges({ filterPendingTx });
// ["0x89b3aa1c01ca4da5d15eca9fab459d062db5c0c9b76609acb0741901f01f6d19", ...]

const logs = await publicClient.getLogs({
	address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
	event: parseAbiItem(
		'event Transfer(address indexed, address indexed, uint256)'
	),
	args: {
		from: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
		to: '0xa5cc3c03994db5b0d9a5eedd10cabab0813678ac',
	},
	fromBlock: 16330001n,
	toBlock: 16330001n,
});

console.log(logs.length);
