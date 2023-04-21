import './pagination.css';
import left from './left.svg';
import right from './right.svg';
import { Fragment } from 'react';

export const Pagination = ({ postPerPage, totalPosts, paginate }) => {

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <Fragment>
            <div className='pagination'>
                <img src={left} alt="" />
                {pageNumbers.map(number => (
                    <Fragment key={number}>
                        <button onClick={() => paginate(number)} className='page-link'>
                            {number}
                        </button>
                    </Fragment>
                ))}
                <img src={right} alt="" />
            </div>
        </Fragment>
    )
}
