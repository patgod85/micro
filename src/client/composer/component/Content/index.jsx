import * as React from 'react';

import { useEffect, useState } from 'react';

import Icon from '@tutu/order/lib/Icon';
import Text from '@tutu/order/lib/Text';
import Spacer from '@tutu/order/lib/Spacer';
import Alert from '@tutu/order/lib/Alert';
import Spinner from '@tutu/order/lib/Spinner';

import styles from './styles.css';

export const Content = () => {
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

			<Text header>
				<Icon name={status} size="16" className={styles.icon} />
				Я контент страницы
			</Text>

			<Spacer>
				<Spinner count={8} color="red" length={15} />
			</Spacer>

			<Alert type="warning">
				А я какой-то блок на странице
			</Alert>
		</div>
	);
}
