import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Top from './pages/top';
import Todo from './pages/todo';
import Calculate from './pages/calculate';

function App() {
  return (
    <Router>
        <Header />

        <main>
            {/*URLにより中身が切り替わる*/}
            <Routes>
            <Route path="/" element={<Top />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/calculate" element={<Calculate />} />
            </Routes>
        </main>

    </Router>
  );
}

export default App;

