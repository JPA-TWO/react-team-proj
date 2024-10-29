import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '../items/MenuItem';
import { callGetMenuListAPI } from '../../apis/MenuAPICalls';

function MenuList() {

	const result = useSelector(state => state.menuReducer);
	const menulist = result.menulist;
	const dispatch = useDispatch();

	useEffect(
		() => {dispatch(callGetMenuListAPI())},
		[]
	);

	return (
		menulist && (
			<div className='menuBox'>
				{menulist.map(menu => <MenuItem key={menu.id} menu={menu} />)}
			</div>
		)
	);
}

export default MenuList;