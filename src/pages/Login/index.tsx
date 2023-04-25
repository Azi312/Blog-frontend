import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

import styles from './Login.module.scss'
import { useForm } from 'react-hook-form'
import { fetchAuth, selectAuth } from '../../redux/slices/auth'
import { useAppDispatch } from '../../redux/store'

interface Values {
	email: string
	password: string
}

export const Login = () => {
	const dispatch = useAppDispatch()
	const isAuth = useSelector(selectAuth)

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onChange',
	})

	const onSubmit = async (values: Values) => {
		const data = await dispatch(fetchAuth(values))

		if (!data.payload) {
			alert('Wrong email or password')
		}

		if ('token' in data.payload) {
			const user = JSON.stringify({
				id: data.payload._id,
				fullName: data.payload.fullName,
				avatarUrl: data.payload.avatarUrl,
			})

			window.localStorage.setItem('user', user)
			window.localStorage.setItem('token', data.payload.token)
		}
	}

	const isMounted = React.useRef(false)

	// React.useEffect(() => {
	// 	if (isMounted.current) {
	// 		const json = JSON.stringify(todos)
	// 		localStorage.setItem('todos', json)
	// 	}

	// 	isMounted.current = true
	// }, [todos])

	if (isAuth) {
		return <Navigate to='/' />
	}

	return (
		<Paper classes={{ root: styles.root }}>
			<Typography classes={{ root: styles.title }} variant='h5'>
				Login
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					className={styles.field}
					label='E-Mail'
					type='email'
					{...register('email', { required: 'Enter your email' })}
					error={Boolean(errors.email?.message)}
					helperText={errors.email?.message}
					fullWidth
				/>
				<TextField
					className={styles.field}
					label='Password'
					error={Boolean(errors.password?.message)}
					helperText={errors.password?.message}
					{...register('password', { required: 'Enter your password' })}
					fullWidth
				/>
				<Button
					disabled={!isValid}
					type='submit'
					size='large'
					variant='contained'
					fullWidth
				>
					Login
				</Button>
			</form>
		</Paper>
	)
}
