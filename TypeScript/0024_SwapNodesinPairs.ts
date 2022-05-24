/*
24. Swap Nodes in Pairs
Given a linked list, swap every two adjacent nodes and return its head. 
You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)


Example 1:
    Input: head = [1,2,3,4]
    Output: [2,1,4,3]

Example 2:
    Input: head = []
    Output: []

Example 3:
    Input: head = [1]
    Output: [1]
 

Constraints:
    The number of nodes in the list is in the range [0, 100].
    0 <= Node.val <= 100
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

// Hanxin Lou - 2022/3/30

// 解1：迭代 - 72 ms & 43.8 MB
function swapPairs1(head: ListNode | null): ListNode | null {
    const pre = new ListNode(0, head);
    let current = pre;
    while (current.next != null && current.next.next != null) {
        const first = current.next;
        const second = first.next;
        current.next = second;
        first.next = second.next;
        second.next = first;
        current = first;
    }
    return pre.next;
};

// 解2：递归 - 68 ms & 43.6 MB
function swapPairs2(head: ListNode | null): ListNode | null {
    // 边接条件：头节点为null || 下一节点为null
    if (head == null || head.next == null) {
        return head;
    }
    // 交换
    const next = head.next;
    head.next = swapPairs2(next.next);
    next.next = head;
    return next;
};