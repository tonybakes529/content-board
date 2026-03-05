import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { BoardsPage } from './pages/BoardsPage';
import { BoardDetailPage } from './pages/BoardDetailPage';
import { SwipeFilePage } from './pages/SwipeFilePage';
import './index.css';
function App() {
    return (_jsx(BrowserRouter, { children: _jsxs("div", { className: "flex h-screen bg-dark text-light", children: [_jsx(Sidebar, {}), _jsx("div", { className: "flex-1 flex flex-col", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(BoardsPage, {}) }), _jsx(Route, { path: "/board/:boardId", element: _jsx(BoardDetailPage, {}) }), _jsx(Route, { path: "/swipe-file", element: _jsx(SwipeFilePage, {}) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/" }) })] }) })] }) }));
}
export default App;
