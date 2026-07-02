import {useState, useEffect} from 'react';
import PageButton from './pagebutton';

function Todo(){
    //Stateの準備
    //リストの配列情報
    const [todos, setTodos] = useState(()=>{
        //localstorageからデータを読み込む
        const savedTodos = localStorage.getItem('my_todos'); // localStorageから 'my_todos' という名前のデータを取り出す
        return savedTodos ? JSON.parse(savedTodos) : []; //データがあれば、文字から「配列」に戻してStateの初期値にする。なければ空の配列 []
    }); 
    //入力欄に入力中の文字
    const [inputText, setInputText] = useState('');

    //編集に必要なState
    const [editingId, setEditingId] = useState(null); //編集中の項目のID
    const [editText, setEditText] = useState(''); //編集中の入力文字

    //現在表示しているリストページを格納するState
    const [currentPage, setCurrentPage] = useState(1);

    //State変更のたびに保存
    useEffect(()=>{
        localStorage.setItem('my_todos', JSON.stringify(todos)); //配列データを文字情報に変換して、localStrogeに保存
    }, [todos]); //todosが変わった瞬間を検知する

    //リスト項目が追加されたとき
    const handleAddTodo = 
        ()=>{
            if (inputText.trim() === '')return;

            const newTodo = {
                id: Date.now(), //削除のための固有ID
                text: inputText,
                isCompleted: false
            }

            //既存の配列を展開し、新しいリストを追加してStateを更新
            setTodos([...todos, newTodo]);
            setInputText(''); //入力欄を空にする

            //新しいページに移動する
            const nextPage = Math.ceil((todos.length+1) / 5);
            setCurrentPage(nextPage);
        };


    //チェックボックスを押したときの処理
    const handleToggleTodo = (id) => {
            const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                // 対象のタスクの完了フラグを反転させる（true ⇄ false）
                return { ...todo, isCompleted: !todo.isCompleted };
            }
            return todo;
        });
        setTodos(updatedTodos);
    };
    
    //編集
    const handleEdit = (id, currentText)=>{
        setEditingId(id);
        setEditText(currentText);
    };

    //編集したものの確定
    const handleSaveEdit = ()=>{
        if (editText.trim()==='') {
            //編集したもの以外を残す
            setTodos(todos.filter(todo => todo.id !== editingId));

            //ページが空になったら前のページに移行する
            if( (todos.length-1 )% 5 === 0 && currentPage >1) setCurrentPage(currentPage - 1);
            
            setEditingId(null);
            return;
        }

        setTodos(todos.map(todo =>{
            if (todo.id === editingId) {
                return { ...todo, text: editText };
            }
            return todo;
        }
        ))
        setEditingId(null); //編集モードを終了する
    }

    //表示するリスト番号を計算
    const start = (currentPage-1) * 5;
    const end = start + 5;
    const showTodos = todos.slice(start, end); //表示する項目だけを入れた配列

    //全ページ数を計算
    const totalPages = Math.ceil(todos.length / 5);

    //ページを切り替える関数
    const handlePageChange = (pageNumber)=>{
        setCurrentPage(pageNumber);
    }
    
    return(
        <div className="main-contents">
            <h1>ToDo List</h1>
            <p>・やることを入力し、追加ボタンまたはEnterキーで追加してください</p>
            <p>・完了したタスクは、チェックをつけることで完了リストに移行できます</p>
            <p>・テキストをクリックすることで編集ができます</p>

            <div className="lists">
                <div className="input">
                    {/*入力値の取得をonChangeで設定*/}
                    <input 
                        type="text" 
                        value={inputText}
                        onChange={(event)=>setInputText(event.target.value)}  
                        onKeyDown={(event)=> event.key === 'Enter' && handleAddTodo()}
                    /> 

                    {/*ボタン動作をonClickで追加*/}
                    <button onClick={handleAddTodo}>追加</button>
                </div>

                {/*リストをmapのループを使用して表示*/}
                <ul className="todoLists">
                    {showTodos.map(todo=>(
                        <li key={todo.id}>
                            <label htmlFor="">
                                <input 
                                    type="checkbox"
                                    checked={todo.isCompleted}
                                    onChange={()=> handleToggleTodo(todo.id)} 
                                />

                                {/*編集中かどうかで見た目を変化させる*/}
                                {editingId === todo.id ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editText}
                                            autoFocus /*編集開始の瞬間に入力できるように*/
                                            onChange={(event)=> setEditText(event.target.value)}
                                            onKeyDown={(event)=> event.key === 'Enter' && event.currentTarget.blur()} 
                                            onBlur={handleSaveEdit} /*ほかの場所をクリックしたら確定*/
                                        />
                                    </>
                                ) : (
                                    <>
                                        <span 
                                            className={todo.isCompleted ? 'completed-text' : ''}
                                            onClick={()=>!todo.isCompleted && handleEdit(todo.id, todo.text)}
                                            style={{cursor: todo.isCompleted ? 'default' : 'pointer'}}
                                        >
                                            {todo.text}
                                        </span>
                                    </>
                                )}
                                
                            </label>
                        </li>
                    ))}
                </ul>
                <div 
                    className="pagination"
                    style={{marginTop: '20px'}}>

                        {/*前のページに遷移するボタン*/}
                        <PageButton
                            currentPage={currentPage}
                            totalPages={totalPages}
                            setCurrentPage={setCurrentPage}
                            disabled={currentPage === 1}
                            onClick={()=>{(currentPage >1)&& setCurrentPage(currentPage -1)}}
                        >
                            前へ
                        </PageButton>

                        {/*ページ分だけボタンを作成する*/}
                        {Array.from({length: totalPages }, (_, index)=>{
                            const pageNumber = index + 1;
                            return (
                                <button
                                    key={pageNumber}
                                    onClick = {()=> handlePageChange(pageNumber)}
                                    // 今開いているページのボタンだけデザインを変えて分かりやすくする
                                    style={{
                                        margin: '0 5px',
                                        backgroundColor: currentPage === pageNumber ? '#ccc' : '#fff'
                                    }}
                                >
                                    {pageNumber}
                                </button>
                            )
                        })}

                        {/*次のページに遷移するボタン*/}
                        <PageButton
                            currentPage={currentPage}
                            totalPages={totalPages}
                            setCurrentPage={setCurrentPage}
                            disabled={currentPage === totalPages}
                            onClick={ ()=>{(currentPage < totalPages) && setCurrentPage(currentPage + 1)}}
                        >
                            次へ
                        </PageButton>

                </div>

            </div>
            
        </div>
    )
}

export default Todo;