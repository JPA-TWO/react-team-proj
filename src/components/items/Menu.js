import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { callGetBookAPI } from '../../apis/MenuAPICalls';

function Book( { id } ) {

    // menuReducer에서 book 정보 가져오기
    const result = useSelector(state => state.menuReducer);
    // 여기서 menu를 book으로 변경
    const book = result.book;
    const dispatch = useDispatch();

    useEffect(
        () => {
            // 컴포넌트가 마운트될 때 한번만 호출되는 함수
            /* 
            callGetBookAPI:
            비동기 처리를 위해, getBook 액션 함수를 호출하고 
            리턴 받은 action 값과 GET_BOOK 타입을 menuReducer에 전달하여 처리
            dispatch(callGetBookAPI(id)):
            The state is is accessed using useSelector to get the updated book detaisl.
            The component re-renders with the new data once the state is updated.
            */
            dispatch(callGetBookAPI(id));
        },
        []
    );

    return (
        book && (
            <>
                <h3>도서 이름 : {book.bookName}</h3>
                <h3>도서 가격 : {book.bookPrice}</h3>
                <h3>도서 저자 : {book.author}</h3>
                <h3>도서 종류 : {book.categoryName}</h3>
                <h3>ISBN 코드 : {book.isbn}</h3>
                <h3>도서 상세 : {book.detail.description}</h3>
                <img src={book.detail.image} style={{ maxWidth: 500 }} alt={book.bookName} />
            </>
        )
    );
}

export default Book;