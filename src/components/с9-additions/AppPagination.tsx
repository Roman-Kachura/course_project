import React from 'react';
import {Pagination} from 'react-bootstrap';

export const AppPagination: React.FC<AppPaginationPropsType> = ({pagesCount, currentPage, callBack}) => {
    const items: number[] = [];
    for (let i = 1; i <= pagesCount; i++) {
        items.push(i);
    }
    return (
        <Pagination size="sm">{
            items.map(n =>
                <Pagination.Item onClick={() => callBack(n)} key={n} active={n === currentPage}>
                    {n}
                </Pagination.Item>,
            )
        }</Pagination>
    )
}

type AppPaginationPropsType = {
    pagesCount: number
    currentPage: number
    callBack: (currentPage: number) => void
}