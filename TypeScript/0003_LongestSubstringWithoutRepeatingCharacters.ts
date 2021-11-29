/*
3. Longest Substring Without Repeating Characters
Given a string s, find the length of the longest substring without repeating characters.


Example 1:
    Input: s = "abcabcbb"
    Output: 3
    Explanation: The answer is "abc", with the length of 3.

Example 2:
    Input: s = "bbbbb"
    Output: 1
    Explanation: The answer is "b", with the length of 1.

Example 3:
    Input: s = "pwwkew"
    Output: 3
    Explanation: The answer is "wke", with the length of 3.
    Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

Example 4:
    Input: s = ""
    Output: 0
 

Constraints:
    0 <= s.length <= 5 * 104
    s consists of English letters, digits, symbols and spaces.
*/

// Hanxin Lou - 2021/11/29 - 96 ms & 42.5 MB

// 滑动窗口
function lengthOfLongestSubstring(s: string): number {
    let left: number = 0,
        right: number = 0;
    let result: number = 0;
    let set: Set<string> = new Set();
    while (right < s.length) {
        const current: string = s[right];
        if (set.has(current)) {
            while (set.has(current)) {
                set.delete(s[left]);
                left++;
            }
        }
        set.add(current);
        right++;
        result = Math.max(result, right - left);
    }
    return result;
}