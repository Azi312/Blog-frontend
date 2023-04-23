import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Grid from '@mui/material/Grid'
import ClearIcon from '@mui/icons-material/Clear'

import { Post } from '../components/Post'
import { TagsBlock } from '../components/TagsBlock'
import { CommentsBlock } from '../components/CommentsBlock'
import { fetchPosts, fetchTags, fetchComments } from '../redux/slices/posts'
import axios from '../axios'
import { getUserFromLS } from '../utils/getUserFromLS'

export const Home = () => {
	const [filter, setFilter] = React.useState('')
	const [sortBy, setSortBy] = React.useState()
	const [value, setValue] = React.useState(0)

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const handleFilterChange = (event, newValue) => {
		setFilter(newValue)
	}

	const sort = sortBy ? `sortBy=${sortBy}` : ''

	const dispatch = useDispatch()
	const { posts, tags, comments } = useSelector(state => state.posts)
	const userData = useSelector(state => state.auth.data)

	const isPostsLoading = posts.status === 'loading'
	const isTagsLoading = tags.status === 'loading'
	const isCommentsLoading = comments.status === 'loading'

	console.log(posts.items)

	React.useEffect(() => {
		dispatch(fetchPosts({ sort, filter }))
		dispatch(fetchComments())
		dispatch(fetchTags())
	}, [dispatch, sort, filter])

	return (
		<>
			<Tabs
				style={{ marginBottom: 15 }}
				value={value}
				onChange={handleChange}
				aria-label='basic tabs example'
			>
				<Tab onClick={() => setSortBy('')} label='News' />
				<Tab onClick={() => setSortBy('popular')} label='Popular' wrapped />
			</Tabs>
			{filter && (
				<h1
					style={{
						color: 'gray',
						display: 'flex',
						alignItems: 'center',
						gap: '10px',
					}}
				>
					<span># {filter}</span>{' '}
					<ClearIcon
						fontSize='20'
						onClick={() => setFilter('')}
						style={{ cursor: 'pointer' }}
					/>
				</h1>
			)}

			<Grid container spacing={4}>
				<Grid xs={8} item>
					{(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
						isPostsLoading ? (
							<Post key={index} isLoading={true} />
						) : (
							<Post
								id={obj._id}
								title={obj.title}
								// imageUrl={
								// 	obj.imageUrl
								// 		? `${process.env.REACT_APP_API_URL}${obj.imageUrl}`
								// 		: ''
								// }
								imageUrl={obj.imageUrl}
								user={obj.user}
								userId={obj.user._id}
								createdAt={obj.createdAt}
								viewsCount={obj.viewsCount}
								commentsCount={obj.comments.length}
								tags={obj.tags}
								isEditable={userData?._id === obj.user._id}
							/>
						)
					)}
				</Grid>
				<Grid xs={4} item>
					<TagsBlock
						items={tags.items}
						onFilterChange={handleFilterChange}
						isLoading={isTagsLoading}
					/>
					<CommentsBlock items={comments.items} isLoading={isCommentsLoading} />
				</Grid>
			</Grid>
		</>
	)
}
