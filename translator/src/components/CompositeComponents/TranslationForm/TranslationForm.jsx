import React from 'react'
import classes from './TranslationForm.module.css'
import TextArea from '../../UIComponents/TextArea/TextArea'
import { TbSwitchHorizontal } from 'react-icons/tb'


const TranslationForm = ({
	languages,
	textForTranslation,
	setTextForTranslation,
	translatedText,
	setTranslatedText,
	inputLanguage,
	outputLanguage,
	setInputLanguage,
	setOutputLanguage,
	detect,
	debounce,
	createFavouriteItem,
	createHistoryItem,
}) => {

	const handleSwitch = () => {
		setInputLanguage({ value: outputLanguage.value, label: outputLanguage.label })
		setOutputLanguage({ value: inputLanguage.value, label: inputLanguage.label })
		setTextForTranslation(translatedText)
		setTranslatedText(textForTranslation)
	}

	return (
		<form>
			<div className={classes.translate__form}>
				<div className={classes.translate__switch}>
					<TextArea
						style='inputTextarea'
						type='text'
						inputLanguage={inputLanguage}
						outputLanguage={outputLanguage}
						setSelectedLanguage={setInputLanguage}
						languages={languages}
						textForTranslation={textForTranslation}
						setTextForTranslation={setTextForTranslation}
						setTranslatedText={setTranslatedText}
						debounce={debounce}
						detect={detect}
						createFavouriteItem={createFavouriteItem}
						createHistoryItem={createHistoryItem}
					/>
					<div className={classes.translate__container} onClick={handleSwitch}><TbSwitchHorizontal className={classes.translate__icon} /></div>
					<TextArea
						style='outputTextarea'
						type='text'
						textForTranslation={textForTranslation}
						setTextForTranslation={setTextForTranslation}
						inputLanguage={inputLanguage}
						outputLanguage={outputLanguage}
						setSelectedLanguage={setOutputLanguage}
						languages={languages}
						translatedText={translatedText}
						setTranslatedText={setTranslatedText}
						createFavouriteItem={createFavouriteItem}
						createHistoryItem={createHistoryItem}
					/>
				</div>
			</div>
		</form >
	)
}

export default TranslationForm