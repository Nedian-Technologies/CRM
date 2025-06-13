import React, { useState } from 'react';
import { AuthProvider, useAuth } from './components/auth/AuthProvider';
import AuthGuard from './components/auth/AuthGuard';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ForgotPassword from './components/auth/ForgotPassword';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Contacts from './components/Contacts';
import Deals from './components/Deals';
import Tasks from './components/Tasks';
import Settings from './components/Settings';

type AuthView = 'login' | 'signup' | 'forgot-password';

const AuthFlow: React.FC = () => {
  const [authView, setAuthView] = useState<AuthView>('login');
  const [authError, setAuthError] = useState<string | null>(null);
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);
  const { login, signup, resetPassword, isLoading } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      setAuthError(null);
      await login(email, password);
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Login failed');
    }
  };

  const handleSignup = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    company: string;
  }) => {
    try {
      setAuthError(null);
      await signup(userData);
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Signup failed');
    }
  };

  const handleResetPassword = async (email: string) => {
    try {
      setAuthError(null);
      await resetPassword(email);
      setResetPasswordSuccess(true);
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Password reset failed');
    }
  };

  const switchAuthView = (view: AuthView) => {
    setAuthView(view);
    setAuthError(null);
    setResetPasswordSuccess(false);
  };

  switch (authView) {
    case 'login':
      return (
        <Login
          onLogin={handleLogin}
          onSwitchToSignup={() => switchAuthView('signup')}
          onSwitchToForgotPassword={() => switchAuthView('forgot-password')}
          isLoading={isLoading}
          error={authError}
        />
      );
    case 'signup':
      return (
        <Signup
          onSignup={handleSignup}
          onSwitchToLogin={() => switchAuthView('login')}
          isLoading={isLoading}
          error={authError}
        />
      );
    case 'forgot-password':
      return (
        <ForgotPassword
          onResetPassword={handleResetPassword}
          onBackToLogin={() => switchAuthView('login')}
          isLoading={isLoading}
          error={authError}
          success={resetPasswordSuccess}
        />
      );
    default:
      return null;
  }
};

const MainApp: React.FC = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AuthFlow />;
  }

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'contacts':
        return <Contacts />;
      case 'deals':
        return <Deals />;
      case 'tasks':
        return <Tasks />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AuthGuard>
      <div className="flex h-screen bg-gray-50">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        <main className="flex-1 overflow-hidden">
          {renderActiveView()}
        </main>
      </div>
    </AuthGuard>
  );
};

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;