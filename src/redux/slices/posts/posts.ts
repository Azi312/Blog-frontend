import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from '../../../axios'
import { PostItems, PostsState } from './types'
import { RootState } from '../../store'

interface FetchPostsParams {
	sort?: string
	filter?: string
}

interface FetchRemoveCommentParams {
	postId: string
	commentId: string
}

export const fetchPosts = createAsyncThunk(
	'posts/fetchPosts',
	async (params: FetchPostsParams) => {
		const { sort, filter } = params
		const { data } = await axios.get(`/posts`, {
			params: {
				// limit: 5,
				sort,
				tags: filter,
			},
		})

		return data
	}
)
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
	async (id: string) => {
		const { data } = await axios.delete(`/posts/${id}`)
		return data
	}
)
export const fetchRemoveComment = createAsyncThunk(
	'posts/fetchRemoveComment',
	async (params: FetchRemoveCommentParams) => {
		const { postId, commentId } = params
		const { data } = await axios.delete(
			`/posts/${postId}/comments/${commentId}`
		)
		return data
	}
)

const initialState: PostsState = {
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
	extraReducers: builder => {
		builder

			//get posts
			.addCase(fetchPosts.pending, state => {
				state.posts.items = []
				state.posts.status = 'loading'
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.posts.items = action.payload
				state.posts.status = 'succeeded'
			})
			.addCase(fetchPosts.rejected, state => {
				state.posts.items = []
				state.posts.status = 'failed'
			})

			//get tags
			.addCase(fetchTags.pending, state => {
				state.tags.items = []
				state.tags.status = 'loading'
			})
			.addCase(fetchTags.fulfilled, (state, action) => {
				state.tags.items = action.payload
				state.tags.status = 'succeeded'
			})
			.addCase(fetchTags.rejected, state => {
				state.tags.items = []
				state.tags.status = 'failed'
			})

			//get comments
			.addCase(fetchComments.pending, state => {
				state.comments.items = []
				state.comments.status = 'loading'
			})
			.addCase(fetchComments.fulfilled, (state, action) => {
				state.comments.items = action.payload
				state.comments.status = 'succeeded'
			})
			.addCase(fetchComments.rejected, state => {
				state.comments.items = []
				state.comments.status = 'failed'
			})

			// remove comment
			.addCase(fetchRemoveComment.fulfilled, (state, action) => {
				const { postId, commentId } = action.meta.arg
				const updatedPosts = state.posts.items.map(post => {
					if (post._id === postId) {
						const updatedComments = post.comments.filter(
							comment => comment._id !== commentId
						)
						post.comments = updatedComments
					}
					return post
				})
				state.posts.items = updatedPosts
			})

			//remove post
			.addMatcher(
				action => action.type === fetchRemovePost.pending.type,
				(state, action) => {
					const id = action.meta.arg
					state.posts.items = state.posts.items.filter(post => post._id !== id)
				}
			)
	},
})

export const selectPostsData = (state: RootState) => state.posts
export default postSlice.reducer
