/**
 * 剑指 offer 04. 二维数组的查找
 * 在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。
 * 请完成一个高效的函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
 * @param {number[][]} matrix
 * @param {number} target 
 * @return {boolean}
 */
function findNumberIn2DArray(matrix, target) {
  const rows = matrix.length;

  if (!rows) {
    return false;
  }

  const cols = matrix[0].length;
  if (!cols) {
    return false;
  }

  let i = 0, j = cols -1;
  while(i <= rows - 1 && j >= 0) {
    if (matrix[i][j] === target) {
      return true;
    } else if (matrix[i][j] > target) {
      j--;
    } else {
      i++;
    }
  }

  return false;
}

const matrix = [
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
];

console.log(findNumberIn2DArray(matrix, 5), findNumberIn2DArray(matrix, 20));