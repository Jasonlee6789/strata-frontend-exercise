import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import fetchData from '../../lib/api'
const Leaderboard: FC<{ leaderboard: UserDetails[] }> = ({ users }: any) => {
	console.log(users)
	console.log(typeof users)
	return (
		<>
			<div className="sticky top-0 bg-white z-10 text-center">
				<h1 className="text-5xl font-bold m-3">Leaderboard</h1>
			</div>
			<div className="w-full h-160 mb-100 flex flex-col items-center justify-center space-y-12 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
				<ul className="space-y-4 ">
					{users.leaderboard.map((user: UserDetails) => (
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
								href={`/profile/${user.username}`}
							>
								<div className="flex items-center space-x-4">
									<Image
										width="100"
										height="100"
										src={user.profileImage}
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

export async function getStaticProps() {
	const users = await fetchData('leaderboard')
	console.log(users)
	return {
		props: {
			users,
		},
	}
}

export default Leaderboard
