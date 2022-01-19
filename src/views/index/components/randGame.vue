<template>
  <div>
    <div class="options">
      <div class="options-item">
        <span>个数：</span>
        <el-input-number class="number-select-input" v-model="num" :min="1" :max="gameArr.length" />
      </div>
      <el-button type="primary" class="start-btn options-item" @click="rollGame">开始随机</el-button>
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
.number-select-input {
  width: 150px;
}

.options {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.options .options-item {
  margin-right: 15px;
  margin-bottom: 10px;
}

.result-list {
  margin-top: 15px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.result-item {
  font-size: 16px;
  margin: 0 8px;
}
</style>
