/*
19. Remove Nth Node From End of List
Given the head of a linked list, remove the nth node from the end of the list and return its head.

Example 1:
    Input: head = [1,2,3,4,5], n = 2
    Output: [1,2,3,5]

Example 2:
    Input: head = [1], n = 1
    Output: []

Example 3:
    Input: head = [1,2], n = 1
    Output: [1]
 

Constraints:
    The number of nodes in the list is sz.
    1 <= sz <= 30
    0 <= Node.val <= 100
    1 <= n <= sz
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

// Hanxin Lou - 2022/3/14 - 80 ms & 43.9 MB
// 前后指针思想
// 让前面的指针先移动 n 步，之后前后指针共同移动直到前面的指针到尾部为止
// 需考虑头节点被删除的情况，所以使用预先指针 pre，其 next 指向 head


function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    const pre: ListNode = new ListNode(0, head)
    let start: ListNode = pre, end: ListNode = pre
    while (n !== 0) {
        start = start.next
        n--
    }
    while (start.next !== null) {
        start = start.next
        end = end.next
    }
    end.next = end.next.next
    return pre.next
};