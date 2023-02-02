import classes from './Book.module.css';

import KakaoMap from '../components/api/KakaoMap';
import BookForm from '../components/book/BookForm';
import { useState } from 'react';

const Book = () => {
    const [ latLng, setLatLng ] =useState({});

    const posDataHandler = (data) => {
        setLatLng(data);
    };

    return (
        <div>
            <KakaoMap onClickPosData={posDataHandler} />
            <p className={classes.marker_explain}>예약 위치를 지도에서 클릭해서 표시해 주세요.</p>
            <BookForm posData={latLng} />
        </div>
    )
}

export default Book;