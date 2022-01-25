<template>
  <div>
    <div class="options">
      <div class="options-item">
        <span>个数：</span>
        <el-input-number class="number-select-input" v-model="num" :min="1" :max="maxNum" />
      </div>
      <div class="options-item">
        <span>作品：</span>
        <el-select v-model="gameIndex">
          <el-option v-for="(item, index) in gameNameArr" :key="index" :label="item" :value="index"></el-option>
        </el-select>
      </div>
      <el-button type="primary" class="start-btn options-item" @click="rollShootType">开始随机</el-button>
    </div>
    <div class="result-list">
      <div class="result-item" v-for="(item, index) in result" :key="index">
        {{ `${item.name} ${item.character} ${item.type}` }}
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
    gameNameArr() {
      return [
        "任意",
        ...this.gameArr.map((item) => {
          return item.name_zh;
        }),
      ];
    },
    maxNum() {
      if (this.gameIndex > 0) {
        const item = this.gameArr[this.gameIndex - 1].shootType;
        if (item.type) {
          return item.character.length * item.type.length;
        } else {
          return item.character.length;
        }
      } else {
        return this.all.length;
      }
    },
    currentList() {
      const arr = [];
      if (this.gameIndex > 0) {
        const item = this.gameArr[this.gameIndex - 1];
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
  },
  watch: {
    maxNum(val) {
      if (this.num > val) {
        this.num = val;
      }
    },
  },
  methods: {
    rollShootType() {
      const gameList = deepCopy(this.gameIndex > 0 ? this.currentList : this.all);
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
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.result-item {
  font-size: 16px;
  margin: 0 8px;
}
</style>
