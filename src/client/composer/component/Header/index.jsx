import * as React from 'react';

import { useEffect, useState } from 'react';

import Text from '@tutu/order/lib/Text';
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
			<Text>
				<Icon name={status} size="16" className={styles.icon} />
				Я обёртка шапки
			</Text>
			<div id="hat_fragment" dangerouslySetInnerHTML={hatHtml ? { __html: hatHtml } : undefined} />
		</div>
	);
}
