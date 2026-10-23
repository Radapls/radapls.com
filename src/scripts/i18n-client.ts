// ponytail: client-side locale swap via string-pair dict; pages always
// render the default locale (en) server-side. Upgrade path: data-i18n keys.
import en from '../i18n/locales/en.json';
import es from '../i18n/locales/es.json';
import ptBr from '../i18n/locales/pt-br.json';

// keep in sync with src/i18n/index.ts (module imports astro:i18n, unusable client-side)
const DEFAULT = 'en';
const tables: Record<string, Record<string, string>> = { en, es, 'pt-br': ptBr };
const ATTRS = ['aria-label', 'title', 'placeholder', 'alt'] as const;
const cur = { lang: DEFAULT };

function applyLang(from: string, to: string) {
	const L = tables;
	if (!L?.[from] || !L?.[to]) return;
	const fromTable: Record<string, string> = L[from];
	const toTable: Record<string, string> = L[to];
	// tables are hash→string; index them text→hash for node lookup
	const reverse: Record<string, string> = {};
	for (const [k, v] of Object.entries(fromTable)) reverse[v] ??= k;
	if (from === to) return;
	const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
	// ponytail: skip generated content collections rendered per-locale later
	const skip = /^(SCRIPT|STYLE)$/;
	let n: Node | null;
	while ((n = walker.nextNode())) {
		if (n.parentElement && skip.test(n.parentElement.tagName)) continue;
		const raw = n.nodeValue ?? '';
		const key = raw.trim();
		const k = reverse[key];
		const hit = k && toTable[k];
		if (hit) n.nodeValue = raw.replace(key, hit);
	}
	for (const el of document.body.querySelectorAll('*')) {
		for (const a of ATTRS) {
			const v = el.getAttribute(a);
			if (v) {
				const k = reverse[v.trim()];
				const hit = k && toTable[k];
				if (hit) el.setAttribute(a, v.replace(v.trim(), hit));
			}
		}
	}
}

function setLocale(to: string) {
	if (to === cur.lang) return;
	applyLang(cur.lang, to);
	cur.lang = to;
	localStorage.setItem('lang', to);
	document.documentElement.lang = to;
	window.dispatchEvent(new CustomEvent('locale-change', { detail: to }));
}

declare global {
	interface Window {
		__i18n?: { lang: string; locales: string[]; setLocale(l: string): void };
	}
}

function setup() {
	const stored = localStorage.getItem('lang');
	if (stored && stored !== DEFAULT) {
		applyLang(DEFAULT, stored);
		cur.lang = stored;
		document.documentElement.lang = stored;
	}
	window.__i18n = {
		get lang() {
			return cur.lang;
		},
		locales: Object.keys(tables),
		setLocale,
	};
	window.dispatchEvent(new CustomEvent('locale-change', { detail: cur.lang }));
}
document.addEventListener('astro:page-load', setup);
