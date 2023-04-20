import { configureStore } from '@reduxjs/toolkit'
import posts from './slices/posts'
import auth from './slices/auth'

export const store = configureStore({
	reducer: {
		posts,
		auth,
	},
})

// export type RootState = ReturnType<typeof store.getState>
