import { request } from './Api';
import { getMenulist, registBook } from '../modules/MenuModule';

export function callGetMenuListAPI() {
	return async (dispatch, getState) => {
		const result = await request('GET', '/menu');
		console.log('getBooklist result : ', result);

		dispatch(getMenulist(result));
	};
}

export function callRegistBookAPI(book) {
	console.log('registBook api calls...');

	return async (dispatch, getState) => {
		const result = await request('POST', '/menu/', book);
		console.log('registBook result : ', result);

		dispatch(registBook(result));
	};
}
