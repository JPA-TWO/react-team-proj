import { request } from './Api';
import { login } from '../modules/UserModule';

export function callLoginAPI(loginInfo) {
    console.log('login api calls...');

    // redux-thunk 미들웨어를 이용한 비동기 처리
    return async (dispatch, getState) => {

        const userList = await request('GET', '/user');

        // id와 password 일치 여부 확인
        const result = await userList.find(user => ((user.id === loginInfo.id) && (user.password === loginInfo.password)));

        console.log('login result : ', result);

        // action 생성 함수에 결과 전달하며 dispatch 호출
        dispatch(login(result));
    }

}
