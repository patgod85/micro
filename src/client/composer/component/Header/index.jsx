import * as React from 'react';
import { ExternalComponent } from "webpack-external-import";

import { useEffect, useState } from 'react';

import Text from '@tutu/order/lib/Text';
import Icon from '@tutu/order/lib/Icon';

import styles from './styles.css';

export const Header = (props) => {
	const { hatHtml } = props;

	const [status, setStatus] = useState('waiting');

	const [isFragmentReady, setFragmentReadyness] = useState(false);



	useEffect(
		() => {
			__webpack_require__
				.interleaved("hat/Hat")
				.then(HatComponent => {

console.log(' >>>>>>>>>>>>>>>>> § ')
				});

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
			{hatHtml && (
					<div id="hat_fragment" dangerouslySetInnerHTML={{ __html: hatHtml }}>
				</div>
			)}
			{!hatHtml && typeof window !== 'undefined' && (
				<div id="hat_fragment">
					<ExternalComponent
						interleave={__webpack_require__.interleaved(
							"hat/Hat"
						)}
						export="Hat"
						title="Some Heading"
					/>
				</div>
			)}
		</div>
	);
}
