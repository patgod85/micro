
import * as React from 'react';

import Container from '@tutu/order/lib/Container';
import Row from '@tutu/order/lib/Row';
import Column from '@tutu/order/lib/Column';

import { Header } from '../Header';
import { Content } from '../Content';

export const Page = (props) => {
	const { hatHtml } = props;

	return (
		<Container>
			<Row>
				<Column>
					<Header hatHtml={hatHtml} />
				</Column>
			</Row>

			<Row>
				<Column>
					<Content />
				</Column>
			</Row>
		</Container>
	)
}
