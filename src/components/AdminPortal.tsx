import React, { useState } from 'react';
import {
  CLIENTS, ADMIN_EMAIL, ADMIN_PIN, formatDate, planById, statusLabel, statusColor,
  WELCOME_EMAIL_SUBJECT, welcomeEmailBody, Client,
} from '../data';

export default function AdminPortal() {
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState('');

  const [clients, setClients] = useState<Client[]>(CLIENTS);
  const [recipients, setRecipients] = useState<string[]>([]);
  const [subject, setSubject] = useState(WELCOME_EMAIL_SUBJECT);
  const [body, setBody] = useState(welcomeEmailBody('Thandi', '8 June 2025'));
  const [sent, setSent] = useState<string | null>(null);

  function submitPin(ev: React.FormEvent) {
    ev.preventDefault();
    if (email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() && pin === ADMIN_PIN) {
      setAuthed(true);
      setError('');
    } else {
      setError('Incorrect email or PIN. Test login: Admin@dappit / 123qwe');
    }
  }

  function toggleRecipient(id: string) {
    setRecipients((r) => (r.includes(id) ? r.filter((x) => x !== id) : [...r, id]));
    setSent(null);
  }

  function sendEmail(ev: React.FormEvent) {
    ev.preventDefault();
    if (recipients.length === 0 || !subject.trim() || !body.trim()) return;
    setSent(
      recipients.length === clients.length
        ? 'Message sent to all ' + recipients.length + ' clients.'
        : 'Message sent to ' + recipients.length + ' client' + (recipients.length > 1 ? 's' : '') + '.',
    );
  }

  if (!authed) {
    return (
      <main className="portal">
        <div className="container">
          <div className="login-card fade-up">
            <span className="portal-chip chip-admin">Admin portal</span>
            <h2 style={{ fontSize: 28, marginTop: 18 }}>Operations sign in</h2>
            <p className="client-meta" style={{ marginTop: 8, marginBottom: 22 }}>
              Enter your administrator email and PIN.
            </p>
            <form onSubmit={submitPin}>
              <div className="field" style={{ textAlign: 'left' }}>
                <label htmlFor="a-email">Email</label>
                <input
                  id="a-email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="Admin@dappit"
                />
              </div>
              <input
                className="pin-input"
                value={pin}
                onChange={(e) => { setPin(e.target.value); setError(''); }}
                placeholder="••••••"
                maxLength={10}
                aria-label="Admin PIN"
              />
              {error && <p className="error-text" style={{ marginTop: 10 }}>{error}</p>}
              <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: 18 }}>
                Sign in
              </button>
            </form>
            <div className="notice notice-info" style={{ textAlign: 'left' }}>
              <strong>Test credentials</strong> — Admin@dappit / 123qwe
            </div>
          </div>
        </div>
      </main>
    );
  }

  const completed = clients.reduce((n, c) => n + c.history.filter((h) => h.status === 'Completed').length, 0);
  const pending = clients.filter((c) => c.status !== 'ready').length;
  const totalJobs = completed + pending;
  const completedPct = totalJobs === 0 ? 0 : Math.round((completed / totalJobs) * 100);

  return (
    <main className="portal">
      <div className="container">
        <div className="portal-head">
          <div className="portal-title">
            <span className="portal-chip chip-admin">Admin portal</span>
            <div>
              <h2 style={{ fontSize: 26 }}>Operations dashboard</h2>
              <p className="client-meta">{clients.length} active subscriptions · Cape Town metro</p>
            </div>
          </div>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => { setAuthed(false); setPin(''); setEmail(''); }}>
            Sign out
          </button>
        </div>

        {/* ---------- METRICS ---------- */}
        <div className="grid-3">
          <div className="card metric">
            <span className="client-meta">Completed jobs</span>
            <strong style={{ color: 'var(--success)' }}>{completed}</strong>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: completedPct + '%', background: 'var(--success)' }} />
            </div>
            <span className="client-meta">{completedPct}% of all logged work</span>
          </div>
          <div className="card metric">
            <span className="client-meta">Pending jobs</span>
            <strong style={{ color: 'var(--warning)' }}>{pending}</strong>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: (100 - completedPct) + '%', background: 'var(--warning)' }} />
            </div>
            <span className="client-meta">Awaiting scheduling or sign-off</span>
          </div>
          <div className="card metric">
            <span className="client-meta">Monthly recurring</span>
            <strong>R{clients.reduce((n, c) => n + planById(c.plan).price, 0).toLocaleString('en-ZA')}</strong>
            <span className="client-meta">Across {clients.length} debit orders</span>
          </div>
        </div>

        {/* ---------- CLIENT TABLE ---------- */}
        <h3 style={{ fontSize: 22, margin: '34px 0 14px' }}>All client details</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Client</th>
                <th>Address</th>
                <th>Email</th>
                <th>Plan</th>
                <th>Plumber</th>
                <th>Last service</th>
                <th>Next geyser</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id}>
                  <td>
                    <strong>{c.name}</strong>
                    <div className="client-meta">{c.id} · {c.phone}</div>
                  </td>
                  <td style={{ maxWidth: 220 }}>{c.address}</td>
                  <td>{c.email}</td>
                  <td>
                    <span className="badge badge-navy">{planById(c.plan).name}</span>
                  </td>
                  <td>{c.plumber}</td>
                  <td>{formatDate(c.lastService)}</td>
                  <td>{formatDate(c.geyserService)}</td>
                  <td>
                    <span
                      className={'badge badge-' + (c.status === 'ready' ? 'green' : c.status === 'upcoming' ? 'amber' : 'red')}
                      style={{ borderLeft: '3px solid ' + statusColor(c.status) }}
                    >
                      {statusLabel(c.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ---------- JOB HISTORY + EMAIL ---------- */}
        <div className="grid-2" style={{ marginTop: 26 }}>
          <div className="card">
            <h3>Job history</h3>
            <p className="card-sub">Most recent logged work across all clients</p>
            <div style={{ display: 'grid', gap: 12 }}>
              {clients
                .flatMap((c) => c.history.map((h) => ({ ...h, client: c.name, id: c.id })))
                .sort((a, b) => (a.date < b.date ? 1 : -1))
                .slice(0, 8)
                .map((h) => (
                  <div className="note-item" key={h.id + h.date + h.job}>
                    <strong>{h.client}</strong> — {h.job}
                    <div className="note-meta">
                      {formatDate(h.date)} · {h.plumber} ·{' '}
                      <span className={'badge badge-' + (h.status === 'Completed' ? 'green' : 'amber')}>{h.status}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="card">
            <h3>Send a message</h3>
            <p className="card-sub">Choose recipients, edit the message, then send</p>

            <form onSubmit={sendEmail}>
              <div style={{ display: 'flex', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => { setRecipients(clients.map((c) => c.id)); setSent(null); }}
                >
                  Select all clients
                </button>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => { setRecipients([]); setSent(null); }}
                >
                  Clear selection
                </button>
              </div>

              <div className="recipient-list">
                {clients.map((c) => (
                  <label className="recipient" key={c.id}>
                    <input
                      type="checkbox"
                      checked={recipients.includes(c.id)}
                      onChange={() => toggleRecipient(c.id)}
                    />
                    <span>{c.name} <span className="client-meta">· {c.email}</span></span>
                  </label>
                ))}
              </div>

              <div className="field" style={{ marginTop: 16 }}>
                <label htmlFor="a-subject">Subject</label>
                <input id="a-subject" value={subject} onChange={(e) => { setSubject(e.target.value); setSent(null); }} />
              </div>

              <div className="field">
                <label htmlFor="a-body">Message</label>
                <textarea id="a-body" rows={7} value={body} onChange={(e) => { setBody(e.target.value); setSent(null); }} />
                <p className="helper">
                  Sample welcome email — replace [date] with the client’s next service date before sending.
                </p>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={recipients.length === 0 || !subject.trim() || !body.trim()}
              >
                Send to {recipients.length} client{recipients.length === 1 ? '' : 's'}
              </button>
            </form>

            {sent && <div className="notice notice-success" role="status">{sent}</div>}
            {recipients.length === 0 && <p className="helper">Select at least one recipient to send.</p>}
          </div>
        </div>
      </div>
    </main>
  );
}
