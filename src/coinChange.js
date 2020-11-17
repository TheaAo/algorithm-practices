/**
 * leetcode 322. 零钱兑换
 * 给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。
 * 如果没有任何一种硬币组合能组成总金额，返回 -1。
 * 你可以认为每种硬币的数量是无限的。
 * @param {number[]} coins 
 * @param {number} amount 
 * @return {number}
 */

function coinChange(coins, amount) {
  const count = [0];
  for(let i = 1; i <= amount; i++) {
    let min;
    coins.forEach(coin => {
      const newAmount = i - coin;
      if (newAmount >=0) {
        const newMin = count[newAmount];
        if(newMin > -1 && (!min || newMin < min - 1 )) {
          min = newMin + 1
        }
      }
    })
    count[i] = min || -1
  }
  return count[amount];
}