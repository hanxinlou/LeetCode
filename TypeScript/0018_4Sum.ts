/*
18. 4Sum
Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:

0 <= a, b, c, d < n
a, b, c, and d are distinct.
nums[a] + nums[b] + nums[c] + nums[d] == target
You may return the answer in any order.
 

Example 1:
    Input: nums = [1,0,-1,0,-2,2], target = 0
    Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]

Example 2:
    Input: nums = [2,2,2,2,2], target = 8
    Output: [[2,2,2,2]]
 

Constraints:
    1 <= nums.length <= 200
    -109 <= nums[i] <= 109
    -109 <= target <= 109
*/

// Hanxin Lou - 2021/12/23 - 80 ms & 40.4 MB
// 排序+双指针 参考 15. 3Sum
function fourSum(nums: number[], target: number): number[][] {
    let res: number[][] = [];
    const len: number = nums.length;
    if (nums == null || len < 4) return res;
    nums.sort((a, b) => a - b);
    for (let i = 0; i < len - 3; i++) {
        // 如果当前数字开始的四数之和大于target，则四数之和一定大于target，所以结束循环
        if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) break;
        // 去重
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        // 如果当前数字+最大的三个数字还是小于target，则四数之和一定小于target，所以跳过
        if (nums[i] + nums[len - 3] + nums[len - 2] + nums[len - 1] < target)
            continue;
        for (let j = i + 1; j < len - 2; j++) {
            const twoSum: number = nums[i] + nums[j];
            // 如果当前开始的四数之和大于target，则四数之和一定大于target，所以结束循环
            if (twoSum + nums[j + 1] + nums[j + 2] > target) break;
            // 去重
            if (j > i + 1 && nums[j] == nums[j - 1]) continue;
            // 如果当前两数之和+最大的两个数字还是小于target，则四数之和一定小于target，所以跳过
            if (twoSum + nums[len - 2] + nums[len - 1] < target) continue;
            let L = j + 1;
            let R = len - 1;
            while (L < R) {
                const sum = twoSum + nums[L] + nums[R];
                if (sum === target) {
                    res.push([nums[i], nums[j], nums[L], nums[R]]);
                    // 去重
                    while (L < R && nums[L] === nums[L + 1]) L++;
                    while (L < R && nums[R] === nums[R - 1]) R--;
                    R--;
                } else if (sum < target) L++;
                else if (sum > target) R--;
            }
        }
    }
    return res;
}
