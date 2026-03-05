import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { BoardsPage } from './pages/BoardsPage';
import { BoardDetailPage } from './pages/BoardDetailPage';
import { SwipeFilePage } from './pages/SwipeFilePage';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-dark text-light">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<BoardsPage />} />
            <Route path="/board/:boardId" element={<BoardDetailPage />} />
            <Route path="/swipe-file" element={<SwipeFilePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
