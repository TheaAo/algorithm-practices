/**
 * 剑指 Offer 10- I. 斐波那契数列
 * 写一个函数，输入 n ，求斐波那契（Fibonacci）数列的第 n 项。斐波那契数列的定义如下：
 * F(0) = 0,   F(1) = 1
 * F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
 * 答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。
 * 
 * @param {number} n
 * @return {number}
 */
function fib(n) {
  if (n < 0) {
    return null
  }
  const fibCache = [0, 1];
  for (let i = 2; i <= n; i++) {
    fibCache[i] = fibCache[i - 1] + fibCache[i - 2];
    if (fibCache[i] > 1000000007) {
      fibCache[i] = fibCache[i] % 1000000007;
    }
  }
  return fibCache[n];
}

console.log(fib(81));
