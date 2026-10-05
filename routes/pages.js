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
  '/projects': {
    title: 'Our Projects — ELATEVE powered by Kloodos',
    description: 'Already trusted in the rooms that accept nothing less: Manchester United FC, Soho House, Gleneagles, ESPA, Chenot, Bürgenstock and more. Turnkey longevity floors, one contract, one partner.'
  },
  '/machinery': {
    title: 'The Machinery — ELATEVE powered by Kloodos',
    description: 'Nine medical grade longevity technologies with specs and payback: whole body cryotherapy, hyperbaric oxygen, red light therapy, dry float, nervous system pods, cold plunge, compression, IHHT and infrared sauna.'
  },
  '/why-us': {
    title: 'Why Us & Who We Are — ELATEVE powered by Kloodos',
    description: 'Two specialists, one longevity offer: the ELATEVE team in Barcelona and the Kloodos team in the United Kingdom. One partner, end to end, medical grade only.'
  },
  '/blog': {
    title: 'The Journal — ELATEVE powered by Kloodos',
    description: 'Field notes from the team: the longevity technology we test, run and get asked about. What works, what is hype, and what just landed on the market.'
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
router.get('/projects', sendIndex);
router.get('/machinery', sendIndex);
router.get('/why-us', sendIndex);
router.get('/blog', sendIndex);
// /about folded into Why Us (the team lives there now)
router.get('/about', (req, res) => res.redirect(301, '/why-us#team'));
// /shop retired — redirect any old links home
router.get('/shop', (req, res) => res.redirect(301, '/'));

module.exports = router;
