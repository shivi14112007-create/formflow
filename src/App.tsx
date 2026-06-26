import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LandingLayout } from './components/layout/LandingLayout';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { LandingHero } from './components/landing/LandingHero';
import { AuthScreen } from './components/landing/AuthScreen';
import { InteractiveBuilderWorkspace } from './components/dashboard/InteractiveBuilderWorkspace';

export default function App() {
  // Screen router: 'landing' | 'auth_login' | 'auth_signup' | 'dashboard'
  const [screen, setScreen] = React.useState<'landing' | 'auth_login' | 'auth_signup' | 'dashboard'>('landing');
  
  // Custom user session
  const [currentUser, setCurrentUser] = React.useState<{ email: string; name: string } | null>(null);

  // Dashboard active sub-tab
  const [activeTab, setActiveTab] = React.useState<string>('builder');

  return (
    <div className="min-h-screen bg-brand-bg text-zinc-100 font-sans selection:bg-brand-primary/30">
      <AnimatePresence mode="wait">
        {screen === 'landing' && (
          <motion.div
            key="landing-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
          >
            <LandingLayout
              onNavigateToDashboard={() => {
                if (currentUser) {
                  setScreen('dashboard');
                  setActiveTab('builder');
                } else {
                  setScreen('auth_login');
                }
              }}
            >
              <LandingHero
                onStart={() => {
                  if (currentUser) {
                    setScreen('dashboard');
                    setActiveTab('builder');
                  } else {
                    setScreen('auth_signup');
                  }
                }}
                onViewDemo={() => {
                  // Direct demonstration login
                  if (!currentUser) {
                    setCurrentUser({ email: 'guest@formflow.io', name: 'Guest Developer' });
                  }
                  setScreen('dashboard');
                  setActiveTab('analytics');
                }}
              />
            </LandingLayout>
          </motion.div>
        )}

        {(screen === 'auth_login' || screen === 'auth_signup') && (
          <motion.div
            key="auth-screen"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AuthScreen
              initialMode={screen === 'auth_login' ? 'login' : 'signup'}
              onBack={() => setScreen('landing')}
              onSuccess={(user) => {
                setCurrentUser(user);
                setScreen('dashboard');
                setActiveTab('builder');
              }}
            />
          </motion.div>
        )}

        {screen === 'dashboard' && (
          <motion.div
            key="dashboard-screen"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, type: 'spring', damping: 25 }}
          >
            <DashboardLayout
              activeTab={activeTab}
              onTabChange={(tabId) => setActiveTab(tabId)}
              onNavigateLanding={() => setScreen('landing')}
              currentUser={currentUser}
              onLogout={() => {
                setCurrentUser(null);
                setScreen('landing');
              }}
            >
              <InteractiveBuilderWorkspace
                activeTab={activeTab}
                onTabChange={(tabId) => setActiveTab(tabId)}
              />
            </DashboardLayout>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
