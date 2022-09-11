import { useCallback, useRef } from "react";

export default function useDebounce(callback, delay) {
	const timer = useRef()

	// функцию передаем только в том случае если callback или задержка изменились
	const debouncedCallback = useCallback((...args) => {
		if (timer.current) {
			clearTimeout(timer.current)
		}
		// делаем таймаут и если данная функция вызвалась еще раз, старый таймаут удаляем и задаем новый, таким образом перезаписываем таймаут
		timer.current = setTimeout(() => {
			callback(...args)
		}, delay)
	}, [callback, delay])

	return debouncedCallback
}
