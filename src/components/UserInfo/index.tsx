import React, { FC } from 'react'
import styles from './UserInfo.module.scss'

type UserInfoProps = {
	avatarUrl: string
	fullName?: string
	additionalText: string
}

export const UserInfo: FC<UserInfoProps> = ({
	avatarUrl,
	fullName,
	additionalText,
}) => {
	return (
		<div className={styles.root}>
			<img
				className={styles.avatar}
				src={avatarUrl || '/noavatar.png'}
				alt={fullName}
			/>
			<div className={styles.userDetails}>
				<span className={styles.userName}>{fullName}</span>
				<span className={styles.additional}>{additionalText}</span>
			</div>
		</div>
	)
}
