import React, { FC } from 'react'

import styles from './AddComment.module.scss'

import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'

import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import axios from '../../axios'
import { getUserFromLS } from '../../utils/getUserFromLS'
import { authSelector } from '../../redux/slices/auth'

interface AddCommentProps {
	fetchFullPost: () => void
}

export const Index: FC<AddCommentProps> = ({ fetchFullPost }) => {
	const [text, setText] = React.useState<string>('')
	const { id } = useParams()

	const userData = useSelector(authSelector)

	const user = getUserFromLS()

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		try {
			await axios.post(`/posts/${id}/comments`, {
				text,
				user: {
					id: userData._id,
					fullName: userData.fullName,
					avatarUrl: userData.avatarUrl,
				},
			})

			setText('')
			fetchFullPost()
		} catch (error) {
			if (!userData) {
				alert('You need to login first')
				return
			}
			console.log(error)
			alert('Something went wrong')
		}
	}

	return (
		<>
			<div className={styles.root}>
				<Avatar classes={{ root: styles.avatar }} src={user.avatarUrl} />
				<form onSubmit={handleSubmit} className={styles.form}>
					<TextField
						value={text}
						onChange={e => setText(e.target.value)}
						label='Write a comment'
						variant='outlined'
						maxRows={10}
						multiline
						fullWidth
					/>
					<Button type='submit' variant='contained'>
						Send
					</Button>
				</form>
			</div>
		</>
	)
}
