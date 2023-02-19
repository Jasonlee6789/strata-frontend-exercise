import React, { useState } from 'react'
import Navbar from '../components/navbar'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
export const UserLikesContext = React.createContext<{
	userLikes: { [username: string]: number }
	setUserLikes: React.Dispatch<
		React.SetStateAction<{ [username: string]: number }>
	>
	isLike: { [username: string]: boolean }
	setIsLike: React.Dispatch<
		React.SetStateAction<{ [username: string]: boolean }>
	>
}>({
	userLikes: {},
	setUserLikes: () => {},
	isLike: {},
	setIsLike: () => {},
})
function MyApp({ Component, pageProps }: AppProps) {
	const [userLikes, setUserLikes] = useState<{ [username: string]: number }>(
		{}
	)
	const [isLike, setIsLike] = useState<{ [username: string]: boolean }>({})
	return (
		<div className="bg-white min-h-screen">
			<Navbar />
			<UserLikesContext.Provider
				value={{ userLikes, setUserLikes, isLike, setIsLike }}
			>
				<Component {...pageProps} />
			</UserLikesContext.Provider>
		</div>
	)
}

export default MyApp
