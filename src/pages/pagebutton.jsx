import {useState} from 'react';

export function PageBackButton({currentPage, totalPages, setCurrentPage}){
    //前のページに戻る関数
    const backPage= ()=>{
        if(currentPage >1) setCurrentPage(currentPage -1);
    };

    return(
        <button onClick={backPage} disabled= {currentPage === 1} style={{display: 'inline-block', margin: '0 5px'}}>
            前へ
        </button>
    )
}

export function PageNextButton({currentPage, totalPages, setCurrentPage}){
    //次のページに進む関数
    const nextPage= ()=>{
        if(currentPage < totalPages) setCurrentPage(currentPage + 1); 
    };

    return(
        <button onClick={nextPage} disabled= {currentPage === totalPages} style={{display: 'inline-block', margin: '0 5px'}}>
            次へ
        </button>
    )
}

