import Book from '../components/items/Menu';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { callDeleteBookAPI } from '../apis/MenuAPICalls';

function BookDetail() {

    // 로그인 상태 확인
    const isAuthorized = !!localStorage.getItem('isLogin');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const result = useSelector(state => state.menuReducer);

    // const updateHandler = () => navigate(`/menu/modify/${id}`);
    const deleteHandler = () => dispatch(callDeleteBookAPI(id));
    

    useEffect(
        () => {
            if (result.delete) {
                alert('도서 삭제');
                navigate('/menu');
            }
        },
        [result]
    );

    return (
        <div>
            <h1>도서 상세</h1>
            <h1>
                {isAuthorized && (
                    <>
                        {/* <button onClick={updateHandler}>도서 수정</button> */}
                        <button onClick={deleteHandler}>도서 삭제</button>
                    </>
                )}
            </h1>
            <Book id={id} />
        </div>
    );
}

export default BookDetail;
