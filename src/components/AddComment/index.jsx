import React, { useEffect } from 'react'

import styles from './AddComment.module.scss'

import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'

import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../../redux/slices/posts'
import { useNavigate, Navigate, useParams } from 'react-router-dom'
import axios from '../../axios'
import { getUserFromLS } from '../../utils/getUserFromLS'

export const Index = ({ isAddingComment, fetchFullPost }) => {
	const [text, setText] = React.useState('')
	const { id } = useParams()

	const { posts } = useSelector(state => state.posts)
	const userData = useSelector(state => state.auth.data)
	const dispatch = useDispatch()

	const user = getUserFromLS()

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			// isAddingComment.current = true
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
		} finally {
			// isAddingComment.current = false
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
