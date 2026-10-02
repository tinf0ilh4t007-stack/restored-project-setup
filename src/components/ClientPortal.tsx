import React, { useState } from 'react';
import { CLIENTS, TEST_EMAIL, TEST_PASSWORD, formatDate, planById, statusLabel } from '../data';
import { StarIcon, CheckIcon } from './Icons';

export default function ClientPortal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState('');

  const client = CLIENTS[0];
  const plan = planById(client.plan);
  const [rating, setRating] = useState<number>(client.rating ?? 0);
  const [review, setReview] = useState(client.review);
  const [reviewSaved, setReviewSaved] = useState(false);
  const [hover, setHover] = useState(0);

  function submitLogin(ev: React.FormEvent) {
    ev.preventDefault();
    if (email.trim().toLowerCase() === TEST_EMAIL.toLowerCase() && password === TEST_PASSWORD) {
      setAuthed(true);
      setError('');
    } else {
      setError('Incorrect email or password. Test login: Admin@Dappit / 123qwe');
    }
  }

  if (!authed) {
    return (
      <main className="portal">
        <div className="container">
          <div className="login-card fade-up">
            <span className="portal-chip chip-client">Client portal</span>
            <h2 style={{ fontSize: 28, marginTop: 18 }}>Welcome back</h2>
            <p className="client-meta" style={{ marginTop: 8, marginBottom: 22 }}>
              Sign in with your email and password to view your plan, service schedule and plumber notes.
            </p>
            <form onSubmit={submitLogin}>
              <div className="field" style={{ textAlign: 'left' }}>
                <label htmlFor="c-email">Email</label>
                <input
                  id="c-email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="Admin@Dappit"
                  autoComplete="username"
                />
              </div>
              <div className="field" style={{ textAlign: 'left' }}>
                <label htmlFor="c-password">Password</label>
                <input
                  id="c-password"
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  placeholder="••••••"
                  autoComplete="current-password"
                />
              </div>
              {error && <p className="error-text" style={{ marginTop: 10 }}>{error}</p>}
              <button type="submit" className="btn btn-copper btn-block" style={{ marginTop: 18 }}>
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

  return (
    <main className="portal">
      <div className="container">
        <div className="portal-head">
          <div className="portal-title">
            <span className="portal-chip chip-client">Client portal</span>
            <div>
              <h2 style={{ fontSize: 26 }}>{client.name}</h2>
              <p className="client-meta">Client {client.id} · joined {formatDate(client.joined)}</p>
            </div>
          </div>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => { setAuthed(false); setPassword(''); setEmail(''); }}>
            Sign out
          </button>
        </div>

        <div className="grid-3">
          {/* ---------- PROFILE ---------- */}
          <div className="card">
            <h3>Your profile</h3>
            <p className="card-sub">Details we hold on record</p>
            <dl className="kv">
              <div className="kv-row"><dt>Email</dt><dd>{client.email}</dd></div>
              <div className="kv-row"><dt>Phone</dt><dd>{client.phone}</dd></div>
              <div className="kv-row"><dt>Address</dt><dd style={{ maxWidth: 200 }}>{client.address}</dd></div>
              <div className="kv-row"><dt>Assigned plumber</dt><dd>{client.plumber}</dd></div>
            </dl>
          </div>

          {/* ---------- PLAN ---------- */}
          <div className="card" style={{ borderTop: '5px solid ' + plan.accent }}>
            <h3>Your plan</h3>
            <p className="card-sub">{plan.tagline}</p>
            <div className="plan-price" style={{ margin: '10px 0 14px' }}>
              <strong style={{ color: plan.accentDeep }}>{plan.name}</strong>
              <span>· R{plan.price} / month</span>
            </div>
            <ul className="plan-features" style={{ margin: 0 }}>
              {plan.features.slice(0, 4).map((f) => (
                <li key={f}><span className="plan-tick" style={{ color: plan.accentDeep }}><CheckIcon size={15} /></span><span>{f}</span></li>
              ))}
            </ul>
          </div>

          {/* ---------- SCHEDULE ---------- */}
          <div className="card">
            <h3>Service schedule</h3>
            <p className="card-sub">Next visit in {Math.max(0, Math.round((new Date(client.nextService).getTime() - new Date('2025-05-20').getTime()) / 86400000))} days</p>
            <ul className="timeline">
              <li>
                <span className="tl-dot done" />
                <div className="tl-body">
                  <strong>Last service — {formatDate(client.lastService)}</strong>
                  <span>Monthly maintenance completed by {client.plumber}</span>
                </div>
              </li>
              <li>
                <span className="tl-dot next" />
                <div className="tl-body">
                  <strong>Next service — {formatDate(client.nextService)}</strong>
                  <span>You will be contacted 48 hours before</span>
                </div>
              </li>
              <li>
                <span className="tl-dot" />
                <div className="tl-body">
                  <strong>Geyser cycle service — {formatDate(client.geyserService)}</strong>
                  <span>24-month cycle · anode replacement and rust prevention</span>
                </div>
              </li>
            </ul>
            <div className="notice notice-warn" style={{ marginTop: 18 }}>
              Your geyser is on a 24-month service cycle. The next cycle visit is
              {' '}{formatDate(client.geyserService)} — we will confirm the appointment 2 weeks ahead.
            </div>
          </div>
        </div>

        <div className="grid-2" style={{ marginTop: 22 }}>
          {/* ---------- WORK LOG ---------- */}
          <div className="card">
            <h3>Completed work log</h3>
            <p className="card-sub">Every visit since you joined, newest first</p>
            <ul className="timeline">
              {client.history.map((h) => (
                <li key={h.date + h.job}>
                  <span className={'tl-dot' + (h.status === 'Completed' ? ' done' : '')} />
                  <div className="tl-body">
                    <strong>{formatDate(h.date)} — {h.status}</strong>
                    <span>{h.job}</span>
                    <span style={{ marginTop: 4 }}>
                      <span className="badge badge-navy">{h.plumber}</span>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- NOTES + REVIEW ---------- */}
          <div>
            <div className="card">
              <h3>Notes from your plumber</h3>
              <p className="card-sub">{client.plumber} updates these after each visit</p>
              {client.notes.map((n) => (
                <div className="note-item" key={n.date + n.text}>
                  {n.text}
                  <div className="note-meta">{n.plumber} · {formatDate(n.date)}</div>
                </div>
              ))}
            </div>

            <div className="card" style={{ marginTop: 22 }}>
              <h3>Review your plumber</h3>
              <p className="card-sub">Rate the service you received from {client.plumber}</p>

              <div className="stars" role="group" aria-label="Rate your plumber">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={'star-btn' + ((hover || rating) >= n ? ' on' : '')}
                    aria-label={n + ' star' + (n > 1 ? 's' : '')}
                    onMouseEnter={() => setHover(n)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => { setRating(n); setReviewSaved(false); }}
                  >
                    <StarIcon filled={(hover || rating) >= n} />
                  </button>
                ))}
                <span style={{ marginLeft: 10, fontSize: 14, color: 'var(--muted)', alignSelf: 'center' }}>
                  {rating > 0 ? rating + ' of 5' : 'Not rated yet'}
                </span>
              </div>

              <div className="field" style={{ marginTop: 16 }}>
                <label htmlFor="review">Comments (optional)</label>
                <textarea
                  id="review"
                  rows={3}
                  value={review}
                  onChange={(e) => { setReview(e.target.value); setReviewSaved(false); }}
                  placeholder="Tell us how the visit went…"
                />
              </div>

              <button
                type="button"
                className="btn btn-copper btn-block"
                disabled={rating === 0}
                onClick={() => setReviewSaved(true)}
              >
                Submit review
              </button>

              {rating === 0 && <p className="helper">Choose a star rating to submit your review.</p>}
              {reviewSaved && (
                <div className="notice notice-success" role="status">
                  Thank you — your {rating}-star review has been sent to {client.plumber} and logged with the
                  operations team.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
