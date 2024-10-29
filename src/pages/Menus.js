import MenuList from "../components/lists/MenuList";
import { useNavigate } from "react-router-dom";

function Menus() {

	const isAuthorized = !!localStorage.getItem('isLogin');
	const navigate = useNavigate();

	return (
		<div>
			<h1>도서 목록 {(isAuthorized) && <button> onClick={() => navigate(`/menu/list`)}도서 추가</button>}</h1>
			<MenuList />
		</div>
	);
}

export default Menus;