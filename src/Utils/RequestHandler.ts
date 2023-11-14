import process from 'process';
import axios, { AxiosResponse } from 'axios';

export default class RequestHandler {
	private static ENKA_API: string =
		process.env.ENKA_API || 'https://enka.network/api';

	static async Get<T>(url: string): Promise<T> {
		try {
			const res: AxiosResponse<T, any> = await axios.get(
				`${this.ENKA_API}/${url}`
			);
			return res.data;
		} catch (e) {
			return Promise.reject();
		}
	}
}
