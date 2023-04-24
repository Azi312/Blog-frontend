import React from 'react'
import { useNavigate, Navigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAuth } from '../../redux/slices/auth'

import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import SimpleMDE from 'react-simplemde-editor'

import 'easymde/dist/easymde.min.css'
import styles from './AddPost.module.scss'
import axios from '../../axios'

export const AddPost = () => {
	const navigate = useNavigate()
	const { id } = useParams()

	const [text, setText] = React.useState('')
	const [loading, setLoading] = React.useState(false)
	const [title, setTitle] = React.useState('')
	const [tags, setTags] = React.useState('')
	const [imageUrl, setImageUrl] = React.useState('')
	const inputFileRef = React.useRef(null)

	const isEditing = Boolean(id)

	const isAuth = useSelector(selectAuth)

	const handleChangeFile = async event => {
		try {
			const formData = new FormData()
			const file = event.target.files[0]
			formData.append('image', file)
			const { data } = await axios.post('/upload', formData)
			setImageUrl(data.url)
			console.log(data.url)
		} catch (error) {
			console.warn(error)
			alert('Error while uploading image. Try again later.')
		}
	}

	const onClickRemoveImage = () => {
		setImageUrl('')
	}

	const onSubmit = async () => {
		try {
			setLoading(true)
			const fields = {
				title,
				tags,
				text,
				imageUrl,
			}

			const { data } = isEditing
				? await axios.patch(`/posts/${id}`, fields)
				: await axios.post('/posts', fields)
			const _id = isEditing ? id : data._id

			navigate(`/posts/${_id}`)
		} catch (error) {
			console.warn(error)
			alert('Error while creating post. Try again later.')
		}
	}

	const onChange = React.useCallback(value => {
		setText(value)
	}, [])

	React.useEffect(() => {
		if (id) {
			axios
				.get(`/posts/${id}`)
				.then(res => {
					setTitle(res.data.title)
					setTags(res.data.tags.join(', '))
					setText(res.data.text)
					setImageUrl(res.data.imageUrl)
				})
				.catch(err => {
					console.log(err)
					alert('Error while loading post. Try again later.')
				})
		}
	}, [id])

	const options = React.useMemo(
		() => ({
			spellChecker: false,
			maxHeight: '400px',
			autofocus: true,
			placeholder: 'Write your post here...',
			status: false,
			autosave: {
				enabled: true,
				delay: 1000,
			},
		}),
		[]
	)

	if (!window.localStorage.getItem('token') && !isAuth) {
		return <Navigate to='/' />
	}

	return (
		<Paper style={{ padding: 30 }}>
			<Button
				onClick={() => inputFileRef.current.click()}
				variant='outlined'
				size='large'
			>
				Download previews
			</Button>
			<input
				ref={inputFileRef}
				type='file'
				onChange={handleChangeFile}
				name='image'
				hidden
			/>
			{imageUrl && (
				<>
					<Button
						variant='contained'
						color='error'
						onClick={onClickRemoveImage}
					>
						Delete
					</Button>
					<img className={styles.image} src={imageUrl} alt='Uploaded' />
				</>
			)}
			<br />
			<br />
			<TextField
				value={title}
				onChange={e => setTitle(e.target.value)}
				classes={{ root: styles.title }}
				variant='standard'
				placeholder='Title...'
				fullWidth
			/>
			<TextField
				value={tags}
				onChange={e => setTags(e.target.value)}
				classes={{ root: styles.tags }}
				variant='standard'
				placeholder='Tags...'
				fullWidth
			/>
			<SimpleMDE
				className={styles.editor}
				value={text}
				onChange={onChange}
				options={options}
			/>
			<div className={styles.buttons}>
				<Button onClick={onSubmit} size='large' variant='contained'>
					{isEditing ? 'Update' : 'Publish'}
				</Button>
				<a href='/'>
					<Button size='large'>Cancel</Button>
				</a>
			</div>
		</Paper>
	)
}
