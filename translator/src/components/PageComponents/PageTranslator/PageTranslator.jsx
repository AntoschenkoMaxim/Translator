import React from 'react'
import { useState, useEffect } from 'react'
import classes from './PageTranslator.module.css'
import TranslationForm from '../../CompositeComponents/TranslationForm/TranslationForm'
import TranslationList from '../../CompositeComponents/TranslationList/TranslationList'
import { IoTrashOutline } from 'react-icons/io5'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function PageTranslator() {

  const [detectedLanguage, setDetectedLanguage] = useState({ value: '' })
  const [inputLanguage, setInputLanguage] = useState({ value: 'en', language: 'English' })
  const [outputLanguage, setOutputLanguage] = useState({ value: 'ru', language: 'Russian' })
  const [languages, setLanguages] = useState([])
  const [textForTranslation, setTextForTranslation] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [historyItems, setHistoryItems] = useLocalStorageCustom('historyItems', [])
  const [favouriteItems, setFavouriteItems] = useLocalStorageCustom('favouriteItems', [])
  const [fetchLanguages, isLoading, isError] = useFetching(async () => {
    const response = await TranslatorService.getAllLanguages()
    console.log(response.data)
    const arrOfLang = Object.keys(response.data.languages).map(key => response.data.languages[key])
    setLanguages(arrOfLang)
  })

  const detect = (textForTranslation) => {
    const options = {
      method: 'POST',
      url: 'https://microsoft-translator-text.p.rapidapi.com/Detect',
      params: { 'api-version': '3.0' },
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.REACT_APP_RapidAPI_Key,
        'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
      },
      data: `[{"Text":"${textForTranslation}"}]`
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
      setDetectedLanguage(response.data[0].language)
    }).catch(function (error) {
      console.error(error);
    });
  }

  const translate = (textForTranslation) => {
    if (detectedLanguage !== inputLanguage.value) {
      toast.error('Change keyboard layout!', {
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
    else {
      const options = {
        method: 'POST',
        url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
        params: {
          'to[0]': `${outputLanguage.value}`,
          'api-version': '3.0',
          profanityAction: 'NoAction',
          textType: 'plain'
        },
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': process.env.REACT_APP_RapidAPI_Key,
          'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
        },
        data: `[{"Text":"${textForTranslation}"}]`
      };

      axios.request(options).then(function (response) {
        setTranslatedText(response.data[0].translations[0].text)
      }).catch(function (error) {
        console.error(error);
      });
    }
  }

  const debouncedQuery = useDebounce(translate, 300)

  const createHistoryItem = (newHistoryItem) => {
    setHistoryItems([...historyItems, newHistoryItem])
  }

  const createFavouriteItem = (newFavouriteItem) => {
    setFavouriteItems([...favouriteItems, newFavouriteItem])
  }

  //get languages
  useEffect(() => {
    fetchLanguages()
  }, [])


  //switch theme
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  console.log(historyItems)

  return (
    <div className='page' data-theme={theme}>
      <div className={classes.theme} onClick={switchTheme}>{theme === 'dark' ? <BsLightningCharge className={classes.theme__icon} /> : <BsLightningChargeFill className={classes.theme__icon} />}</div>
        <TranslationForm
          debounce={debouncedQuery}
          languages={languages.map(l => ({ value: l.language, label: l.name }))}
          textForTranslation={textForTranslation}
          setTextForTranslation={setTextForTranslation}
          translatedText={translatedText}
          inputLanguage={inputLanguage}
          outputLanguage={outputLanguage}
          setInputLanguage={setInputLanguage}
          setOutputLanguage={setOutputLanguage}
          createFavouriteItem={createFavouriteItem}
          createHistoryItem={createHistoryItem}
        />


        <div className={classes.translation__list}>
          <TranslationList translates={translates} title='Translation history: ' />
          <div className={classes.history__clear}>Clear<IoTrashOutline /></div>
        </div>

      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
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

export default PageTranslator