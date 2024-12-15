---
title: "15. 3Sum"
summary: "How to solve the three sum leetcode problem using two-pointer approach in python"
date: "15 December 2024"
lastmod: "15 December 2024"
author: "Eric Daniels"
tags: ["leetcode", "python", "hashmap", "array"]
draft: false
---

<a target="_blank" href="https://leetcode.com/problems/3sum/">Link to the problem</a>

# Description

Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.

Notice that the solution set must not contain duplicate triplets.

Example 1:

```python
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation:
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.
```

Example 2:

```python
Input: nums = [0,1,1]
Output: []
Explanation: The only possible triplet does not sum up to 0.
```

Example 3:

```python
Input: nums = [0,0,0]
Output: [[0,0,0]]
Explanation: The only possible triplet sums up to 0.
```

**Constraints:**

# Solution

## Video Explanation

[![Video Title](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID)

## Time & Space Complexity

With this approach, we can solve the problem in O(n^2) time complexity and O(1) space complexity, where `n` is the length of the input array `nums`.

## Approach

### Brute Force Approach

We can solve this problem using the brute force approach, where we use a triple nested loop to calculate the sum of each triplet and return the triplets that sum up to zero. However, this approach has a time complexity of O(n^3), which is not efficient.

### Hashmap Approach

Another approach is to use a hashmap to store the frequency of each element in the input array. We can then iterate through the array and for each element, we can calculate the target sum and check if the target sum exists in the hashmap. This approach has a time complexity of O(n^2) and a space complexity of O(n).

### Two-Pointer Approach (Most optimal)

If we have completed previously [167. Two Sum II](https://ericdaniels.dev/blog/two-sum-ii) problem, we can the same the two-pointer approach to solve this problem. We shall:
- Sort the input array and iterate through the array.
- For each element `a`, we can use two pointers `left` and `right` to find the other two elements that sum up to zero. 
- After looking for all of our `left` and `right` combinations, we can move the `a` pointer to the next element and repeat the process.

We would want `a` to start at the first item, `left` to start at the next item, and `right` to start at the last item. We can then calculate the sum of the three elements and check if the sum is greater than, less than, or equal to zero.

There can also be duplicates in the input array, so we need to skip the duplicates to avoid duplicate triplets.
- If the element `a` is greater than zero, and the item in `a - 1` is the same as `a`, we can skip the current iteration. 

We also need to remember to:
- `left + 1` if a solution is found.
- Check that `left - 1` is not the same as `left` to avoid duplicates.

This approach has a time complexity of O(n^2) and a space complexity of O(1).

## Code

```python
class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        res = []
        nums.sort()

        for i, a in enumerate(nums):
            if a > 0:
                break

            if i > 0 and a == nums[i - 1]:
                continue

            l, r = i + 1, len(nums) - 1
            while l < r:
                threeSum = a + nums[l] + nums[r]
                if threeSum > 0:
                    r -= 1
                elif threeSum < 0:
                    l += 1
                else:
                    res.append([a, nums[l], nums[r]])
                    l += 1
                    r -= 1
                    while nums[l] == nums[l - 1] and l < r:
                        l += 1

        return res
```
