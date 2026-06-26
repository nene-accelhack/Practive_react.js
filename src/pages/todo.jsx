import {useState} from 'react';

function Todo(){
    //Stateの準備
    const [todos, setTodos] = useState([]); //Todoリストの状態
    const [inputText, setInputText] = useState('');

    //addボタンを押したときの処理
    const handleAddTodo = 
        ()=>{
            const newTodo = {
                id: Date.now(), //削除のための固有ID
                text: inputText
            }

            //既存の配列を展開し、新しいリストを追加してStateを更新
            setTodos([...todos, newTodo]);
            setInputText(''); //入力欄を空にする
        };


    

    //チェックボックスを押したときの処理
    const handleDeleteTodos = 
        (id)=>{
            //チェックされたID以外で新しい配列を作成する
            const updatedTodos = todos.filter(todo => todo.id !== id);
            setTodos(updatedTodos);
        };
    
    return(
        <div className="main-contents">
            <h1>ToDo List</h1>
            <p>・やることを入力し、addボタンで追加してください</p>
            <p>・完了したタスクは、チェックをつけることで削除できます</p>

            <div className="lists">
                <div className="input">
                    {/*入力値の取得をonChangeで設定*/}
                    <input 
                        type="text" 
                        value={inputText}
                        onChange={(event)=>setInputText(event.target.value)}  
                    /> 

                    {/*ボタン動作をonClickで追加*/}
                    <button onClick={handleAddTodo}>add</button>
                </div>

                {/*リストをmapのループを使用して表示*/}
                <ul id="todoLists">
                    {todos.map(todo=>(
                        <li key={todo.id}>
                            <label htmlFor="">
                                <input 
                                    type="checkbox"
                                    onChange={()=> handleDeleteTodos(todo.id)} 
                                />
                                {todo.text}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            
        </div>
    )
}

export default Todo;