import axios, { AxiosRequestConfig } from 'axios'

const instance = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
})

// instance.interceptors.request.use((config: AxiosRequestConfig) => {
// 	config.headers.Authorization = window.localStorage.getItem('token')
// 	return config
// })
instance.interceptors.request.use((config: AxiosRequestConfig) => {
	const token = window.localStorage.getItem('token')
	if (token) {
		config.headers!.Authorization = token
	}
	return config
})

export default instance
