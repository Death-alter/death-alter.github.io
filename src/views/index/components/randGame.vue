<template>
  <div>
    <div class="btns">
      <div class="number-select">个数：<el-input v-model="num" type="text" /></div>
      <el-button type="primary" class="start-btn" @click="rollGame">开始随机</el-button>
    </div>
    <div class="result-list">
      <div class="result-item" v-for="(item, index) in result" :key="index">
        {{ item.name_zh }}
      </div>
    </div>
  </div>
</template>

<script>
import config from "@/config";
import { deepCopy } from "@/utils/tools";

export default {
  data() {
    return {
      num: 1,
      gameArr: config.game,
      result: [],
    };
  },
  methods: {
    rollGame() {
      const gameList = deepCopy(this.gameArr);
      const result = [];
      for (let i = 0; i < this.num && gameList.length > 0; i++) {
        const rand = Math.floor(Math.random() * gameList.length);
        result.push(gameList[rand]);
        gameList.splice(rand, 1);
      }
      this.result = result;
    },
  },
};
</script>

<style scoped>
</style>