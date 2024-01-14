<template>
  <picker-view class="picker-view" :value="indexArr" @change="onChange">
    <picker-view-column class="picker-view-column" v-for="(col, colIdx) in columns" :key="colIdx">
      <view v-for="(item, idx) in col" :key="idx">{{ item }}</view>
    </picker-view-column>
  </picker-view>
</template>

<script src="./index.js"></script>

<style lang="css" scoped src="./index.css"></style>
