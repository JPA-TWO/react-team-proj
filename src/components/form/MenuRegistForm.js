//책 등록 폼
//받아야 할 것 :
//bookName, bookPrice, author,

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callRegistBookAPI, callGetMenuListAPI } from '../../apis/MenuAPICalls';

//categoryName, isbn, detail (description, image)
function MenuRegistForm(props) {
	//redux용 변수들
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const curstate = useSelector((state) => state.menuReducer);
	const menuList = curstate.menulist;

	//----------- 오류방지
	useEffect(() => {
		if (curstate.menulist === undefined) {
			dispatch(callGetMenuListAPI());
		}
	}, []);
	//-----------

	//state 관리
	const [newBook, setNewBook] = useState({
		//id => 메뉴 리스트의 마지막 값 +1
		id: '1',
		bookName: '',
		bookPrice: 0,
		author: '',
		categoryName: '기타',
		isbn: '',
		isOrderable: true,
		detail: {
			description: '',
			image: '',
		},
	});

	useEffect(() => {
		console.log('curState', curstate);
		if (curstate.regist) {
			alert('메뉴 등록');
			navigate(`/menu`);
		}
	}, [curstate]);

	useEffect(() => {
		if (menuList && menuList.length > 0) {
			//이방식은 작은 숫자가 뒤에있으면 안됨
			// id = parseInt(menuList[menuList.length - 1].id) + 1;
			let id =
				menuList.reduce((max, menu) => Math.max(max, menu.id), 0) + 1;
			//setNewBook({ ...newBook, id: id.toString() }); ...newBook을 뒤에 넣으면, 덮어쓰기
			setNewBook({ ...newBook, id: id.toString() });
		}
	}, [menuList]);

	useEffect(() => {
		console.log(newBook);
	}, [newBook]);

	const fileChangeHandler = async (e) => {
		const file = e.target.files[0];
		console.log(file);
		const base64 = await convertBase64(file);
		console.log(base64);
		setNewBook({
			...newBook,
			detail: {
				description: newBook.detail.description,
				image: base64,
			},
		});
	};
	const convertBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();

			fileReader.readAsDataURL(file);

			/* 읽기 완료(성공) */
			fileReader.onload = () => {
				resolve(fileReader.result);
			};

			fileReader.onerror = (error) => {
				reject(error);
			};
		});
	};

	const onChangeHandler = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		console.log('이벤트 확인', name, value);

		switch (name) {
			case 'menuPrice':
				value = parseInt(value);
				break;
			case 'isOrderable':
				value = !!value;
				break;
			case 'description':
				name = 'detail';
				value = {
					description: value,
					image: newBook.detail.image,
				};
				break;
			default:
				break;
		}
		setNewBook({ ...newBook, [name]: value });
	};
	// useEffect(() => {
	// 	console.log(newBook);
	// }, [newBook]);

	const registBook = (e) => {
		e.preventDefault();
		dispatch(callRegistBookAPI(newBook));

		// newBook.id = menuList[-1].id + 1;
		// let result = request('post', '/menu', newBook);
		// console.log(result);

		/* API가 현재 status 가 생략된 채로 오기 때문에, status로 확인할 방법이 있나?
        if (result.status === 201){
            navigate('/menu');
        }
        else { 
        } */
	};

	return (
		<div>
			<form>
				<div>
					<label for='bookName'>제목</label>
					<input
						required
						value={newBook.bookName}
						name='bookName'
						type='text'
						onChange={onChangeHandler}
					/>
				</div>
				<div>
					<label for='author'>작가</label>
					<input
						required
						value={newBook.author}
						name='author'
						type='text'
						onChange={onChangeHandler}
					/>
				</div>
				<div>
					<label>장르</label>
					<select
						value={newBook.categoryName}
						name='categoryName'
						onChange={onChangeHandler}
					>
						<option value='기타'>기타</option>
						<option value='소설'>소설</option>
						<option value='에세이'>에세이</option>
						<option value='건강정보'>건강정보</option>
						<option value='요리'>요리</option>
						<option value='화술'>화술</option>
						<option value='역사'>역사</option>
						<option value='미래학'>미래학</option>
						<option value='철학'>철학</option>
					</select>
				</div>
				<div>
					<label>주문가능 상태</label>
					<select
						name='isOrderable'
						value={newBook.isOrderable}
						onChange={onChangeHandler}
					>
						<option value={true}>판매 가능</option>
						<option value={false}>판매 불가</option>
					</select>
				</div>
				<div>
					<label for='bookPrice'>가격</label>
					<input
						value={newBook.bookPrice}
						name='bookPrice'
						type='number'
						onChange={onChangeHandler}
						min={0}
					/>
				</div>
				<div>
					<label for='description'>설명</label>
					<br />
					<input
						value={newBook.detail.description}
						name='description'
						type='text'
						onChange={onChangeHandler}
					/>
				</div>
				<input
					type='file'
					name='image'
					accept='image/*'
					onChange={fileChangeHandler}
				/>
				<button onClick={registBook}>등록</button>
			</form>
		</div>
	);
}

export default MenuRegistForm;
