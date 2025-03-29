---
title: "1. Two Sum"
summary: "How to solve two sum leetcode problem using hashmap in python"
date: "14 December 2024"
lastmod: "14 December 2024"
author: "Eric Daniels"
tags: ["leetcode", "python", "hashmap", "array"]
draft: true
---

<a target="_blank" href="https://leetcode.com/problems/two-sum/">Link to the problem</a>

## Description

Given an array of integers `nums` and an integer `target`, return indices of the two numbers `i` and `j` such that they add up to target, `nums[i] + nums[j] == target`, while `i != j`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Example 1:

```python
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9,
we return [0, 1].
```

Example 2:

```python
Input: nums = [3,2,4], target = 6
Output: [1,2]
```

Example 3:

```python
Input: nums = [3,3], target = 6
Output: [0,1]
```

**Constraints:**

- `2 <= nums.length <= 1000`
- `-10,000,000 <= nums[i] <= 10,000,000`
- `-10,000,000 <= target <= 10,000,000`

## Solution

### Video Explanation

[![Video Title](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID)

### Time & Space Complexity

With this approach, we can solve the problem in O(n) time complexity and O(n) space complexity,
where `n` is the length of the input array `nums`.

### Approach

The first approach that comes to mind is probably the brute force approach, where we can iterate
over the array and check if the sum of the current element and any other element in the array is
equal to the target. This approach has a time complexity of `O(n^2)` and a space complexity of `O(1)`.

A better approach is to **use a hashmap** to store the elements of the array and their indices:

- Iterate over the array and for each element.
- Check if the difference between the target and the current element is present in the hashmap.
  - If it is present, we can return the indices of the current element and the element that is the difference between the target and the current element.
  - If it is not present, we add the current element to the hashmap.

### Code

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        prevMap = {}  # val -> index

        for i, n in enumerate(nums):
            diff = target - n
            if diff in prevMap:
                return [prevMap[diff], i]
            prevMap[n] = i
```
