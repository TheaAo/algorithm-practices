/**
 * 0-1 背包问题
 * 给定一个固定大小、能够携重量 W 的背包，以及一组有价值和重量的物品.
 * 找出一个最佳解决方案，使得装入背包的物品总重量不超过 W，且总价值最大。
 * @param {number} capacity 总重量
 * @param {Object[]} objects 物品
 * @param {number} objects[].value 物品价值
 * @param {number} objects[].weight 物品重量
 * @return {Object[]}
 */
function knapsack(capacity, objects) {
  if (capacity < 0) {
    return -1;
  }

  if (capacity === 0) {
    return [];
  }

  const solutions = Array.from(Array(objects.length), () => []);
  const totalValues = Array.from(Array(objects.length), () => []);

  for (let i = objects.length - 1; i >= 0; i--) {
    for (let c = 0; c <= capacity; c++) {
      const remainingCapacity = c - objects[i].weight;
      const knapsackNotFull = remainingCapacity >= 0;

      if (c === 0 || i === objects.length - 1) {
        solutions[i][c] = knapsackNotFull ? [objects[i]] : [];
        totalValues[i][c] = knapsackNotFull ? objects[i].value : 0;
      } else if (knapsackNotFull) {
        const planA = [objects[i], ...solutions[i + 1][remainingCapacity]];
        const planAValue = objects[i].value + totalValues[i + 1][remainingCapacity];
        const planB = solutions[i + 1][c];
        const planBValue = totalValues[i + 1][c];
        const planABetter = planAValue > planBValue;

        solutions[i][c] = planABetter ? planA : planB;
        totalValues[i][c] = planABetter ? planAValue : planBValue;
      } else {
        solutions[i][c] = solutions[i + 1][c];
        totalValues[i][c] = totalValues[i + 1][c];
      }
    }
  }
  return solutions[0][capacity];
}

const objects = [{value: 3, weight: 2}, {value: 4, weight: 3}, {value: 5, weight: 4}];
const capacity = 6;
console.log(knapsack(capacity, objects));
