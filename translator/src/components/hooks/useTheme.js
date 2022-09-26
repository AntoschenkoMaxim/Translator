import { useState, useLayoutEffect } from 'react'

const useTheme = () => {

	const [theme, setTheme] = useState('ligth')

	useLayoutEffect(() => {
		document.documentElement.setAttribute('data-theme', theme)
	}, [theme])

	return { theme, setTheme }

}

export default useTheme