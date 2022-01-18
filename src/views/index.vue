<template>
  <div>
    <el-collapse v-model="type">
      <el-collapse-item title="随作品" name="随作品">
        <div class="btns">
          <div class="number-select">个数：<el-input v-model="game.num" type="text" /></div>
          <el-button type="primary" class="start-btn" @click="rollGame">开始随机</el-button>
        </div>
        <div class="result-list">
          <div class="result-item" v-for="(item, index) in game.result" :key="index">
            {{ item.name_zh }}
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="随机体" name="随机体">
        <div class="options">
          <div class="options-item">
            <span>个数：</span>
            <el-input v-model="shootType.num" type="text" />
          </div>
          <div class="options-item">
            <span>作品：</span>
            <el-select v-model="shootType.gameIndex">
              <el-option
                v-for="(item, index) in pickerData"
                :key="index"
                :label="item"
                :value="index"
              ></el-option>
            </el-select>
          </div>
          <el-button type="primary" class="start-btn" @click="rollShootType">开始随机</el-button>
        </div>
        <div class="result-list">
          <div class="result-item" v-for="(item, index) in shootType.result" :key="index">
            {{ `${item.name} ${item.character}${item.type}` }}
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="随符卡" name="随符卡"> </el-collapse-item>
      <el-collapse-item title="查新闻" name="查新闻"> </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import config from "@/config";
import { deepCopy } from "@/utils/tools";

export default {
  data() {
    return {
      type: 0,
      game: {
        num: 1,
        gameArr: config.game,
        result: [],
      },
      shootType: {
        num: 1,
        gameIndex: 0,
        gameArr: config.game,
        result: [],
      },
      spellCard: {},
      news: {},
    };
  },
  computed: {
    all() {
      const arr = [];
      for (let item of this.shootType.gameArr) {
        item.shootType.character.forEach((v, i) => {
          if (item.shootType.type) {
            for (let value of item.shootType.type) {
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
    pickerData() {
      return [
        "任意",
        ...this.shootType.gameArr.map((item) => {
          return item.name_zh;
        }),
      ];
    },
  },
  methods: {
    rollGame() {
      const gameList = deepCopy(this.game.gameArr);
      const result = [];
      for (let i = 0; i < this.game.num && gameList.length > 0; i++) {
        const rand = Math.floor(Math.random() * gameList.length);
        result.push(gameList[rand]);
        gameList.splice(rand, 1);
      }
      this.game.result = result;
    },
    rollShootType() {
      const arr = [];
      if (this.shootType.gameIndex > 0) {
        const item = this.shootType.gameArr[this.shootType.gameIndex - 1];
        item.shootType.character.forEach((v, i) => {
          if (item.shootType.type) {
            for (let value of item.shootType.type) {
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
      for (let i = 0; i < this.shootType.num && gameList.length > 0; i++) {
        const rand = Math.floor(Math.random() * gameList.length);
        result.push(gameList[rand]);
        gameList.splice(rand, 1);
      }
      this.shootType.result = result;
    },
  },
};
</script>

<style scoped></style>
