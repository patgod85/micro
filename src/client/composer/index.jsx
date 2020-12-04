import * as React from 'react';
import { useEffect, useState } from 'react';
import { hydrate } from 'react-dom';

import { RootProvider } from '@tutu/order';

import Text from '@tutu/order/lib/Text';
import Spinner from '@tutu/order/lib/Spinner';
import Container from '@tutu/order/lib/Container';

const Header = (props) => {
	const { hatHtml } = props;

	const [status, setStatus] = useState(0);

	useEffect(
		() => {
			setTimeout(
				() => {
					setStatus(1);
				},
				3000
			);
		},
		[]
	);

	return (
		<>
			<div id="hat_fragment" dangerouslySetInnerHTML={hatHtml ? { __html: hatHtml } : undefined} />

			<Text header>District magic {status}</Text>
		</>
	);
}

export const Page = (props) => {
	const { hatHtml } = props;

	return (
		<RootProvider>
			<Container>
				<Header hatHtml={hatHtml} />

				<div style={{ backgroundColor: 'green', color: 'white', }}>
					Wish you were here
				</div>

				<Spinner />
			</Container>
		</RootProvider>
	)
}

const ready = () => {
	const reactRoot = document.getElementById('root');

	if (reactRoot) {
		hydrate(
			(<Page />),
			reactRoot
		);
	}
}

if (typeof window !== 'undefined') {
	document.addEventListener("DOMContentLoaded", ready);
}

export default Page;

