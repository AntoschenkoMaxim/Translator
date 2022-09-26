import React from 'react'
import HistoryItem from '../HistoryItem/HistoryItem'
import classes from './HistoryList.module.css'

const HistoryList = ({ historyItems, title }) => {

	return (
		<div className={classes.container}>
			{historyItems.length ? <div className={classes.relative}><div className={classes.translation__title}>{title}</div></div> : <div className={classes.translation__title}>Translation history is empty!</div>}
			<div className={classes.translation__block}>
				{historyItems?.map((historyItem, index) =>
					<HistoryItem number={index + 1} historyItem={historyItem} key={historyItem.id} />
				)}
			</div>
		</div>
	)
}

export default HistoryList