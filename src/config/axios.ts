/*
 * @Date: 2021-01-10 14:44:44
 * @information: 
 */
import axios from 'axios'

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'

axios.defaults.timeout = 60000


axios.interceptors.request.use(
  (config: any): any => {
    return config
  },
  (error: any) => {}
)

axios.interceptors.response.use(
  (response: any): Promise<any> => {
    let {status, data} = response
    if(status === 200) {
      return Promise.resolve(data)
    }
    return Promise.reject(data)
  },
  (error: any): Promise<Error> => {
    return Promise.reject(error)
  }
)

1