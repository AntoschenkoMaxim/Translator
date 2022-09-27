import React from 'react'
import FavouriteItem from '../FavouriteItem/FavouriteItem'
import classes from './FavouriteList.module.css'

const FavouriteList = ({ favouriteItems, title }) => {

	return (
		<div className={classes.container}>
			{favouriteItems?.length ? <div><div className={classes.translation__title}>{title}</div></div> : <div className={classes.translation__title}>Favourite is empty!</div>}
			<div className={classes.translation__block}>
				{favouriteItems?.map((favouriteItem, index) =>
					<FavouriteItem number={index + 1} favouriteItem={favouriteItem} key={index} />
				)}
			</div>
		</div>
	)
}

export default FavouriteList