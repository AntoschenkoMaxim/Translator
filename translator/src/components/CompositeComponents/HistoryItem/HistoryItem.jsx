import React from 'react'
import classes from './HistoryItem.module.css'
import { TbArrowRight } from 'react-icons/tb'

const HistoryItem = ({ historyItem }) => {

	return (
		<div className={classes.translation__block}>
			<div className={classes.translation__container}>
				<div className={classes.translation__body}>
					<div className={classes.container}>
						<div className={classes.input__block}>
							<div className={classes.translation__inputLanguage}>{historyItem.inputLanguage}</div>
							<div className={classes.translation__textForTranslation}>{historyItem.textForTranslation}</div>
						</div>
						<div className={classes.container__icon}><TbArrowRight className={classes.translation__icon} /></div>
						<div className={classes.output__block}>
							<div className={classes.translation__translatedText}>{historyItem.translatedText}</div>
							<div className={classes.translation__outputLanguage}>{historyItem.outputLanguage}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HistoryItem