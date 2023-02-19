import { FC, useEffect, useState, useContext } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { Button } from 'antd'
import { LikeOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { UserLikesContext } from '../../pages/_app'
const User: FC = () => {
	const { userLikes, setUserLikes } = useContext(UserLikesContext)

	const router = useRouter()
	let { username, profileImage = '' } = router.query

	// Add useEffect to check if running in the client and update state
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const params = new URLSearchParams(window.location.search)
			username = params.get('username') as string
			profileImage = params.get('profileImage') as string
		}
	}, [])
	const incrementUserLike = (username: string) => {
		setUserLikes((prevLikes) => ({
			...prevLikes,
			[username]: (prevLikes[username] || 0) + 1,
		}))
	}
	const [profileData, setProfileData] = useState<ProfileData>()
	const fetchProfileData = async () => {
		try {
			const response = await axios.get(`/api/profile/${username}`)

			setProfileData(response.data)
		} catch (error) {
			console.error(error)
		}
	}
	const handleLikeClick = () => {
		// Increment the number of likes for this user
		incrementUserLike(username as string)
	}
	useEffect(() => {
		fetchProfileData()
	}, [])

	useEffect(() => {
		// Initialize user likes from local storage
		const likesFromStorage = localStorage.getItem('userLikes')
		if (likesFromStorage) {
			setUserLikes(JSON.parse(likesFromStorage))
		}
	}, [])

	useEffect(() => {
		// Save user likes to local storage whenever it changes
		localStorage.setItem('userLikes', JSON.stringify(userLikes))
	}, [userLikes])
	return (
		<>
			<div className="w-full h-80 flex flex-col items-center justify-center space-y-12">
				<h1 className="text-4xl font-bold">User</h1>
				{profileImage && (
					<Image
						width="100"
						height="100"
						src={`${profileImage}`}
						alt={profileData?.username || ''}
					/>
				)}
				<div>{profileData?.username}</div>
				<Button icon={<LikeOutlined />} onClick={handleLikeClick}>
					Like {userLikes[username as string]}
				</Button>
			</div>
		</>
	)
}

export default User
