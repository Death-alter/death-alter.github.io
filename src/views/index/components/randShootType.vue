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
      num: 1,
      gameIndex: 0,
      gameArr: config.game,
      result: [],
    };
  },
  computed: {
    all() {
      const arr = [];
      for (let item of this.gameArr) {
        item.shootType.character.forEach((v, i) => {
          if (item.type) {
            for (let value of item.type) {
              arr.push({
                name: item.name_zh,
                character: v,
                type: value,
              });
            }
          } else {
            arr.push({
              name: item.name_zh,
              character: v,
              type: "",
            });
          }
        });
      }
      return arr;
    },
    gameNameArr() {
      return [
        "任意",
        ...this.gameArr.map((item) => {
          return item.name_zh;
        }),
      ];
    },
  },
  methods: {
    rollShootType() {
      const arr = [];
      if (this.gameIndex > 0) {
        const item = this.gameArr[this.gameIndex - 1];
        item.shootType.character.forEach((v, i) => {
          if (item.type) {
            for (let value of item.type) {
              arr.push({
                name: item.name_zh,
                character: v,
                type: value,
              });
            }
          } else {
            arr.push({
              name: item.name_zh,
              character: v,
              type: "",
            });
          }
        });
      }

      const gameList = deepCopy(arr.length ? arr : this.all);
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