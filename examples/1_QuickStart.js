import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains'; // 有幫我們預設很多 chain ＆ testNetwork (如：eth, bsc, polygon...)

// 建立連線
const client = createPublicClient({
	chain: mainnet, // 直接使用
	transport: http(), // 也可以設定 webSocket
});

const blockNumber = await client.getBlockNumber();

console.log(`Block number: ${blockNumber}`); // 取得目前區塊數
