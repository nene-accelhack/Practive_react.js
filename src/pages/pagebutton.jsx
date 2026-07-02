import {useState} from 'react';

function PageButton({currentPage, totalPages, setCurrentPage, disabled, onClick, children}){
    const backPage= ()=>{
        if(currentPage >1) setCurrentPage(currentPage -1);
    };

    return(
        <button onClick={onClick} disabled= {disabled} style={{display: 'inline-block', margin: '0 5px'}}>
            {children}
        </button>
    )
}

export default PageButton;

