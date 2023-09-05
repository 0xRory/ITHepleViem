import { http, createPublicClient, stringify } from 'viem';
import { mainnet } from 'viem/chains';

const client = createPublicClient({
	chain: mainnet,
	transport: http(),
});

// TODO: convert to `parseAbiItem`.
const event = {
	inputs: [
		{
			indexed: true,
			name: 'from',
			type: 'address',
		},
		{
			indexed: true,
			name: 'to',
			type: 'address',
		},
		{
			indexed: false,
			name: 'value',
			type: 'uint256',
		},
	],
	name: 'Transfer',
	type: 'event',
};

client.watchEvent({
	address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
	event,
	// poll:false // 是否為 webstocket
	// args: {
	//     from:0xd8da6bf26964af9d7eed9e03e53415d37aa96045
	//     to:
	// }
	//pollingInterval: 1_000, // 每 1 秒觀察一次，如果沒有設定看 RpcServer 自己預設是多少
	onLogs: (logs) => {
		console.log(logs[0].blockNumber);
		console.log(stringify(logs, null, 2));
	},
});
