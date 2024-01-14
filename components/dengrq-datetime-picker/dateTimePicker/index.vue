<template>
  <view class="datetime-picker">
    <CustomPickerView :columns="dateConfig" :selectVals="selectVals" @onChange="onChangePickerValue" />
  </view>
</template>

<script src="./index.js"></script>

<style scoped lang="css"></style>
