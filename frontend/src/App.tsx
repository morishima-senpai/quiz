import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/Auth/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import LoadingSpinner from './components/Common/LoadingSpinner';
import Layout from './components/Layout/Layout';
import './App.css';

// lazy load pages for better performance
const AuthPage = React.lazy(() => import('./pages/AuthPage'));
const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));
const QuizPage = React.lazy(() => import('./pages/QuizPage'));
const AttemptPage = React.lazy(() => import('./pages/AttemptPage'));

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { token } = useAuth();
  return token ? <>{children}</> : <Navigate to="/auth" replace />;
};

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner size="large" />
  </div>
);

const AppRoutes: React.FC = () => {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // checks authentication status
    const checkAuth = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  if (isLoading) {
    return <LoadingFallback />;
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route
          path="/auth"
          element={
            token ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Layout showHeader={false} showFooter={false}>
                <AuthPage />
              </Layout>
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout>
                <DashboardPage />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/quiz"
          element={
            <PrivateRoute>
              <Layout>
                <QuizPage />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/attempts"
          element={
            <PrivateRoute>
              <Layout>
                <AttemptPage />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-gray-100">
              <AppRoutes />
            </div>
          </Router>
        </AuthProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
};

export default App;
