import * as React from 'react';

import { useEffect, useState } from 'react';

import Icon from '@tutu/order/lib/Icon';

import styles from './styles.css';

export const Header = (props) => {
	const { hatHtml } = props;

	const [status, setStatus] = useState('waiting');

	useEffect(
		() => {
			setTimeout(
				() => {
					setStatus('check');
				},
				3000
			);
		},
		[]
	);

	return (
		<div className={styles.wrapper}>
			<Icon name={status} />
			<div id="hat_fragment" dangerouslySetInnerHTML={hatHtml ? { __html: hatHtml } : undefined} />
		</div>
	);
}
