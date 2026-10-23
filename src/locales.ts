export const DEFAULT_LOCALE_SETTING: string = 'en';

export const LOCALES_SETTING: LocaleSetting = {
	en: {
		label: '🇺🇸 EN-US',
	},
	es: {
		label: '🇨🇴 ES-CO',
	},
	'pt-br': {
		label: '🇧🇷 PT-BR',
	},
};

interface LocaleSetting {
	[key: Lowercase<string>]: {
		label: string;
		lang?: string;
		dir?: 'rtl' | 'ltr';
	};
}
