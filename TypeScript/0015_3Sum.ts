/*
15. 3Sum
Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.


Example 1:
    Input: nums = [-1,0,1,2,-1,-4]
    Output: [[-1,-1,2],[-1,0,1]]

Example 2:
    Input: nums = []
    Output: []

Example 3:
    Input: nums = [0]
    Output: []
 

Constraints:
    0 <= nums.length <= 3000
    -105 <= nums[i] <= 105
*/

// Hanxin Lou - 2021/12/14 - 140 ms & 48.1 MB
// 排序+双指针
function threeSum(nums: number[]): number[][] {
    let res: number[][] = [];
    const len: number = nums.length;
    if (nums == null || len < 3) return res;
    nums.sort((a, b) => a - b); 
    for (let i = 0; i < len; i++) {
        // 如果当前数字大于0，则三数之和一定大于0，所以结束循环
        if (nums[i] > 0) break;
        // 去重 
        if (i > 0 && nums[i] == nums[i - 1]) continue; 
        let L = i + 1;
        let R = len - 1;
        while (L < R) {
            const sum = nums[i] + nums[L] + nums[R];
            if (sum == 0) {
                res.push([nums[i], nums[L], nums[R]]);
                // 去重
                while (L < R && nums[L] == nums[L + 1]) L++; 
                while (L < R && nums[R] == nums[R - 1]) R--;
                L++;
                R--;
            } else if (sum < 0) L++;
            else if (sum > 0) R--;
        }
    }
    return res;
}
