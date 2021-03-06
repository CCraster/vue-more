import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store/'

const service = axios.create({
  baseURL: 'https://api.github.com',
  time: 15000
})

service.interceptors.request.use(
  config => {
    let token = store.state.token.token
    if (token) {
      let sp = '?'
      if (config.url.indexOf('?') >= 0) {
        sp = '&'
      }
      config.url = config.url + sp + 'access_token=' + token
    }
    return config
  },
  error => {
    Message.error(error)
  }
)

service.interceptors.response.use(
  response => {
    // let responseJson = response.data;
    return response
  },
  error => {
    let message
    switch (error.response.status) {
      case 404:
        message = 'Token未绑定或Token错误'
        break
      default:
        message = error.response.data.message
        break
    }
    Message.error(message)
    return Promise.reject('error')
  }
)

export default service
