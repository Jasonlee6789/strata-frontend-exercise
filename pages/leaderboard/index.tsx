import { FC, useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
const Leaderboard: FC = () => {
	const [leaderboard, setLeaderboard] = useState([])

	const fetchLeaderboard = async () => {
		try {
			const response = await axios.get('/api/leaderboard')
			setLeaderboard(response.data.leaderboard)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchLeaderboard()
		const intervalId = setInterval(fetchLeaderboard, 20000)
		return () => clearInterval(intervalId)
	}, [])
	return (
		<>
			<div className="w-full h-80 flex flex-col items-center justify-center space-y-12">
				<h1 className="text-4xl font-bold">Leaderboard</h1>

				<ul>
					{leaderboard.map((user: UserDetails) => (
						<li
							key={user.username}
							className="flex items-center space-x-4"
						>
							<Link
								href={{
									pathname: `/profile/${user.username}`,
									query: {
										profileImage: user.profileImage,
										username: user.username,
									},
								}}
							>
								<Image
									width="100"
									height="100"
									src={`${user.profileImage}`}
									alt={user.username}
								/>
								<div>{user.username}</div>
							</Link>
						</li>
					))}
				</ul>
				<p>
					All leaderboard entries should be links to user profile
					page.
				</p>
			</div>
		</>
	)
}

export default Leaderboard
