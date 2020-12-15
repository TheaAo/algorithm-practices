/**
 * 剑指 Offer 11. 旋转数组的最小数字
 * 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。
 * 输入一个递增排序的数组的一个旋转，输出旋转数组的最小元素。
 * 例如，数组 [3,4,5,1,2] 为 [1,2,3,4,5] 的一个旋转，该数组的最小值为1。  
 * 
 * @param {number[]} numbers
 * @return {number}
 */

/** 二分法 */
function minArray(numbers) {
  let start = 0, end = numbers.length - 1;
  while (end > start) {
    let pivot = Math.floor((start + end) / 2);
    if (numbers[pivot] > numbers[end]) {
      start = pivot + 1;
    } else if (numbers[pivot] < numbers[end]) {
      end = pivot;
    } else {
      end -= 1;
    }
  }

  return numbers[start];
}

/** 不知道什么法 */
function minArray(numbers) {
  let min = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] < numbers[i -1]) {
      min = numbers[i];
      break;
    }
  }
  return min;
}