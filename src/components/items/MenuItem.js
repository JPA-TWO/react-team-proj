import { Link } from 'react-router-dom';

function MenuItem({ menu }) {

	return (
		<Link to={`/menu/${menu.id}`}>
			<div className='menuItem'>
				<h3>제목: {menu.bookName}</h3>
				<h3>저자: {menu.author}</h3>
				<h3>가격: {menu.bookPrice}</h3>
				<h4>분류: {menu.categoryName}</h4>
			</div>
		</Link>
	);
}

export default MenuItem;