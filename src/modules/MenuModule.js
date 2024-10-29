import { createActions, handleActions } from 'redux-actions';

const initalState = {};

const GET_MENULIST = 'menu/GET_MENULIST';
const GET_MENU = 'menu/GET_MENU';

export const { menu: { getMenulist, getMenu } } = createActions({
	[GET_MENULIST]: (res) => ({ menulist: res }),
	[GET_MENU]: (res) => ({ menu: res })
});

const menuReducer = handleActions(
	{
		[GET_MENULIST]: (state, {payload}) => {
			return payload;
		},
		[GET_MENU]: (state, {payload}) => {
			return payload;
		}
	},
	initalState
);

export default menuReducer;