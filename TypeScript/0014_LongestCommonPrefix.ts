/*
14. Longest Common Prefix
Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

 
Example 1:
    Input: strs = ["flower","flow","flight"]
    Output: "fl"

Example 2:
    Input: strs = ["dog","racecar","car"]
    Output: ""
    Explanation: There is no common prefix among the input strings.
 

Constraints:
    1 <= strs.length <= 200
    0 <= strs[i].length <= 200
    strs[i] consists of only lower-case English letters.
*/

// Hanxin Lou - 2021/12/7

// 解1：纵向扫描 - 80 ms & 39.6 MB
// 比较每个字符串的同一位置的字符是否相同
// 若有不同或已有字符串到末尾则结束比较返回当前的公共前缀
function longestCommonPrefix1(strs: string[]): string {
    const sL: number = strs[0].length;
    const count: number = strs.length;
    for (let i = 0; i < sL; i++) {
        const currentChar: string = strs[0][i];
        for (let j = 1; j < count; j++) {
            if (i === strs[j].length || strs[j][i] !== currentChar) {
                return strs[0].slice(0, i);
            }
        }
    }
    return strs[0];
}


// 解2：横向扫描 - 84 ms & 40.1 MB
// 依次遍历每个字符串，更新最长公共前缀
function longestCommonPrefix2(strs: string[]): string {
    let res: string = strs[0];
    for (let i = 1; i < strs.length; i++) {
        let end: number = 0;
        while (end < res.length && end < strs[i].length) {
            if (res[end] != strs[i][end]) {
                break;
            }
            end++;
        }
        res = res.slice(0, end);
        if (res === "") return res;
    }
    return res;
}
