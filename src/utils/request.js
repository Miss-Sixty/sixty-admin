import axios from 'axios'
// import router from "@/router";
// import store from '@/store'
import { ElMessage } from 'element-plus'

// const toLogin = () => {
//   router.push({
//     path: "/login",
//     query: {
//       redirect: router.currentRoute.fullPath,
//     },
//   });
// };

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000,
  // withCredentials: true, // send cookies when cross-domain requests
})

service.interceptors.request.use(
  config => {
    // config.headers['Authorization'] = store.state.user.token
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  res => {
    const { status, message } = res.data
    if (status !== 200) {
      ElMessage({
        message: message || 'Error',
        type: 'error',
        duration: 5 * 1000,
      })
      return Promise.reject(new Error(message || 'Error'))
    }

    return res
  },
  err => {
    console.log(err)
    // const { data, message } = err.response.data

    // ElMessage.error(message || data)

    return Promise.reject(err)
  }
)

export default service
