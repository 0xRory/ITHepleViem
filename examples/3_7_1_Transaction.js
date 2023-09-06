import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

const publicClient = createPublicClient({
	chain: mainnet,
	transport: http(),
});

const transaction = await publicClient.getTransaction({
	hash: '0xbc710a5f44f69da808bb1c6adf3e70fa9d8ed69d08282912de72bb34042c6a70',
});
//console.log('transaction', transaction);
/*transaction {
	type: 'eip1559',
	blockHash: '0x16c60fa71bd501b8706bfc610926abd2f3f3ab518eb217098b78e0ce0f532ae2',
	blockNumber: 18075787n,
	from: '0xa6a688f107851131f0e1dce493ebbebfaf99203e',
	gas: 242465n,
	hash: '0xbc710a5f44f69da808bb1c6adf3e70fa9d8ed69d08282912de72bb34042c6a70',
	input: '0x8d8798bfd69c275e3c033d90dccaba886790e04c96863d6651183f247690a2d4ffc474e0000000000000000000000000000000000000000000000000000000000000a4b10000000000000000000000000000000000000000000000000000000c2a99a8bb',
	nonce: 84927,
	to: '0x3666f603cc164936c1b87e207f36beba4ac5f18a',
	transactionIndex: 578,
	value: 0n,
	v: 0n,
	r: '0x321b72181bf9f048d239e4e921f1d6cdd7313a186af2901f4f08c95fbf87b83',
	s: '0x46040761ba278c59c642eb476214fde749014448f2430593a4a571ce247659ce',
	gasPrice: 10520166418n,
	maxFeePerGas: 22573977776n,
	maxPriorityFeePerGas: 90000000n,
	chainId: 1,
	accessList: [],
	typeHex: '0x2'
  }*/

// 獲取交易的結果
const transactionReceipt = await publicClient.getTransactionReceipt({
	hash: '0xbc710a5f44f69da808bb1c6adf3e70fa9d8ed69d08282912de72bb34042c6a70',
});
// 確定這個交易有多的 block 來完成
const confirmations = await publicClient.getTransactionConfirmations({
	transactionReceipt,
});

console.log('confirmations', confirmations); // 這個就是通過多少區塊來完成的，一般來說呈現０就代表沒處理。

const waitTransaction = await publicClient.waitForTransactionReceipt({
	confirmations: 5, // 確認幾次
	//onReplaced: replacement => console.log(replacement)  如果你的設定都會的話，因該是不用這個，交易有狀況時才需要
	hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
	// timeout: 60_000,  // time out 毫秒
	// pollingInterval: 12_000 // 輪詢毫秒
});
