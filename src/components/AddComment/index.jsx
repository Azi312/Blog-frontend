import React, { useEffect } from 'react'

import styles from './AddComment.module.scss'

import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'

import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, fetchComments } from '../../redux/slices/posts'
import { useNavigate, Navigate, useParams } from 'react-router-dom'
import axios from '../../axios'
import { getUserFromLS } from '../../utils/getUserFromLS'

export const Index = () => {
	const [text, setText] = React.useState('')
	const { id } = useParams()

	const userData = useSelector(state => state.auth.data)
	const dispatch = useDispatch()

	const avatarUrl = getUserFromLS()

	const handleSubmit = async () => {
		try {
			const response = await axios.post(
				`/posts/${id}/comments`,
				{
					text,
					user: userData._id,
					fullName: userData.fullName,
					avatarUrl: userData.avatarUrl,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
					},
				}
			)

			setText('')
			dispatch(fetchPosts())
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
				<Avatar classes={{ root: styles.avatar }} src={avatarUrl} />
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
