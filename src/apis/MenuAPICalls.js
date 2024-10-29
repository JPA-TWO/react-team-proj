import { request } from './Api';
import { getMenulist } from '../modules/MenuModule';

export function callGetMenuListAPI() {

	return async (dispatch, getState) => {

		const result = await request('GET', '/menu');
		console.log('getBooklist result : ', result);

		dispatch(getMenulist(result));
	}
}

