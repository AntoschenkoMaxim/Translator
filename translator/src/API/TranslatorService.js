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
}