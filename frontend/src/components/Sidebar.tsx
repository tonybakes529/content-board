import { Link, useLocation } from 'react-router-dom';

export const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 bg-surface border-r border-border h-screen p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-light">Content Board</h1>
      </div>

      <nav className="flex-1 space-y-2">
        <Link
          to="/"
          className={`block px-4 py-2 rounded transition-colors ${
            isActive('/')
              ? 'bg-accent-primary text-dark'
              : 'text-light hover:bg-border'
          }`}
        >
          Boards
        </Link>
        <Link
          to="/swipe-file"
          className={`block px-4 py-2 rounded transition-colors ${
            isActive('/swipe-file')
              ? 'bg-accent-primary text-dark'
              : 'text-light hover:bg-border'
          }`}
        >
          Swipe File
        </Link>
      </nav>

      <div className="pt-4 border-t border-border text-xs text-border">
        <p>Content Board v1.0</p>
      </div>
    </div>
  );
};
