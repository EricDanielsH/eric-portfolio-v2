---
title: "11. Container with most water"
summary: "How to solve container with most water leetcode problem using two-pointer approach in python"
date: "15 December 2024"
lastmod: "15 December 2024"
author: "Eric Daniels"
tags: ["leetcode", "python", "hashmap", "array"]
draft: true
---

<a target="_blank" href="https://leetcode.com/problems/container-with-most-water/">Link to the problem</a>

## Description

You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `ith` line are `(i, 0)` and `(i, height[i])`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.

Example 1:
![Example 1 Image](https://s3-lc-upload.s3.amazonaws.com/uploads/2018/07/17/question_11.jpg "Example 1 Image")

```python
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented
by array [1,8,6,2,5,4,8,3,7]. In this case, the max
area of water (blue section) the container can contain
is 49.

```

Example 2:

```python
Input: height = [1,1]
Output: 1
```

**Constraints:**

- `n == height.length`
- `2 <= n <= 105`
- `0 <= height[i] <= 104`

## Solution

### Video Explanation

[![Video Title](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID)

### Time & Space Complexity

With this approach, we can solve the problem in O(n) time complexity and O(1) space complexity, where `n` is the length of the input array `height`.

### Approach

First, the first approach that comes to mind is the brute force approach, where we use a double nexsted loop to calculate the area of each container and return the maximum area. However, this approach has a time complexity of O(n^2), which is not efficient, but its a good way to get an idea on how to start the problem.

The optimal approach to solve this problem is to use the two-pointer approach.

- Use two pointers, one at the beginning of the array and the other at the end of the array.
- Calculate the area of the container using the formula `min(height[l], height[r]) * (r - l)`, where `l` is the left pointer and `r` is the right pointer.
- Move the pointer with the smaller height to the center of the array.
- Continue this process until the two pointers meet.
- Once the two pointers meet, return the maximum area.

In this problem, it is irrelevant which pointer to move if the heights are equal, so we can move either pointer. You could choose to move the pointer to the next highest height, but it doesn't matter.

### Code

```python
class Solution:
    def maxArea(self, heights: List[int]) -> int:
        l, r = 0, len(heights) - 1
        res = 0

        while l < r:
            area = min(heights[l], heights[r]) * (r - l)
            res = max(res, area)
            if heights[l] <= heights[r]:
                l += 1
            else:
                r -= 1
        return res
```
