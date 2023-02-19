import React, { useState } from 'react'
import Navbar from '../components/navbar'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
export const UserLikesContext = React.createContext<{
	userLikes: { [userlike: string]: number }
	setUserLikes: React.Dispatch<
		React.SetStateAction<{ [userlike: string]: number }>
	>
}>({
	userLikes: {},
	setUserLikes: () => {},
})
function MyApp({ Component, pageProps }: AppProps) {
	const [userLikes, setUserLikes] = useState<{ [userlike: string]: number }>(
		{}
	)
	return (
		<div className="bg-white min-h-screen">
			<Navbar />
			<UserLikesContext.Provider value={{ userLikes, setUserLikes }}>
				<Component {...pageProps} />
			</UserLikesContext.Provider>
		</div>
	)
}

export default MyApp
