export interface CommentsItems {
	text: string
	user: {
		id: string
		fullName: string
		avatarUrl: string
	}
	createdAt: string
	// updatedAt: string
}

export interface PostItems {
	_id: string
	title: string
	text: string
	tags: string[]
	comments: CommentsItems[]
	imageUrl: string
	user: {
		_id: string
		fullName: string
		avatarUrl: string
	}
	viewsCount: number
	createdAt: string
	updatedAt: string
	__v: number
}

export interface PostsState {
	posts: {
		items: [] | PostItems[]
		status: 'loading' | 'succeeded' | 'failed'
	}
	tags: {
		items: [] | string[]
		status: 'loading' | 'succeeded' | 'failed'
	}
	comments: {
		items: [] | CommentsItems[]
		status: 'loading' | 'succeeded' | 'failed'
	}
}
