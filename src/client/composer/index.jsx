// Save the comment
import React from 'react';
import { hydrate } from 'react-dom';
import { RootProvider } from '@tutu/order';

import { Page as PageComponent } from './component/Page';

export const Page = (props) => {
	const { hatHtml } = props;

	return (
		<RootProvider>
			<PageComponent hatHtml={hatHtml} />
		</RootProvider>
	)
}

const ready = () => {
	const reactRoot = document.getElementById('root');

	if (reactRoot) {
		hydrate(
			(
				<Page />
			),
			reactRoot
		);
	}
}

if (typeof window !== 'undefined') {
	document.addEventListener("DOMContentLoaded", ready);
}

export default Page;
