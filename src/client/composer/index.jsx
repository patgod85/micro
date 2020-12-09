import * as React from 'react';
import { hydrate } from 'react-dom';
import { RootProvider } from '@tutu/order';
import { corsImport } from "webpack-external-import";
import getMapping from '../../common/services-mapping';

const staticServiceMetadata = getMapping('static');

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
		corsImport(
			/* webpackIgnore:true */ `${staticServiceMetadata.url}/hat/importManifest.js?${Date.now()}`
		).then(() => {
			hydrate(
				(
					<Page />
				),
				reactRoot
			);
		});
	}
}

if (typeof window !== 'undefined') {
	document.addEventListener("DOMContentLoaded", ready);
}

export default Page;
