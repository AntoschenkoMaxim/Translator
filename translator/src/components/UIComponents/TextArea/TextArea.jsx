import React from 'react'
import classes from './TextArea.module.css'

const TextArea = (props) => {
	return (
		<textarea
			type='text'
			className={classes.textarea}
			{...props}
		/>
	)
}

export default TextArea