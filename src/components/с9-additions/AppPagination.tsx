import React from 'react';
import {Pagination} from 'react-bootstrap';

export const AppPagination: React.FC<AppPaginationPropsType> = ({pagesCount, currentPage, callBack}) => {
    let items: number[] = [];
    if (pagesCount > 10) {
        if (currentPage > 5 && currentPage < pagesCount - 5) {
            for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                items.push(i);
            }
            return (
                <Pagination>
                    <Pagination.Item onClick={() => callBack(1)}>{1}</Pagination.Item>
                    <Pagination.Ellipsis/>

                    {
                        items.map(n =>
                            <Pagination.Item onClick={() => callBack(n)} key={n} active={n === currentPage}>
                                {n}
                            </Pagination.Item>,
                        )
                    }

                    <Pagination.Ellipsis/>
                    <Pagination.Item onClick={() => callBack(pagesCount)}>{pagesCount}</Pagination.Item>
                </Pagination>
            )
        }
        if (currentPage > pagesCount - 5) {
            for (let i = currentPage; i <= pagesCount; i++) {
                items.push(i);
            }
            return (
                <Pagination>
                    <Pagination.Item onClick={() => callBack(1)}>{1}</Pagination.Item>
                    <Pagination.Ellipsis/>

                    {
                        items.map(n =>
                            <Pagination.Item onClick={() => callBack(n)} key={n} active={n === currentPage}>
                                {n}
                            </Pagination.Item>,
                        )
                    }
                </Pagination>
            )
        }
        if (currentPage < 6) {
            for (let i = 1; i <= 5; i++) {
                items.push(i);
            }
            return (
                <Pagination>
                    {
                        items.map(n =>
                            <Pagination.Item onClick={() => callBack(n)} key={n} active={n === currentPage}>
                                {n}
                            </Pagination.Item>,
                        )
                    }
                    <Pagination.Ellipsis/>
                    <Pagination.Item onClick={() => callBack(pagesCount)}>{pagesCount}</Pagination.Item>
                </Pagination>
            )
        }
    }

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