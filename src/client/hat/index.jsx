import * as React from 'react';
import { RootProvider } from '@tutu/order';
import { hydrate } from 'react-dom';

import { Hat as HatComponent } from './component/Hat';

const ready = () => {
	const fragmentContainer = document.getElementById('hat_fragment');

	if (fragmentContainer) {
		hydrate(
			(<HatComponent />),
			fragmentContainer
		);
	}
}

if (typeof window !== 'undefined') {
	document.addEventListener("DOMContentLoaded", ready);
}

export const Fragment = () => {
	return (
		<RootProvider>
			<HatComponent />
		</RootProvider>
	)
};
