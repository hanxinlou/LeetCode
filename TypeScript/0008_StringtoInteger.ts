/*
8. String to Integer (atoi)
Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer (similar to C/C++'s atoi function).

The algorithm for myAtoi(string s) is as follows:

Read in and ignore any leading whitespace.
Check if the next character (if not already at the end of the string) is '-' or '+'. Read this character in if it is either. This determines if the final result is negative or positive respectively. Assume the result is positive if neither is present.
Read in next the characters until the next non-digit character or the end of the input is reached. The rest of the string is ignored.
Convert these digits into an integer (i.e. "123" -> 123, "0032" -> 32). If no digits were read, then the integer is 0. Change the sign as necessary (from step 2).
If the integer is out of the 32-bit signed integer range [-231, 231 - 1], then clamp the integer so that it remains in the range. Specifically, integers less than -231 should be clamped to -231, and integers greater than 231 - 1 should be clamped to 231 - 1.
Return the integer as the final result.
Note:

Only the space character ' ' is considered a whitespace character.
Do not ignore any characters other than the leading whitespace or the rest of the string after the digits.
 

Example 1:
    Input: s = "42"
    Output: 42
    Explanation: The underlined characters are what is read in, the caret is the current reader position.
    Step 1: "42" (no characters read because there is no leading whitespace)
            ^
    Step 2: "42" (no characters read because there is neither a '-' nor '+')
            ^
    Step 3: "42" ("42" is read in)
            ^
    The parsed integer is 42.
    Since 42 is in the range [-231, 231 - 1], the final result is 42.

Example 2:
    Input: s = "   -42"
    Output: -42
    Explanation:
    Step 1: "   -42" (leading whitespace is read and ignored)
                ^
    Step 2: "   -42" ('-' is read, so the result should be negative)
                ^
    Step 3: "   -42" ("42" is read in)
                ^
    The parsed integer is -42.
    Since -42 is in the range [-231, 231 - 1], the final result is -42.

Example 3:
    Input: s = "4193 with words"
    Output: 4193
    Explanation:
    Step 1: "4193 with words" (no characters read because there is no leading whitespace)
            ^
    Step 2: "4193 with words" (no characters read because there is neither a '-' nor '+')
            ^
    Step 3: "4193 with words" ("4193" is read in; reading stops because the next character is a non-digit)
                ^
    The parsed integer is 4193.
    Since 4193 is in the range [-231, 231 - 1], the final result is 4193.

Example 4:
    Input: s = "words and 987"
    Output: 0
    Explanation:
    Step 1: "words and 987" (no characters read because there is no leading whitespace)
            ^
    Step 2: "words and 987" (no characters read because there is neither a '-' nor '+')
            ^
    Step 3: "words and 987" (reading stops immediately because there is a non-digit 'w')
            ^
    The parsed integer is 0 because no digits were read.
    Since 0 is in the range [-231, 231 - 1], the final result is 0.

Example 5:
    Input: s = "-91283472332"
    Output: -2147483648
    Explanation:
    Step 1: "-91283472332" (no characters read because there is no leading whitespace)
            ^
    Step 2: "-91283472332" ('-' is read, so the result should be negative)
            ^
    Step 3: "-91283472332" ("91283472332" is read in)
                        ^
    The parsed integer is -91283472332.
    Since -91283472332 is less than the lower bound of the range [-231, 231 - 1], the final result is clamped to -231 = -2147483648.
 

Constraints:
    0 <= s.length <= 200
    s consists of English letters (lower-case and upper-case), digits (0-9), ' ', '+', '-', and '.'.
*/

// Hanxin Lou - 2021/12/02

// 解1：黑科技 parseInt - 84 ms & 40.1 MB
function myAtoi1(s: string): number {
    const res = parseInt(s, 10);
    if (isNaN(res)) {
        return 0;
    } else if (res > Math.pow(2, 31) - 1) {
        return Math.pow(2, 31) - 1;
    } else if (res < -Math.pow(2, 31)) {
        return -Math.pow(2, 31);
    } else {
        return res;
    }
}

// 解2：自动机 - 100 ms & 43.9 MB

/*
|-----------| ''(Space) | +/-(Sign) |  Number   | Other |
|   start   |   start   |  signed   | in_number |  end  |
|  signed   |    end    |    end    | in_number |  end  |
| in_number |    end    |    end    | in_number |  end  |
|    end    |    end    |    end    |    end    |  end  |

不同的行象征不同执行阶段：
    第0行：开始转换阶段
    第1行：判断正负阶段
    第2行：生成数值阶段
    第3行：结束转换阶段

不同的列象征不同的字符类型：
    第0列：字符为空格
    第1列：字符为正、负号
    第2列：字符为字符型数值
    第3列：字符为其他形式
*/

function myAtoi2(s: string): number {
    const MAX_INT = Math.pow(2, 31) - 1
    const MIN_INT = -Math.pow(2, 31)
    const reg = new RegExp('^[0-9]*$')

    // 自动机类
    class Automaton {
        state: string;
        sign: number;
        answer: number;
        map: Map<string, string[]>;
        
        constructor() {
            // 执行阶段，默认处于开始执行阶段
            this.state = "start";
            // 正负符号，默认是正数
            this.sign = 1;
            // 数值，默认是0
            this.answer = 0;
            // [执行阶段, [空格, 正负, 数值, 其他]]
            this.map = new Map([
                ["start", ["start", "signed", "in_number", "end"]],
                ["signed", ["end", "end", "in_number", "end"]],
                ["in_number", ["end", "end", "in_number", "end"]],
                ["end", ["end", "end", "end", "end"]],
            ]);
        }

        // 获取状态的索引
        getIndex(char:string) {
            if (char === " ") {
                return 0;
            } else if (char === "-" || char === "+") {
                return 1;
            } else if (reg.test(char)) {
                return 2;
            } else {
                return 3;
            }
        }
        get(char:any) {
            this.state = this.map.get(this.state)[this.getIndex(char)];
            
            if (this.state === "in_number") {
                this.answer = this.answer * 10 + (char - 0);
                this.answer =
                    this.sign === 1
                        ? Math.min(this.answer, MAX_INT)
                        : Math.min(this.answer, -MIN_INT);
            } else if (this.state === "signed") {
                this.sign = char === "+" ? 1 : -1;
            }
        }
    }

    // 生成自动机实例
    let automaton = new Automaton();

    // 遍历每个字符
    for (let char of s) {
        automaton.get(char);
    }

    // 返回值，整数 = 正负 * 数值
    return automaton.sign * automaton.answer;
}