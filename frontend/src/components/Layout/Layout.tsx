import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import Button from '../Common/Button';

interface LayoutProps {
    children: React.ReactNode;
    showHeader?: boolean;
    showFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
    children,
    showHeader = true,
    showFooter = true
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/auth');
    };

    const isAuthPage = location.pathname === '/auth';

    const navigation = [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Take Quiz', href: '/quiz' },
        { name: 'Analysis', href: '/attempts' },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            {showHeader && !isAuthPage && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="flex-shrink-0 flex items-center">
                                    <h1 className="text-xl font-bold text-gray-900">
                                        Quiz App
                                    </h1>
                                </div>
                                <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                    {navigation.map((item) => {
                                        const isActive = location.pathname === item.href;
                                        return (
                                            <button
                                                key={item.name}
                                                onClick={() => navigate(item.href)}
                                                className={`${
                                                    isActive
                                                        ? 'border-blue-500 bg-blue-600 text-gray-100 rounded-none hover:bg-blue-700'
                                                        : 'border-transparent rounded-none text-gray-600 hover:text-white'
                                                } inline-flex items-center px-1 text-sm font-medium hover:bg-blue-500`}
                                            >
                                                {item.name}
                                            </button>
                                        );
                                    })}
                                </nav>
                            </div>
                            <div className="flex items-center">
                                {user && (
                                    <div className="flex items-center space-x-4">
                                        <span className="text-gray-700">
                                            Welcome, {user.username}
                                        </span>
                                        <Button
                                            variant="secondary"
                                            size="small"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>
            )}

            <main className="flex-grow">
                {children}
            </main>

            {showFooter && !isAuthPage && (
                <footer className="bg-white border-t border-gray-200">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <div className="text-center text-gray-500 text-sm">
                        Quiz App, Conceptile Assignment. © Ayon,  {new Date().getFullYear()} 
                        </div>
                    </div>
                </footer>
            )}
        </div>
    );
};

export default Layout;
