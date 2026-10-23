export interface Stack {
	id: string;
	title: string;
	icon: string;
}

export interface Stack {
	id: string;
	title: string;
	icon: string;
}

export const TechStack: Stack[] = [
	{
		id: 'angular',
		title: 'Angular',
		icon: 'Angular',
	},
	{
		id: 'scss',
		title: 'SCSS',
		icon: 'SCSS',
	},
	{
		id: 'html',
		title: 'HTML',
		icon: 'HTML',
	},
	{
		id: 'typescript',
		title: 'TypeScript',
		icon: 'TypeScript',
	},
	{
		id: 'ngrx',
		title: 'NGRX',
		icon: 'NGRX',
	},
	{
		id: 'nativescript',
		title: 'NativeScript',
		icon: 'NativeScript',
	},
	{
		id: 'react',
		title: 'React',
		icon: 'react',
	},
	{
		id: 'gatsby',
		title: 'Gatsby',
		icon: 'gatsby',
	},
	{
		id: 'drupal',
		title: 'Drupal',
		icon: 'Drupal',
	},
	{
		id: 'rxjs',
		title: 'RXJS',
		icon: 'rxjs',
	},
];

export const companyStacks: { [key: string]: string[] } = {
	wibx: ['angular', 'typescript', 'scss', 'ngrx', 'html', 'nativescript'],
	birdi: ['react', 'scss', 'typescript', 'gatsby', 'rxjs', 'drupal'],
	nt: ['angular', 'typescript', 'scss', 'rxjs', 'html'],
	ericsson: ['react', 'typescript', 'scss', 'rxjs', 'html'],
};
