/*
You are given a string s consisting only of characters 'a' and 'b'​​​​.

You can delete any number of characters in s to make s balanced. s is balanced if there is no pair of indices (i,j) such that i < j and s[i] = 'b' and s[j]= 'a'.

Return the minimum number of deletions needed to make s balanced.

 
Example 1:
    Input: s = "aababbab"
    Output: 2
    Explanation: You can either:
    Delete the characters at 0-indexed positions 2 and 6 ("aababbab" -> "aaabbb"), or
    Delete the characters at 0-indexed positions 3 and 6 ("aababbab" -> "aabbbb").

Example 2:
    Input: s = "bbaaaaabb"
    Output: 2
    Explanation: The only solution is to delete the first two characters.
 
Constraints:
    1 <= s.length <= 105
    s[i] is 'a' or 'b'​​.

*/

// Hanxin Lou - 2023/3/6

// 解1：前后缀分解 - 164 ms & 53.3 MB
function minimumDeletions1(s: string): number {
    let tmp:number = s.split('a').length - 1
    let res:number = tmp;
    for (let item of s) {
        if (item === 'a') {
            tmp -- 
        } else {
            tmp ++ 
        }
        res = Math.min(tmp, res)
    }
    return res
};

// 解2：动态规划 - 108 ms & 50 MB
// 考虑 最后一个 字母
// - 如果是 b, 则无需删除, 问题规模缩小, 变成 使 s 的前 n-1 个字母平衡的最少删除次数: f(i) = f(i-1)
// - 如果是 a: f(i) = min(f(i-1) + 1, countB)
//  - 删除 a, 则结果为 使 s 的前 n-1 个字母平衡的最少删除次数 + 1
//  - 保留 a, 则结果为 前面所有 b 的个数(需要删除)
function minimumDeletions2(s: string): number {
    let res: number = 0, countB: number = 0
    for (let item of s) {
        if (item === 'b') {
            countB ++
        } else {
            res = Math.min(res + 1, countB)
        }
    }
    return res
};