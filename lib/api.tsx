import axios from 'axios'

const fetchData = async (endpoint: string) => {
	const res = await axios(`http://localhost:3000/api/${endpoint}`)
	const data = await res.data
	return data
}

export default fetchData
