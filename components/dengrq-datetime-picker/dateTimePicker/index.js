import CustomPickerView from '../customPickerView/index.vue';
import DateUtil from '../dateTimePicker/dateUtil';
import { DATE_TYPES } from './constant';

export default {
  components: {
    CustomPickerView
  },
  props: {
    // 日期模式，1：年月日（默认），2：年月，3：年份，4：年月日时分秒，5：时分秒，6：时分
    mode: {
      type: Number,
      default: DATE_TYPES.YMD
    },
    // 可选的最小日期，默认十年前
    minDate: {
      type: String,
      default: ''
    },
    // 可选的最大日期，默认十年后
    maxDate: {
      type: String,
      default: ''
    },
    // 默认选中日期（注意要跟日期模式对应）
    defaultDate: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      selectYear: new Date().getFullYear(),
      selectMonth: new Date().getMonth() + 1, // 选中的月份，1~12
      selectDay: new Date().getDate(),
      selectHour: new Date().getHours(),
      selectMinute: new Date().getMinutes(),
      selectSecond: new Date().getSeconds()
    };
  },
  watch: {
    defaultDate: {
      immediate: true,
      handler(val) {
        if (val) {
          if (this.mode == DATE_TYPES.YM && val.replace(/\-/g, '/').split('/').length == 2) {
            // 日期模式为年月时有可能传进来的defaultDate是2022-02这样的格式，在ios下new Date会报错，加上日期部分做兼容
            val += '-01';
          } else if (this.mode == DATE_TYPES.HMS || this.mode == DATE_TYPES.HM) {
            // 只有时分秒或者只有时分是不能调用new Date生成Date对象的，先加上一个假设的年月日（就取当年一月一日）来兼容
            const now = new Date();
            val = `${now.getFullYear()}-01-01 ${val}`;
          }

          let date = new Date(DateUtil.handleDateStr(val));
          this.selectYear = date.getFullYear();
          this.selectMonth = date.getMonth() + 1;
          this.selectDay = date.getDate();
          this.selectHour = date.getHours();
          this.selectMinute = date.getMinutes();
          this.selectSecond = date.getSeconds();
        }
      }
    }
  },
  computed: {
    minDateObj() {
      let minDate = this.minDate;
      if (minDate) {
        if (this.mode == DATE_TYPES.YM && minDate.replace(/\-/g, '/').split('/').length == 2) {
          // 日期模式为年月时有可能传进来的minDate是2022-02这样的格式，在ios下new Date会报错，加上日期部分做兼容
          minDate += '-01';
        } else if (this.mode == DATE_TYPES.HMS || this.mode == DATE_TYPES.HM) {
          // 只有时分秒或者只有时分是不能调用new Date生成Date对象的，先加上一个假设的年月日（就取当年一月一日）来兼容
          const now = new Date();
          minDate = `${now.getFullYear()}-01-01 ${minDate}`;
        }
        return new Date(DateUtil.handleDateStr(minDate));
      } else {
        // 没有传最小日期，默认十年前
        let year = new Date().getFullYear() - 10;
        minDate = new Date(year, 0, 1);
        return minDate;
      }
    },
    maxDateObj() {
      let maxDate = this.maxDate;
      if (maxDate) {
        if (this.mode == DATE_TYPES.YM && maxDate.replace(/\-/g, '/').split('/').length == 2) {
          // 日期模式为年月时有可能传进来的maxDate是2022-02这样的格式，在ios下new Date会报错，加上日期部分做兼容
          maxDate += '-01';
        } else if (this.mode == DATE_TYPES.HMS || this.mode == DATE_TYPES.HM) {
          // 只有时分秒或者只有时分是不能调用new Date生成Date对象的，先加上一个假设的年月日（就取当年一月一日）来兼容
          const now = new Date();
          maxDate = `${now.getFullYear()}-01-01 ${maxDate}`;
        }
        return new Date(DateUtil.handleDateStr(maxDate));
      } else {
        // 没有传最大日期，默认十年后
        let year = new Date().getFullYear() + 10;
        maxDate = new Date(year, 11, 31);
        return maxDate;
      }
    },
    years() {
      let years = [];
      let minYear = this.minDateObj.getFullYear();
      let maxYear = this.maxDateObj.getFullYear();
      for (let i = minYear; i <= maxYear; i++) {
        years.push(i);
      }

      return years;
    },
    months() {
      let months = [];
      let minMonth = 1;
      let maxMonth = 12;

      // 如果选中的年份刚好是最小可选日期的年份，那月份就要从最小日期的月份开始
      if (this.selectYear == this.minDateObj.getFullYear()) {
        minMonth = this.minDateObj.getMonth() + 1;
      }
      // 如果选中的年份刚好是最大可选日期的年份，那月份就要在最大日期的月份结束
      if (this.selectYear == this.maxDateObj.getFullYear()) {
        maxMonth = this.maxDateObj.getMonth() + 1;
      }

      for (let i = minMonth; i <= maxMonth; i++) {
        months.push(i);
      }

      return months;
    },
    days() {
      // 一年中12个月每个月的天数
      let monthDaysConfig = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      // 闰年2月有29天
      if (this.selectMonth == 2 && this.selectYear % 4 == 0) {
        monthDaysConfig[1] = 29;
      }

      let minDay = 1;
      let maxDay = monthDaysConfig[this.selectMonth - 1];

      if (this.selectYear == this.minDateObj.getFullYear() && this.selectMonth == this.minDateObj.getMonth() + 1) {
        minDay = this.minDateObj.getDate();
      }
      if (this.selectYear == this.maxDateObj.getFullYear() && this.selectMonth == this.maxDateObj.getMonth() + 1) {
        maxDay = this.maxDateObj.getDate();
      }

      let days = [];
      for (let i = minDay; i <= maxDay; i++) {
        days.push(i);
      }

      return days;
    },
    hours() {
      let hours = [];
      let minHour = 0;
      let maxHour = 23;

      if (
        this.selectYear == this.minDateObj.getFullYear() &&
        this.selectMonth == this.minDateObj.getMonth() + 1 &&
        this.selectDay == this.minDateObj.getDate()
      ) {
        minHour = this.minDateObj.getHours();
      }
      if (
        this.selectYear == this.maxDateObj.getFullYear() &&
        this.selectMonth == this.maxDateObj.getMonth() + 1 &&
        this.selectDay == this.maxDateObj.getDate()
      ) {
        maxHour = this.maxDateObj.getHours();
      }

      for (let i = minHour; i <= maxHour; i++) {
        hours.push(i);
      }

      return hours;
    },
    minutes() {
      let mins = [];
      let minMin = 0;
      let maxMin = 59;

      if (
        this.selectYear == this.minDateObj.getFullYear() &&
        this.selectMonth == this.minDateObj.getMonth() + 1 &&
        this.selectDay == this.minDateObj.getDate() &&
        this.selectHour == this.minDateObj.getHours()
      ) {
        minMin = this.minDateObj.getMinutes();
      }
      if (
        this.selectYear == this.maxDateObj.getFullYear() &&
        this.selectMonth == this.maxDateObj.getMonth() + 1 &&
        this.selectDay == this.maxDateObj.getDate() &&
        this.selectHour == this.maxDateObj.getHours()
      ) {
        maxMin = this.maxDateObj.getMinutes();
      }

      for (let i = minMin; i <= maxMin; i++) {
        mins.push(i);
      }

      return mins;
    },
    seconds() {
      let seconds = [];
      let minSecond = 0;
      let maxSecond = 59;

      if (
        this.selectYear == this.minDateObj.getFullYear() &&
        this.selectMonth == this.minDateObj.getMonth() + 1 &&
        this.selectDay == this.minDateObj.getDate() &&
        this.selectHour == this.minDateObj.getHours() &&
        this.selectMinute == this.minDateObj.getMinutes()
      ) {
        minSecond = this.minDateObj.getSeconds();
      }
      if (
        this.selectYear == this.maxDateObj.getFullYear() &&
        this.selectMonth == this.maxDateObj.getMonth() + 1 &&
        this.selectDay == this.maxDateObj.getDate() &&
        this.selectHour == this.maxDateObj.getHours() &&
        this.selectMinute == this.maxDateObj.getMinutes()
      ) {
        maxSecond = this.maxDateObj.getSeconds();
      }

      for (let i = minSecond; i <= maxSecond; i++) {
        seconds.push(i);
      }

      return seconds;
    },
    // 传给pickerView组件的数组，根据mode来生成不同的数据
    dateConfig() {
      let years = this.years.map((y) => y + '年');
      let months = this.months.map((m) => m + '月');
      let days = this.days.map((d) => d + '日');
      let hours = this.hours.map((h) => h + '时');
      let minutes = this.minutes.map((m) => m + '分');
      let seconds = this.seconds.map((s) => s + '秒');

      let ret = [];
      switch (this.mode) {
        case DATE_TYPES.YM:
          ret = [years, months];
          break;
        case DATE_TYPES.Y:
          ret = [years];
          break;
        case DATE_TYPES['YMD-HMS']:
          ret = [years, months, days, hours, minutes, seconds];
          break;
        case DATE_TYPES.HMS:
          ret = [hours, minutes, seconds];
          break;
        case DATE_TYPES.HM:
          ret = [hours, minutes];
          break;
        default:
          ret = [years, months, days];
          break;
      }

      return ret;
    },
    selectVals() {
      let ret = [];
      switch (this.mode) {
        case DATE_TYPES.YM:
          ret = [this.selectYear + '年', this.selectMonth + '月'];
          break;
        case DATE_TYPES.Y:
          ret = [this.selectYear + '年'];
          break;
        case DATE_TYPES['YMD-HMS']:
          ret = [
            this.selectYear + '年',
            this.selectMonth + '月',
            this.selectDay + '日',
            this.selectHour + '时',
            this.selectMinute + '分',
            this.selectSecond + '秒'
          ];
          break;
        case DATE_TYPES.HMS:
          ret = [this.selectHour + '时', this.selectMinute + '分', this.selectSecond + '秒'];
          break;
        case DATE_TYPES.HM:
          ret = [this.selectHour + '时', this.selectMinute + '分'];
          break;
        default:
          ret = [this.selectYear + '年', this.selectMonth + '月', this.selectDay + '日'];
          break;
      }
      return ret;
    }
  },
  methods: {
    onChangePickerValue(e) {
      const { value } = e;

      if (this.mode == DATE_TYPES.YM && value[0] && value[1]) {
        // 年月模式
        this.selectYear = Number(value[0].replace('年', ''));
        this.selectMonth = Number(value[1].replace('月', ''));
      } else if (this.mode == DATE_TYPES.Y && value[0]) {
        // 只有年份模式
        this.selectYear = Number(value[0].replace('年', ''));
      } else if (this.mode == DATE_TYPES['YMD-HMS'] && value[0] && value[1] && value[2] != '' && value[3] && value[4] && value[5]) {
        // 年月日时分秒模式
        this.selectYear = Number(value[0].replace('年', ''));
        this.selectMonth = Number(value[1].replace('月', ''));
        this.selectDay = Number(value[2].replace('日', ''));
        this.selectHour = Number(value[3].replace('时', ''));
        this.selectMinute = Number(value[4].replace('分', ''));
        this.selectSecond = Number(value[5].replace('秒', ''));
      } else if (this.mode == DATE_TYPES.HMS && value[0] && value[1] && value[2]) {
        // 时分秒模式
        this.selectHour = Number(value[0].replace('时', ''));
        this.selectMinute = Number(value[1].replace('分', ''));
        this.selectSecond = Number(value[2].replace('秒', ''));
      } else if (this.mode == DATE_TYPES.HM && value[0] && value[1]) {
        // 时分模式
        this.selectHour = Number(value[0].replace('时', ''));
        this.selectMinute = Number(value[1].replace('分', ''));
      } else if (value[0] && value[1] && value[2]) {
        // 默认，年月日模式
        this.selectYear = Number(value[0].replace('年', ''));
        this.selectMonth = Number(value[1].replace('月', ''));
        this.selectDay = Number(value[2].replace('日', ''));
      } else {
        // 其他情况可能是pickerView返回的数据有问题，不处理
        console.log('onChangePickerValue其他情况');
        return;
      }

      let formatTmpl = 'YYYY-MM-DD';
      switch (this.mode) {
        case DATE_TYPES.YM:
          formatTmpl = 'YYYY-MM';
          break;
        case DATE_TYPES.Y:
          formatTmpl = 'YYYY';
          break;
        case DATE_TYPES['YMD-HMS']:
          formatTmpl = 'YYYY-MM-DD HH:mm:ss';
          break;
        case DATE_TYPES.HMS:
          formatTmpl = 'HH:mm:ss';
          break;
        case DATE_TYPES.HM:
          formatTmpl = 'HH:mm';
          break;
        default:
          break;
      }

      this.$emit(
        'onChange',
        DateUtil.formatDate(
          new Date(`${this.selectYear}/${this.selectMonth}/${this.selectDay} ${this.selectHour}:${this.selectMinute}:${this.selectSecond}`),
          formatTmpl
        )
      );
    }
  }
};
