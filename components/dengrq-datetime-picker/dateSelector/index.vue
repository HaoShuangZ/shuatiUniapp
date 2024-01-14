<template>
  <view class="date-selector">
    <view class="select-date-wrapper">
      <view class="select-date" :class="{ active: activeDate == 'startDate' }" @tap="onTapStartDate">
        <view class="select-date-value" v-if="startDate">{{ startDate }}</view>
        <view class="select-date-placeholder" v-else>请选择时间</view>
      </view>
      <view style="margin: 0 16px">至</view>
      <view class="select-date" :class="{ active: activeDate == 'endDate' }" @tap="onTapEndDate">
        <view class="select-date-value" v-if="endDate">{{ endDate }}</view>
        <view class="select-date-placeholder" v-else>请选择时间</view>
      </view>
    </view>

    <DateTimePicker
      v-if="showStartDatePicker"
      @onChange="onChangeStartDate"
      :defaultDate="startDate"
      :minDate="minDate || ''"
      :maxDate="endDate || maxDate || ''"
      :mode="mode"
    />
    <DateTimePicker
      v-if="showEndDatePicker"
      @onChange="onChangeEndDate"
      :defaultDate="endDate"
      :minDate="startDate || minDate || ''"
      :maxDate="maxDate || ''"
      :mode="mode"
    />

    <view class="btn-group" v-if="showStartDatePicker || showEndDatePicker">
      <view class="btn-cancel" @tap="onCancel">取消</view>
      <view class="btn-confirm" @tap="onConfirm">确定</view>
    </view>
  </view>
</template>

<script src="./index.js"></script>

<style lang="css" scoped src="./index.css"></style>
