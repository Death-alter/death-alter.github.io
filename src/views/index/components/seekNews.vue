<template>
  <div>
    <div class="options">
      <div class="options-item time-selecter">
        <el-date-picker class="date-picker" v-model="stratDate" type="date" value-format="yyyy-MM-dd"> </el-date-picker>
        <span class="select-spacer">至</span>
        <el-date-picker class="date-picker" v-model="endDate" type="date" value-format="yyyy-MM-dd"> </el-date-picker>
      </div>
      <el-button type="primary" class="options-item" @click="getNews">查询</el-button>
    </div>
    <div class="news-list">
      <div class="list-item" v-for="(item, index) in newsList" :key="index">
        <span class="time">{{ item.startStr }}</span>
        <span class="event" v-html="item.desc"></span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { getEvents } from "@/api/thwiki";

export default {
  data() {
    return {
      newsList: [],
      stratDate: moment().format("YYYY-MM-DD"),
      endDate: moment().add(1, "months").format("YYYY-MM-DD"),
    };
  },
  created() {
    this.getNews();
  },
  methods: {
    getNews() {
      getEvents({
        start: this.stratDate,
        end: this.endDate,
      }).then(({ data }) => {
        this.newsList = data.results.sort((a, b) => {
          return b.start - a.start;
        });
      });
    },
  },
};
</script>

<style scoped>
.options {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.options .options-item {
  margin-right: 15px;
  margin-bottom: 10px;
}
.select-spacer {
  display: inline-block;
  margin: 0 10px;
}
.date-picker {
  width: 140px !important;
}
.news-list {
  margin-top: 10px;
}
.list-item {
  font-size: 14px;
  line-height: 1.5;
  padding-top: 10px;
}
.list-item .time {
  font-weight: 600;
  margin-right: 10px;
}
</style>
