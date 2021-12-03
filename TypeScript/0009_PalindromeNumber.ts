/*
9. Palindrome Number
Given an integer x, return true if x is palindrome integer.

An integer is a palindrome when it reads the same backward as forward. For example, 121 is palindrome while 123 is not.


Example 1:
  Input: x = 121
  Output: true

Example 2:
  Input: x = -121
  Output: false
  Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.

Example 3:
  Input: x = 10
  Output: false
  Explanation: Reads 01 from right to left. Therefore it is not a palindrome.

Example 4:
  Input: x = -101
  Output: false
 

Constraints:
  -231 <= x <= 231 - 1
*/


// Hanxin Lou - 2021/12/02 - 172 ms & 46.9 MB
function isPalindrome(x: number): boolean {
  // 负数、0、10的倍数不可能为回文数
  if (x < 0 || (!(x % 10) && x)) return false;

  // 翻转数字比较是否相同
  let temp:number = x, res:number = 0;
  while (temp) {
    res = res * 10 + temp % 10;
    temp = Math.floor(temp / 10);
  }
  return res === x;
};