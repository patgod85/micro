import * as React from 'react';
import { hydrate } from 'react-dom';


const Hat = () => {
    return (
        <div>
            Шапка
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