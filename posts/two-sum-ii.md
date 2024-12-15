---
title: "167. Two Sum II"
summary: "How to solve two sum II leetcode problem using two pointers in python"
date: "14 December 2024"
lastmod: "14 December 2024"
author: "Eric Daniels"
tags: ["leetcode", "python", "hashmap", "array"]
draft: false
---

<a target="_blank" href="https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description//">Link to the problem</a>

# Description

Given a 1-indexed array of integers `numbers` that is already **sorted in non-decreasing order**, find two numbers such that they add up to a specific `target` number. Let these two numbers be numbers `[index1]` and numbers `[index2]` where `1 <= index1 < index2 <= numbers.length`.

Return the indices of the two numbers, `index1` and `index2`, added by one as an integer array `[index1, index2]` of length 2.

The tests are generated such that there is exactly one solution. You may not use the same element twice.

Your solution must use only constant extra space.

Example 1:

```python
Input: numbers = [2,7,11,15], target = 9
Output: [1,2]
Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].
```

Example 2:

```python
Input: numbers = [2,3,4], target = 6
Output: [1,3]
Explanation: The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3].
```

Example 3:

```python
Input: numbers = [-1,0], target = -1
Output: [1,2]
Explanation: The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].
```

**Constraints:**

- `2 <= numbers.length <= 3 \* 104`
- `-1000 <= numbers[i] <= 1000`
- `numbers is sorted in non-decreasing order.`
- `-1000 <= target <= 1000`
- The tests are generated such that there is exactly one solution.

# Solution

## Video Explanation

[![Video Title](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID)

## Time & Space Complexity

With this approach, we can solve the problem in O(n) time complexity and O(1) space complexity,
where `n` is the length of the input array `numbers`.

## Approach

The first approach that comes to mind is probably the brute force approach, where we can iterate the array and check if the sum of the current element and any other element in the array is equal to the target. This approach has a time complexity of `O(n^2)` and a space complexity of `O(1)`.

If you notice, the array is already sorted, so we can take advantage of this fact and use a two-pointer approach.

We can start with two pointers, one at the beginning of the array and the other at the end of the array. We can then check the sum of the two elements at the pointers.

- If the sum is greater than the target `nums[0] + nums[n-1] > target`, we can move the right pointer to the left.
- If the sum is less than the target `nums[0] + nums[n - 1] < target`, we can move the left pointer to the right.
- If the sum is equal to the target, we can return the indices of the two elements.

Remember that the array is 1-indexed, so we need to return the indices added by one `[l + 1, r + 1]`.

## Code

```python
class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        l, r = 0, len(numbers) - 1

        while l < r:
            curSum = numbers[l] + numbers[r]

            if curSum > target:
                r -= 1
            elif curSum < target:
                l += 1
            else:
                return [l + 1, r + 1]
        return []
```
