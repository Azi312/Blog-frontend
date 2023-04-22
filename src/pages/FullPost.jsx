import React, { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom'
import axios from '../axios'

import { Post } from '../components/Post'
import { Index } from '../components/AddComment'
import { CommentsBlock } from '../components/CommentsBlock'

export const FullPost = () => {
	const [data, setData] = React.useState()
	const [isLoading, setIsLoading] = React.useState(true)
	const { id } = useParams()

	const isMounted = React.useRef(false)
	const tes = isMounted.current && data

	const fetchFullPost = async () => {
		try {
			// if (!isAddingComment.current) {
			const res = await axios.get(`/posts/${id}`)
			setData(res.data)
			setIsLoading(false)
			// }
		} catch (error) {
			console.log(error)
			alert('Failed to load post')
		}
	}

	useEffect(() => {
		fetchFullPost()
	}, [id, tes])

	if (isLoading) {
		return <Post isLoading={isLoading} isFullPost />
	}

	return (
		<>
			<Post
				id={data._id}
				title={data.title}
				imageUrl={
					data.imageUrl
						? `${process.env.REACT_APP_API_URL}${data.imageUrl}`
						: ''
				}
				user={data.user}
				createdAt={data.createdAt}
				viewsCount={data.viewsCount}
				commentsCount={data.comments.length}
				tags={data.tags}
				isFullPost
			>
				<ReactMarkdown children={data.text} />
			</Post>
			<CommentsBlock items={data.comments} isLoading={false}>
				<Index fetchFullPost={fetchFullPost} />
			</CommentsBlock>
		</>
	)
}
