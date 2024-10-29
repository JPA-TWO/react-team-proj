import MenuList from '../components/lists/MenuList';
import { useNavigate } from 'react-router-dom';

function Menus() {
	const isAuthorized = !!localStorage.getItem('isLogin');
	const navigate = useNavigate();

	return (
		<div>
			<h1>
				도서 목록
				{isAuthorized && (
					<button onClick={() => navigate(`/menu/regist`)}>
						도서 추가
					</button>
				)}
				<button onClick={() => navigate(`/menu/search`)}>
					도서 검색
				</button>
			</h1>
			<MenuList />
		</div>
	);
}

export default Menus;
