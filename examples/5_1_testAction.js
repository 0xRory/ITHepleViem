import { createTestClient, createPublicClient, http, parseEther } from 'viem';
import { hardhat } from 'viem/chains';

export const publicClient = createPublicClient({
  chain: hardhat,
  transport: http(),
});

export const testClient = createTestClient({
  chain: hardhat,
  mode: 'hardhat',
  transport: http(),
});

// 假冒帳號, 或合約
await testClient.impersonateAccount({
  address: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
});
// 設定金額
await testClient.setBalance({
  address: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
  value: parseEther('1'),
});

// 這裡是假冒帳號，所以可以直接取得餘額（publicClient）
// 如果你使用 testClient.getBalance，則會拋出錯誤
const balance = await await publicClient.getBalance({
  address: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
});

console.log(balance.toString());

// 設定地址的 bytecode 這在前面 Day 8 -Transaction(1) 有提到可以回去看
// 但不會去改這個...
await testClient.setCode({
  address: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
  bytecode:
    '0x60806040526000600355600019600955600c80546001600160a01b031916737a250d5630b4cf539739df...',
});

// https://zh.m.wikipedia.org/zh-tw/Nonce
// 這部分我研究沒有很深，不過大概知道是用來防止重複交易的
// 設定順序
await testClient.setNonce({
  address: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
  nonce: 420,
});

// 設定 storage
await testClient.setStorageAt({
  address: '0xe846c6fcf817734ca4527b28ccb4aea2b6663c79',
  index: 2,
  value: '0x0000000000000000000000000000000000000000000000000000000000000069',
});

// 停止假冒帳號
await testClient.stopImpersonatingAccount({
  address: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
});