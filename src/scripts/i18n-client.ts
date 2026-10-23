// ponytail: client-side locale swap via string-pair dict; pages always
// render the default locale (en) server-side. Upgrade path: data-i18n keys.
import data from '../i18n-dict.json';

const DEFAULT = data.defaultLocale as string;
const ATTRS = ['aria-label', 'title', 'placeholder', 'alt'] as const;
const cur = { lang: DEFAULT };

function applyLang(from: string, to: string) {
	const map = (data.dict as any)[from]?.[to] as Record<string, string> | undefined;
	if (!map || from === to) return;
	const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
	// ponytail: skip generated content collections rendered per-locale later
	const skip = /^(SCRIPT|STYLE)$/;
	let n: Node | null;
	while ((n = walker.nextNode())) {
		if (n.parentElement && skip.test(n.parentElement.tagName)) continue;
		const raw = n.nodeValue ?? '';
		const key = raw.trim();
		const hit = (map as Record<string, string>)[key];
		if (hit) n.nodeValue = raw.replace(key, hit);
	}
	for (const el of document.body.querySelectorAll('*')) {
		for (const a of ATTRS) {
			const v = el.getAttribute(a);
			if (v) {
				const hit = (map as Record<string, string>)[v.trim()];
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
		lang: cur.lang,
		locales: Object.keys(data.dict),
		setLocale,
	};
}
document.addEventListener('astro:page-load', setup);
