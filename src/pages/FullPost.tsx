import React, { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom'
import axios from '../axios'

import { Post } from '../components/Post'
import { Index } from '../components/AddComment'
import { CommentsBlock } from '../components/CommentsBlock'
import { PostItems } from '../redux/slices/posts/types'

export const FullPost = () => {
	const [data, setData] = React.useState<PostItems>({} as PostItems)
	const [isLoading, setIsLoading] = React.useState(true)
	const { id } = useParams()

	const isMounted = React.useRef(false)
	const tes = isMounted.current && data

	const fetchFullPost = async () => {
		try {
			const { data } = await axios.get(`/posts/${id}`)
			setData(data)
			setIsLoading(false)
		} catch (error) {
			console.log(error)
			alert('Failed to load post')
		}
	}

	useEffect(() => {
		fetchFullPost()
		isMounted.current = false
	}, [id, tes])

	if (isLoading) {
		return <Post commentsCount={0} isLoading={isLoading} {...data} isFullPost />
	}

	return (
		<>
			<Post
				id={data._id}
				title={data.title}
				imageUrl={data.imageUrl}
				user={data.user}
				createdAt={data.createdAt}
				viewsCount={data.viewsCount}
				commentsCount={data.comments.length}
				tags={data.tags}
				isFullPost
			>
				<ReactMarkdown children={data.text} />
			</Post>
			<CommentsBlock
				postId={data._id}
				items={data.comments}
				isLoading={false}
				fetchFullPost={fetchFullPost}
				isMounted={isMounted}
			>
				<Index fetchFullPost={fetchFullPost} />
			</CommentsBlock>
		</>
	)
}
