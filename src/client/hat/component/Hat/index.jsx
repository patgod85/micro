import * as React from 'react';

import Alert from '@tutu/order/lib/Alert';
import Icon from '@tutu/order/lib/Icon';

export const Hat = () => {
	const [status, setStatus] = React.useState(0);
	React.useEffect(
		() => {
			setTimeout(
				() => {
					setStatus(1);
				},
				1000
			);
		},
		[]
	);

	return (
		<div>
			Шапка ({status})

			<Alert type="danger">
				Хорошие новости! Сегодня пятница!
				<Icon name="gender" />
			</Alert>
		</div>
	)
}
