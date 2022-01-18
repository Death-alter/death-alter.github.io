<template>
  <div>
    <div class="options">
      <div class="options-item">
        <span>个数：</span>
        <el-input v-model="num" type="text" />
      </div>
      <div class="options-item">
        <span>作品：</span>
        <el-select v-model="gameIndex">
          <el-option v-for="(item, index) in gameNameArr" :key="index" :label="item" :value="index"></el-option>
        </el-select>
      </div>
      <el-button type="primary" class="start-btn" @click="rollShootType">开始随机</el-button>
    </div>
    <div class="result-list">
      <div class="result-item" v-for="(item, index) in result" :key="index">
        {{ `${item.name} ${item.character}${item.type}` }}
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
      num,
      gameIndex: 0,
      spellCardArr: config.spellCard,
    };
  },
  computed: {
    gameNameArr() {
      return [
        "任意",
        ...this.gameArr.map((item) => {
          return item.name_zh;
        }),
      ];
    },
  },
};
</script>

<style scoped>
</style>