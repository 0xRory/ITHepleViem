import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

export const publicClient = createPublicClient({
	chain: mainnet,
	transport: http(),
});

const block = await publicClient.getBlock();
const count = await publicClient.getBlockTransactionCount();

// 監聽 BlockNumber
const unwatchBlockNumber = publicClient.watchBlockNumber({
	onBlockNumber: (blockNumber) => console.log(blockNumber),
});
// 監聽 Block
const unwatchBlock = publicClient.watchBlocks({
	onBlock: (block) => console.log(block),
});

//https://viem.sh/docs/actions/public/watchBlocks.html

// 取得目前的區塊鏈ＩＤ
const chainId = await publicClient.getChainId();
