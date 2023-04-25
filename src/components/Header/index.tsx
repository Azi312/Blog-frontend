import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'

import styles from './Header.module.scss'
import Container from '@mui/material/Container'
import { useSelector, useDispatch } from 'react-redux'
import { logout, selectAuth } from '../../redux/slices/auth'

export const Header = () => {
	const isAuth = useSelector(selectAuth)
	const dispatch = useDispatch()

	const onClickLogout = () => {
		if (window.confirm('Have you really want to logout?')) {
			dispatch(logout())
			window.localStorage.removeItem('token')
			window.localStorage.removeItem('user')
		}
	}

	return (
		<div className={styles.root}>
			<Container maxWidth='lg'>
				<div className={styles.inner}>
					<Link className={styles.logo} to='/'>
						<div>BLOG</div>
					</Link>
					<div className={styles.buttons}>
						{isAuth ? (
							<>
								<Link to='/add-post'>
									<Button variant='contained'>Write an article</Button>
								</Link>
								<Button
									onClick={onClickLogout}
									variant='contained'
									color='error'
								>
									Log out
								</Button>
							</>
						) : (
							<>
								<Link to='/login'>
									<Button variant='outlined'>Login</Button>
								</Link>
								<Link to='/register'>
									<Button variant='contained'>Create an account</Button>
								</Link>
							</>
						)}
					</div>
				</div>
			</Container>
		</div>
	)
}
