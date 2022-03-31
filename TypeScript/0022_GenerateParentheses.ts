/*
22. Generate Parentheses
Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

 

Example 1:
    Input: n = 3
    Output: ["((()))","(()())","(())()","()(())","()()()"]
    
Example 2:
    Input: n = 1
    Output: ["()"]
 

Constraints:
    1 <= n <= 8
*/

// Hanxin Lou - 2022/3/25 - 60 ms & 43.8 MB
// 回溯(DFS)+充分剪枝
function generateParenthesis(n: number): string[] {
    const res: string[] = [];
    const dfs = (leftNum: number, rightNum: number, genStr: string) => {
        // 左右括号剩余数都为 0 结束递归
        if (leftNum === 0 && rightNum === 0) {
            res.push(genStr);
            return;
        }
        // 左括号剩余时选择左括号
        if (leftNum > 0) {
            dfs(leftNum - 1, rightNum, genStr + "(");
        }
        // 左括号剩余数小于右括号剩余数可选择右括号（剪掉右括号比左括号多的错误情况）
        if (leftNum < rightNum) {
            dfs(leftNum, rightNum - 1, genStr + ")");
        }
    };
    dfs(n, n, "");
    return res;
};