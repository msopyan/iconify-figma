"use strict";

import insertSVG from './insert-svg';

// <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="24" height="24" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M14.83 13.83A3.99 3.99 0 0 0 16 11c0-1.11-.45-2.11-1.17-2.83l1.41-1.41A5.98 5.98 0 0 1 18 11c0 1.65-.67 3.15-1.76 4.24l-1.41-1.41M14 11a2 2 0 0 0-2-2c-.6 0-1.13.27-1.5.68l2.82 2.82c.41-.37.68-.9.68-1.5m3.66 5.66l1.41 1.41A9.969 9.969 0 0 0 22 11c0-2.76-1.12-5.26-2.93-7.07l-1.41 1.41A7.955 7.955 0 0 1 20 11c0 2.22-.89 4.22-2.34 5.66M22 21.18V20h-1.18L22 21.18m-1.73.82l.73.73L19.73 24l-2-2H15a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1H2v-2h7a1 1 0 0 1 1-1h1v-3.73l-2.66-2.66c.2.46.48.89.83 1.22l-1.41 1.41A5.98 5.98 0 0 1 6 11c0-.23 0-.46.04-.69L4.37 8.64C4.14 9.39 4 10.18 4 11c0 2.22.89 4.22 2.34 5.66l-1.41 1.41A9.969 9.969 0 0 1 2.81 7.08L1 5.27L2.28 4L3.7 5.42l1.45 1.45l1.48 1.48L8.17 9.9l2.11 2.1l.72.71L18.27 20h.01l2 2h-.01m-4.54-2L13 17.27V19h1a1 1 0 0 1 1 1h.73z" fill="#000"/></svg>
function importSVG(env, props) {
	// Create node from SVG
	let node = figma.createNodeFromSvg(props.svg);
	if (!node) {
		if (env.debug) {
			console.log('Import failed: invalid SVG');
		}
		return;
	}

	// Move it to currently selected item
	if (!figma.currentPage) {
		return;
	}
	insertSVG(env, node);

	// Select node
	figma.currentPage.selection = [node];
}

export default importSVG;
