/*
1. Two Sum
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.
*/

// Hanxin Lou - 2021/10/18 - 116 ms & 39.6 MB
function twoSum(nums: number[], target: number): number[] {
    const nL = nums.length;
    for (let i: number = 0; i < nL; i++) {
        let temp: number = nums.indexOf(target - nums[i], i + 1);
        if (temp !== -1) return [i, temp];
    }
    return [];
}
