import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRegister, selectAuth } from '../../redux/slices/auth'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'

import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'

import styles from './Login.module.scss'

export const Registration = () => {
	const dispatch = useDispatch()
	const isAuth = useSelector(selectAuth)

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			fullName: 'Leonardo DiCaprio',
			email: 'leo@gmail.com',
			password: '123456',
		},
		mode: 'onChange',
	})

	const onSubmit = async values => {
		const data = await dispatch(fetchRegister(values))

		if (!data.payload) {
			alert('Wrong email or password')
		}

		if ('token' in data.payload) {
			const user = JSON.stringify({
				fullName: data.payload.fullName,
				avatarUrl: data.payload.avatarUrl,
			})

			window.localStorage.setItem('user', user)
			window.localStorage.setItem('token', data.payload.token)
		}
	}

	if (isAuth) {
		return <Navigate to='/' />
	}

	return (
		<Paper classes={{ root: styles.root }}>
			<Typography classes={{ root: styles.title }} variant='h5'>
				Create an account
			</Typography>
			<div className={styles.avatar}>
				<Avatar sx={{ width: 100, height: 100 }} />
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					{...register('fullName', { required: 'Enter your full name' })}
					error={Boolean(errors.fullName?.message)}
					helperText={errors.fullName?.message}
					className={styles.field}
					label='Full name'
					fullWidth
				/>
				<TextField
					className={styles.field}
					type='email'
					label='E-Mail'
					{...register('email', { required: 'Enter your email' })}
					error={Boolean(errors.email?.message)}
					helperText={errors.email?.message}
					fullWidth
				/>
				<TextField
					className={styles.field}
					label='Password'
					{...register('password', { required: 'Enter your password' })}
					error={Boolean(errors.password?.message)}
					helperText={errors.password?.message}
					fullWidth
				/>
				<Button
					disabled={!isValid}
					type='submit'
					size='large'
					variant='contained'
					fullWidth
				>
					Sign up
				</Button>
			</form>
		</Paper>
	)
}
