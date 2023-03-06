import { FC, useEffect, useState, useContext } from 'react'
import fetchData from '../../lib/api'
import Image from 'next/image'
import { Button } from 'antd'
import { LikeOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'

interface ProfileData {
	username: string
	profileImage?: string
}

const User: FC<{ user: ProfileData }> = () => {
	const router = useRouter()
	let username = router.query.username as string

	const [userLikes, setUserLikes] = useState<{ [key: string]: number }>(
		() => {
			// Initialize user likes from local storage, or set to an empty object if not found
			if (typeof window !== 'undefined') {
				const storedLikes = localStorage.getItem('userLikes')
				return storedLikes ? JSON.parse(storedLikes) : {}
			} else {
				return {}
			}
		}
	)
	const [isLike, setIsLike] = useState<{ [key: string]: boolean }>(() => {
		// Initialize "isLike" status from local storage, or set to false for all users if not found
		if (typeof window !== 'undefined') {
			const storedIsLikes = localStorage.getItem('isLike')
			if (storedIsLikes) {
				return JSON.parse(storedIsLikes)
			} else {
				const initialLikes = username ? { [username]: false } : {}
				return initialLikes
			}
		} else {
			const initialLikes = username ? { [username]: false } : {}
			return initialLikes
		}
	})

	// Add useEffect to check if running in the client and update state

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
		localStorage.setItem('userLikes', JSON.stringify(userLikes))
		localStorage.setItem('isLike', JSON.stringify(isLike))
	}, [userLikes, isLike])
	return (
		<>
			<div className="w-full h-80 flex flex-col items-center justify-center space-y-12 ">
				<h1 className="text-4xl font-bold mt-40">User</h1>

				<Image
					width="100"
					height="100"
					src={`/users/${username}.png`}
					alt={username || ''}
				/>

				<div>{username}</div>
				<Button
					className={isLike[username] ? 'bg-indigo-500' : ''}
					icon={<LikeOutlined />}
					onClick={handleLikeClick}
				>
					Like {userLikes[username] || 0}
				</Button>
				<Button onClick={() => router.push('/leaderboard')}>
					Back to Leaderboard
				</Button>
			</div>
		</>
	)
}

export async function getStaticPaths() {
	// Return a list of possible value for id
	const profiles = await fetchData('leaderboard')
	console.log(profiles)
	const paths = profiles.leaderboard.map((profile: any) => ({
		params: { username: profile.username.toString() },
	}))

	console.log(paths)
	return {
		paths,
		fallback: false,
	}
}

export async function getStaticProps({ params }: any) {
	// Fetch necessary data for the blog post using params.id
	const id = params?.username
	const user = await fetchData(`profile/${id}`)
	console.log(user)
	return {
		props: {
			user,
		},
	}
}
export default User
