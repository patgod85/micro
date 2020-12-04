
import * as React from 'react';

import Container from '@tutu/order/lib/Container';

import { Header } from '../Header';
import { Content } from '../Content';

export const Page = (props) => {
	const { hatHtml } = props;

	return (
		<Container>
			<Header hatHtml={hatHtml} />

			<Content />
		</Container>
	)
}
