import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Clear'
import EditIcon from '@mui/icons-material/Edit'
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'

import styles from './Post.module.scss'
import { useAppDispatch } from '../../redux/store'
import { UserInfo } from '../UserInfo'
import { PostSkeleton } from './Skeleton'
import { fetchRemovePost } from '../../redux/slices/posts/posts'
import { getUserFromLS } from '../../utils/getUserFromLS'

interface PostProps {
	id: string
	title: string
	createdAt: string
	imageUrl: string
	user: {
		_id: string
		fullName: string
		avatarUrl: string
	}
	userId?: string
	viewsCount: number
	commentsCount: number
	tags: string[]
	children?: React.ReactNode
	isFullPost?: boolean
	isLoading?: boolean
	isEditable?: boolean
}

export const Post: FC<PostProps> = ({
	id,
	title,
	createdAt,
	imageUrl,
	user,
	userId,
	viewsCount,
	commentsCount,
	tags,
	children,
	isFullPost,
	isLoading,
	isEditable,
}) => {
	const dispatch = useAppDispatch()
	const userFromLS = getUserFromLS()

	const idUser = userFromLS.id === userId ? true : false

	const onClickRemove = () => {
		if (window.confirm('Do you really want to delete this post?')) {
			dispatch(fetchRemovePost(id))
		}
	}

	if (isLoading) {
		return <PostSkeleton />
	}

	return (
		<div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
			{idUser && (
				<div className={styles.editButtons}>
					<Link to={`/posts/${id}/edit`}>
						<IconButton color='primary'>
							<EditIcon />
						</IconButton>
					</Link>
					<IconButton onClick={onClickRemove} color='secondary'>
						<DeleteIcon />
					</IconButton>
				</div>
			)}
			{imageUrl && (
				<img
					className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
					src={imageUrl}
					alt={title}
				/>
			)}
			<div className={styles.wrapper}>
				<UserInfo {...user} additionalText={createdAt} />
				<div className={styles.indention}>
					<h2
						className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
					>
						{isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
					</h2>
					<ul className={styles.tags}>
						{tags.map(name => (
							<li key={name}>
								<Link to={`/tag/${name}`}>#{name}</Link>
							</li>
						))}
					</ul>
					{children && <div className={styles.content}>{children}</div>}
					<ul className={styles.postDetails}>
						<li>
							<EyeIcon />
							<span>{viewsCount}</span>
						</li>
						<li>
							<CommentIcon />
							<span>{commentsCount}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
