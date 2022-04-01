/* 
23. Merge k Sorted Lists
You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.
Merge all the linked-lists into one sorted linked-list and return it.
 

Example 1:
    Input: lists = [[1,4,5],[1,3,4],[2,6]]
    Output: [1,1,2,3,4,4,5,6]
    Explanation: The linked-lists are:
    [
    1->4->5,
    1->3->4,
    2->6
    ]
    merging them into one sorted list:
    1->1->2->3->4->4->5->6

Example 2:
    Input: lists = []
    Output: []

Example 3:
    Input: lists = [[]]
    Output: []
 

Constraints:
    k == lists.length
    0 <= k <= 104
    0 <= lists[i].length <= 500
    -104 <= lists[i][j] <= 104
    lists[i] is sorted in ascending order.
    The sum of lists[i].length will not exceed 104.
*/

// Definition for singly-linked list.
class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}

// Hanxin Lou - 2022/3/29
// 递归合并两个有序列表，参考 21
function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    if (list1 === null) {
        return list2;
    }
    if (list2 === null) {
        return list1;
    }
    if (list1.val < list2.val) {
        list1.next = mergeTwoLists(list1.next, list2);
        return list1;
    } else {
        list2.next = mergeTwoLists(list1, list2.next);
        return list2;
    }
};
// 解1：顺序合并 - 388 ms & 47.2 MB
function mergeKLists1(lists: Array<ListNode | null>): ListNode | null {
    let res = null
    for (let node of lists) {
        res = mergeTwoLists(res, node)
    }
    return res
};

// 解2：分治合并 - 80 ms & 47 MB
function merge(lists: Array<ListNode | null>, left: number, right: number): ListNode | null {
    if (left === right) {
        return lists[left]
    }
    if (left > right) {
        return null
    }
    const mid = left + Math.floor((right - left)/2)
    return mergeTwoLists(merge(lists, left, mid), merge(lists, mid + 1, right))
}
function mergeKLists2(lists: Array<ListNode | null>): ListNode | null {
    return merge(lists, 0, lists.length - 1)
};