/*
5. Longest Palindromic Substring
Given a string s, return the longest palindromic substring in s.
 

Example 1:
    Input: s = "babad"
    Output: "bab"
    Note: "aba" is also a valid answer.

Example 2:
    Input: s = "cbbd"
    Output: "bb"

Example 3:
    Input: s = "a"
    Output: "a"

Example 4:
    Input: s = "ac"
    Output: "a"
 

Constraints:
    1 <= s.length <= 1000
    s consist of only digits and English letters.
*/

// Hanxin Lou - 2021/11/30-2021/12/01

// 解1：中心扩散 - 112 ms & 41 MB - 时间复杂度：O(n^2) 空间复杂度：O(1)
function longestPalindrome1(s: string): string {
    let res: string = "";
    for (let i = 0; i < s.length; i++) {
        // 回文中心为一个数 i
        const s1: string = findPalindrome(s, i, i);
        // 回文中心为两个数 i, i + 1
        const s2: string = findPalindrome(s, i, i + 1);

        const temp: string = s1.length >= s2.length ? s1 : s2;
        res = res.length >= temp.length ? res : temp;
    }
    return res;
}
// 查找以left和right为起点向两边扩散的最长回文子串
function findPalindrome(s: string, left: number, right: number): string {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
        left--;
        right++;
    }
    return s.substring(left + 1, right);
}

// TODO
// 解2：动态规划 - 1048 ms & 67.4 MB - 时间复杂度：O(n^2) 空间复杂度：O(n^2)
function longestPalindrome2(s: string): string {
    let sL = s.length;
    let res = "";
    // dp[i][j]表示子串i～j是否是回文子串，初始化为 false
    let dp = Array.from(new Array(sL), () => new Array(sL).fill(false));
    for (let i = sL - 1; i >= 0; i--) {
        //循环字符串
        for (let j = i; j < sL; j++) {
            // 如果不想等说明i-j非回文子串
            // 如果相等且为相邻字符则为回文子串
            // 如果相等但不为相邻字符则由dp[i + 1][j - 1]决定是否为回文子串
            if (s[i] != s[j]) {
                dp[i][j] = false;
            } else {
                if (j - i < 2) {
                    dp[i][j] = true;
                } else {
                    dp[i][j] = dp[i + 1][j - 1];
                }
            }
            // 当前回文子串比之前的大，更新最大长度
            if (dp[i][j] && j - i + 1 > res.length) {
                res = s.substring(i, j + 1);
            }
        }
    }
    return res;
}
