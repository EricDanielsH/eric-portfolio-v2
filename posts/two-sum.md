---
title: "1. Two Sum"
summary: "How to solve two sum leetcode problem using hashmap in python"
date: "14 December 2024"
lastmod: "4 December 2024"
author: "Eric Daniels"
tags: ["leetcode", "python", "hashmap", "array"]
draft: false
---

<a href="https://leetcode.com/problems/two-sum/">Link to the problem</a>

# Introduction

Given an array of integers `nums` and an integer `target`, return indices of the two numbers `i` and `j` such that they add up to target, `nums[i] + nums[j] == target`, while `i != j`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Example 1:

```python
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
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
