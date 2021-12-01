/*
4. Median of Two Sorted Arrays
Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).

 
Example 1:
    Input: nums1 = [1,3], nums2 = [2]
    Output: 2.00000
    Explanation: merged array = [1,2,3] and median is 2.

Example 2:
    Input: nums1 = [1,2], nums2 = [3,4]
    Output: 2.50000
    Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.

Example 3:
    Input: nums1 = [0,0], nums2 = [0,0]
    Output: 0.00000

Example 4:
    Input: nums1 = [], nums2 = [1]
    Output: 1.00000

Example 5:
    Input: nums1 = [2], nums2 = []
    Output: 2.00000
 

Constraints:
    nums1.length == m
    nums2.length == n
    0 <= m <= 1000
    0 <= n <= 1000
    1 <= m + n <= 2000
    -106 <= nums1[i], nums2[i] <= 106
*/

// Hanxin Lou - 2021/11/30-2021/12/01

// 解1：暴力sort - 144 ms & 44.4 MB
// 时间复杂度 O((m+n)log(m+n)) 不符合要求
function findMedianSortedArrays1(nums1: number[], nums2: number[]): number {
    nums2.push(...nums1);
    nums2.sort((a, b) => {
        return a - b;
    });
    const l2 = nums2.length;
    if (nums2.length % 2 === 0) {
        return (nums2[l2 / 2 - 1] + nums2[l2 / 2]) / 2;
    } else {
        return nums2[Math.floor(l2 / 2)];
    }
}

// 解2：二分查找+递归 -116 ms & 44.2 MB
// 时间复杂度 O(log(m+n)) 符合要求
function findMedianSortedArrays2(nums1: number[], nums2: number[]): number {
    const l1: number = nums1.length,
        l2: number = nums2.length;
    if ((l1 + l2) % 2 === 0) {
        return (
            (findKthNum(nums1, nums2, (l1 + l2) / 2) +
                findKthNum(nums1, nums2, (l1 + l2) / 2 + 1)) /
            2
        );
    } else {
        return findKthNum(nums1, nums2, (l1 + l2 + 1) / 2);
    }
}
function findKthNum(nums1: number[], nums2: number[], k: number) {
    const l1: number = nums1.length,
        l2: number = nums2.length;

    // 边界情况1：当index1越界时，直接返回nums2的第k小元素
    if (l1 === 0) return nums2[k - 1];
    // 边界情况2：当index2越界时，直接返回nums1的第k小元素
    if (l2 === 0) return nums1[k - 1];
    // 边界情况2：当k=1时，返回nums1第一个元素和nums2第一个元素中较小的
    if (k === 1) {
        return Math.min(nums1[0], nums2[0]);
    }

    // 正常情况：递归
    const temp = Math.floor(k / 2);
    const index1 = Math.min(temp, l1) - 1;
    const index2 = Math.min(temp, l2) - 1;
    // 比较 nums1[k/2-1]和nums1[k/2-1]
    // 若nums1[k/2-1]小，忽略nums1[0]-nums1[k/2-1]；若nums2[k/2-1]小，忽略nums2[0]-nums2[k/2-1]
    // 同时更新忽略后的数组和K用于下次迭代
    if (nums1[index1] <= nums2[index2]) {
        k = k - (index1 + 1);
        return findKthNum(nums1.slice(index1 + 1), nums2, k);
    } else {
        k = k - (index2 + 1);
        return findKthNum(nums1, nums2.slice(index2 + 1), k);
    }
}
