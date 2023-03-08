/*
Each square of an m*n board contains a gift, each of which has a certain value (value greater than 0). 
You can take a gift from the top left corner of the board, and move one square at a time to the right or down until you reach the bottom right corner of the board. 
Given a board and the value of the gifts on it, calculate the maximum value of gifts you can get.

Example 1:
    Input: 
        [
            [1,3,1],
            [1,5,1],
            [4,2,1]
        ]
    Output: 12
    Explanation: Path 1→3→5→2→1 can get the most value of gifts
 
Constraints:
    0 < grid.length <= 200
    0 < grid[0].length <= 200
*/

// Hanxin Lou - 2023/3/8 - 68 ms & 44 MB - DP
function maxValue(grid: number[][]): number {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (i === 0) {
                grid[i][j] = j > 0 ? grid[i][j] + grid[i][j - 1] : grid[i][j]
            } else {
                grid[i][j] = grid[i][j] + (j > 0 ? Math.max(grid[i - 1][j], grid[i][j - 1]) : grid[i - 1][j])
            }
        }
    }
    return grid[grid.length - 1][grid[grid.length - 1].length - 1]
};