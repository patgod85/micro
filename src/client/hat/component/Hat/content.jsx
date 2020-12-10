import * as React from 'react';

import Alert from '@tutu/order/lib/Alert';
import Icon from '@tutu/order/lib/Icon';

import styles from './styles.css';

export const Hat = () => {
	const [status, setStatus] = React.useState('waiting');
	React.useEffect(
		() => {
			setTimeout(
				() => {
					setStatus('check');
				},
				1000
			);
		},
		[]
	);

	return (
		<div className={styles.wrapper}>
			<Alert type="danger">
				<Icon name={status} size="16" className={styles.icon} />
				Я шапка!
			</Alert>
		</div>
	)
}
