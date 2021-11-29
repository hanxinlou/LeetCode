/*
2. Add Two Numbers
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.


Example 1:
    Input: l1 = [2,4,3], l2 = [5,6,4]
    Output: [7,0,8]
    Explanation: 342 + 465 = 807.

Example 2:
    Input: l1 = [0], l2 = [0]
    Output: [0]

Example 3:
    Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
    Output: [8,9,9,9,0,0,0,1]


Constraints:
    The number of nodes in each linked list is in the range [1, 100].
    0 <= Node.val <= 9
    It is guaranteed that the list represents a number that does not have leading zeros.
*/

//  Definition for singly-linked list.
class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

// Hanxin Lou - 2021/11/29

// 解1：模拟相加 - 128 ms & 43.5 MB
function addTwoNumbers1(
    l1: ListNode | null,
    l2: ListNode | null
): ListNode | null {
    let head: ListNode = null,
        tail: ListNode = null;
    let addOne: number = 0;
    while (l1 || l2) {
        let sum: number = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + addOne;
        addOne = Math.floor(sum / 10);
        if (!head) {
            head = tail = new ListNode(sum % 10);
        } else {
            tail.next = new ListNode(sum % 10);
            tail = tail.next;
        }
        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }
    if (addOne > 0) {
        tail.next = new ListNode(addOne);
    }
    return head;
}

// 解2：递归 - 124 ms & 43.4 MB
function addTwoNumbers2(
    l1: ListNode | null,
    l2: ListNode | null
): ListNode | null {
    return recur(l1, l2, 0);
}

function recur(l1: ListNode | null, l2: ListNode | null, addOne: number) {
    if (l1 === null && l2 === null && addOne === 0) return null;
    let sum: number = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + addOne;
    addOne = Math.floor(sum / 10);
    let res: ListNode = new ListNode(sum % 10);
    let next: ListNode = recur(l1 ? l1.next : l1, l2 ? l2.next : l2, addOne);
    res.next = next;
    return res;
}
