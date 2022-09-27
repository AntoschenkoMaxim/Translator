import React, { useEffect } from 'react'
import classes from './TextArea.module.css'
import Select from 'react-select'
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
	create,
	createFavouriteItem,
	createHistoryItem,
	historyItems,
	setHistoryItems,
	...props }) => {

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

	const errorToast = () => {
		toast.error('Empty value!', {
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
		detect(e.target.value)
		debounce(e.target.value)
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
	}

	const clearTextarea = () => {
		setTranslatedText('')
		setTextForTranslation('')
	}

	useEffect(() => {
		setFavouriteItem({ inputLanguage: inputLanguage.label, outputLanguage: outputLanguage.label, textForTranslation: textForTranslation, translatedText: translatedText })
	}, [inputLanguage, outputLanguage, textForTranslation, translatedText])

	return (
		<div className={style}>
			<Select
				value={style === 'inputTextarea'
					? { value: inputLanguage.value, label: inputLanguage.label }
					: { value: outputLanguage.value, label: outputLanguage.label }
				}
				onChange={setSelectedLanguage}
				options={languages}
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
				})}
			/>
			{style === 'outputTextarea'
				? <div className={classes.translate__icons}>
					{translatedText ?
						<>
							<CopyToClipboard text={translatedText}>
								<div onClick={successToast}><MdOutlineContentCopy className={classes.translate__icon} /></div>
							</CopyToClipboard>
							<div onClick={addFavouriteItem}><ImStarEmpty className={classes.translate__icon} /></div>
						</>
						:
						<>
							<CopyToClipboard text={translatedText}>
								<div disabled onClick={errorToast}><MdOutlineContentCopy className={classes.translate__icon} /></div>
							</CopyToClipboard>
							<div disabled onClick={errorToast}><ImStarEmpty className={classes.translate__icon} /></div>
						</>
					}
				</div>
				: <div className={classes.translate__icons}>
					<div onClick={clearTextarea}><CgClose className={classes.translate__icon} /></div>
				</div>
			}
			<textarea
				placeholder={style === 'inputTextarea' ? 'Writing text...' : 'Translation'}
				type='text'
				className={classes.textarea}
				disabled={style === 'outputTextarea'}
				value={style === 'inputTextarea' ? textForTranslation : translatedText}
				onBlur={create}
				onChange={handleChange}
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