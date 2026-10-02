import React, { useState } from 'react';
import { PLANS, PlanId, COMPANY } from '../data';

interface TermsAndMandateProps {
  onSignUp: (plan: PlanId) => void;
}

interface MandateState {
  fullName: string;
  idNumber: string;
  email: string;
  phone: string;
  address: string;
  bank: string;
  accountNumber: string;
  branchCode: string;
  accountType: string;
  plan: PlanId;
  startDate: string;
  accepted: boolean;
}

const EMPTY: MandateState = {
  fullName: '',
  idNumber: '',
  email: '',
  phone: '',
  address: '',
  bank: '',
  accountNumber: '',
  branchCode: '',
  accountType: 'Cheque / Current',
  plan: 'silver',
  startDate: '',
  accepted: false,
};

export default function TermsAndMandate({ onSignUp }: TermsAndMandateProps) {
  const [form, setForm] = useState<MandateState>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function set<K extends keyof MandateState>(key: K, value: MandateState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: '' }));
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = 'Please enter the account holder’s full name.';
    if (!form.idNumber.trim()) e.idNumber = 'Your ID number is required for the debit order mandate.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.';
    if (form.phone.replace(/\D/g, '').length < 9) e.phone = 'Enter a valid contact number.';
    if (!form.address.trim()) e.address = 'The service address is required.';
    if (!form.bank.trim()) e.bank = 'Please enter your bank.';
    if (form.accountNumber.replace(/\D/g, '').length < 6) e.accountNumber = 'Enter a valid account number.';
    if (form.branchCode.replace(/\D/g, '').length < 4) e.branchCode = 'Enter a valid branch code.';
    if (!form.startDate) e.startDate = 'Choose a debit order start date.';
    if (!form.accepted) e.accepted = 'You must accept the Terms & Conditions to continue.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  }

  const selectedPlan = PLANS.find((p) => p.id === form.plan) ?? PLANS[1];

  return (
    <section className="section" id="terms">
      <div className="container">
        <p className="eyebrow">Terms &amp; debit order</p>
        <h2 style={{ fontSize: 'clamp(26px, 3.4vw, 38px)', marginTop: 12, maxWidth: 700 }}>
          Read the terms, then authorise your monthly debit order
        </h2>

        <div className="split-grid" style={{ marginTop: 36 }}>
          {/* ---------- TERMS ---------- */}
          <div className="panel">
            <h3>Terms &amp; Conditions</h3>
            <p className="client-meta">Effective 1 January 2025 · {COMPANY.name}</p>
            <div className="terms-scroll">
              <h4>1. The subscription</h4>
              <p>
                Copperline Preventative Plumbing provides scheduled maintenance visits on a monthly basis. The plan
                you select determines the scope, response time and included services.
              </p>

              <h4>2. Billing and debit orders</h4>
              <p>
                Fees are billed monthly in advance by debit order through our payment partner, PaySoft. The first
                collection is taken on the start date you select, and thereafter on the same day each month. Failed
                collections may be re-presented within 5 business days.
              </p>

              <h4>3. Scheduling and access</h4>
              <ul>
                <li>We will contact you at least 48 hours before each scheduled visit.</li>
                <li>If no one is available to provide access, the visit may be forfeited for that month.</li>
                <li>Silver and Gold subscribers are scheduled within 24 hours of a request.</li>
              </ul>

              <h4>4. Geyser service cycle</h4>
              <p>
                Gold subscribers receive a managed 24-month geyser service cycle. Each stage is logged in your client
                portal. Missed stages are carried over and completed at the next available visit.
              </p>

              <h4>5. Emergency cover</h4>
              <p>
                Gold emergency cover applies to plumbing failures at the registered address, 24 hours a day, with a
                four-hour response target inside the Cape Town metro. Cover excludes damage caused by third-party
                work or structural faults.
              </p>

              <h4>6. Exclusions</h4>
              <ul>
                <li>Work on municipal supply lines or body-corporate shared infrastructure.</li>
                <li>Replacement of major components not listed in your plan (quoted separately).</li>
                <li>Damage from freezing, load-shedding surges or unauthorised alterations.</li>
              </ul>

              <h4>7. Cancellation</h4>
              <p>
                Either party may cancel with 30 days’ written notice. Fees for work already completed remain payable.
                There is no fixed-term lock-in.
              </p>

              <h4>8. Guarantee</h4>
              <p>
                All workmanship is guaranteed for 12 months from the date of service. Parts carry the manufacturer’s
                warranty.
              </p>
            </div>
          </div>

          {/* ---------- MANDATE ---------- */}
          <div className="panel">
            <h3>Debit Order Mandate</h3>
            <p className="client-meta">
              Authorisation for monthly collection · processed by PaySoft
            </p>

            {submitted ? (
              <div className="notice notice-success" role="status">
                <strong>Mandate authorised.</strong> Thank you, {form.fullName.split(' ')[0]}. Your {selectedPlan.name} plan
                is set to begin on {form.startDate}. A confirmation has been sent to {form.email}, and your debit order
                will be presented by PaySoft on that date.
                <div style={{ marginTop: 14 }}>
                  <button type="button" className="btn btn-copper btn-sm" onClick={() => onSignUp(form.plan)}>
                    Open my client portal
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="field">
                  <label htmlFor="m-name">Account holder full name</label>
                  <input
                    id="m-name"
                    value={form.fullName}
                    onChange={(e) => set('fullName', e.target.value)}
                    placeholder="e.g. Thandi Mokoena"
                  />
                  {errors.fullName && <p className="error-text">{errors.fullName}</p>}
                </div>

                <div className="field-row">
                  <div className="field">
                    <label htmlFor="m-id">ID number</label>
                    <input id="m-id" value={form.idNumber} onChange={(e) => set('idNumber', e.target.value)} placeholder="9001015800085" />
                    {errors.idNumber && <p className="error-text">{errors.idNumber}</p>}
                  </div>
                  <div className="field">
                    <label htmlFor="m-phone">Mobile number</label>
                    <input id="m-phone" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="082 000 0000" />
                    {errors.phone && <p className="error-text">{errors.phone}</p>}
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="m-email">Email address</label>
                  <input id="m-email" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@example.co.za" />
                  {errors.email && <p className="error-text">{errors.email}</p>}
                </div>

                <div className="field">
                  <label htmlFor="m-address">Service address</label>
                  <input id="m-address" value={form.address} onChange={(e) => set('address', e.target.value)} placeholder="18 Roodebloem Rd, Woodstock" />
                  {errors.address && <p className="error-text">{errors.address}</p>}
                </div>

                <div className="field">
                  <label htmlFor="m-plan">Selected plan</label>
                  <select id="m-plan" value={form.plan} onChange={(e) => set('plan', e.target.value as PlanId)}>
                    {PLANS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} — R{p.price} / month
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field-row">
                  <div className="field">
                    <label htmlFor="m-bank">Bank</label>
                    <input id="m-bank" value={form.bank} onChange={(e) => set('bank', e.target.value)} placeholder="e.g. FNB" />
                    {errors.bank && <p className="error-text">{errors.bank}</p>}
                  </div>
                  <div className="field">
                    <label htmlFor="m-type">Account type</label>
                    <select id="m-type" value={form.accountType} onChange={(e) => set('accountType', e.target.value)}>
                      <option>Cheque / Current</option>
                      <option>Savings</option>
                      <option>Transmission</option>
                    </select>
                  </div>
                </div>

                <div className="field-row">
                  <div className="field">
                    <label htmlFor="m-acc">Account number</label>
                    <input id="m-acc" value={form.accountNumber} onChange={(e) => set('accountNumber', e.target.value)} placeholder="62000000000" />
                    {errors.accountNumber && <p className="error-text">{errors.accountNumber}</p>}
                  </div>
                  <div className="field">
                    <label htmlFor="m-branch">Branch code</label>
                    <input id="m-branch" value={form.branchCode} onChange={(e) => set('branchCode', e.target.value)} placeholder="250655" />
                    {errors.branchCode && <p className="error-text">{errors.branchCode}</p>}
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="m-start">Debit order start date</label>
                  <input id="m-start" type="date" value={form.startDate} onChange={(e) => set('startDate', e.target.value)} />
                  {errors.startDate && <p className="error-text">{errors.startDate}</p>}
                </div>

                <div className="field">
                  <label className="checkbox-row">
                    <input type="checkbox" checked={form.accepted} onChange={(e) => set('accepted', e.target.checked)} />
                    <span>
                      I have read and accept the Terms &amp; Conditions, and I authorise {COMPANY.name} to collect
                      R{selectedPlan.price} monthly by debit order against the account above until cancelled with 30
                      days’ notice.
                    </span>
                  </label>
                  {errors.accepted && <p className="error-text">{errors.accepted}</p>}
                </div>

                <button type="submit" className="btn btn-copper btn-block">Authorise debit order</button>

                <div className="notice notice-info" style={{ marginTop: 16 }}>
                  <strong>PaySoft integration point.</strong> This mandate is submitted to the PaySoft debit-order API
                  for tokenisation and monthly collection. In this build the submission is simulated locally — no
                  banking details leave your browser.
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
