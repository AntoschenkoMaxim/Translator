import React from 'react'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import Input from '../../UIComponents/Input/Input'
import classes from './TranslationFilter.module.css'

const TranslationFilter = ({ filter, setFilter, title, path, button }) => {

	const navigate = useNavigate()

	const options =
		[
			{ value: 'textForTranslation', label: 'By text for translation' },
			{ value: 'translatedText', label: 'By translated text' },
		]

	return (
		<div className={classes.filter}>
			<div className={classes.title}>{title}</div>
			<div className={classes.container}>
				<button className={classes.button} onClick={() => navigate(`${path}`)}>{button}</button>
				<Select
					value={filter.sort}
					onChange={selectedSort => setFilter({ ...filter, sort: selectedSort })}
					options={options}
					theme={(theme) => ({
						...theme,
						borderRadius: 5,
						colors: {
							...theme.colors,
							primary: 'var(--text-placeholder)',
							primary25: 'var(--background-secondary)',
							primary50: 'var(--primary)',
							neutral0: 'var(--text-secondary)',
							neutral20: 'var(--text-placeholder)',
							neutral60: 'var(--background-primary)',
							neutral80: 'var(--text-placeholder)'
						},
					})} />
				<Input
					value={filter.query}
					onChange={e => setFilter({ ...filter, query: e.target.value })}
					placeholder='Search...'
				/>
			</div>
		</div >
	)
}

export default TranslationFilter