import { FC, useEffect, useState, useContext } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { Button } from 'antd'
import { LikeOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { UserLikesContext } from '../../pages/_app'
const User: FC = () => {
	const { userLikes, setUserLikes, isLike, setIsLike } =
		useContext(UserLikesContext)
	// let localUser = user[`/api/profile/${username}`]
	const router = useRouter()
	let username = router.query.username as string
	let profileImage = (router.query.profileImage as string) || ''

	// Add useEffect to check if running in the client and update state
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const params = new URLSearchParams(window.location.search)
			username = params.get('username') as string
			profileImage = params.get('profileImage') as string
		}
	}, [])

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
		if (isLike[username]) {
			setUserLikes((prevLikes) => ({
				...prevLikes,
				[username]: (prevLikes[username] || 0) - 1,
			}))
			setIsLike((prevIsLikes) => ({
				...prevIsLikes,
				[username]: false,
			}))
		} else {
			setUserLikes((prevLikes) => ({
				...prevLikes,
				[username]: (prevLikes[username] || 0) + 1,
			}))
			setIsLike((prevIsLikes) => ({
				...prevIsLikes,
				[username]: true,
			}))
		}
	}
	useEffect(() => {
		// Read user likes from local storage if available
		const storedLikes = localStorage.getItem('userLikes')
		const storedIsLikes = localStorage.getItem('isLike')
		if (storedLikes) {
			setUserLikes(JSON.parse(storedLikes))
		}
		if (storedIsLikes) {
			setIsLike(JSON.parse(storedIsLikes))
		}
	}, [setUserLikes, setIsLike])

	useEffect(() => {
		const handleUnload = () => {
			localStorage.setItem('userLikes', JSON.stringify(userLikes))
			localStorage.setItem('isLike', JSON.stringify(isLike))
		}

		window.addEventListener('beforeunload', handleUnload)

		return () => {
			window.removeEventListener('beforeunload', handleUnload)
		}
	}, [userLikes, isLike])

	useEffect(() => {
		fetchProfileData()
	}, [])
	return (
		<>
			<div className="w-full h-80 flex flex-col items-center justify-center space-y-12 ">
				<h1 className="text-4xl font-bold mt-40">User</h1>
				{profileImage && (
					<Image
						width="100"
						height="100"
						src={`${profileImage}`}
						alt={profileData?.username || ''}
					/>
				)}
				<div>{profileData?.username}</div>
				<Button
					className={isLike[username] ? 'bg-indigo-500' : ''}
					icon={<LikeOutlined />}
					onClick={handleLikeClick}
				>
					Like {userLikes[username]}
				</Button>
				<Button onClick={() => router.push('/leaderboard')}>
					Back to Leaderboard
				</Button>
			</div>
		</>
	)
}

export default User
