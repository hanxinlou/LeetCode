/*
7. Reverse Integer
Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).

 
Example 1:
    Input: x = 123
    Output: 321

Example 2:
    Input: x = -123
    Output: -321

Example 3:
    Input: x = 120
    Output: 21

Example 4:
    Input: x = 0
    Output: 0
 

Constraints:
    -231 <= x <= 231 - 1
*/

// Hanxin Lou - 2021/12/1 - 84 ms & 39.7 MB

// 数组 reverse 翻转
function reverse(x: number): number {
    let res = parseInt(x.toString().split("").reverse().join(""));
    res = x > 0 ? res : -res;
    return res > Math.pow(2, 31) - 1 || res < -Math.pow(2, 31) ? 0 : res;
}
