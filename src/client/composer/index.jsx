import * as React from 'react';
import { hydrate } from 'react-dom';


export const Page = (props) => {
	const { hatHtml } = props;

	return (
		<div>
			<div id="hat_fragment" dangerouslySetInnerHTML={hatHtml ? { __html: hatHtml } : undefined}>
			</div>

			<h1>District magic</h1>

			<div style={{ backgroundColor: 'green', color: 'white', }}>
				Wish you were here
            </div>
		</div>
	)
}

const ready = () => {
	const fragmentContainer = document.getElementById('hat_fragment');

	if (fragmentContainer) {
		hydrate(
			(<Page />),
			fragmentContainer
		);
	}
}

if (typeof window !== 'undefined') {
	document.addEventListener("DOMContentLoaded", ready);
}

export default Page;

