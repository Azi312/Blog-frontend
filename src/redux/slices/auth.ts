import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from '../../axios'
import { RootState } from '../store'

interface FetchAuthParams {
	email: string
	password: string
}

interface RegisterParams {
	values: {
		fullName: string
		email: string
		password: string
	}
	avatarUrl: string
}

export const fetchAuth = createAsyncThunk(
	'posts/fetchAuth',
	async (params: FetchAuthParams) => {
		const { data } = await axios.post('/auth/login', params)
		return data
	}
)
export const fetchRegister = createAsyncThunk(
	'posts/fetchRegister',
	async (params: RegisterParams) => {
		const { values, avatarUrl } = params
		const { data } = await axios.post('/auth/register', {
			...values,
			avatarUrl,
		})
		return data
	}
)
export const fetchAuthMe = createAsyncThunk('posts/fetchAuthMe', async () => {
	const { data } = await axios.get('/auth/me')
	return data
})

interface UserData {
	_id: string
	email: string
	fullName: string
	password: string
	avatarUrl: string
	createdAt: string
	updatedAt: string
	__v: number
}

interface AuthState {
	[x: string]: any
	data: null | UserData
	status: 'loading' | 'succeeded' | 'failed'
}

const initialState: AuthState = {
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
	extraReducers: builder => {
		// Login
		builder
			.addCase(fetchAuth.pending, state => {
				state.status = 'loading'
				state.data = null
			})
			.addCase(fetchAuth.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.data = action.payload
			})
			.addCase(fetchAuth.rejected, state => {
				state.status = 'failed'
				state.data = null
			})

			// Login
			.addCase(fetchAuthMe.pending, state => {
				state.status = 'loading'
				state.data = null
			})
			.addCase(fetchAuthMe.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.data = action.payload
			})
			.addCase(fetchAuthMe.rejected, state => {
				state.status = 'failed'
				state.data = null
			})

			// Register
			.addCase(fetchRegister.pending, state => {
				state.status = 'loading'
				state.data = null
			})
			.addCase(fetchRegister.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.data = action.payload
			})
			.addCase(fetchRegister.rejected, state => {
				state.status = 'failed'
				state.data = null
			})
	},
})

export const authSelector = (state: RootState) => state.auth
export const selectAuth = (state: RootState) => Boolean(state.auth.data)
export const { logout } = authSlice.actions

export default authSlice.reducer
