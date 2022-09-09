import React from 'react'
import classes from './PageError.module.css'
import { Link } from 'react-router-dom'
import img from '../../../images/not-found.svg'

const PageError = () => {
	return (
		<div className={classes.error}>
			<img src={img} alt='not found' className={classes.error__image} />
			<h3 className={classes.error__title}>Ohh! Page not found!</h3>
			<p className={classes.error__subtitle}>This page could not be found.</p>
			<Link to='/' className={classes.error__link}>Back</Link>
		</div>
	)
}

export default PageError