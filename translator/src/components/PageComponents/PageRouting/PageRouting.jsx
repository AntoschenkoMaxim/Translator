import React from 'react'
import Card from '../../UIComponents/Card/Card'
import classes from './PageRouting.module.css'
import { MdOutlineGTranslate, MdStarOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const PageRouting = () => {

	const navigate = useNavigate()

	return (
		<div className={classes.container}>
			<Card>
				<div onClick={() => navigate('/translator')} className={classes.card__content}>
					<div><MdOutlineGTranslate className={classes.card__icon} /></div>
					<div className={classes.card__text}>Translate</div>
				</div>
			</Card>
			<Card>
				<div onClick={() => navigate('/favourites')} className={classes.card__content}>
					<div><MdStarOutline className={classes.card__icon} /></div>
					<div className={classes.card__text}>Favourites</div>
				</div>
			</Card>
		</div>

	)
}

export default PageRouting