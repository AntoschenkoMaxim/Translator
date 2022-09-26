import React from 'react'
import classes from './FavouriteItem.module.css'
import { TbArrowRight } from 'react-icons/tb'

const FavouriteItem = ({ favouriteItem }) => {

	return (
		<div className={classes.translation__block}>
			<div className={classes.translation__container}>
				<div className={classes.translation__body}>
					<div className={classes.container}>
						<div className={classes.input__block}>
							<div className={classes.translation__inputLanguage}>{favouriteItem.inputLanguage}</div>
							<div className={classes.translation__textForTranslation}>{favouriteItem.textForTranslation}</div>
						</div>
						<div className={classes.container__icon}><TbArrowRight className={classes.translation__icon} /></div>
						<div className={classes.output__block}>
							<div className={classes.translation__translatedText}>{favouriteItem.translatedText}</div>
							<div className={classes.translation__outputLanguage}>{favouriteItem.outputLanguage}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FavouriteItem