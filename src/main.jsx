//Reactで作成した様々なコンポーネントを最終的にブラウザの画面に出力(レンダリング）するためのファイル

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

//htmlにあるid="root"の箱にAppのコンポーネントを入れる（htmlとjsxの合体）
ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)