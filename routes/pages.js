const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const SITE_URL = 'https://www.elatevewellness.com';
const INDEX_PATH = path.join(__dirname, '..', 'views', 'index.html');

const DEFAULT_DESCRIPTION = 'ELATEVE powered by Kloodos: the complete wellness & longevity offer for hospitality, delivered end to end. A turnkey, hands off blueprint: concept, medical grade technology, protocols, training and support from one partner, exclusively for Spain & Europe.';

// Per-route SEO metadata. Falls back to home's if a route is missing.
const PAGE_META = {
  '/': {
    title: 'ELATEVE powered by Kloodos: Wellness & Longevity for Hospitality, End to End',
    description: DEFAULT_DESCRIPTION
  },
  '/machinery': {
    title: 'The Machinery — ELATEVE powered by Kloodos',
    description: 'Nine medical grade longevity technologies, real photos, plain names: whole body cryotherapy, hyperbaric oxygen, red light therapy, compression, dry float, cold plunge and more.'
  },
  '/why-us': {
    title: 'Why Us & Who Trusts Us Already — ELATEVE powered by Kloodos',
    description: 'The case for one partner, end to end, and the names, from Manchester United FC to Soho House International, already backing it.'
  },
  '/blog': {
    title: 'The Journal — ELATEVE powered by Kloodos',
    description: 'Field notes from the team: the longevity technology we test, run and get asked about. What works, what is hype, and what just landed on the market.'
  },
  '/about': {
    title: 'Two Companies. One Standard. — ELATEVE powered by Kloodos',
    description: 'ELATEVE powered by Kloodos: two specialists, one longevity offer, built by women who were done being told to push through it.'
  }
};

function escapeHtmlAttr(str) {
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

// Serve index.html for all page routes (SPA), with per-route title/description/canonical injected
const sendIndex = (req, res) => {
  const meta = PAGE_META[req.path] || PAGE_META['/'];
  const canonicalPath = req.path === '/' ? '/' : req.path.replace(/\/$/, '');
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

  let html = fs.readFileSync(INDEX_PATH, 'utf8');
  html = html
    .split('{{PAGE_TITLE}}').join(escapeHtmlAttr(meta.title))
    .split('{{PAGE_DESCRIPTION}}').join(escapeHtmlAttr(meta.description))
    .split('{{CANONICAL_URL}}').join(canonicalUrl);

  res.send(html);
};

router.get('/', sendIndex);
router.get('/machinery', sendIndex);
router.get('/why-us', sendIndex);
router.get('/blog', sendIndex);
router.get('/about', sendIndex);
// /shop retired — redirect any old links home
router.get('/shop', (req, res) => res.redirect(301, '/'));

module.exports = router;
