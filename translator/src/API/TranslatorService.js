import axios from 'axios'


export default class TranslatorService {
	static async getAllLanguages() {
		const response = await axios.get('https://deep-translate1.p.rapidapi.com/language/translate/v2/languages', {
			headers: {
				'X-RapidAPI-Key': process.env.REACT_APP_RapidAPI_Key,
				'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com'
			}
		})
		return response
	}
}