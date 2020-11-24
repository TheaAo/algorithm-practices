/**
 * 矩阵链相乘
 * 给出一组矩阵，相乘的顺序不一样，要进行的乘法运算总数也会有很大差异。
 * 构建一个算法，求出最少的乘法运算次数。
 * @param {Object[]} matrixs
 * @param {number} matrixs[].cols
 * @param {number} matrixs[].rows
 * @return {number}
 */
function  matrixChainOrder(matrixs) {
  if (matrixs.length < 2) {
    return 0;
  }

  const formatedMatrixs = matrixs.map(matrix => ({ ...matrix, count: 0}));

  function getMatrixChainOrder(matrixs) {
    let minCountMatrix = initMatrix(0, 0, Number.MAX_SAFE_INTEGER);
    for (let i = 0; i < matrixs.length; i++) {
      for (let j = 1; j < matrixs.length; j++) {
        if (i < j) {
          const newMatrix = checkAndMultipleMatrixs(matrixs[i], matrixs[j]);
          if (matrixs.length === 2) {
            return newMatrix;
          } else if (newMatrix.count > 0) {
            const newMatrixs = [newMatrix];
            matrixs.forEach((matrix, index) => {
              if (index !==i && index !== j) {
                newMatrixs.push(matrix);
              }
            });
            const result = getMatrixChainOrder(newMatrixs);
            if (result.count < minCountMatrix.count) {
              minCountMatrix = result;
            }
          }
        }
      }
    }
    return minCountMatrix;
  }
  return getMatrixChainOrder(formatedMatrixs).count;
}

function checkAndMultipleMatrixs(matrix1, matrix2) {
  if (matrix1.cols === matrix2.rows) {
    return multipleMatrix([matrix1, matrix2]);
  }

  if (matrix2.cols === matrix1.rows) {
    return multipleMatrix([matrix2, matrix1]);
  }

  return initMatrix(0, 0, -1);
}

function multipleMatrix(matrixs) {
  return {
    rows: matrixs[0].rows,
    cols: matrixs[1].cols,
    count: matrixs[0].count + matrixs[1].count +  matrixs[0].rows * matrixs[0].cols * matrixs[1].cols
  };
}

function initMatrix(rows, cols, count) {
  return {
    rows: rows || 0,
    cols: cols || 0,
    count: count || 0
  };
}

const matrixs = [
  { rows: 100, cols: 5},
  { rows: 5, cols: 50},
  { rows: 10, cols: 100},
  { rows: 50, cols: 1}
];

console.log(matrixChainOrder(matrixs));