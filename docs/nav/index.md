---
layout: doc
layoutClass: m-nav-layout
sidebar: false
prev: false
next: false
outline: [2, 3, 4]
---

<style src="/.vitepress/theme/style/nav.css"></style>

<script setup>
import { NAV_DATA } from '/.vitepress/theme/untils/data'
</script>


# 导航站

::: tip 提示
MemoMate用导航，不定期更新
:::

<MNavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>
