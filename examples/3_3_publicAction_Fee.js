import { createPublicClient, http, parseEther } from 'viem';
import { mainnet } from 'viem/chains';

export const publicClient = createPublicClient({
	chain: mainnet,
	transport: http(),
});
// 估算每單位燃料價格
// maxPriorityFeePerGas 每單位燃料的優先價格上限
// maxFeePerGas 每單位燃料的價格上限
const { maxFeePerGas, maxPriorityFeePerGas } =
	await publicClient.estimateFeesPerGas();
/**
 * {
 *   maxFeePerGas: 19_788_646_562n,
 *   maxPriorityFeePerGas: 50_000_000n,
 * }
 */

console.log({ maxFeePerGas, maxPriorityFeePerGas });

// gasPrice 估計每單位燃料價錢
const { gasPrice } = await publicClient.estimateFeesPerGas({
	type: 'legacy',
});
/**
 * { gasPrice: 19_788_646_562n }
 */
console.log({ gasPrice });

// 可以參考這篇文章（大前輩）
// https://ithelp.ithome.com.tw/articles/10293790?sc=iThelpR

// export const account = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';
// // 估計消耗 Gas
// const gasEstimate = await publicClient.estimateGas({
// 	account,
// 	to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
// 	value: parseEther('1'),
// });

// 不過因該會出現錯誤，因為我們錢包沒錢
// insufficient funds for gas * price + value: address 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 have 0 want 1000000000000000000

// 取得歷史費用
const feeHistory = await publicClient.getFeeHistory({
	blockCount: 4,
	rewardPercentiles: [25, 75],
});

console.log(feeHistory);
