/*
6. ZigZag Conversion
The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

P   A   H   N
A P L S I I G
Y   I   R
And then read line by line: "PAHNAPLSIIGYIR"

Write the code that will take a string and make this conversion given a number of rows:

string convert(string s, int numRows);
 

Example 1:
    Input: s = "PAYPALISHIRING", numRows = 3
    Output: "PAHNAPLSIIGYIR"

Example 2:
    Input: s = "PAYPALISHIRING", numRows = 4
    Output: "PINALSIGYAHRPI"
    Explanation:
    P     I    N
    A   L S  I G
    Y A   H R
    P     I

Example 3:
    Input: s = "A", numRows = 1
    Output: "A"
 

Constraints:
    1 <= s.length <= 1000
    s consists of English letters (lower-case and upper-case), ',' and '.'.
    1 <= numRows <= 1000
*/

// Hanxin Lou - 2021/12/1 - 112 ms & 42.4 MB
function convert(s: string, numRows: number): string {
    // numRows小于2时直接返回s
    if (numRows < 2) return s;
    let resList: string[] = new Array(numRows).fill("");
    const sL = s.length;
    let tempRow: number = 0;
    let flag: boolean = true;
    for (let i = 0; i < sL; i++) {
        resList[tempRow] = resList[tempRow] + s[i];
        flag ? tempRow++ : tempRow--;
        // 到达行数或者为0时立即反转
        flag = tempRow === numRows - 1 || tempRow === 0 ? !flag : flag;
    }
    return resList.join("");
}