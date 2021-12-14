/*
16. 3Sum Closest
Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target.

Return the sum of the three integers.

You may assume that each input would have exactly one solution.

 
Example 1:
    Input: nums = [-1,2,1,-4], target = 1
    Output: 2
    Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).

Example 2:
    Input: nums = [0,0,0], target = 1
    Output: 0
 

Constraints:
    3 <= nums.length <= 1000
    -1000 <= nums[i] <= 1000
    -104 <= target <= 104
*/

// Hanxin Lou - 2021/12/14 - 88 ms & 39.7 MB
// 排序+双指针，参考 15. 3Sum
function threeSumClosest(nums: number[], target: number): number {
    nums.sort((a, b) => a - b);
    let res: number = nums[0] + nums[1] + nums[2];
    const len: number = nums.length;
    for (let i = 0; i < len; i++) {
        let L = i + 1;
        let R = len - 1;
        while (L < R) {
            const sum = nums[L] + nums[R] + nums[i];
            // 比较绝对值
            if (Math.abs(target - sum) < Math.abs(target - res)) {
                res = sum;
            }
            if (sum > target) R--;
            else if (sum < target) L++;
            else return res;
        }
    }
    return res;
}