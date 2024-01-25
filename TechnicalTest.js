/*
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
- 1 <= strs.length <= 200
- 0 <= strs[i].length <= 200
- strs[i] consists of only lower-case English letters.
*/


// Time Complexity O(nlog(n))
// Space Complixity O(1)
const longestPrefix = ( strs ) => {
    strs.sort();

    for(let i = 0; i < strs[0].length; i++) {
        if(strs[0][i] !== strs[strs.length-1][i]) {
            return strs[0].substring(0,i);
        }
    }

    return strs[0];
}

const strs = ["flower", "flow", "flight"]; // expected: fl
const strs2 = ["dog", "racecar", "car"]; // expected: ""
const strs3 = ["aaaerqwewq", "aaaopeee", "aaaopeqe"]; // expected: aaa
const strs4 = ['xxxxxaaaaa', "", ""]; // expected: ""
const strs5 = [""]; // expected: ""
const strs6 = ["", "", "a"] // expected: ""
const strs7 = ["foobar", "foob", "foo", "fooq"]; // expected: foo

longestPrefix(strs)
longestPrefix(strs2)
longestPrefix(strs3)
longestPrefix(strs4)
longestPrefix(strs5)
longestPrefix(strs6)
longestPrefix(strs7)