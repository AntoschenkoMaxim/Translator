import React from 'react'
import classes from './TextArea.module.css'
import Select from 'react-select'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const TextArea = ({
	selectedLanguage,
	setSelectedLanguage,
	languages,
	style,
	textForTranslation,
	setTextForTranslation,
	translatedText,
	setTranslatedText,
	detection,
	setDetection,
	debounce,
	...props }) => {

	const handleClick = () => {
		setTextForTranslation()
		setTranslatedText()
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
	return (
		<div className={style}>
			<Select value={selectedLanguage} onChange={setSelectedLanguage} options={languages} />
					<CopyToClipboard text={translatedText}>
						<div onClick={successToast}><MdOutlineContentCopy className={classes.translate__icon} /></div>
					</CopyToClipboard>
			<textarea
				placeholder={style === 'inputTextarea' ? 'Writing text...' : 'Translation'}
				type='text'
				className={classes.textarea}
				disabled={style === classes.outputTextarea}
				value={style === 'input' ? textForTranslation : translatedText}
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