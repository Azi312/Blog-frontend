import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import posts from './slices/posts/posts'
import auth from './slices/auth'
import { fetchApi } from './allPost/allPost'
import { useDispatch } from 'react-redux'

export const store = configureStore({
	reducer: {
		posts,
		auth,
		[fetchApi.reducerPath]: fetchApi.reducer,
	},
	middleware: getDefoultMiddleware =>
		getDefoultMiddleware().concat(fetchApi.middleware),
})
setupListeners(store.dispatch)
type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export type RootState = ReturnType<typeof store.getState>
