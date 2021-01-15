/*
 * @Date: 2021-01-10 14:41:03
 * @information: api
 */
import axios from 'axios'

export default {
  getListApi(): Promise<any> {
    return axios.get(`/posts`)
  },
  
  getDataDetailApi(val: number): Promise<any> {
    return axios.get(`/posts/${val}`)
  }



}



