/**
 * 剑指 offer 03.数组中重复的数字
 * 在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。
 * 数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。
 * @param {number[]}
 * @return {number}
 */

function findRepeatNumber1(numbers) {
  const counter = [];

  for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];
    if (counter[num] === undefined) {
      counter[num] = 1
    } else {
      return num;
    }
  }
}

function findRepeatNumber2(numbers) {
  const set = new Set();
  
  for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];
    if (set.has(num)) {
      return num;
    } else {
      set.add(num);
    }
  }
}


const arr1 = [2, 3, 1, 0, 2, 5, 3];

console.log(findRepeatNumber1(arr1), findRepeatNumber2(arr1));
