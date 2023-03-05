const demoMap = (arr) => {
	const newArr = []
	for (let i = 0; i < arr.length; i++) {
		newArr.push({ params: { id: arr[i] } })
	}
	return newArr
}
//[{params:{id: val}}]
console.log(demoMap([1, 2, 3]))
console.log(
	[1, 2, 3].map((val) => {
		return { params: { id: val } }
	})
)
