import React from 'react'
import { useState, useEffect } from 'react'
import classes from './PageTranslator.module.css'
import TranslationForm from '../../CompositeComponents/TranslationForm/TranslationForm'
import TranslationList from '../../CompositeComponents/TranslationList/TranslationList'
import { IoTrashOutline } from 'react-icons/io5'

function PageTranslator() {

  const [translates, setTranslates] = useState([])
  const [inputLanguage, setInputLanguage] = useState({ value: 'en', language: 'English' })
  const [outputLanguage, setOutputLanguage] = useState({ value: 'ru', language: 'Russian' })
  const [languages, setLanguages] = useState([])
  const [textForTranslation, setTextForTranslation] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [fetchLanguages, isLoading, isError] = useFetching(async () => {
    const response = await TranslatorService.getAllLanguages()
    console.log(response.data)
    const arrOfLang = Object.keys(response.data.languages).map(key => response.data.languages[key])
    setLanguages(arrOfLang)
  })
        'X-RapidAPI-Key': process.env.REACT_APP_RapidAPI_Key,

          'X-RapidAPI-Key': process.env.REACT_APP_RapidAPI_Key,

  const debouncedQuery = useDebounce(translate, 300)
  return (
    <div className={classes.container}>
      <div className={classes.translation}>
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
        />


        <div className={classes.translation__list}>
          <TranslationList translates={translates} title='Translation history: ' />
          <div className={classes.history__clear}>Clear<IoTrashOutline /></div>
        </div>

      </div>
    </div >
  )
}

export default PageTranslator