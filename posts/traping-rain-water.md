---
title: "42. Trapping Rain Water"
summary: "How to solve trapping rain water leetcode problem using two pointers in python"
date: "16 December 2024"
lastmod: "16 December 2024"
author: "Eric Daniels"
tags: ["leetcode", "python", "hashmap", "array"]
draft: false
---

<a target="_blank" href="https://leetcode.com/problems/trapping-rain-water/">Link to the problem</a>

## Description

Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.

Example 1:

![Example 1 Image](https://assets.leetcode.com/uploads/2018/10/22/rainwatertrap.png "Example 1 Image")

```python
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section)
is represented by array [0,1,0,2,1,0,1,3,2,1,2,1].
In this case, 6 units of rain water (blue section)
are being trapped.
```

Example 2:

```python
Input: height = [4,2,0,3,2,5]
Output: 9
```

**Constraints:**

- `n == height.length`
- `1 <= n <= 2 * 104`
- `0 <= height[i] <= 105`

## Solution

### Video Explanation

[![Video Title](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID)

### Time & Space Complexity

With this approach, we can solve the problem in O(n) time complexity and O(1) space complexity,
where `n` is the length of the input array `height`.

### Approach

We can solve this problem using two pointers `left` and `right`, and two variables that save what is the maximum height found before `maxLeft` and `maxRight`. What we need to do is:

- Keep track of the maximum height from the left `maxLeft` and right side `maxRight`.
- Start with two pointers, one at the beginning and one at the end of the array.
- Move the pointer with the smaller height towards the other pointer.
- If the height at the pointer is less than the maximum height from the other side, we will add the difference to the water.

  - Notice that we can only add the difference if it is greater than 0. In other words, `maxSide` must be greater than the current height of the pointer.

- Keep track of the maximum height from the left and right sides and update it if we find a new maximum height.

### Code

```python
class Solution:
    def trap(self, height: List[int]) -> int:
        if not height:
            return 0

        left, right = 0, len(height) - 1
        water = 0
        maxLeft, maxRight = height[left], height[right]

        while left < right:
            if height[left] > height[right]:
                if maxRight - height[right] > 0:
                    water += maxRight - height[right]
                right -= 1
                maxRight = max(height[right], maxRight)
k            else:
                if maxLeft - height[left] > 0:
                    water += maxLeft - height[left]
                left += 1
                maxLeft = max(height[left], maxLeft)

        return water
```
