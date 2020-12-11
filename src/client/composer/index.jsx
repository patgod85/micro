import * as React from 'react';
import { hydrate } from 'react-dom';
import { RootProvider } from '@tutu/order';
import { loadableReady } from '@loadable/component'
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
		loadableReady(() => {
			hydrate(
				(
					<Page />
				),
				reactRoot
			);
		})
	}
}

if (typeof window !== 'undefined') {
	document.addEventListener("DOMContentLoaded", ready);
}

export default Page;
