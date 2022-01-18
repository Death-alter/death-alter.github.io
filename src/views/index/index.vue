<template>
  <div>
    <el-collapse v-model="type">
      <el-collapse-item title="随作品" name="随作品">
        <rand-game></rand-game>
      </el-collapse-item>
      <el-collapse-item title="随机体" name="随机体">
        <rand-shoot-type></rand-shoot-type>
      </el-collapse-item>
      <el-collapse-item title="随符卡" name="随符卡"> </el-collapse-item>
      <el-collapse-item title="查新闻" name="查新闻"> </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import randShootType from "./components/randShootType";
import randGame from "./components/randGame";
import randSpellCard from "./components/randSpellCard";

export default {
  data() {
    return {
      type: 0,
    };
  },
  components: { randGame, randShootType },
};
</script>

<style scoped></style>
