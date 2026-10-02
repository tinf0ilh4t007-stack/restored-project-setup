import React, { useState } from 'react';
import Header, { Route } from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ClientPortal from './components/ClientPortal';
import PlumberPortal from './components/PlumberPortal';
import AdminPortal from './components/AdminPortal';
import { PlanId } from './data';

export default function App() {
  const [route, setRoute] = useState<Route>('home');

  function navigate(next: Route) {
    setRoute(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleSignUp(_plan: PlanId) {
    navigate('client');
  }

  return (
    <>
      <Header route={route} onNavigate={navigate} />

      {route === 'home' && <HomePage onSignUp={handleSignUp} onOpenPortal={navigate} />}
      {route === 'client' && <ClientPortal />}
      {route === 'plumber' && <PlumberPortal />}
      {route === 'admin' && <AdminPortal />}

      <Footer />
    </>
  );
}
