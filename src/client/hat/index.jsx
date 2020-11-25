import * as React from 'react';
import { hydrate } from 'react-dom';


const Hat = () => {
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
		</div>
	)
}


const ready = () => {
	const fragmentContainer = document.getElementById('hat_fragment');

	if (fragmentContainer) {
		hydrate(
			(<Hat />),
			fragmentContainer
		);
	}
}

document.addEventListener("DOMContentLoaded", ready);
