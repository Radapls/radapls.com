import Wibx1 from '@assets/img/wibx/wbx_1.webp';
import Wibx2 from '@assets/img/wibx/wbx_2.webp';
import Wibx3 from '@assets/img/wibx/wbx_3.webp';
import Wibx4 from '@assets/img/wibx/wbx_4.webp';

import Birdi2 from '@assets/img/birdi/birdi_2.webp';
import Birdi3 from '@assets/img/birdi/birdi_3.webp';
import Birdi4 from '@assets/img/birdi/birdi_4.webp';
import Birdi5 from '@assets/img/birdi/birdi_5.webp';

export interface Slide {
	src: string;
	description?: string;
}

export const wibxPhotos: Slide[] = [
	{ src: Wibx1.src, description: 'Landing experience' },
	{ src: Wibx2.src, description: 'Token dashboard' },
	{ src: Wibx3.src, description: 'Wallet overview' },
	{ src: Wibx4.src, description: 'Marketplace view' },
];

export const birdiPhotos: Slide[] = [
	{ src: Birdi2.src, description: 'Medicine Cabinet redesign' },
	{ src: Birdi3.src, description: 'Family Account launch' },
	{ src: Birdi4.src, description: 'Subscription program' },
	{ src: Birdi5.src, description: 'Payment history redesign' },
];
