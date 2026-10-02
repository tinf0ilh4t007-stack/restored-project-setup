import React, { useState } from 'react';

export type Route = 'home' | 'client' | 'plumber' | 'admin';

interface HeaderProps {
  route: Route;
  onNavigate: (route: Route) => void;
}

const LINKS: { id: string; label: string }[] = [
  { id: 'covered', label: 'What we cover' },
  { id: 'about', label: 'About us' },
  { id: 'geyser', label: 'Geyser cycle' },
  { id: 'plans', label: 'Plans' },
  { id: 'terms', label: 'Terms' },
  { id: 'test-login', label: 'Test login' },
];

export default function Header({ route, onNavigate }: HeaderProps) {
  const [open, setOpen] = useState(false);

  function goHomeThen(id: string) {
    setOpen(false);
    onNavigate('home');
    window.setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  }

  return (
    <header className="nav">
      <div className="container nav-inner">
        <a
          className="brand"
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span className="brand-mark" aria-hidden="true">🔧</span>
          PlumbServ
        </a>

        <nav className="nav-links" style={{ display: undefined }}>
          {LINKS.map((l) => (
            <button
              key={l.id}
              type="button"
              className="nav-link"
              onClick={() => goHomeThen(l.id)}
            >
              {l.label}
            </button>
          ))}
          <button
            type="button"
            className={'nav-link' + (route === 'client' ? ' is-active' : '')}
            onClick={() => { setOpen(false); onNavigate('client'); window.scrollTo({ top: 0 }); }}
          >
            Client
          </button>
          <button
            type="button"
            className={'nav-link' + (route === 'plumber' ? ' is-active' : '')}
            onClick={() => { setOpen(false); onNavigate('plumber'); window.scrollTo({ top: 0 }); }}
          >
            Plumber
          </button>
          <button
            type="button"
            className={'nav-link' + (route === 'admin' ? ' is-active' : '')}
            onClick={() => { setOpen(false); onNavigate('admin'); window.scrollTo({ top: 0 }); }}
          >
            Admin
          </button>
        </nav>

        <button
          type="button"
          className="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="container" style={{ paddingBottom: 18 }}>
          <div style={{ display: 'grid', gap: 6 }}>
            {LINKS.map((l) => (
              <button key={l.id} type="button" className="nav-link" onClick={() => goHomeThen(l.id)}>
                {l.label}
              </button>
            ))}
            <button type="button" className="nav-link" onClick={() => { setOpen(false); onNavigate('client'); window.scrollTo({ top: 0 }); }}>Client portal</button>
            <button type="button" className="nav-link" onClick={() => { setOpen(false); onNavigate('plumber'); window.scrollTo({ top: 0 }); }}>Plumber portal</button>
            <button type="button" className="nav-link" onClick={() => { setOpen(false); onNavigate('admin'); window.scrollTo({ top: 0 }); }}>Admin portal</button>
          </div>
        </div>
      )}
    </header>
  );
}
