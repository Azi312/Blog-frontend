import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async params => {
	const { sort, filter } = params
	const { data } = await axios.get(`/posts`, {
		params: {
			// limit: 5,
			sort,
			tags: filter,
		},
	})

	return data
})
export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
	const { data } = await axios.get('/tags')
	return data
})
export const fetchComments = createAsyncThunk(
	'posts/fetchComments',
	async () => {
		const { data } = await axios.get('/comments')
		return data
	}
)
export const fetchRemovePost = createAsyncThunk(
	'posts/fetchRemovePost',
	async id => {
		const { data } = await axios.delete(`/posts/${id}`)
		return data
	}
)

const initialState = {
	posts: {
		items: [],
		status: 'loading',
	},
	tags: {
		items: [],
		status: 'loading',
	},
	comments: {
		items: [],
		status: 'loading',
	},
}

export const postSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	extraReducers: {
		//get posts
		[fetchPosts.pending]: state => {
			state.posts.items = []
			state.posts.status = 'loading'
		},
		[fetchPosts.fulfilled]: (state, action) => {
			state.posts.items = action.payload
			state.posts.status = 'succeeded'
		},
		[fetchPosts.rejected]: state => {
			state.posts.items = []
			state.posts.status = 'failed'
		},

		//get tags
		[fetchTags.pending]: state => {
			state.tags.items = []
			state.tags.status = 'loading'
		},
		[fetchTags.fulfilled]: (state, action) => {
			state.tags.items = action.payload
			state.tags.status = 'succeeded'
		},
		[fetchTags.rejected]: state => {
			state.tags.items = []
			state.tags.status = 'failed'
		},

		//get comments
		[fetchComments.pending]: state => {
			state.comments.items = []
			state.comments.status = 'loading'
		},
		[fetchComments.fulfilled]: (state, action) => {
			state.comments.items = action.payload
			state.comments.status = 'succeeded'
		},
		[fetchComments.rejected]: state => {
			state.comments.items = []
			state.comments.status = 'failed'
		},

		//remove post
		[fetchRemovePost.pending]: (state, action) => {
			state.posts.items = state.posts.items.filter(
				post => post._id !== action.meta.arg
			)
		},
	},
})

export const {} = postSlice.actions

export default postSlice.reducer
