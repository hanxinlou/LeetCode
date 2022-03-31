/*
21. Merge Two Sorted Lists
You are given the heads of two sorted linked lists list1 and list2.
Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.
Return the head of the merged linked list.

 

Example 1:
    Input: list1 = [1,2,4], list2 = [1,3,4]
    Output: [1,1,2,3,4,4]

Example 2:
    Input: list1 = [], list2 = []
    Output: []

Example 3:
    Input: list1 = [], list2 = [0]
    Output: [0]
 

Constraints:
    The number of nodes in both lists is in the range [0, 50].
    -100 <= Node.val <= 100
    Both list1 and list2 are sorted in non-decreasing order.
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

// Hanxin Lou - 2022/3/17

// 解1：迭代 - 76 ms & 44 MB
function mergeTwoLists1(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    const head = new ListNode(0);
    let pre = head;
    while (list1 != null && list2 != null) {
        if (list1.val <= list2.val) {
            pre.next = list1;
            list1 = list1.next;
        } else {
            pre.next = list2;
            list2 = list2.next;
        }
        pre = pre.next;
    }
    pre.next = list1 === null ? list2 : list1;
    return head.next;
};

// 解2：递归 - 60 ms & 44 MB
function mergeTwoLists2(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    // 终止条件：list1为空或list2为空
    if(list1 === null){
        return list2;
    }
    if(list2 === null){
        return list1;
    }
    if(list1.val < list2.val){
        list1.next = mergeTwoLists2(list1.next, list2);
        return list1;
    }else{
        list2.next = mergeTwoLists2(list1, list2.next);
        return list2;
    }
};