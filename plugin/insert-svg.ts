"use strict";

function insertSVG(env, node) {
	let parent = null;

	if (figma.currentPage.selection.length) {
		parent = figma.currentPage.selection[0];
		switch (parent.type) {
			case 'GROUP':
			case 'PAGE':
				break;

			case 'FRAME':
				if (parent.parent.type === 'PAGE') {
					// Frame with parent group should be parent for icon, unless its another icon
					if (parent.name.indexOf('-') !== -1 || parent.name.indexOf(':') !== -1) {
						parent = parent.parent;
					}
					break;
				}
				parent = parent.parent;
				break;

			default:
				parent = parent.parent;
		}
	}

	let x = 0,
		y = 0;

	// Move icon to middle of selected group
	if (parent && parent.type !== 'PAGE' && parent !== node.parent) {
		if (!env.lastParent || env.lastParent.node !== parent) {
			env.lastParent = {
				node: parent,
				offset: 0
			};
		}

		// Move to top left corner
		switch (parent.type) {
			case 'FRAME':
				break;

			default:
				x = parent.x;
				y = parent.y;
		}
		node.x = x;
		node.y = y;

		if (parent.width > node.width) {
			x = Math.floor(parent.width / 2 - node.width);
			x += env.lastParent.offset;
			node.x += x;
			env.lastParent.offset += node.width;
		}

		// Change parent node
		parent.insertChild(parent.children.length, node);
	} else {
		// Move icon to middle of viewport
		node.x = Math.round(figma.viewport.center.x - node.width);
		node.y = Math.round(figma.viewport.center.y - node.height);
	}
}

export default insertSVG;
