import * as React from 'react';

import { useEffect, useState } from 'react';

import Icon from '@tutu/order/lib/Icon';
import Text from '@tutu/order/lib/Text';
import Spacer from '@tutu/order/lib/Spacer';
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

			<Icon name={status} size="16" />

			<Text header>District magic</Text>

			<Spacer>
				<Spinner count={8} color="red" length={15} />
			</Spacer>

			<div style={{ backgroundColor: 'green', color: 'white', }}>
				Wish you were here
			</div>
		</div>
	);
}
