import { FC, useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import { GetStaticPaths, GetStaticProps } from 'next'
interface Params {
	username: string
	// ...
}
interface Props {
	user: UserDetails
	// ...
}
const Leaderboard: FC = () => {
	const [leaderboard, setLeaderboard] = useState<UserDetails[]>([])

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
			<div className="sticky top-0 bg-white z-10 text-center">
				<h1 className="text-5xl font-bold m-3">Leaderboard</h1>
			</div>
			<div className="w-full h-160 mb-100 flex flex-col items-center justify-center space-y-12 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
				<ul className="space-y-4 ">
					{leaderboard.map((user: UserDetails) => (
						<li
							key={user.username}
							className="flex items-center space-x-4  cursor-pointer hover:bg-gray-100 p-4 rounded-lg transition-colors duration-200 ease-in-out"
						>
							<Link
								className="text-white bg-gradient-to-r from-fuchsia-700 to-fuchsia-700
                                       bg-no-repeat [background-position:0_88%]
                                       [background-size:100%_0.2em]
                                       motion-safe:transition-all motion-safe:duration-200
                                       hover:[background-size:100%_100%]
                                       focus:[background-size:100%_100%]"
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
									<div className="text-lg card-title font-semibold">
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

// const fetchLeaderboard = async () => {
// 	const res = await fetch('/api/leaderboard')
// 	const data = await res.json()
// 	return data
// }
// export const getStaticPaths: GetStaticPaths = async () => {
// 	const characters = await fetchLeaderboard()
// 	const paths = characters.leaderboard.map((user: UserDetails) => ({
// 		params: { username: user.username },
// 	}))
// 	return {
// 		paths,
// 		fallback: false,
// 	}
// }

// export const getStaticProps: GetStaticProps = async ({ params }) => {
// 	const username = params?.username
// 	const res = await fetch(`/api/profile?username=${username}`)
// 	const data = await res.json()
// 	return {
// 		props: {
// 			user: data.user,
// 		},
// 	}
// }
export default Leaderboard
