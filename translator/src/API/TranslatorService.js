import axios from 'axios'


export default class TranslatorService {
	static async getAllLanguages() {
		const response = await axios.get('https://deep-translate1.p.rapidapi.com/language/translate/v2/languages', {
			headers: {
				'X-RapidAPI-Key': 'a0e3f8f0b9mshf3cfa708809408dp140f77jsnfcfcd331a786',
				'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com'
			}
		})
		return response
	}

	static async detectLanguage() {
		const response = await axios.post('https://deep-translate1.p.rapidapi.com/language/translate/v2/detect', {
			headers: {
				'X-RapidAPI-Key': 'a0e3f8f0b9mshf3cfa708809408dp140f77jsnfcfcd331a786',
				'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com',
			},
			data: '[{ "Text": "Ich würde wirklich gern Ihr Auto um den Block fahren ein paar Mal." }]'
		})
		return response
	}

	static async translation() {
		const response = await axios.post('https://deep-translate1.p.rapidapi.com/language/translate/v2', {
			headers: {
				'content-type': 'application/json',
				'X-RapidAPI-Key': 'a0e3f8f0b9mshf3cfa708809408dp140f77jsnfcfcd331a786',
				'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com'
			},
			data: '{"q":"Hello World!","source":"en","target":"es"}'
		})
		return response
	}
}