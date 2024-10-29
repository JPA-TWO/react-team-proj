import { createActions, handleActions } from 'redux-actions';

const initalState = {};

const GET_MENULIST = 'menu/GET_MENULIST';
const GET_MENU = 'menu/GET_MENU';
const REGIST_BOOK = 'menu/REGIST_BOOK';

export const {
	menu: { getMenulist, getMenu, registBook },
} = createActions({
	[GET_MENULIST]: (res) => ({ menulist: res }),
	[GET_MENU]: (res) => ({ menu: res }),
	[REGIST_BOOK]: (res) => ({ regist: res }),
});

const menuReducer = handleActions(
	{
		[GET_MENULIST]: (state, { payload }) => {
			return payload;
		},
		[GET_MENU]: (state, { payload }) => {
			return payload;
		},
		[REGIST_BOOK]: (state, { payload }) => {
			return payload;
		},
	},
	initalState
);

export default menuReducer;
