import React, { useState } from 'react';
import { COMPANY, PLANS, PlanId } from '../data';
import {
  ToiletIcon, GeyserIcon, PipeIcon, DropIcon, RadarIcon, ShieldIcon, CheckIcon,
} from './Icons';
import TermsAndMandate from './TermsAndMandate';

interface HomePageProps {
  onSignUp: (plan: PlanId) => void;
  onOpenPortal: (portal: 'client' | 'plumber' | 'admin') => void;
}

const COVERED = [
  { icon: <ToiletIcon />, title: 'Toilets', text: 'Cisterns, seals, flush valves and running toilets rebuilt before they waste water.' },
  { icon: <GeyserIcon />, title: 'Geysers', text: 'Temperature, pressure and element checks on a managed 24-month service cycle.' },
  { icon: <PipeIcon />, title: 'Pipes', text: 'Corrosion inspection, joint tightening and replacement of worn sections.' },
  { icon: <DropIcon />, title: 'Small leaks', text: 'Dripping taps, weeping joints and slow traps found and fixed on the visit.' },
  { icon: <RadarIcon />, title: 'Leak detection', text: 'Acoustic and thermal scanning that finds hidden leaks without breaking walls.' },
  { icon: <ShieldIcon />, title: 'Geyser rust prevention', text: 'Anode replacement and protective coating that extend your geyser’s life by years.' },
];

const CYCLE = [
  { month: 'Month 0', text: 'Installation audit — geyser photographed, pressure and temperature logged.' },
  { month: 'Month 6', text: 'Anode inspection and drip-tray flush.' },
  { month: 'Month 12', text: 'Full service — element check, rust-prevention coat applied.' },
  { month: 'Month 18', text: 'Pressure-valve recalibration and pipework inspection.' },
  { month: 'Month 24', text: 'Cycle complete — anode replacement and renewal of the service certificate.' },
];

export default function HomePage({ onSignUp, onOpenPortal }: HomePageProps) {
  return (
    <main id="top">
      {/* ---------------- HERO ---------------- */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="fade-up">
            <p className="eyebrow">Preventative plumbing · Johannesburg south</p>
            <h1 style={{ marginTop: 14 }}>
              Your plumbing, <em>maintained</em> — not repaired in a panic.
            </h1>
            <p className="lead" style={{ marginTop: 20, maxWidth: 540 }}>
              Plumbserv keeps toilets flushing, geysers healthy and pipes dry with a monthly maintenance subscription. One predictable fee, a plumber who knows your home, and no surprises at 2am.
            </p>
            <div className="hero-actions">
              <a className="btn btn-copper" href="#plans">Choose your plan</a>
              <a className="btn btn-ghost" href="#covered">See what we cover</a>
            </div>

            <div className="hero-stats">
              <div>
                <div className="stat-num">{COMPANY.years}</div>
                <div className="stat-label">Years in business</div>
              </div>
              <div>
                <div className="stat-num">0</div>
                <div className="stat-label">Homes on maintenance</div>
              </div>
              <div>
                <div className="stat-num">4 hrs</div>
                <div className="stat-label">Gold emergency response</div>
              </div>
            </div>
          </div>

          <div className="hero-visual fade-up">
            <img
              className="hero-img"
              src="https://assets.dappit.app/q/plumber+copper+pipes+workshop"
              alt="A plumber working on copper pipework in a workshop"
            />
            <div className="hero-badge">
              <strong>Since {COMPANY.founded}</strong>
              <span>Family-run · Registered PIRB plumbers</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- COVERED WORK ---------------- */}
      <section className="section" id="covered">
        <div className="container">
          <p className="eyebrow">What we cover</p>
          <h2 style={{ fontSize: 'clamp(28px, 3.6vw, 42px)', marginTop: 12, maxWidth: 720 }}>
            Every part of the system that decides whether you have a good week
          </h2>
          <p className="lead" style={{ marginTop: 16, maxWidth: 620 }}>
            Your subscription covers the six jobs that cause most household plumbing emergencies — checked on a
            schedule, not after the damage is done.
          </p>

          <div className="covered-grid">
            {COVERED.map((c) => (
              <article className="covered-card" key={c.title}>
                <div className="covered-icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- COMPANY PROFILE ---------------- */}
      <section className="section" id="about" style={{ background: 'var(--cream-2)' }}>
        <div className="container profile-grid">
          <img
            className="profile-img"
            src="https://assets.dappit.app/q/plumber+tools+workbench+repair"
            alt="Plumbing tools laid out on a workbench"
          />
          <div>
            <p className="eyebrow">About Copperline</p>
            <h2 style={{ fontSize: 'clamp(28px, 3.6vw, 40px)', marginTop: 12 }}>
              21 years of doing it properly the first time
            </h2>
            <p className="lead" style={{ marginTop: 18 }}>
              Copperline was started in {COMPANY.founded} by two brothers with one bakkie and a rule they still keep:
              never leave a job until the customer understands what was done and why. Two decades later we run a
              maintenance fleet across the Cape Peninsula, and more than half our work comes from homes we have
              looked after for five years or longer.
            </p>
            <ul className="check-list">
              <li><span className="check-dot"><CheckIcon size={12} /></span> <span><strong>PIRB-registered plumbers</strong> — every technician is qualified, insured and background-checked.</span></li>
              <li><span className="check-dot"><CheckIcon size={12} /></span> <span><strong>Quality work guarantee</strong> — all workmanship is warranted for 12 months, parts for the manufacturer’s term.</span></li>
              <li><span className="check-dot"><CheckIcon size={12} /></span> <span><strong>Photo-documented visits</strong> — you get a digital report with images after every service.</span></li>
              <li><span className="check-dot"><CheckIcon size={12} /></span> <span><strong>One plumber per home</strong> — the same technician learns your property and its quirks.</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- 3D GEYSER ---------------- */}
      <section className="section" id="geyser">
        <div className="container geyser-wrap">
          <div className="model-frame">
            <model-viewer
              src="https://assets.dappit.app/3d/planet-mercury.glb"
              camera-controls
              auto-rotate
              shadow-intensity="1"
              exposure="1.05"
              environment-image="neutral"
              alt="Interactive 3D model of a geyser unit"
              style={{ width: '100%', height: 520, background: 'transparent' }}
            ></model-viewer>
          </div>
          <div>
            <p className="eyebrow">The 24-month geyser cycle</p>
            <h2 style={{ fontSize: 'clamp(26px, 3.4vw, 38px)', marginTop: 12 }}>
              Rotate the model — the service points are marked around it
            </h2>
            <p className="lead" style={{ marginTop: 16 }}>
              A geyser is the most expensive plumbing component in your home, and the one most often ignored until it
              bursts. Gold subscribers have their unit serviced on a fixed 24-month cycle, with each stage logged to
              their client portal.
            </p>
            <ul className="cycle-list">
              {CYCLE.map((c) => (
                <li className="cycle-item" key={c.month}>
                  <span className="cycle-month">{c.month}</span>
                  <span>{c.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- PLANS ---------------- */}
      <section className="section" id="plans" style={{ background: 'var(--cream-2)' }}>
        <div className="container">
          <p className="eyebrow">Subscription plans</p>
          <h2 style={{ fontSize: 'clamp(28px, 3.6vw, 42px)', marginTop: 12, maxWidth: 700 }}>
            Three tiers. Pick the level of cover your home needs.
          </h2>
          <p className="lead" style={{ marginTop: 16, maxWidth: 620 }}>
            All plans bill monthly by debit order. Cancel any time with 30 days’ notice — no lock-in contract.
          </p>

          <div className="plans-grid">
            {PLANS.map((plan) => (
              <article
                className={'plan-card' + (plan.featured ? ' is-featured' : '')}
                key={plan.id}
                style={{
                  ['--plan-accent' as string]: plan.accent,
                  ['--plan-accent-deep' as string]: plan.accentDeep,
                }}
              >
                {plan.featured && <span className="plan-tag">Most popular</span>}
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-sub">{plan.tagline}</p>
                <div className="plan-price">
                  <strong>R{plan.price}</strong>
                  <span>/ month</span>
                </div>
                <ul className="plan-features">
                  {plan.features.map((f) => (
                    <li key={f}>
                      <span className="plan-tick"><CheckIcon size={15} /></span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button type="button" className="btn btn-primary btn-block" onClick={() => onSignUp(plan.id)}>
                  Sign Up
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- TERMS + MANDATE ---------------- */}
      <TermsAndMandate onSignUp={onSignUp} />

      {/* ---------------- TEST LOGIN ---------------- */}
      <section className="section" id="test-login">
        <div className="container">
          <p className="eyebrow">Test login</p>
          <h2 style={{ fontSize: 'clamp(26px, 3.4vw, 38px)', marginTop: 12 }}>
            Try all three portals with pre-filled credentials
          </h2>
          <p className="lead" style={{ marginTop: 14, maxWidth: 640 }}>
            Each portal opens with the credentials already entered — just press the button to sign in.
          </p>

          <div className="test-grid">
            <div className="test-card">
              <h3>Client portal</h3>
              <p className="client-meta">Thandi Mokoena · Gold subscriber</p>
              <div className="cred"><span>Email</span><span>thandi.mokoena@example.co.za</span></div>
              <div className="cred"><span>PIN</span><span>2048</span></div>
              <button type="button" className="btn btn-copper btn-block" onClick={() => onOpenPortal('client')}>
                Open client portal
              </button>
            </div>

            <div className="test-card">
              <h3>Plumber portal</h3>
              <p className="client-meta">Sipho Ndlovu · Field technician</p>
              <div className="cred"><span>Plumber</span><span>Sipho Ndlovu</span></div>
              <div className="cred"><span>PIN</span><span>4821</span></div>
              <button type="button" className="btn btn-primary btn-block" onClick={() => onOpenPortal('plumber')}>
                Open plumber portal
              </button>
            </div>

            <div className="test-card">
              <h3>Admin portal</h3>
              <p className="client-meta">Operations dashboard</p>
              <div className="cred"><span>Email</span><span>Admin@dappit</span></div>
              <div className="cred"><span>PIN</span><span>123qwe</span></div>
              <button type="button" className="btn btn-primary btn-block" onClick={() => onOpenPortal('admin')}>
                Open admin portal
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
