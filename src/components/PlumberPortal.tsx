import React, { useState } from 'react';
import { CLIENTS, PLUMBER_PINS, TEST_EMAIL, TEST_PASSWORD, Client, formatDate, planById, statusLabel, statusColor } from '../data';
import { CheckIcon } from './Icons';

interface PlumberPortalProps {
  presetPlumber?: string;
}

export default function PlumberPortal({ presetPlumber }: PlumberPortalProps) {
  const plumberNames = Object.keys(PLUMBER_PINS);
  const [selected, setSelected] = useState<string>(presetPlumber ?? plumberNames[0]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState('');

  const [clients, setClients] = useState<Client[]>(CLIENTS);
  const [noteDraft, setNoteDraft] = useState<Record<string, string>>({});
  const [flash, setFlash] = useState('');

  function submitLogin(ev: React.FormEvent) {
    ev.preventDefault();
    if (email.trim().toLowerCase() === TEST_EMAIL.toLowerCase() && password === TEST_PASSWORD) {
      setAuthed(true);
      setError('');
    } else {
      setError('Incorrect email or password. Test login: Admin@Dappit / 123qwe');
    }
  }

  function addNote(clientId: string) {
    const text = (noteDraft[clientId] ?? '').trim();
    if (!text) return;
    setClients((prev) =>
      prev.map((c) =>
        c.id === clientId
          ? { ...c, notes: [{ date: '2025-05-20', plumber: selected, text }, ...c.notes] }
          : c,
      ),
    );
    setNoteDraft((d) => ({ ...d, [clientId]: '' }));
    setFlash('Note added to ' + clientId + '.');
    window.setTimeout(() => setFlash(''), 2600);
  }

  function markComplete(clientId: string) {
    setClients((prev) =>
      prev.map((c) =>
        c.id === clientId
          ? {
              ...c,
              status: 'upcoming',
              lastService: '2025-05-20',
              history: [
                { date: '2025-05-20', job: 'Monthly maintenance completed and signed off', plumber: selected, status: 'Completed' },
                ...c.history,
              ],
            }
          : c,
      ),
    );
    setFlash('Job marked complete for ' + clientId + '.');
    window.setTimeout(() => setFlash(''), 2600);
  }

  if (!authed) {
    return (
      <main className="portal">
        <div className="container">
          <div className="login-card fade-up">
            <span className="portal-chip chip-plumber">Plumber portal</span>
            <h2 style={{ fontSize: 28, marginTop: 18 }}>Technician sign in</h2>
            <p className="client-meta" style={{ marginTop: 8, marginBottom: 22 }}>
              Select your name and sign in with your email and password to see your client list.
            </p>
            <form onSubmit={submitLogin}>
              <div className="field" style={{ textAlign: 'left' }}>
                <label htmlFor="p-name">Plumber</label>
                <select id="p-name" value={selected} onChange={(e) => { setSelected(e.target.value); setError(''); }}>
                  {plumberNames.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
              <div className="field" style={{ textAlign: 'left' }}>
                <label htmlFor="p-email">Email</label>
                <input
                  id="p-email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="Admin@Dappit"
                  autoComplete="username"
                />
              </div>
              <div className="field" style={{ textAlign: 'left' }}>
                <label htmlFor="p-password">Password</label>
                <input
                  id="p-password"
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  placeholder="••••••"
                  autoComplete="current-password"
                />
              </div>
              {error && <p className="error-text" style={{ marginTop: 10 }}>{error}</p>}
              <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: 18 }}>
                Sign in
              </button>
            </form>
            <div className="notice notice-info" style={{ textAlign: 'left' }}>
              <strong>Test credentials</strong> — Admin@Dappit / 123qwe
            </div>
          </div>
        </div>
      </main>
    );
  }

  const mine = clients.filter((c) => c.plumber === selected);
  const ready = mine.filter((c) => c.status === 'ready').length;
  const upcoming = mine.filter((c) => c.status === 'upcoming').length;
  const overdue = mine.filter((c) => c.status === 'overdue').length;

  return (
    <main className="portal">
      <div className="container">
        <div className="portal-head">
          <div className="portal-title">
            <span className="portal-chip chip-plumber">Plumber portal</span>
            <div>
              <h2 style={{ fontSize: 26 }}>{selected}</h2>
              <p className="client-meta">
                {mine.length} clients assigned · {ready} ready · {upcoming} upcoming · {overdue} overdue
              </p>
            </div>
          </div>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => { setAuthed(false); setPassword(''); setEmail(''); }}>
            Sign out
          </button>
        </div>

        {flash && <div className="notice notice-success" role="status">{flash}</div>}

        <div className="grid-3" style={{ marginTop: flash ? 18 : 0 }}>
          <div className="card metric">
            <span className="badge badge-green">Ready to service</span>
            <strong style={{ color: 'var(--success)' }}>{ready}</strong>
            <span className="client-meta">Due now — schedule this week</span>
          </div>
          <div className="card metric">
            <span className="badge badge-amber">Upcoming</span>
            <strong style={{ color: 'var(--warning)' }}>{upcoming}</strong>
            <span className="client-meta">Due within the next 14 days</span>
          </div>
          <div className="card metric">
            <span className="badge badge-red">Overdue</span>
            <strong style={{ color: 'var(--error)' }}>{overdue}</strong>
            <span className="client-meta">Past the scheduled date — action needed</span>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 20, marginTop: 26 }}>
          {mine.map((c) => {
            const plan = planById(c.plan);
            return (
              <article
                className="client-card"
                key={c.id}
                style={{ ['--status' as string]: statusColor(c.status) }}
              >
                <div className="client-head">
                  <div>
                    <div className="client-name">{c.name}</div>
                    <div className="client-meta">{c.address}</div>
                    <div className="client-meta" style={{ marginTop: 4 }}>
                      {c.phone} · {c.email}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className={'badge badge-' + (c.status === 'ready' ? 'green' : c.status === 'upcoming' ? 'amber' : 'red')}>
                      {statusLabel(c.status)}
                    </span>
                    <div className="client-meta" style={{ marginTop: 8 }}>
                      <span className="badge badge-navy">{plan.name} · R{plan.price}/mo</span>
                    </div>
                  </div>
                </div>

                <div className="grid-3" style={{ gap: 14, marginBottom: 16 }}>
                  <div className="note-item" style={{ margin: 0 }}>
                    <strong>Last service</strong>
                    <div className="note-meta">{formatDate(c.lastService)}</div>
                  </div>
                  <div className="note-item" style={{ margin: 0 }}>
                    <strong>Next service</strong>
                    <div className="note-meta">{formatDate(c.nextService)}</div>
                  </div>
                  <div className="note-item" style={{ margin: 0 }}>
                    <strong>Next geyser service</strong>
                    <div className="note-meta">{formatDate(c.geyserService)}</div>
                  </div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <div className="client-meta" style={{ marginBottom: 8 }}>Work notes</div>
                  {c.notes.slice(0, 2).map((n) => (
                    <div className="note-item" key={n.date + n.text}>
                      {n.text}
                      <div className="note-meta">{n.plumber} · {formatDate(n.date)}</div>
                    </div>
                  ))}
                  <div className="field" style={{ marginBottom: 10 }}>
                    <label htmlFor={'note-' + c.id}>Add a note</label>
                    <textarea
                      id={'note-' + c.id}
                      rows={2}
                      value={noteDraft[c.id] ?? ''}
                      onChange={(e) => setNoteDraft((d) => ({ ...d, [c.id]: e.target.value }))}
                      placeholder="What did you find on site?"
                    />
                  </div>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      disabled={!(noteDraft[c.id] ?? '').trim()}
                      onClick={() => addNote(c.id)}
                    >
                      Save note
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => markComplete(c.id)}
                    >
                      <CheckIcon size={15} /> Mark job complete
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
