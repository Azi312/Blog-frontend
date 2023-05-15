import React, { FC, MutableRefObject } from 'react'

import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import Skeleton from '@mui/material/Skeleton'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Clear'

import { CommentsItems } from '../redux/slices/posts/types'
import { SideBlock } from './SideBlock'
import { getUserFromLS } from '../utils/getUserFromLS'
import { fetchRemoveComment } from '../redux/slices/posts/posts'
import { useAppDispatch } from '../redux/store'

interface CommentsBlockProps {
	postId: string
	items: CommentsItems[]
	children?: React.ReactNode
	isLoading?: boolean
}

export const CommentsBlock: FC<CommentsBlockProps> = ({
	postId,
	items,
	children,
	isLoading = true,
}) => {
	const dispatch = useAppDispatch()

	const userFromLS = getUserFromLS()

	const onClickRemove = (commentId: string) => {
		if (window.confirm('Do you really want to delete your comment?')) {
			dispatch(fetchRemoveComment({ postId, commentId }))
		}
	}

	return (
		<SideBlock title='Comments'>
			<List>
				{(isLoading ? [...Array(5)] : items).map((obj, index) => (
					<React.Fragment key={index}>
						<ListItem alignItems='flex-start'>
							<ListItemAvatar>
								{isLoading ? (
									<Skeleton variant='circular' width={40} height={40} />
								) : (
									<Avatar alt={obj.user.fullName} src={obj.user.avatarUrl} />
								)}
							</ListItemAvatar>
							{isLoading ? (
								<div style={{ display: 'flex', flexDirection: 'column' }}>
									<Skeleton variant='text' height={25} width={120} />
									<Skeleton variant='text' height={18} width={230} />
								</div>
							) : (
								<ListItemText
									primary={obj.user.fullName}
									secondary={obj.text}
								/>
							)}
							{userFromLS.id === obj?.user.id && (
								<IconButton
									onClick={() => onClickRemove(obj._id)}
									color='secondary'
								>
									<DeleteIcon />
								</IconButton>
							)}
						</ListItem>
						<Divider variant='inset' component='li' />
					</React.Fragment>
				))}
			</List>
			{children}
		</SideBlock>
	)
}
