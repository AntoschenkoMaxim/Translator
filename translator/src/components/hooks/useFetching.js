import { useState } from "react"

export const useFetching = (callback) => {

	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState('')

	const fetching = async (...args) => {
		try {
			setIsLoading(true)
			await callback(...args)
		} catch (error) {
			setIsError(error.message)
		}
		finally {
			setIsLoading(false)
		}
	}

	return [fetching, isLoading, isError]
}