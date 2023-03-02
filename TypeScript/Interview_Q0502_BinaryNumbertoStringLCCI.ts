/*
Given a real number between 0 and 1 (e.g., 0.72) that is passed in as a double, print the binary representation. If the number cannot be represented accurately in binary with at most 32 characters, print "ERROR".

Example1:
    Input: 0.625
    Output: "0.101"

Example2:
    Input: 0.1
    Output: "ERROR"
    Note: 0.1 cannot be represented accurately in binary.

Note:
    This two charaters "0." should be counted into 32 characters.
    The number of decimal places for num is at most 6 digits
*/

// Hanxin Lou - 2023/3/1 - 56 ms & 42.4 MB

function printBin(num: number): string {
    let tmp: number = num
    let res: string = '0.'
    let aSet = new Set()
    while (tmp > 0) {
        tmp = tmp * 2
        if (tmp >= 1) {
            res = res + '1'
            tmp = tmp - 1
        } else {
            res = res + '0'
        }
        if (aSet.has(tmp)) {
            res = 'ERROR'
            break
        } else {
            aSet.add(tmp)
        }
    }
    return aSet.size > 32 ? 'ERROR' : res
};
