import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { callLoginAPI } from "../../apis/UserAPICalls";
import { resetLoginUser } from "../../modules/UserModule";

function LoginForm() {
	// 페이지 이동 함수
	const navigate = useNavigate();
	// dispatch 함수
	const dispatch = useDispatch();
	// userReducer 상태값 참조
	const result = useSelector(state => state.userReducer);
	// web storage API -> localStorage 객체 -> isLogin 키 값 참조
	const isAuthorized = !!localStorage.getItem("isLogin");

	// input state 관리
	const [loginInfo, setLoginInfo] = useState({
		id: "",
		password: "",
	});

	// input state 변경 시 이벤트 핸들러
	const onChangeHandler = (e) => {
		setLoginInfo({
			...loginInfo,
			[e.target.name]: e.target.value,
		});
	};

	// 로그인 버튼 클릭 시 이벤트 핸들러
	const onClickHandler = () => {
		// callLoginAPI(loginInfo) returns a dispatch function with result(login action) as the payload
		// dispatch(callLoginAPI(loginInfo)) dispatches the result(login action) to login reducer defined in UserModule.js
		dispatch(callLoginAPI(loginInfo));
	};

	// 로그인 요청 후 성공 or 실패 처리
	useEffect(() => {
		if (result?.message) {
			alert("아이디와 비밀번호를 확인해주세요");
			setLoginInfo({
				id: "",
				password: "",
			});
			dispatch(resetLoginUser());
		} else if (isAuthorized) {
			navigate("/");
		}
	}, [result]);

	return (
		<div>
			<label>ID : </label>
			<input
				type="text"
				name="id"
				value={loginInfo.id}
				onChange={onChangeHandler}
			/>
			<label>PW : </label>
			<input
				type="password"
				name="password"
				value={loginInfo.password}
				onChange={onChangeHandler}
			/>
			<button onClick={onClickHandler}>로그인</button>
		</div>
	);
}

export default LoginForm;
