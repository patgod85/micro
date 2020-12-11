
import * as React from 'react';
import loadable from '@loadable/component'

import Container from '@tutu/order/lib/Container';
import Row from '@tutu/order/lib/Row';
import Column from '@tutu/order/lib/Column';

import { Header } from '../Header';
import { Content } from '../Content';

const ContentAlternative = loadable(() => import('../ContentAlternative'))

export const Page = (props) => {
	const { hatHtml } = props;

	const [ contentId, setContent] = React.useState(0);

	return (
		<Container>
			<Row>
				<Column>
					<Header hatHtml={hatHtml} />
				</Column>
			</Row>

			<Row>
				<Column>
					<nav onClick={() => { setContent(0) }}>Page 1</nav>
					<nav onClick={() => { setContent(1) }}>Page 2</nav>
				</Column>
			</Row>
			<Row>
				<Column>
					{contentId === 0 && (
						<Content />
					)}
					{contentId === 1 && (
						<ContentAlternative />
					)}
				</Column>
			</Row>
		</Container>
	)
}
