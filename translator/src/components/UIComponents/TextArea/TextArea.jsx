import React from 'react'
import classes from './TextArea.module.css'
import Select from 'react-select'

const TextArea = ({
	selectedLanguage,
	setSelectedLanguage,
	languages,
	style,
	textForTranslation,
	setTextForTranslation,
	translatedText,
	setTranslatedText,
	detection,
	setDetection,
	debounce,
	...props }) => {

	const handleClick = () => {
		setTextForTranslation()
		setTranslatedText()
	}

	const handleChange = (e) => {
		setTextForTranslation(e.target.value)
		debounce(e.target.value)
	}

	return (
		<div className={style}>
			<Select value={selectedLanguage} onChange={setSelectedLanguage} options={languages} />
			<textarea
				placeholder={style === 'inputTextarea' ? 'Writing text...' : 'Translation'}
				type='text'
				className={classes.textarea}
				disabled={style === classes.outputTextarea}
				value={style === 'input' ? textForTranslation : translatedText}
				onChange={handleChange}
				{...props}
			/>
			{style === 'input' && (
				<div className={classes.delete} onClick={handleClick}></div>
			)}
		</div>
	)
}

export default TextArea