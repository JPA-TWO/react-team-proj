import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuItem from "../items/MenuItem";
import { callGetMenuListAPI } from "../../apis/MenuAPICalls";

function SearchBookList() {
	const result = useSelector(state => state.menuReducer);
	const menulist = result.menulist;
	const [filterKeyword, setFilterKeyword] = useState("bookName");
	const [searchWord, setSearchWord] = useState("");
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(callGetMenuListAPI());
	}, []);

	//인풋에 따라 자동으로 바뀌게 할 거임
	return (
		<div>
			<select value={filterKeyword} onChange={e => setFilterKeyword(e.target.value)}>
				<option value='bookName'>도서명</option>
				<option value='author'>저자</option>
				<option value='isbn'>isbn</option>
			</select>
			<input type='text' value={searchWord} onChange={e => setSearchWord(e.target.value)} />
			{menulist && (
				<div className='menuBox'>
					{menulist
						.filter(menu => menu[filterKeyword].includes(searchWord))
						.map(menu => (
							<MenuItem key={menu.id} menu={menu} />
						))}
				</div>
			)}
		</div>
	);
}

export default SearchBookList;
