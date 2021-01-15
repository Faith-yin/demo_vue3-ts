<!--
 * @Date: 2021-01-10 11:25:42
 * @information: home
-->
<template>
  <div id="home">
    <h2>列表</h2>
    <base-card  v-loading="loading"
                element-loading-text="拼命加载中"
                :dataList="dataList"></base-card>

    <el-button  class="btn_add" 
                type="primary" 
                icon="el-icon-edit" 
                circle
                title="添加数据"
                @click="isShowAddDrawer=true"></el-button>

    <el-drawer  title="Add"
                size='580px'
                v-model="isShowAddDrawer">
      <add-data v-if="isShowAddDrawer"
                @onSubmit="onSubmit"
                @onCancel="isShowAddDrawer=false"></add-data>
    </el-drawer>

  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, ref, toRefs} from 'vue'
import api from '@/api/base'
import {addFormInterface} from '@/interfaces/base'
import message from '@/mixins/message'

import BaseCard from '@/components/BaseCard.vue'
import AddData from '@/components/AddData.vue'

import moment from 'moment'

export default defineComponent({
  mixins: [message],
  data() {
    return {
      isShowAddDrawer: false,
    }
  },
  components: {
    BaseCard,
    AddData,
  },
  setup(props) {

    const state = reactive({
      dataList: [] as Array<addFormInterface>,
    })
    let loading = ref(true)


    const getListData = () => {
      api.getListApi().then(res => {
        state.dataList = res.map((el: any) => ({
          name: el.userId,
          title: el.title,
          body: el.body,
          time: moment().format('YYYY-MM-DD HH:mm:ss')
        }))
      }).finally(() => {
        loading.value = false
      })
    }

    getListData()


    return {
      // https://vue3js.cn/docs/zh/api/refs-api.html#torefs
      ...toRefs(state),
      loading,
    }

  },

  methods: {
    onSubmit(addForm: addFormInterface) {
      this.dataList.unshift(addForm)
      this.showMessage(1, '添加成功')
      this.isShowAddDrawer = false
    },





  },




})
</script>

<style lang="scss">
@import '@/style/home.scss';
</style>
