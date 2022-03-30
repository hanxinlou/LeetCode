/*
20. Valid Parentheses
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
 

Example 1:
    Input: s = "()"
    Output: true

Example 2:
    Input: s = "()[]{}"
    Output: true

Example 3:
    Input: s = "(]"
    Output: false
 

Constraints:

1 <= s.length <= 104
s consists of parentheses only '()[]{}'.
*/

// Hanxin Lou - 2022/3/14 - 56 ms & 43.8 MB
// 栈匹配
function isValid(s: string): boolean {
    let stack = [];
    const sigleBrackets = ['(', '{', '[']
    const doubleBrackets = ['()', '{}', '[]']
    for (let symbol of s) {
        if (sigleBrackets.includes(symbol)) {
            stack.unshift(symbol); // Array.prototype.unshift() 将一个或多个元素添加到数组的头部，并返回该数组的新长度
        } else if (doubleBrackets.includes(stack[0] + symbol)) {
            stack.shift(); // Array.prototype.shift() 从数组中删除第一个元素，并返回该元素的值
        } else {
            return false;
        }
    }
    return stack.length == 0;
};