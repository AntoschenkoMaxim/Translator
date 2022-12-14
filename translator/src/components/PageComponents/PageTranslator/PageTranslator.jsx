import React from 'react'
import '../../../styles/App.css'
import { useState, useEffect } from 'react'
import classes from './PageTranslator.module.css'
import { useFetching } from '../../hooks/useFetching'
import useDebounce from '../../hooks/useDebounced'
import TranslatorService from '../../../API/TranslatorService'
import TranslationForm from '../../CompositeComponents/TranslationForm/TranslationForm'
import axios from 'axios'
import useLocalStorage from 'use-local-storage'
import '../../../styles/App.css'
import { useLocalStorageCustom } from '../../hooks/useLocalStorage'
import HistoryList from '../../CompositeComponents/HistoryList/HistoryList'
import { BsLightningChargeFill, BsLightningCharge } from 'react-icons/bs'
import { useItems } from '../../hooks/useItems'
import TranslationFilter from '../../CompositeComponents/TranslationFilter/TranslationFilter'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function PageTranslator() {

  const [detectedLanguage, setDetectedLanguage] = useState({ value: '' })
  const [inputLanguage, setInputLanguage] = useState({ value: 'en', label: 'English' })
  const [outputLanguage, setOutputLanguage] = useState({ value: 'ru', label: 'Russian' })
  const [languages, setLanguages] = useState([])
  const [textForTranslation, setTextForTranslation] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [historyItem, setHistoryItem] = useLocalStorageCustom('history', { inputLanguage: '', outputLanguage: '', textForTranslation: '', translatedText: '' })
  const [historyItems, setHistoryItems] = useLocalStorageCustom('historyItems', [])
  const [favouriteItems, setFavouriteItems] = useLocalStorageCustom('favouriteItems', [])
  const [filter, setFilter] = useState({ sort: '', query: '' })

  const sortedAndSearchedItems = useItems(historyItems, filter.sort, filter.query)

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

  const createFavouriteItem = (newFavouriteItem) => {
    setFavouriteItems([...favouriteItems, newFavouriteItem])
  }

  const createHistoryItem = () => {
    const newHistoryItem = {
      ...historyItem,
      id: Date.now()
    }
    setHistoryItems([...historyItems, newHistoryItem])
  }

  useEffect(() => {
    setHistoryItem({ inputLanguage: inputLanguage.label, outputLanguage: outputLanguage.label, textForTranslation: textForTranslation, translatedText: translatedText })
  }, [inputLanguage, outputLanguage, textForTranslation, translatedText])

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

  return (
    <div className='page' data-theme={theme}>
      <div className={classes.theme} onClick={switchTheme}>{theme === 'dark' ? <BsLightningCharge className={classes.theme__icon} /> : <BsLightningChargeFill className={classes.theme__icon} />}</div>
      <TranslationForm
        debounce={debouncedQuery}
        languages={languages.map(l => ({ value: l.language, label: l.name }))}
        textForTranslation={textForTranslation}
        setTextForTranslation={setTextForTranslation}
        translatedText={translatedText}
        setTranslatedText={setTranslatedText}
        inputLanguage={inputLanguage}
        outputLanguage={outputLanguage}
        setInputLanguage={setInputLanguage}
        setOutputLanguage={setOutputLanguage}
        detect={detect}
        create={createHistoryItem}
        createFavouriteItem={createFavouriteItem}
      />
      {isError &&
        <h1>Error: ${isError}</h1>
      }
      {isLoading
        ? <div></div>
        : <div className={classes.translation__list}>
          <TranslationFilter filter={filter} setFilter={setFilter} title='Filters' button='Favourite' path='/favourites' />
          <HistoryList historyItems={sortedAndSearchedItems} title='Translation history: ' />
        </div>
      }

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