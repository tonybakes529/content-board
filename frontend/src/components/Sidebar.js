import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useLocation } from 'react-router-dom';
export const Sidebar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    return (_jsxs("div", { className: "w-64 bg-surface border-r border-border h-screen p-4 flex flex-col", children: [_jsx("div", { className: "mb-8", children: _jsx("h1", { className: "text-2xl font-bold text-light", children: "Content Board" }) }), _jsxs("nav", { className: "flex-1 space-y-2", children: [_jsx(Link, { to: "/", className: `block px-4 py-2 rounded transition-colors ${isActive('/')
                            ? 'bg-accent-primary text-dark'
                            : 'text-light hover:bg-border'}`, children: "Boards" }), _jsx(Link, { to: "/swipe-file", className: `block px-4 py-2 rounded transition-colors ${isActive('/swipe-file')
                            ? 'bg-accent-primary text-dark'
                            : 'text-light hover:bg-border'}`, children: "Swipe File" })] }), _jsx("div", { className: "pt-4 border-t border-border text-xs text-border", children: _jsx("p", { children: "Content Board v1.0" }) })] }));
};
