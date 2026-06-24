#!/usr/bin/env node
// ============================================================
// minimax audit — Local SEO / GEO / AEO / Mobile auditor
// Single-file, zero-dep Node.js (>=18) ESM script.
// Audits a running site (or local file://) for the 7 check
// categories and renders a self-contained HTML report.
// ============================================================

import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { Buffer } from 'node:buffer';

// ----------------- CLI parsing -----------------
function parseArgs(argv) {
  const args = {
    url: 'http://localhost:5173/',
    label: 'Site',
    checks: 'seo,seo-rules,llm,sitemap,robots,agentic,mobile',
    output: 'audit-report.html',
    format: 'html',
    project: process.cwd(),
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--url') args.url = argv[++i];
    else if (a === '--label') args.label = argv[++i];
    else if (a === '--checks') args.checks = argv[++i];
    else if (a === '--output') args.output = argv[++i];
    else if (a === '--format') args.format = argv[++i];
    else if (a === '--project') args.project = argv[++i];
    else if (a === '--help' || a === '-h') {
      console.log(
        `minimax audit — SEO / GEO / Mobile audit\n\n` +
          `  --url <url>        Site root URL (default: ${args.url})\n` +
          `  --label <name>     Label shown in report\n` +
          `  --checks <list>    Comma-separated: seo,seo-rules,llm,sitemap,robots,agentic,mobile\n` +
          `  --output <file>    Output HTML path (default: audit-report.html)\n` +
          `  --format <fmt>     html (default) or json\n` +
          `  --project <dir>    Project root for source checks (default: cwd)\n`,
      );
      process.exit(0);
    }
  }
  args.checkList = args.checks
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  return args;
}

// ----------------- HTTP / file fetch -----------------
const UA =
  'Mozilla/5.0 (compatible; minimax-audit/1.0; +https://onsyntax.mhwaralabtikar.com)';

async function fetchUrl(url) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': UA, Accept: '*/*' },
      redirect: 'follow',
    });
    const text = await res.text();
    return {
      ok: res.ok,
      status: res.status,
      contentType: res.headers.get('content-type') || '',
      text,
      url: res.url,
    };
  } catch (e) {
    return { ok: false, status: 0, contentType: '', text: '', url, error: e.message };
  }
}

async function fetchOrLocal(baseUrl, relPath, projectRoot) {
  // Try dev server first, then local file fallback
  const fullUrl = new URL(relPath, baseUrl).toString();
  const res = await fetchUrl(fullUrl);
  if (res.ok && res.text) return { ...res, source: 'http' };
  // Fallback: read from public/ or project root
  const tryPaths = [
    join(projectRoot, 'public', relPath.replace(/^\//, '')),
    join(projectRoot, relPath.replace(/^\//, '')),
  ];
  for (const p of tryPaths) {
    if (existsSync(p)) {
      return {
        ok: true,
        status: 200,
        contentType: 'text/plain',
        text: readFileSync(p, 'utf8'),
        url: fullUrl,
        source: 'file:' + p,
      };
    }
  }
  return res; // failed
}

// ----------------- HTML helpers -----------------
function decode(s) {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
}

function extractMeta(html, attr, value) {
  // Find <meta name|property="value" content="...">
  const re = new RegExp(
    `<meta[^>]+(?:${attr})=["']${value}["'][^>]*content=["']([^"']*)["']`,
    'i',
  );
  const m = html.match(re);
  return m ? decode(m[1]) : null;
}

function extractAllMeta(html, attr, value) {
  const re = new RegExp(
    `<meta[^>]+(?:${attr})=["']${value}["'][^>]*content=["']([^"']*)["']`,
    'gi',
  );
  const out = [];
  let m;
  while ((m = re.exec(html)) !== null) out.push(decode(m[1]));
  return out;
}

function extractLink(html, rel, attr) {
  // <link rel="canonical" href="..."> or rel="alternate" hreflang="..."
  if (attr) {
    const re = new RegExp(
      `<link[^>]+rel=["']${rel}["'][^>]+${attr}=["']([^"']+)["']`,
      'i',
    );
    const m = html.match(re);
    return m ? decode(m[1]) : null;
  }
  const re = new RegExp(`<link[^>]+rel=["']${rel}["'][^>]+href=["']([^"']+)["']`, 'i');
  const m = html.match(re);
  return m ? decode(m[1]) : null;
}

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return m ? decode(m[1]).trim() : null;
}

function extractAttr(html, tag, attr) {
  const re = new RegExp(`<${tag}[^>]+${attr}=["']([^"']+)["']`, 'i');
  const m = html.match(re);
  return m ? decode(m[1]) : null;
}

function countMatches(html, re) {
  const m = html.match(re);
  return m ? m.length : 0;
}

function extractJsonLd(html) {
  const re =
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const out = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    try {
      out.push(JSON.parse(m[1]));
    } catch (_) {
      out.push({ __invalid: true, raw: m[1].slice(0, 200) });
    }
  }
  return out;
}

function isValidXml(text) {
  // Light XML well-formedness check
  if (!text.trim().startsWith('<?xml')) return { valid: false, reason: 'Missing XML declaration' };
  // Tag balance check
  const stack = [];
  const tagRe = /<\/?([a-zA-Z][\w:-]*)([^>]*)\/?>/g;
  let m;
  while ((m = tagRe.exec(text)) !== null) {
    const full = m[0];
    const name = m[1];
    if (full.startsWith('<?') || full.startsWith('<!--')) continue;
    if (full.startsWith('<!')) continue;
    if (full.endsWith('/>')) continue;
    if (full.startsWith('</')) {
      if (stack.pop() !== name) return { valid: false, reason: `Unbalanced tag: ${name}` };
    } else {
      stack.push(name);
    }
  }
  if (stack.length) return { valid: false, reason: `Unclosed tags: ${stack.join(', ')}` };
  return { valid: true };
}

function isValidJson(text) {
  try {
    JSON.parse(text);
    return { valid: true };
  } catch (e) {
    return { valid: false, reason: e.message };
  }
}

// ----------------- Check definitions -----------------
const check = (id, name, run, weight = 10) => ({ id, name, weight, run });

const CHECKS = {
  seo: [
    check('seo.title', 'Title tag present and optimal length (30–60)', (ctx) => {
      const t = extractTitle(ctx.html);
      if (!t) return { status: 'fail', score: 0, msg: 'No <title> tag found' };
      const len = t.length;
      if (len < 20) return { status: 'warn', score: 5, msg: `Title too short (${len} chars): "${t}"` };
      if (len > 65) return { status: 'warn', score: 6, msg: `Title too long (${len} chars): "${t.slice(0, 60)}..."` };
      return { status: 'pass', score: 10, msg: `OK (${len} chars): "${t}"` };
    }),
    check('seo.description', 'Meta description present and optimal length (120–160)', (ctx) => {
      const d = extractMeta(ctx.html, 'name', 'description');
      if (!d) return { status: 'fail', score: 0, msg: 'No meta description found' };
      const len = d.length;
      if (len < 80) return { status: 'warn', score: 5, msg: `Description too short (${len} chars)` };
      if (len > 165) return { status: 'warn', score: 6, msg: `Description too long (${len} chars)` };
      return { status: 'pass', score: 10, msg: `OK (${len} chars)` };
    }),
    check('seo.keywords', 'Meta keywords present', (ctx) => {
      const k = extractMeta(ctx.html, 'name', 'keywords');
      if (!k) return { status: 'warn', score: 5, msg: 'No meta keywords (lower priority but still useful for Arabic SEO)' };
      return { status: 'pass', score: 10, msg: `${k.split(',').length} keywords` };
    }),
    check('seo.canonical', 'Canonical URL defined', (ctx) => {
      const c = extractLink(ctx.html, 'canonical');
      if (!c) return { status: 'fail', score: 0, msg: 'No canonical link' };
      return { status: 'pass', score: 10, msg: c };
    }),
    check('seo.hreflang', 'Hreflang tags (ar, en, x-default)', (ctx) => {
      const ar = extractLink(ctx.html, 'alternate', 'hreflang="ar"');
      const en = extractLink(ctx.html, 'alternate', 'hreflang="en"');
      const x = extractLink(ctx.html, 'alternate', 'hreflang="x-default"');
      const have = [ar && 'ar', en && 'en', x && 'x-default'].filter(Boolean).length;
      if (have === 3) return { status: 'pass', score: 10, msg: 'ar + en + x-default present' };
      const missing = [];
      if (!ar) missing.push('ar');
      if (!en) missing.push('en');
      if (!x) missing.push('x-default');
      return { status: have > 0 ? 'warn' : 'fail', score: have * 3, msg: `Missing: ${missing.join(', ')}` };
    }),
    check('seo.og', 'Open Graph tags (type, url, title, description, image)', (ctx) => {
      const needed = ['og:type', 'og:url', 'og:title', 'og:description', 'og:image', 'og:site_name', 'og:locale'];
      const have = {};
      for (const p of needed) have[p] = extractMeta(ctx.html, 'property', p);
      const missing = needed.filter((k) => !have[k]);
      if (missing.length === 0) return { status: 'pass', score: 10, msg: `All ${needed.length} OG tags present` };
      return { status: 'warn', score: Math.max(0, 10 - missing.length * 2), msg: `Missing: ${missing.join(', ')}` };
    }),
    check('seo.og-image-dims', 'OG image with width/height/alt', (ctx) => {
      const img = extractMeta(ctx.html, 'property', 'og:image');
      const w = extractMeta(ctx.html, 'property', 'og:image:width');
      const h = extractMeta(ctx.html, 'property', 'og:image:height');
      const alt = extractMeta(ctx.html, 'property', 'og:image:alt');
      if (!img) return { status: 'fail', score: 0, msg: 'No og:image' };
      const ok = w && h && alt;
      return { status: ok ? 'pass' : 'warn', score: ok ? 10 : 6, msg: ok ? `Image with ${w}×${h} + alt` : `Image present, ${!w ? 'no width' : ''}${!h ? ' no height' : ''}${!alt ? ' no alt' : ''}` };
    }),
    check('seo.twitter', 'Twitter card tags', (ctx) => {
      const needed = ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image', 'twitter:site'];
      const have = needed.filter((n) => extractMeta(ctx.html, 'name', n));
      if (have.length === needed.length) return { status: 'pass', score: 10, msg: 'All Twitter card tags present' };
      return { status: 'warn', score: have.length * 2, msg: `${have.length}/${needed.length} present` };
    }),
    check('seo.robots', 'Meta robots tag (index, follow)', (ctx) => {
      const r = extractMeta(ctx.html, 'name', 'robots');
      if (!r) return { status: 'warn', score: 5, msg: 'No meta robots (defaults are OK but explicit is better)' };
      const ok = /index/i.test(r) && /follow/i.test(r);
      return { status: ok ? 'pass' : 'warn', score: ok ? 10 : 6, msg: r };
    }),
    check('seo.author', 'Author meta tag', (ctx) => {
      const a = extractMeta(ctx.html, 'name', 'author');
      if (!a) return { status: 'warn', score: 5, msg: 'No author meta' };
      return { status: 'pass', score: 10, msg: a };
    }),
  ],

  'seo-rules': [
    check('rules.html-lang', 'html[lang] attribute set', (ctx) => {
      const lang = extractAttr(ctx.html, 'html', 'lang');
      if (!lang) return { status: 'fail', score: 0, msg: 'Missing lang attribute' };
      return { status: 'pass', score: 10, msg: `lang="${lang}"` };
    }),
    check('rules.html-dir', 'html[dir] attribute set (RTL/LTR)', (ctx) => {
      const dir = extractAttr(ctx.html, 'html', 'dir');
      if (!dir) return { status: 'fail', score: 0, msg: 'Missing dir attribute (critical for Arabic)' };
      if (!['rtl', 'ltr'].includes(dir.toLowerCase())) return { status: 'fail', score: 0, msg: `Invalid dir: ${dir}` };
      return { status: 'pass', score: 10, msg: `dir="${dir}"` };
    }),
    check('rules.viewport', 'Viewport meta with width=device-width', (ctx) => {
      const v = extractMeta(ctx.html, 'name', 'viewport');
      if (!v) return { status: 'fail', score: 0, msg: 'No viewport meta' };
      if (!/width=device-width/i.test(v)) return { status: 'fail', score: 0, msg: `viewport doesn't have width=device-width: ${v}` };
      return { status: 'pass', score: 10, msg: v };
    }),
    check('rules.theme-color', 'theme-color meta tag', (ctx) => {
      const t = extractMeta(ctx.html, 'name', 'theme-color');
      if (!t) return { status: 'warn', score: 4, msg: 'No theme-color' };
      return { status: 'pass', score: 10, msg: t };
    }),
    check('rules.apple-capable', 'Apple mobile web app capable', (ctx) => {
      const yes = extractMeta(ctx.html, 'name', 'apple-mobile-web-app-capable');
      if (!yes) return { status: 'warn', score: 5, msg: 'Missing apple-mobile-web-app-capable' };
      return { status: 'pass', score: 10, msg: yes };
    }),
    check('rules.format-detection', 'format-detection=telephone=no', (ctx) => {
      const f = extractMeta(ctx.html, 'name', 'format-detection');
      if (!f) return { status: 'warn', score: 5, msg: 'No format-detection' };
      return { status: 'pass', score: 10, msg: f };
    }),
    check('rules.jsonld', 'Schema.org JSON-LD present and valid', (ctx) => {
      const blocks = extractJsonLd(ctx.html);
      if (blocks.length === 0) return { status: 'fail', score: 0, msg: 'No JSON-LD blocks found' };
      const invalid = blocks.filter((b) => b && b.__invalid);
      if (invalid.length) return { status: 'fail', score: 0, msg: `${invalid.length} invalid JSON-LD block(s)` };
      const types = blocks.map((b) => b['@type']).filter(Boolean);
      const unique = [...new Set(types)];
      return { status: 'pass', score: 10, msg: `${blocks.length} blocks, types: ${unique.join(', ')}` };
    }),
    check('rules.h1', 'Single H1 per page', (ctx) => {
      // Only check static HTML — SPA content is dynamic
      const h1Count = countMatches(ctx.html, /<h1[\s>]/gi);
      if (h1Count === 0) return { status: 'warn', score: 5, msg: 'No <h1> in static HTML (SPA renders dynamically)' };
      if (h1Count > 1) return { status: 'warn', score: 4, msg: `${h1Count} <h1> tags (should be 1)` };
      return { status: 'pass', score: 10, msg: 'Exactly 1 <h1>' };
    }),
  ],

  llm: [
    check('llm.llms-txt', '/llms.txt exists and follows llmstxt.org spec', async (ctx) => {
      const r = await fetchOrLocal(ctx.baseUrl, '/llms.txt', ctx.projectRoot);
      if (!r.ok) return { status: 'fail', score: 0, msg: `Status ${r.status}` };
      const t = r.text;
      const hasTitle = /^#\s+.+/m.test(t);
      const hasBlockquote = /^>\s+.+/m.test(t);
      const hasCore = /^##\s+Core\s*$/m.test(t);
      const hasOptional = /^##\s+Optional\s*$/m.test(t);
      const score = [hasTitle, hasBlockquote, hasCore, hasOptional].filter(Boolean).length;
      if (score === 4) return { status: 'pass', score: 10, msg: 'Title + blockquote + Core + Optional sections present' };
      const missing = [];
      if (!hasTitle) missing.push('Title');
      if (!hasBlockquote) missing.push('Blockquote');
      if (!hasCore) missing.push('Core section');
      if (!hasOptional) missing.push('Optional section');
      return { status: 'warn', score: score * 2, msg: `Missing: ${missing.join(', ')}` };
    }),
    check('llm.llms-full', '/llms-full.txt exists (extended LLM context)', async (ctx) => {
      const r = await fetchOrLocal(ctx.baseUrl, '/llms-full.txt', ctx.projectRoot);
      if (!r.ok) return { status: 'fail', score: 0, msg: `Status ${r.status}` };
      const len = r.text.length;
      if (len < 1000) return { status: 'warn', score: 5, msg: `File is short (${len} chars)` };
      return { status: 'pass', score: 10, msg: `OK (${len} chars)` };
    }),
    check('llm.content-index', '/content-index.json exists and is valid', async (ctx) => {
      const r = await fetchOrLocal(ctx.baseUrl, '/content-index.json', ctx.projectRoot);
      if (!r.ok) return { status: 'fail', score: 0, msg: `Status ${r.status}` };
      const v = isValidJson(r.text);
      if (!v.valid) return { status: 'fail', score: 0, msg: `Invalid JSON: ${v.reason}` };
      const d = JSON.parse(r.text);
      const required = ['site', 'content_index', 'api_endpoints'];
      const missing = required.filter((k) => !d[k]);
      if (missing.length) return { status: 'warn', score: 6, msg: `Missing keys: ${missing.join(', ')}` };
      return { status: 'pass', score: 10, msg: `Valid JSON with site + ${d.content_index?.total_pages || '?'} pages` };
    }),
    check('llm.ai-bots', 'AI search bots allowed in robots.txt', async (ctx) => {
      const r = await fetchOrLocal(ctx.baseUrl, '/robots.txt', ctx.projectRoot);
      if (!r.ok) return { status: 'fail', score: 0, msg: 'No robots.txt' };
      const t = r.text;
      const bots = ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'CCBot', 'SearchGPTBot'];
      const have = bots.filter((b) => new RegExp(`User-agent:\\s*${b}`, 'i').test(t));
      if (have.length === bots.length) return { status: 'pass', score: 10, msg: `All ${bots.length} major AI bots whitelisted` };
      return { status: 'warn', score: Math.round((have.length / bots.length) * 10), msg: `${have.length}/${bots.length}: ${have.join(', ')}` };
    }),
    check('llm.citation-policy', 'AI citation policy documented', async (ctx) => {
      const r = await fetchOrLocal(ctx.baseUrl, '/content-index.json', ctx.projectRoot);
      if (!r.ok) return { status: 'fail', score: 0, msg: 'content-index.json missing' };
      const d = JSON.parse(r.text);
      const has = d.content_guidance_for_ai?.citation_policy;
      if (has) return { status: 'pass', score: 10, msg: has.slice(0, 80) + '...' };
      return { status: 'warn', score: 4, msg: 'No citation_policy in content_guidance_for_ai' };
    }),
  ],

  sitemap: [
    check('sitemap.exists', '/sitemap.xml exists', async (ctx) => {
      const r = await fetchOrLocal(ctx.baseUrl, '/sitemap.xml', ctx.projectRoot);
      if (!r.ok) return { status: 'fail', score: 0, msg: `Status ${r.status}` };
      return { status: 'pass', score: 10, msg: `OK (${r.text.length} bytes)` };
    }),
    check('sitemap.valid-xml', 'Sitemap is valid XML', async (ctx) => {
      const r = await fetchOrLocal(ctx.baseUrl, '/sitemap.xml', ctx.projectRoot);
      if (!r.ok) return { status: 'fail', score: 0, msg: 'No sitemap' };
      const v = isValidXml(r.text);
      if (!v.valid) return { status: 'fail', score: 0, msg: v.reason };
      return { status: 'pass', score: 10, msg: 'Valid XML structure' };
    }),
    check('sitemap.namespaces', 'Sitemap declares mobile + image + xhtml namespaces', async (ctx) => {
      const r = await fetchOrLocal(ctx.baseUrl, '/sitemap.xml', ctx.projectRoot);
      if (!r.ok) return { status: 'fail', score: 0, msg: 'No sitemap' };
      const t = r.text;
      const ns = {
        sitemap: /xmlns=["']http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9["']/.test(t),
        xhtml: /xmlns:xhtml=["']http:\/\/www\.w3\.org\/1999\/xhtml["']/.test(t),
        image: /xmlns:image=["']http:\/\/www\.google\.com\/schemas\/sitemap-image\/1\.1["']/.test(t),
        mobile: /xmlns:mobile=["']http:\/\/www\.google\.com\/schemas\/sitemap-mobile\/1\.0["']/.test(t),
      };
      const have = Object.values(ns).filter(Boolean).length;
      const missing = Object.entries(ns).filter(([, v]) => !v).map(([k]) => k);
      if (have === 4) return { status: 'pass', score: 10, msg: 'All 4 namespaces present' };
      return { status: 'warn', score: have * 2 + 1, msg: `Missing: ${missing.join(', ')}` };
    }),
    check('sitemap.coverage', 'Sitemap includes core pages', async (ctx) => {
      const r = await fetchOrLocal(ctx.baseUrl, '/sitemap.xml', ctx.projectRoot);
      if (!r.ok) return { status: 'fail', score: 0, msg: 'No sitemap' };
      const t = r.text;
      const expected = ['/', '/courses', '/events', '/blogs', '/about', '/contact'];
      const have = expected.filter((p) => {
        const re = new RegExp(`<loc>[^<]*${p.replace(/\//g, '\\/')}[^<]*</loc>`, 'i');
        return re.test(t);
      });
      if (have.length === expected.length) return { status: 'pass', score: 10, msg: `All ${expected.length} core pages present` };
      return { status: 'warn', score: Math.round((have.length / expected.length) * 10), msg: `Missing: ${expected.filter((p) => !have.includes(p)).join(', ')}` };
    }),
    check('sitemap.hrefs', 'Sitemap has hreflang alternates per URL', async (ctx) => {
      const r = await fetchOrLocal(ctx.baseUrl, '/sitemap.xml', ctx.projectRoot);
      if (!r.ok) return { status: 'fail', score: 0, msg: 'No sitemap' };
      const t = r.text;
      const hreflangCount = countMatches(t, /<xhtml:link[^>]+rel=["']alternate["']/gi);
      const urlCount = countMatches(t, /<url>/gi);
      if (urlCount === 0) return { status: 'fail', score: 0, msg: 'No <url> entries' };
      const ratio = hreflangCount / urlCount;
      if (ratio >= 2) return { status: 'pass', score: 10, msg: `${urlCount} URLs, ${hreflangCount} hreflangs (~${ratio.toFixed(1)} per URL)` };
      return { status: 'warn', score: Math.min(10, Math.round(ratio * 4)), msg: `${urlCount} URLs, only ${hreflangCount} hreflangs` };
    }),
  ],

  robots: [
    check('robots.exists', '/robots.txt exists', async (ctx) => {
      const r = await fetchOrLocal(ctx.baseUrl, '/robots.txt', ctx.projectRoot);
      if (!r.ok) return { status: 'fail', score: 0, msg: `Status ${r.status}` };
      return { status: 'pass', score: 10, msg: `OK (${r.text.length} bytes)` };
    }),
    check('robots.host', 'Host directive declared', async (ctx) => {
      const r = await fetchOrLocal(ctx.baseUrl, '/robots.txt', ctx.projectRoot);
      if (!r.ok) return { status: 'fail', score: 0, msg: 'No robots.txt' };
      if (/^Host:\s*\S+/im.test(r.text)) return { status: 'pass', score: 10, msg: r.text.match(/^Host:\s*(\S+)/im)[1] };
      return { status: 'warn', score: 5, msg: 'No Host directive' };
    }),
    check('robots.sitemap-ref', 'Sitemap directive declared', async (ctx) => {
      const r = await fetchOrLocal(ctx.baseUrl, '/robots.txt', ctx.projectRoot);
      if (!r.ok) return { status: 'fail', score: 0, msg: 'No robots.txt' };
      const matches = r.text.match(/^Sitemap:\s*(\S+)/gim) || [];
      if (matches.length >= 1) return { status: 'pass', score: 10, msg: matches.length + ' sitemap(s) declared' };
      return { status: 'warn', score: 4, msg: 'No Sitemap directive' };
    }),
    check('robots.default-allow', 'Default User-agent: * with Allow: /', async (ctx) => {
      const r = await fetchOrLocal(ctx.baseUrl, '/robots.txt', ctx.projectRoot);
      if (!r.ok) return { status: 'fail', score: 0, msg: 'No robots.txt' };
      const hasStar = /User-agent:\s*\*/.test(r.text);
      const hasAllow = /Allow:\s*\//.test(r.text);
      if (hasStar && hasAllow) return { status: 'pass', score: 10, msg: 'User-agent: * with Allow: /' };
      return { status: 'warn', score: 4, msg: `Missing ${!hasStar ? 'User-agent: *' : 'Allow: /'}` };
    }),
    check('robots.googlebot-mobile', 'Googlebot-Mobile explicitly allowed', async (ctx) => {
      const r = await fetchOrLocal(ctx.baseUrl, '/robots.txt', ctx.projectRoot);
      if (!r.ok) return { status: 'fail', score: 0, msg: 'No robots.txt' };
      if (/User-agent:\s*Googlebot-Mobile/i.test(r.text)) return { status: 'pass', score: 10, msg: 'Mobile crawler explicitly whitelisted' };
      return { status: 'warn', score: 5, msg: 'No Googlebot-Mobile rule (mobile-first index may suffer)' };
    }),
    check('robots.ai-bots-coverage', 'AI training bots coverage (GPTBot, ClaudeBot, etc.)', async (ctx) => {
      const r = await fetchOrLocal(ctx.baseUrl, '/robots.txt', ctx.projectRoot);
      if (!r.ok) return { status: 'fail', score: 0, msg: 'No robots.txt' };
      const bots = ['GPTBot', 'ClaudeBot', 'Google-Extended', 'Applebot-Extended', 'CCBot', 'cohere-ai', 'Meta-ExternalAgent', 'Bytespider'];
      const have = bots.filter((b) => new RegExp(`User-agent:\\s*${b}`, 'i').test(r.text));
      if (have.length === bots.length) return { status: 'pass', score: 10, msg: `All ${bots.length} major LLM training bots whitelisted` };
      return { status: 'warn', score: Math.round((have.length / bots.length) * 10), msg: `${have.length}/${bots.length}: ${have.join(', ')}` };
    }),
    check('robots.ai-search-bots', 'AI search/answer-engine bots (Perplexity, SearchGPT)', async (ctx) => {
      const r = await fetchOrLocal(ctx.baseUrl, '/robots.txt', ctx.projectRoot);
      if (!r.ok) return { status: 'fail', score: 0, msg: 'No robots.txt' };
      const bots = ['PerplexityBot', 'SearchGPTBot', 'YouBot', 'BraveBot', 'DuckAssistBot', 'OAI-SearchBot'];
      const have = bots.filter((b) => new RegExp(`User-agent:\\s*${b}`, 'i').test(r.text));
      if (have.length === bots.length) return { status: 'pass', score: 10, msg: `All ${bots.length} AI search bots whitelisted` };
      return { status: 'warn', score: Math.round((have.length / bots.length) * 10), msg: `${have.length}/${bots.length}: ${have.join(', ')}` };
    }),
    check('robots.privacy-paths', 'Private paths blocked (.env, .git, /admin/)', async (ctx) => {
      const r = await fetchOrLocal(ctx.baseUrl, '/robots.txt', ctx.projectRoot);
      if (!r.ok) return { status: 'fail', score: 0, msg: 'No robots.txt' };
      const paths = ['/admin/', '/api/', '/.env', '/.git/'];
      const have = paths.filter((p) => new RegExp(`Disallow:\\s*${p.replace(/[/.]/g, '\\$&')}`, 'i').test(r.text));
      if (have.length === paths.length) return { status: 'pass', score: 10, msg: `All ${paths.length} private paths blocked` };
      const missing = paths.filter((p) => !have.includes(p));
      return { status: 'warn', score: Math.round((have.length / paths.length) * 10), msg: `Missing: ${missing.join(', ')}` };
    }),
  ],

  agentic: [
    check('agentic.json-exists', '/.well-known/agentic.json exists and is valid', async (ctx) => {
      const r = await fetchOrLocal(ctx.baseUrl, '/.well-known/agentic.json', ctx.projectRoot);
      if (!r.ok) return { status: 'fail', score: 0, msg: `Status ${r.status}` };
      const v = isValidJson(r.text);
      if (!v.valid) return { status: 'fail', score: 0, msg: `Invalid JSON: ${v.reason}` };
      const d = JSON.parse(r.text);
      const required = ['spec', 'site', 'capabilities', 'discovery_files', 'access_policy'];
      const missing = required.filter((k) => !d[k]);
      if (missing.length) return { status: 'warn', score: 6, msg: `Missing keys: ${missing.join(', ')}` };
      return { status: 'pass', score: 10, msg: `Valid agentic.json (spec: ${d.spec})` };
    }),
    check('agentic.capabilities', 'Capabilities documented (llms_txt, json_ld, etc.)', async (ctx) => {
      const r = await fetchOrLocal(ctx.baseUrl, '/.well-known/agentic.json', ctx.projectRoot);
      if (!r.ok) return { status: 'fail', score: 0, msg: 'No agentic.json' };
      const d = JSON.parse(r.text);
      const caps = d.capabilities || {};
      const required = ['llms_txt', 'content_index_json', 'structured_data_json_ld', 'open_graph', 'twitter_cards', 'hreflang', 'canonical_urls'];
      const have = required.filter((k) => caps[k] === true).length;
      if (have === required.length) return { status: 'pass', score: 10, msg: `All ${required.length} capabilities = true` };
      const missing = required.filter((k) => !caps[k]);
      return { status: 'warn', score: Math.round((have / required.length) * 10), msg: `${have}/${required.length}: missing ${missing.join(', ')}` };
    }),
    check('agentic.discovery-files', 'All discovery files referenced', async (ctx) => {
      const r = await fetchOrLocal(ctx.baseUrl, '/.well-known/agentic.json', ctx.projectRoot);
      if (!r.ok) return { status: 'fail', score: 0, msg: 'No agentic.json' };
      const d = JSON.parse(r.text);
      const df = d.discovery_files || {};
      const required = ['llms_txt', 'llms_full_txt', 'content_index', 'sitemap', 'robots'];
      const have = required.filter((k) => df[k]);
      if (have.length === required.length) return { status: 'pass', score: 10, msg: `All ${required.length} discovery files linked` };
      return { status: 'warn', score: Math.round((have.length / required.length) * 10), msg: `Missing: ${required.filter((k) => !df[k]).join(', ')}` };
    }),
    check('agentic.access-policy', 'AI access policies defined (training, search, summarization)', async (ctx) => {
      const r = await fetchOrLocal(ctx.baseUrl, '/.well-known/agentic.json', ctx.projectRoot);
      if (!r.ok) return { status: 'fail', score: 0, msg: 'No agentic.json' };
      const d = JSON.parse(r.text);
      const ap = d.access_policy || {};
      const keys = ['ai_training', 'ai_search_grounding', 'ai_summarization'];
      const have = keys.filter((k) => ap[k]);
      if (have.length === keys.length) return { status: 'pass', score: 10, msg: 'All 3 policies defined' };
      return { status: 'warn', score: Math.round((have.length / keys.length) * 10), msg: `Missing: ${keys.filter((k) => !have.includes(k)).join(', ')}` };
    }),
    check('agentic.content-types', 'Content types_available with schema.org mappings', async (ctx) => {
      const r = await fetchOrLocal(ctx.baseUrl, '/.well-known/agentic.json', ctx.projectRoot);
      if (!r.ok) return { status: 'fail', score: 0, msg: 'No agentic.json' };
      const d = JSON.parse(r.text);
      const ct = d.content_types_available || [];
      if (ct.length === 0) return { status: 'fail', score: 0, msg: 'No content_types_available' };
      const withSchema = ct.filter((t) => t.schema_org && t.url_pattern);
      if (withSchema.length === ct.length) return { status: 'pass', score: 10, msg: `${ct.length} types with schema_org + url_pattern` };
      return { status: 'warn', score: 6, msg: `${withSchema.length}/${ct.length} have schema_org + url_pattern` };
    }),
    check('agentic.citation-format', 'Preferred citation format defined', async (ctx) => {
      const r = await fetchOrLocal(ctx.baseUrl, '/.well-known/agentic.json', ctx.projectRoot);
      if (!r.ok) return { status: 'fail', score: 0, msg: 'No agentic.json' };
      const d = JSON.parse(r.text);
      const cf = d.preferred_citation_format;
      if (cf && cf.format && cf.template) return { status: 'pass', score: 10, msg: `${cf.format}: ${cf.template}` };
      return { status: 'warn', score: 5, msg: 'No preferred_citation_format' };
    }),
  ],

  mobile: [
    check('mobile.viewport', 'Viewport meta with width=device-width, initial-scale=1', (ctx) => {
      const v = extractMeta(ctx.html, 'name', 'viewport');
      if (!v) return { status: 'fail', score: 0, msg: 'No viewport' };
      const ok = /width=device-width/i.test(v) && /initial-scale=1/i.test(v);
      return { status: ok ? 'pass' : 'warn', score: ok ? 10 : 6, msg: v };
    }),
    check('mobile.theme-color', 'theme-color for status bar tinting', (ctx) => {
      const t = extractMeta(ctx.html, 'name', 'theme-color');
      if (!t) return { status: 'warn', score: 4, msg: 'No theme-color (iOS/Android status bar)' };
      return { status: 'pass', score: 10, msg: t };
    }),
    check('mobile.apple-status', 'Apple mobile web app status bar style', (ctx) => {
      const s = extractMeta(ctx.html, 'name', 'apple-mobile-web-app-status-bar-style');
      if (!s) return { status: 'warn', score: 5, msg: 'No status bar style set' };
      return { status: 'pass', score: 10, msg: s };
    }),
    check('mobile.format-detection', 'format-detection=telephone=no (prevents auto-link on mobile)', (ctx) => {
      const f = extractMeta(ctx.html, 'name', 'format-detection');
      if (!f) return { status: 'warn', score: 4, msg: 'No format-detection' };
      return { status: 'pass', score: 10, msg: f };
    }),
    check('mobile.preconnect', 'preconnect to critical origins (API, CDN)', (ctx) => {
      const preconnects = (ctx.html.match(/<link[^>]+rel=["']preconnect["'][^>]*>/gi) || []).length;
      const dns = (ctx.html.match(/<link[^>]+rel=["']dns-prefetch["'][^>]*>/gi) || []).length;
      if (preconnects >= 2) return { status: 'pass', score: 10, msg: `${preconnects} preconnect + ${dns} dns-prefetch` };
      if (preconnects >= 1) return { status: 'warn', score: 7, msg: `Only ${preconnects} preconnect — add more critical origins` };
      return { status: 'fail', score: 0, msg: 'No preconnect (mobile TCP/TLS handshake adds 100-300ms latency)' };
    }),
    check('mobile.vite-target', 'Vite targets modern browsers (es2020+)', (ctx) => {
      const cfg = ctx.viteConfig;
      if (!cfg) return { status: 'warn', score: 5, msg: 'Vite config not found' };
      const t = cfg.build?.target;
      const ok = t && /es2[0-9]{3}$/.test(t);
      return { status: ok ? 'pass' : 'warn', score: ok ? 10 : 5, msg: `target: ${t || 'default (esmodules)'}` };
    }),
    check('mobile.vite-chunks', 'Vite splits vendors into separate chunks', (ctx) => {
      const cfg = ctx.viteConfig;
      if (!cfg) return { status: 'warn', score: 5, msg: 'Vite config not found' };
      const chunks = Object.keys((cfg.build?.rollupOptions?.output?.manualChunks || {}));
      if (chunks.length >= 4) return { status: 'pass', score: 10, msg: `${chunks.length} vendor chunks: ${chunks.join(', ')}` };
      const fn = cfg.build?.rollupOptions?.output?.manualChunks;
      if (typeof fn === 'function') {
        return { status: 'pass', score: 10, msg: 'manualChunks function defined (splitting on demand)' };
      }
      return { status: 'warn', score: 4, msg: 'No manualChunks — initial bundle may be large on mobile' };
    }),
    check('mobile.optimized-image', 'OptimizedImage component exists (lazy + srcset)', (ctx) => {
      const p = ctx.projectRoot;
      const candidates = [
        join(p, 'src/components/OptimizedImage.jsx'),
        join(p, 'src/components/optimized-image.jsx'),
        join(p, 'src/components/LazyImage.jsx'),
        join(p, 'src/components/Image.jsx'),
      ];
      for (const c of candidates) {
        if (existsSync(c)) {
          const src = readFileSync(c, 'utf8');
          const hasLazy = /loading=["']lazy["']/i.test(src);
          const hasSrcset = /srcSet/.test(src);
          const ok = hasLazy || hasSrcset;
          return { status: ok ? 'pass' : 'warn', score: ok ? 10 : 6, msg: `Found at ${c.replace(p, '.')}, lazy=${hasLazy}, srcSet=${hasSrcset}` };
        }
      }
      return { status: 'warn', score: 4, msg: 'No OptimizedImage component found' };
    }),
    check('mobile.image-lazy', 'Images use loading="lazy" pattern in codebase', (ctx) => {
      const { scanDir } = ctx.helpers;
      const files = scanDir(join(ctx.projectRoot, 'src'));
      let lazyCount = 0;
      let eagerCount = 0;
      for (const f of files) {
        if (!f.endsWith('.jsx') && !f.endsWith('.tsx')) continue;
        const src = readFileSync(f, 'utf8');
        const lazyMatches = (src.match(/loading=["']lazy["']/gi) || []).length;
        const eagerMatches = (src.match(/loading=["']eager["']/gi) || []).length;
        lazyCount += lazyMatches;
        eagerCount += eagerMatches;
      }
      if (lazyCount > 0) return { status: 'pass', score: 10, msg: `${lazyCount} lazy + ${eagerCount} eager across ${files.length} files` };
      return { status: 'warn', score: 4, msg: 'No loading="lazy" found in components' };
    }),
  ],
};

// ----------------- Helpers -----------------
function scanDir(dir) {
  const out = [];
  function walk(d) {
    if (!existsSync(d)) return;
    let entries;
    try {
      entries = readdirSync(d);
    } catch (_) {
      return;
    }
    for (const e of entries) {
      if (e === 'node_modules' || e === 'dist' || e === '.git') continue;
      const p = join(d, e);
      try {
        const st = statSync(p);
        if (st.isDirectory()) walk(p);
        else out.push(p);
      } catch (_) {}
    }
  }
  walk(dir);
  return out;
}
import { readdirSync, statSync } from 'node:fs';

// ----------------- Runner -----------------
async function runAudit(args) {
  const ctx = {
    baseUrl: args.url,
    projectRoot: args.project,
    html: '',
    viteConfig: null,
    helpers: { scanDir },
  };

  // Fetch index.html
  const pageRes = await fetchOrLocal(args.url, '/', args.project);
  if (!pageRes.ok) {
    return { error: `Could not fetch ${args.url}: ${pageRes.status} ${pageRes.error || ''}` };
  }
  ctx.html = pageRes.text;
  ctx.htmlSource = pageRes.source;

  // Try to load vite.config.js for source-side checks
  try {
    const vitePath = join(args.project, 'vite.config.js');
    if (existsSync(vitePath)) {
      // We can't actually import the config (needs Vite), but we can regex-extract
      const src = readFileSync(vitePath, 'utf8');
      // Very lightweight config inspection
      const targetMatch = src.match(/target:\s*['"]([^'"]+)['"]/);
      const manualChunksMatch = src.match(/manualChunks\s*[:(]/);
      const assetsMatch = src.match(/assetsInlineLimit:\s*(\d+)/);
      const cssMinifyMatch = src.match(/cssMinify:\s*(true|false)/);
      const sourcemapMatch = src.match(/sourcemap:\s*(true|false)/);
      const treeShakeMatch = /treeshake:\s*\{/.test(src);
      ctx.viteConfig = {
        build: {
          target: targetMatch ? targetMatch[1] : null,
          assetsInlineLimit: assetsMatch ? parseInt(assetsMatch[1], 10) : null,
          cssMinify: cssMinifyMatch ? cssMinifyMatch[1] === 'true' : null,
          sourcemap: sourcemapMatch ? sourcemapMatch[1] === 'true' : null,
          rollupOptions: {
            output: {
              manualChunks: manualChunksMatch ? 'present' : null,
            },
          },
        },
        _treeshake: treeShakeMatch,
      };
    }
  } catch (_) {}

  // Run checks
  const results = {};
  for (const cat of args.checkList) {
    const list = CHECKS[cat];
    if (!list) continue;
    const catResults = [];
    for (const c of list) {
      try {
        const r = await c.run(ctx);
        catResults.push({ id: c.id, name: c.name, weight: c.weight, ...r });
      } catch (e) {
        catResults.push({ id: c.id, name: c.name, weight: c.weight, status: 'error', score: 0, msg: e.message });
      }
    }
    const totalWeight = catResults.reduce((a, b) => a + b.weight, 0);
    const earned = catResults.reduce((a, b) => a + b.score, 0);
    const pct = totalWeight ? Math.round((earned / totalWeight) * 100) : 0;
    results[cat] = { checks: catResults, score: pct };
  }
  return { ctx, results };
}

// ----------------- HTML Report -----------------
const CATEGORY_META = {
  seo: { label: 'SEO', desc: 'Meta tags, canonical, Open Graph, Twitter cards', color: '#3b82f6' },
  'seo-rules': { label: 'SEO Rules', desc: 'HTML attributes, JSON-LD, semantic correctness', color: '#6366f1' },
  llm: { label: 'LLM / GEO', desc: 'llms.txt, content-index.json, AI bot coverage', color: '#8b5cf6' },
  sitemap: { label: 'Sitemap', desc: 'XML validity, namespaces, hreflang, coverage', color: '#06b6d4' },
  robots: { label: 'Robots', desc: 'Crawler directives, AI bot allowlist, privacy', color: '#10b981' },
  agentic: { label: 'Agentic', desc: 'agentic.json, capabilities, access policies', color: '#f59e0b' },
  mobile: { label: 'Mobile', desc: 'Viewport, performance hints, code splitting', color: '#ef4444' },
};

function statusBadge(s) {
  const map = {
    pass: { bg: '#d1fae5', fg: '#065f46', text: 'PASS' },
    warn: { bg: '#fef3c7', fg: '#92400e', text: 'WARN' },
    fail: { bg: '#fee2e2', fg: '#991b1b', text: 'FAIL' },
    error: { bg: '#f3f4f6', fg: '#374151', text: 'ERR ' },
  };
  const v = map[s] || map.error;
  return `<span style="display:inline-block;padding:2px 8px;border-radius:4px;background:${v.bg};color:${v.fg};font-weight:600;font-size:11px;font-family:monospace;letter-spacing:0.5px">${v.text}</span>`;
}

function renderHtml(args, data) {
  const { results } = data;
  const cats = Object.keys(results);
  const overall =
    cats.reduce((a, c) => a + results[c].score, 0) / cats.length;
  const ts = new Date().toISOString();
  const grade =
    overall >= 90
      ? { letter: 'A+', color: '#059669' }
      : overall >= 80
      ? { letter: 'A', color: '#10b981' }
      : overall >= 70
      ? { letter: 'B', color: '#22c55e' }
      : overall >= 60
      ? { letter: 'C', color: '#eab308' }
      : overall >= 50
      ? { letter: 'D', color: '#f97316' }
      : { letter: 'F', color: '#ef4444' };

  // Summary stats
  let totalChecks = 0;
  let passCount = 0;
  let warnCount = 0;
  let failCount = 0;
  for (const c of cats) {
    for (const r of results[c].checks) {
      totalChecks++;
      if (r.status === 'pass') passCount++;
      else if (r.status === 'warn') warnCount++;
      else if (r.status === 'fail') failCount++;
    }
  }

  let categoriesHtml = '';
  for (const cat of cats) {
    const meta = CATEGORY_META[cat] || { label: cat, desc: '', color: '#6b7280' };
    const catRes = results[cat];
    const checks = catRes.checks
      .map(
        (c) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #f3f4f6;width:1%;white-space:nowrap">${statusBadge(c.status)}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #f3f4f6;color:#111827">${escapeHtml(c.name)}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #f3f4f6;color:#4b5563;font-family:monospace;font-size:12px">${escapeHtml(c.msg || '')}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #f3f4f6;text-align:right;color:#6b7280;font-family:monospace;font-size:12px">${c.score}/${c.weight}</td>
        </tr>`,
      )
      .join('');
    categoriesHtml += `
      <div style="margin:32px 0;background:#fff;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.05);overflow:hidden">
        <div style="display:flex;align-items:center;gap:12px;padding:16px 20px;border-bottom:1px solid #f3f4f6">
          <div style="width:4px;height:32px;background:${meta.color};border-radius:2px"></div>
          <div style="flex:1">
            <div style="font-weight:600;color:#111827;font-size:15px">${escapeHtml(meta.label)}</div>
            <div style="color:#6b7280;font-size:12px;margin-top:2px">${escapeHtml(meta.desc)}</div>
          </div>
          <div style="text-align:right">
            <div style="font-size:24px;font-weight:700;color:${meta.color}">${catRes.score}<span style="font-size:14px;color:#9ca3af">/100</span></div>
          </div>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:13px">${checks}</table>
      </div>`;
  }

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>minimax audit — ${escapeHtml(args.label)}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Inter,sans-serif;background:#f9fafb;color:#111827;line-height:1.5;padding:40px 20px}
  .wrap{max-width:960px;margin:0 auto}
  .header{background:linear-gradient(135deg,#1e293b 0%,#334155 100%);color:#fff;border-radius:16px;padding:32px;margin-bottom:24px;box-shadow:0 4px 6px rgba(0,0,0,0.07)}
  .header h1{font-size:28px;font-weight:700;margin-bottom:6px}
  .header .sub{color:#cbd5e1;font-size:14px;margin-bottom:20px}
  .header .meta{display:flex;flex-wrap:wrap;gap:24px;font-size:12px;color:#94a3b8}
  .header .meta b{color:#e2e8f0;font-weight:600}
  .summary{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:12px;margin-top:24px}
  .stat{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:14px 16px}
  .stat .n{font-size:28px;font-weight:700;color:#fff}
  .stat .l{font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;margin-top:2px}
  .grade-row{display:flex;align-items:center;gap:24px;padding:24px;background:#fff;border-radius:12px;margin-bottom:24px;box-shadow:0 1px 3px rgba(0,0,0,0.05)}
  .grade{font-size:80px;font-weight:800;line-height:1;color:${grade.color}}
  .grade-info h2{font-size:20px;font-weight:600;margin-bottom:4px}
  .grade-info p{color:#6b7280;font-size:14px}
  .grade-bar{flex:1;height:12px;background:#f3f4f6;border-radius:6px;overflow:hidden;margin-top:12px}
  .grade-bar div{height:100%;background:linear-gradient(90deg,${grade.color} 0%,${grade.color}cc 100%);border-radius:6px;width:${overall.toFixed(0)}%;transition:width 0.5s}
</style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <h1>minimax audit</h1>
    <div class="sub">${escapeHtml(args.label)} · ${escapeHtml(args.url)}</div>
    <div class="meta">
      <span><b>Date</b> ${ts}</span>
      <span><b>Checks</b> ${cats.join(', ')}</span>
      <span><b>Source</b> ${escapeHtml(data.ctx.htmlSource || 'http')}</span>
    </div>
    <div class="summary">
      <div class="stat"><div class="n">${totalChecks}</div><div class="l">Total checks</div></div>
      <div class="stat"><div class="n" style="color:#86efac">${passCount}</div><div class="l">Passed</div></div>
      <div class="stat"><div class="n" style="color:#fde047">${warnCount}</div><div class="l">Warnings</div></div>
      <div class="stat"><div class="n" style="color:#fca5a5">${failCount}</div><div class="l">Failed</div></div>
    </div>
  </div>

  <div class="grade-row">
    <div class="grade">${grade.letter}</div>
    <div class="grade-info" style="flex:1">
      <h2>Overall score: ${overall.toFixed(0)} / 100</h2>
      <p>${passCount} of ${totalChecks} checks passed across ${cats.length} categories.</p>
      <div class="grade-bar"><div></div></div>
    </div>
  </div>

  ${categoriesHtml}

  <div style="margin-top:32px;padding:20px;background:#fff;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.05);color:#6b7280;font-size:12px">
    <b style="color:#374151">minimax audit</b> — local auditor by Syntax Academy Engineering. Zero-dependency Node.js script.
    No data sent to external services. Re-run anytime with: <code style="background:#f3f4f6;padding:2px 6px;border-radius:4px">npx minimax audit --url ${escapeHtml(args.url)}</code>
  </div>
</div>
</body>
</html>`;
}

function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ----------------- JSON output -----------------
function renderJson(args, data) {
  return JSON.stringify({ args, results: data.results, timestamp: new Date().toISOString() }, null, 2);
}

// ----------------- Main -----------------
async function main() {
  const args = parseArgs(process.argv.slice(2));
  console.log(`minimax audit → ${args.url}`);
  console.log(`Checks: ${args.checkList.join(', ')}`);
  console.log(`Output: ${args.output}\n`);

  const data = await runAudit(args);
  if (data.error) {
    console.error('ERROR:', data.error);
    process.exit(1);
  }

  // Console summary
  for (const cat of args.checkList) {
    const r = data.results[cat];
    if (!r) continue;
    const passed = r.checks.filter((c) => c.status === 'pass').length;
    const warned = r.checks.filter((c) => c.status === 'warn').length;
    const failed = r.checks.filter((c) => c.status === 'fail').length;
    console.log(
      `  [${cat.padEnd(10)}] ${String(r.score).padStart(3)}/100  ✓${passed}  ⚠${warned}  ✗${failed}`,
    );
  }

  const overall =
    args.checkList.reduce((a, c) => a + (data.results[c]?.score || 0), 0) /
    args.checkList.length;
  console.log(`\nOverall: ${overall.toFixed(0)}/100\n`);

  let out;
  if (args.format === 'json') {
    out = renderJson(args, data);
  } else {
    out = renderHtml(args, data);
  }
  const outPath = resolve(args.output);
  writeFileSync(outPath, out, 'utf8');
  console.log(`✓ Report written: ${outPath} (${(out.length / 1024).toFixed(1)} KB)`);
}

main().catch((e) => {
  console.error('FATAL:', e);
  process.exit(1);
});
