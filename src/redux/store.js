import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import posts from './slices/posts'
import auth from './slices/auth'
import { fetchApi } from './allPost/allPost'

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
// export type RootState = ReturnType<typeof store.getState>
