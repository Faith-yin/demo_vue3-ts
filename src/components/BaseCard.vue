<!--
 * @Date: 2021-01-10 16:29:08
 * @information: card
-->
<template>
  <div id="base-card">
    <div class="card_item" v-for="(item, index) in dataList" :key="index">
      <div class="item_title font--hidden">{{item.title}}</div>
      <div class="item_info">
        <div class="item_user-id">用户：{{item.name}}</div>
        <div class="item_date">添加时间：{{item.time}}</div>
        <div class="item_address">地址：{{item.address || '未知地点'}}</div>
      </div>
      <div class="item_body font-more--hidden">{{item.body}}</div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

export default defineComponent ({
  props: {
    dataList: {
      type: Array,
      default: () => ([]),
    }
  },
  setup(props) {


  }

})
</script>

<style lang="scss">
#base-card {
  min-height: 400px;

  .card_item {
    margin: 25px 0;
    padding: 20px;
    box-sizing: border-box;
    border: 1px solid #eee;
    border-radius: 5px;
    transition: all ease 0.3s;

    &:hover {
      box-shadow: 2px 2px 2px 1px #eee;
    }
  }

  .item_title {
    padding-bottom: 15px;
    text-align: center;
    font-size: 22px;
    font-weight: 600;
    cursor: pointer;
    transition: all ease 0.3s;

    &:hover {
      color: #00A1D6;
    }
  }

  .item_info {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    font-size: 14px;
    color: #999;

    .item_user-id, .item_date {
      margin-right: 15px;
    }
  }

  .item_body {
    text-indent: 1em;
  }


}
</style>