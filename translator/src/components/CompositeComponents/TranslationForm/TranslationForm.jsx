import React from 'react'
import classes from './TranslationForm.module.css'
import Button from '../../UIComponents/Button/Button'
import TextArea from '../../UIComponents/TextArea/TextArea'
import { TbSwitchHorizontal } from 'react-icons/tb'
import { IoCopyOutline, IoStarOutline } from 'react-icons/io5'
import { useState } from 'react'

const TranslationForm = ({ }) => {

	const [translate, setTranslate] = useState({ inputValue: '', outputValue: '' })

	return (
		<form>
			<div className={classes.translate__form}>
				<div className={classes.translate__switch}>
					<TextArea
						style='inputTextarea'
						type='text'
					/>
					<div className={classes.translate__container}><TbSwitchHorizontal className={classes.translate__icon} /></div>
					<TextArea
						style='outputTextarea'
						type='text'
					/>
				</div>

				{translate.inputValue.length && translate.outputValue.length
					? <div className={classes.translate__buttons}>
						<Button><IoCopyOutline className={classes.translate__icon} /></Button>
						<Button><IoStarOutline className={classes.translate__icon} /></Button>
					</div>
					: <div className={classes.translate__buttons}>
						<Button disabled><IoCopyOutline className={classes.translate__icon} /></Button>
						<Button disabled><IoStarOutline className={classes.translate__icon} /></Button>
					</div>
				}
			</div>
		</form >
	)
}

export default TranslationForm