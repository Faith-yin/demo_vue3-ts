<!--
 * @Date: 2021-01-10 18:53:09
 * @information: add
-->
<template>
  <div id="add-data">
    <el-form ref="addForm" :model="addForm" label-width="70px" size="mini">
      <el-form-item label="Name">
        <el-input v-model="addForm.name"></el-input>
      </el-form-item>

      <el-form-item label="Title">
        <el-input v-model="addForm.title"></el-input>
      </el-form-item>

      <el-form-item label="Body">
        <el-input type="textarea" :rows='6' v-model="addForm.body"></el-input>
      </el-form-item>

      <el-form-item label="Address">
        <el-input v-model="addForm.address" 
                  class="form-item_address"
                  placeholder="添加地点..."
                  :readonly="true" 
                  @click="isShowMapDialog=true"></el-input>
      </el-form-item>

      <el-form-item class="form-item_btn">
        <el-button  type="primary"
                    :disabled="isDisabledBtn" 
                    @click="onSubmit">Confirm</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>

    <el-dialog  title="添加Address"
                v-model="isShowMapDialog"
                custom-class="dialog_map"
                top='10vh'
                width="1000px">
      <base-map v-if="isShowMapDialog"
                :addForm="addForm"
                @onSaveAddress="onSaveAddress"></base-map>
    </el-dialog>



  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import {addFormInterface} from '@/interfaces/base'

import BaseMap from '@/components/BaseMap.vue'

import moment from 'moment'

export default defineComponent({
  data() {
    return {
      addForm: {
        name: '',
        title: '',
        body: '',
        address: '',
        lnglat: '',
      } as addFormInterface,
      isShowMapDialog: false,
    }
  },
  setup(props) {

  
  },
  computed: {
    isDisabledBtn():boolean {
      return Object.values(this.addForm).some((el:any) => !Boolean(el))
    },
  },
  components: {
    BaseMap,
  },
  methods: {
    onSubmit() {
      let time = moment().format('YYYY-MM-DD HH:mm:ss')
      this.$emit('onSubmit', {time, ...this.addForm})
    },
  
    onCancel() {
      this.$emit('onCancel')
    },

    onSaveAddress({address, lnglat}: {address:string, lnglat: string}) {
      this.addForm.address = address
      this.addForm.lnglat = lnglat
      this.isShowMapDialog = false
    },

  },


})

</script>

<style lang="scss">
#add-data {
  padding: 15px 20px;
  box-sizing: border-box;

  .form-item_btn {
    padding-top: 10px;
  }

  .form-item_address .el-input__inner{
    cursor: pointer;
  }

  .dialog_map {
    .el-dialog__body {
      padding: 30px;
    }
  }


}
</style>