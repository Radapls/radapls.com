// ponytail: string-pair dict generated from inline t({ ... }) literals.
// Ceiling: identical source strings in different contexts collapse to one
// translation — migrate to data-i18n keys if that ever bites.
// Run: node scripts/gen-i18n-dict.mjs (after editing any t() call site)
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const localesFile = readFileSync('src/locales.ts', 'utf8');
const LOCALES = [...localesFile.matchAll(/^\t'?([a-z-]+)'?:\s*\{/gm)].map((m) => m[1]);
if (LOCALES.length < 2) throw new Error('could not parse locales from src/locales.ts');

function walk(dir, out = []) {
	for (const e of readdirSync(dir, { withFileTypes: true })) {
		const p = join(dir, e.name);
		if (e.isDirectory()) walk(p, out);
		else if (/\.(astro|ts)$/.test(e.name) && !p.includes('i18n-dict')) out.push(p);
	}
	return out;
}

const entries = [];
for (const file of walk('src')) {
	const src = readFileSync(file, 'utf8');
	const re = /\bt\(\{/g;
	let m;
	while ((m = re.exec(src))) {
		let i = m.index + 3, depth = 0; // i at the '{'
		for (; i < src.length; i++) {
			if (src[i] === '{') depth++;
			else if (src[i] === '}') { depth--; if (!depth) break; }
		}
		const body = src.slice(m.index + 4, i);
		const entry = {};
		for (const lang of LOCALES) {
			const key = lang.includes('-') ? "'" + lang + "'" : lang;
			const lm = body.match(new RegExp("(?:^|[,{\\s])" + key + "\\s*:\\s*(['\"`])([\\s\\S]*?)\\1\\s*(?=[,}])"));
			if (lm) entry[lang] = lm[2].replace(/\\(['\"`])/g, '$1');
		}
		if (Object.keys(entry).length > 1) entries.push(entry);
	}
}

const dict = {};
for (const a of LOCALES) {
	dict[a] = {};
	for (const b of LOCALES) {
		if (a === b) continue;
		for (const e of entries) {
			if (e[a] && e[b] && e[a] !== e[b]) (dict[a][b] ??= {})[e[a]] = e[b];
		}
	}
}
writeFileSync('src/i18n-dict.json', JSON.stringify({ defaultLocale: 'en', dict }, null, '\t') + '\n');
console.log('locales:', LOCALES.join(','), '| t() entries:', entries.length, '| en->es pairs:', Object.keys(dict.en.es).length, '| sample:', JSON.stringify(entries[0]));
