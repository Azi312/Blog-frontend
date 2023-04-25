import React, { FC } from 'react'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import TagIcon from '@mui/icons-material/Tag'
import ListItemText from '@mui/material/ListItemText'
import Skeleton from '@mui/material/Skeleton'

import { SideBlock } from './SideBlock'

interface TagsBlockProps {
	items: string[]
	isLoading?: boolean
	onFilterChange: (tag: string) => void
}

export const TagsBlock: FC<TagsBlockProps> = ({
	items,
	isLoading = true,
	onFilterChange,
}) => {
	const handleClick = (tag: string) => {
		onFilterChange(tag)
	}

	return (
		<SideBlock title='Tags'>
			<List>
				{(isLoading ? [...Array(5)] : items).map((name, i) => (
					<div
						onClick={() => handleClick(name)}
						style={{ textDecoration: 'none', color: 'black' }}
						key={i}
					>
						<ListItem key={i} disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<TagIcon />
								</ListItemIcon>
								{isLoading ? (
									<Skeleton width={100} />
								) : (
									<ListItemText primary={name} />
								)}
							</ListItemButton>
						</ListItem>
					</div>
				))}
			</List>
		</SideBlock>
	)
}
