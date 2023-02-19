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
			<div className="w-full h-160 mb-100 flex flex-col items-center justify-center space-y-12 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
				<h1 className="text-4xl font-bold">Leaderboard</h1>

				<ul className="space-y-4 ">
					{leaderboard.map((user: UserDetails) => (
						<li
							key={user.username}
							className="flex items-center space-x-4  cursor-pointer hover:bg-gray-100 p-4 rounded-lg transition-colors duration-200 ease-in-out"
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
								<div className="flex items-center space-x-4">
									<Image
										width="100"
										height="100"
										src={`${user.profileImage}`}
										alt={user.username}
										className="rounded-full object-cover"
									/>
									<div className="text-lg font-semibold">
										{user.username}
									</div>
								</div>
							</Link>
						</li>
					))}
				</ul>
				<p className="text-center">
					All leaderboard entries should be links to user profile
					page.
				</p>
			</div>
		</>
	)
}

export default Leaderboard
