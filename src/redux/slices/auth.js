import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchAuth = createAsyncThunk('posts/fetchAuth', async params => {
	const { data } = await axios.post('/auth/login', params)
	return data
})
export const fetchRegister = createAsyncThunk(
	'posts/fetchRegister',
	async params => {
		const { data } = await axios.post('/auth/register', params)
		return data
	}
)
export const fetchAuthMe = createAsyncThunk('posts/fetchAuthMe', async () => {
	const { data } = await axios.get('/auth/me')
	return data
})

const initialState = {
	data: null,
	status: 'loading',
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout(state) {
			state.data = null
		},
	},
	extraReducers: {
		// Login
		[fetchAuth.pending]: state => {
			state.status = 'loading'
			state.data = null
		},
		[fetchAuth.fulfilled]: (state, action) => {
			state.status = 'succeeded'
			state.data = action.payload
		},
		[fetchAuth.rejected]: state => {
			state.status = 'failed'
			state.data = null
		},

		// Login
		[fetchAuthMe.pending]: state => {
			state.status = 'loading'
			state.data = null
		},
		[fetchAuthMe.fulfilled]: (state, action) => {
			state.status = 'succeeded'
			state.data = action.payload
		},
		[fetchAuthMe.rejected]: state => {
			state.status = 'failed'
			state.data = null
		},

		// Register
		[fetchRegister.pending]: state => {
			state.status = 'loading'
			state.data = null
		},
		[fetchRegister.fulfilled]: (state, action) => {
			state.status = 'succeeded'
			state.data = action.payload
		},
		[fetchRegister.rejected]: state => {
			state.status = 'failed'
			state.data = null
		},
	},
})
export const selectAuth = state => Boolean(state.auth.data)
export const { logout } = authSlice.actions

export default authSlice.reducer
