/**
 * 0-1 背包问题
 * 给定一个固定大小、能够携重量 W 的背包，以及一组有价值和重量的物品.
 * 找出一个最佳解决方案，使得装入背包的物品总重量不超过 W，且总价值最大。
 * 
 * tips: 
 *   Array.fill(param) 如果传入的参数是对象类型（包括对象字面量），那么数组所有元素是同一个对象引用
 * 
 * @param {number} capacity 总重量
 * @param {Object[]} objects 物品
 * @param {number} objects[].value 物品价值
 * @param {number} objects[].weight 物品重量
 * @return {Object}
 */
function knapsack(capacity, objects) {
  if (capacity < 0) {
    return -1;
  }

  if (capacity === 0) {
    return createSolution([]);
  }

  const solutions = Array.from(Array(objects.length), () => createSolution([]));

  for (let i = objects.length - 1; i >= 0; i--) {
    for (let c = 0; c <= capacity; c++) {
      const remainingCapacity = c - objects[i].weight;
      const knapsackNotFull = remainingCapacity >= 0;

      if (c === 0 || i === objects.length - 1) {
        solutions[i][c] = knapsackNotFull ? createSolution([objects[i]]) : createSolution([]);
      } else if (knapsackNotFull) {
        const shouldCollect = solutions[i + 1][remainingCapacity].totalValue + objects[i].value > solutions[i + 1][c].totalValue;
        solutions[i][c] = shouldCollect ? collectSolution(objects[i], solutions[i + 1][remainingCapacity]) : solutions[i + 1][c];
      } else {
        solutions[i][c] = solutions[i + 1][c];
      }
    }
  }
  return solutions[0][capacity];
}

function createSolution(objects) {
  return {
    solution: objects,
    totalValue: objects.reduce((prev, curr) => prev + curr.value, 0)
  };
}

function collectSolution(object, collection) {
  return {
    solution: [object, ...collection.solution],
    totalValue: object.value + collection.totalValue
  }
}
const objects = [{value: 3, weight: 2}, {value: 4, weight: 3}, {value: 5, weight: 4}];
const capacity = 4;
console.log(knapsack(capacity, objects));
