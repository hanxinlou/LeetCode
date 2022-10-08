/*
Implement strStr().
Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

Clarification:
    What should we return when needle is an empty string? This is a great question to ask during an interview.
    For the purpose of this problem, we will return 0 when needle is an empty string. This is consistent to C's strstr() and Java's indexOf().

 

Example 1:
    Input: haystack = "hello", needle = "ll"
    Output: 2

Example 2:
    Input: haystack = "aaaaa", needle = "bba"
    Output: -1
 

Constraints:
    1 <= haystack.length, needle.length <= 104
    haystack and needle consist of only lowercase English characters.
*/

// Hanxin Lou - 2022/5/26

// 解1：暴力循环匹配 - 60 ms & 42.1 MB
function strStr1(haystack: string, needle: string): number {
    const nL = needle.length;
    if (nL === 0) return 0;
    const hL = haystack.length;
    for (let i = 0; i < hL - nL; i++) {
        let m = i, n = 0;
        while(n<nL && haystack[m] === needle[n]) {
            m++;
            n++;
        }
        if(n == nL) return i;
    }
    return -1;
};