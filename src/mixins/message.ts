/*
 * @Date: 2021-01-11 16:02:45
 * @information: 消息提示
 */
import { ElMessage } from 'element-plus'

const typeTrans = {
  1: 'success',
  2: 'warning',
  3: 'error',
}

export default {
  methods: {
    showMessage(type: 1 | 2 | 3, message: string, showClose: boolean = true) {
      ElMessage({
        type: typeTrans[type],
        message,
        showClose,
      })
    },

  },



}



