import React from 'react'
import { useState } from 'react'
import FavouriteList from '../../CompositeComponents/FavouriteList/FavouriteList'
import TranslationFilter from '../../CompositeComponents/TranslationFilter/TranslationFilter'
import { useItems } from '../../hooks/useItems'
import { useLocalStorageCustom } from '../../hooks/useLocalStorage'
import useLocalStorage from 'use-local-storage'
import classes from './PageFavourites.module.css'
import { BsLightningChargeFill, BsLightningCharge } from 'react-icons/bs'

const PageFavourites = () => {

	const [favouriteItems, setFavouriteItems] = useLocalStorageCustom('favouriteItems', [])
	const [filter, setFilter] = useState({ sort: '', query: '' })

	const sortedAndSearchedItems = useItems(favouriteItems, filter.sort, filter.query)
	const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

	const switchTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light'
		setTheme(newTheme)
	}

	return (
		<div className='page' data-theme={theme}>
			<div className={classes.theme} onClick={switchTheme}>{theme === 'dark' ? <BsLightningCharge className={classes.theme__icon} /> : <BsLightningChargeFill className={classes.theme__icon} />}</div>
			<TranslationFilter filter={filter} setFilter={setFilter} title='Filters' button='Translator' path='/' />
			<FavouriteList favouriteItems={sortedAndSearchedItems} title='Favourite history:' />
		</div>
	)
}

export default PageFavourites