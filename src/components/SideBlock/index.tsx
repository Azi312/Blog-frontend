import React, { FC, PropsWithChildren } from 'react'
import styles from './SideBlock.module.scss'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'

interface SideBlockProps {
	title: string
}

export const SideBlock: FC<PropsWithChildren<SideBlockProps>> = ({
	title,
	children,
}) => {
	return (
		<Paper classes={{ root: styles.root }}>
			<Typography variant='h6' classes={{ root: styles.title }}>
				{title}
			</Typography>
			{children}
		</Paper>
	)
}
