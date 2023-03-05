import { LoremIpsum } from 'lorem-ipsum'
import { NextApiRequest, NextApiResponse } from 'next'
var randomProfile = require('random-profile-generator')

const lorem = new LoremIpsum({
	sentencesPerParagraph: {
		max: 8,
		min: 4,
	},
	wordsPerSentence: {
		max: 16,
		min: 4,
	},
})

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<ProfileData>
) {
	const username = req.query.id as string
	const { age, twitter, email, birthday } = randomProfile.profile()
	const bio = lorem.generateParagraphs(1)

	const profileData: ProfileData = {
		username,
		bio,
		age,
		twitter,
		email,
		birthday,
	}

	res.status(200).json(profileData)
}
