import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { Items, Posts } from './types'

export const fetchApi = createApi({
	reducerPath: 'fetchApi',
	tagTypes: ['Posts', 'Tags', 'Comments'],
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:4444',
	}),
	endpoints: build => ({
		getPosts: build.query({
			query: ({ sort, filter }) => ({
				url: `/posts`,
				params: {
					limit: 5,
					sort,
					tags: filter,
				},
				providesTags: result =>
					result
						? [
								...result.map(({ id }) => ({ type: 'Posts', id })),
								{ type: 'Posts', id: 'LIST' },
						  ]
						: [{ type: 'Posts', id: 'LIST' }],
			}),
		}),
		getTags: build.query({
			query: () => ({
				url: `/tags`,
				providesTags: result =>
					result
						? [
								...result.map(({ id }) => ({ type: 'Tags', id })),
								{ type: 'Tags', id: 'LIST' },
						  ]
						: [{ type: 'Tags', id: 'LIST' }],
			}),
		}),
		getComments: build.query({
			query: () => ({
				url: `/comments`,
				providesTags: result =>
					result
						? [
								...result.map(({ id }) => ({ type: 'Comments', id })),
								{ type: 'Comments', id: 'LIST' },
						  ]
						: [{ type: 'Comments', id: 'LIST' }],
			}),
		}),
		deletePost: build.mutation({
			query(id) {
				return {
					url: `/posts/${id}`,
					method: 'DELETE',
				}
			},
			invalidatesTags: [
				{ type: 'Posts', id: 'LIST' },
				{ type: 'Tags', id: 'LIST' },
				{ type: 'Comments', id: 'LIST' },
			],
		}),
		addComment: build.mutation({
			query: ({ id, text, user }) => ({
				url: `/posts/${id}/comments`,
				method: 'POST',
				body: {
					text,
					user,
				},
			}),
			invalidatesTags: [
				{ type: 'Posts', id: 'LIST' },
				{ type: 'Tags', id: 'LIST' },
				{ type: 'Comments', id: 'LIST' },
			],
		}),
	}),
	overrideExisting: false,
})

export const {
	useGetPostsQuery,
	useGetTagsQuery,
	useGetCommentsQuery,
	useDeletePostMutation,
	useAddCommentMutation,
} = fetchApi
