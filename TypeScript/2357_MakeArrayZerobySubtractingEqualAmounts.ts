/*
You are given a non-negative integer array nums. In one operation, you must:
    Choose a positive integer x such that x is less than or equal to the smallest non-zero element in nums.
    Subtract x from every positive element in nums.
    Return the minimum number of operations to make every element in nums equal to 0.

 

Example 1:
    Input: nums = [1,5,0,3,5]
    Output: 3
    Explanation:
        In the first operation, choose x = 1. Now, nums = [0,4,0,2,4].
        In the second operation, choose x = 2. Now, nums = [0,2,0,0,2].
        In the third operation, choose x = 2. Now, nums = [0,0,0,0,0].

Example 2:
    Input: nums = [0]
    Output: 0
    Explanation: 
        Each element in nums is already 0 so no operations are needed.
 

Constraints:
    1 <= nums.length <= 100
    0 <= nums[i] <= 100
*/

// Hanxin Lou - 2023/2/24

// 解1：贪心+模拟 - 72 ms & 45.9 MB
function minimumOperations1(nums: number[]): number {
  let tmp: number[] = nums;
  let count: number = 0;
  while (true) {
    tmp = tmp.filter((num) => num !== 0).sort();
    if (tmp.length === 0) break;
    const min: number = tmp[0];
    tmp = tmp.map((num) => {
      return num - min;
    });
    count++;
  }
  return count;
}

// 解2：哈希集合 - 72 ms & 45.9 MB
function minimumOperations2(nums: number[]): number {
    const numsSet = new Set(nums)
    numsSet.delete(0)
    return numsSet.size
};
