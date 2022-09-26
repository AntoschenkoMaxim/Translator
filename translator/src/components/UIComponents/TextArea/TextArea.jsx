import React, { useEffect } from 'react'
import classes from './TextArea.module.css'
import Select from 'react-select'
import { useState } from 'react'
import { MdOutlineContentCopy } from 'react-icons/md'
import { ImStarEmpty } from 'react-icons/im'
import { CgClose } from 'react-icons/cg'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useLocalStorageCustom } from '../../hooks/useLocalStorage'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const TextArea = ({
	languages,
	setSelectedLanguage,
	selectedLanguage,
	inputLanguage,
	outputLanguage,
	setInputLanguage,
	style,
	textForTranslation,
	setTextForTranslation,
	translatedText,
	setTranslatedText,
	detection,
	setDetection,
	checkLanguages,
	detect,
	debounce,
	createFavouriteItem,
	createHistoryItem,
	historyItems,
	setHistoryItems,
	...props }) => {

	const [historyItem, setHistoryItem] = useLocalStorageCustom('history', { inputLanguage: '', outputLanguage: '', textForTranslation: '', translatedText: '' })
	const [favouriteItem, setFavouriteItem] = useLocalStorageCustom('favourite', { inputLanguage: '', outputLanguage: '', textForTranslation: '', translatedText: '' })

	const successToast = () => {
		toast.success('Copied!', {
			theme: 'dark',
			position: 'bottom-center',
			autoClose: 1000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	}

	const handleChange = (e) => {
		setTextForTranslation(e.target.value)
		debounce(e.target.value)
	}

	const addHistoryItem = (e) => {
		e.preventDefault()
		const newHistoryObj = {
			...historyItem, id: Date.now()
		}
		console.log(newHistoryObj)
		createHistoryItem(newHistoryObj)
	}

	const addFavouriteItem = (e) => {
		e.preventDefault()
		const newFavouriteObj = {
			...favouriteItem, id: Date.now()
		}
		console.log(newFavouriteObj)
		createFavouriteItem(newFavouriteObj)
		toast.success('Added to favourites!', {
			theme: 'dark',
			position: 'bottom-center',
			autoClose: 1000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	useEffect(() => {
		setHistoryItem({ inputLanguage: inputLanguage.label, outputLanguage: outputLanguage.label, textForTranslation: textForTranslation, translatedText })
		setFavouriteItem({ inputLanguage: inputLanguage.label, outputLanguage: outputLanguage.label, textForTranslation: textForTranslation, translatedText: translatedText })
	}, [inputLanguage, outputLanguage, textForTranslation, translatedText])


	return (
		<div className={style}>
			<Select value={selectedLanguage} onChange={setSelectedLanguage} options={languages} />
					<CopyToClipboard text={translatedText}>
						<div onClick={successToast}><MdOutlineContentCopy className={classes.translate__icon} /></div>
					</CopyToClipboard>
					<div onClick={addFavouriteItem}><ImStarEmpty className={classes.translate__icon} /></div>
			<textarea
				placeholder={style === 'inputTextarea' ? 'Writing text...' : 'Translation'}
				type='text'
				className={classes.textarea}
				disabled={style === classes.outputTextarea}
				value={style === 'input' ? textForTranslation : translatedText}
				onChange={handleChange}
				onBlur={addHistoryItem}
				{...props}
			/>
			<ToastContainer
				position="top-center"
				autoClose={1500}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</div>
	)
}

export default TextArea