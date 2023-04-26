import * as React from 'react'
import { useSelector } from 'react-redux'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Grid from '@mui/material/Grid'
import ClearIcon from '@mui/icons-material/Clear'

import { Post } from '../components/Post'
import { TagsBlock } from '../components/TagsBlock'
import { CommentsBlock } from '../components/CommentsBlock'
import {
	fetchPosts,
	fetchTags,
	fetchComments,
	selectPostsData,
} from '../redux/slices/posts/posts'
import { useAppDispatch } from '../redux/store'

export const Home = () => {
	const [filter, setFilter] = React.useState<string>('')
	const [sortBy, setSortBy] = React.useState<string>()
	const [value, setValue] = React.useState<number>(0)

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}

	const handleFilterChange = (newValue: string) => {
		setFilter(newValue)
	}

	const sort = sortBy ? `sortBy=${sortBy}` : ''

	const dispatch = useAppDispatch()
	const { posts, tags, comments } = useSelector(selectPostsData)

	const isPostsLoading = posts.status === 'loading'
	const isTagsLoading = tags.status === 'loading'
	const isCommentsLoading = comments.status === 'loading'

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
						fontSize='large'
						onClick={() => setFilter('')}
						style={{ cursor: 'pointer' }}
					/>
				</h1>
			)}

			<Grid container spacing={4}>
				<Grid xs={8} item>
					{(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
						isPostsLoading ? (
							<Post key={index} isLoading={true} {...obj} />
						) : (
							<Post
								id={obj._id}
								title={obj.title}
								imageUrl={obj.imageUrl}
								user={obj.user}
								userId={obj.user?._id}
								createdAt={obj.createdAt}
								viewsCount={obj.viewsCount}
								commentsCount={obj.comments.length}
								tags={obj.tags}
								onFilterChange={handleFilterChange}
								// isEditable={userData?._id === obj.user._id}
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
					<CommentsBlock
						items={comments.items}
						isLoading={isCommentsLoading}
						fetchFullPost={() => {}}
						postId={''}
					/>
				</Grid>
			</Grid>
		</>
	)
}
