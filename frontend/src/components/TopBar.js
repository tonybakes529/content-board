import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const TopBar = ({ boardName, onAddCard }) => {
    return (_jsxs("div", { className: "h-16 bg-surface border-b border-border px-6 flex items-center justify-between", children: [_jsx("h2", { className: "text-xl font-semibold text-light", children: boardName || 'Boards' }), onAddCard && (_jsx("button", { onClick: onAddCard, className: "px-4 py-2 bg-accent-primary hover:bg-accent-hover text-dark rounded font-medium transition-colors", children: "+ Add Card" }))] }));
};
