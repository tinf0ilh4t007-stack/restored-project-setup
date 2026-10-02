import React from 'react';
import { COMPANY } from '../data';

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4>{COMPANY.name}</h4>
            <p>
              Preventative plumbing maintenance for Cape Town homes since {COMPANY.founded}. {COMPANY.years} years of
              keeping geysers, pipes and drains in good order before they become emergencies.
            </p>
          </div>
          <div>
            <h4>Get in touch</h4>
            <ul>
              <li><a href={'tel:' + COMPANY.phone.replace(/\s/g, '')}>{COMPANY.phone}</a></li>
              <li><a href={'mailto:' + COMPANY.email}>{COMPANY.email}</a></li>
              <li>{COMPANY.address}</li>
            </ul>
          </div>
          <div>
            <h4>Service hours</h4>
            <ul>
              <li>Mon – Fri: 07:00 – 17:00</li>
              <li>Saturday: 08:00 – 13:00</li>
              <li>Gold emergency cover: 24/7</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</span>
          <span>
            3D credits: <a href="https://www.solarsystemscope.com/textures/" target="_blank" rel="noopener noreferrer">“Mercury” by Textures: Solar System Scope (CC BY 4.0)</a>, based on NASA imagery.
          </span>
          <span>
            Made by <a href="https://dappit.io" target="_blank" rel="noopener noreferrer">dappit.io</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
