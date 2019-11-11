/**
 * This file is part of the @iconify/icon-finder package.
 *
 * (c) Vjacheslav Trushkin <cyberalien@gmail.com>
 *
 * For the full copyright and license information, please view the license.txt or license.gpl.txt
 * files that were distributed with this source code.
 *
 * Licensed under Apache 2.0 or GPL 2.0 at your option.
 * If derivative product is not compatible with one of licenses, you can pick one of licenses.
 *
 * @license Apache 2.0
 * @license GPL 2.0
 */
"use strict";

import React, { Component } from 'react';
import Iconify from '@iconify/iconify';

import FooterBlock from './block';
import Disclosure from '../../parts/disclosure';
import DisclosureItem from '../../parts/disclosure-item';

const activeClass = 'disclosure__item disclosure--expanded';
const inactiveClass = 'disclosure__item';

function camelCase(iconName) {
    let name = '';
    let parts = iconName.split('-');
    parts.forEach(function(part, index) {
        name += index ? part.slice(0, 1).toUpperCase() + part.slice(1) : part
    });
    if (name.charCodeAt(0) < 97 || name.charCodeAt(0) > 122) {
        // Not a-z - add "icon" at start
        name = 'icon' + name.slice(0, 1).toUpperCase() + name.slice(1);
    } else if (parts.length < 2) {
        // Add "Icon" to avoid reserved keywords
        name += 'Icon';
    }
    return name;
}

class FooterCode extends Component {
    render() {
        let props = this.props,
            section = props.app.footerCodeSection,
            phrases = props.phrases.footer,
            app = props.app,
            name = app.selection.iconName,
            icon = app.selection.icon;

        let version = Iconify.getVersion(),
            majorVersion = version.split('.').shift();

        let htmlAttribs = [],
            reactAttribs = [];
        if (props.hasColor && app.custom.color) {
            htmlAttribs.push(' style="color: ' + app.custom.color + ';"');
            reactAttribs.push(' color="' + app.custom.color + '"');
        }

        if (app.custom.hFlip) {
            reactAttribs.push(' hFlip={true}');
            htmlAttribs.push(' data-flip="horizontal' + (app.custom.vFlip ? ',vertical' : '') + '"');
        }
        if (app.custom.vFlip) {
            reactAttribs.push(' vFlip={true}');
            if (!app.custom.hFlip) {
                htmlAttribs.push(' data-flip="vertical"');
            }
        }

        if (app.custom.rotate > 0) {
            reactAttribs.push(' rotate="' + (app.custom.rotate * 90) + 'deg"');
            htmlAttribs.push(' data-rotate="' + (app.custom.rotate * 90) + 'deg"');
        }

        // Generate HTML code
        let html = '<iconify-icon data-icon="' + name + '"' + htmlAttribs.join('') + '></iconify-icon>',
            html2 = '<iconify-icon data-icon="' + name + '" style="font-size: 24px;' + (props.hasColor ? ' color: red;' : '') + '"></iconify-icon>',
            script = '<script src="https://code.iconify.design/' + majorVersion + '/' + version + '/iconify.min.js"></script>',
            html2Text = 'Change icon size' + (props.hasColor ? ' and color' : '') + ' using css (similar to icon fonts):';

        let reactInstall = 'npm install --save-dev @iconify/react @iconify/icons-' + icon.prefix,
            varName = camelCase(icon.name),
            reactImport1 = 'import { Icon, InlineIcon } from \'@iconify/react\';\n',
            reactImport2 = 'import ' + varName + ' from \'@iconify/icons-' + icon.prefix + '/' + icon.name + '\';',
            reactUsage = '<Icon icon={' + varName + '}' + reactAttribs.join('') + ' />';

        return <FooterBlock type="code" title={phrases.code}>
            <Disclosure active={section} onToggle={this._changeSection.bind(this)}>
                <DisclosureItem key="html" title="HTML code">
                    1. Add Iconify script to your page:
                    <div className="plugin-code-sample">{script}</div>
                    2. Use icon placeholder where you want to show icon (similar to icon fonts):
                    <div className="plugin-code-sample">{html}</div>
                    <div className="plugin-code-sample">{html.replace('<iconify-icon', '<span class="iconify" data-inline="false"').replace('</iconify-icon>', '</span>')}</div>
                    {html2Text}
                    <div className="plugin-code-sample">{html2}</div>
                    <div className="plugin-code-sample">{html2.replace('<iconify-icon', '<span class="iconify" data-inline="false"').replace('</iconify-icon>', '</span>')}</div>
                    For more details see <a href="https://iconify.design/docs/iconify-in-pages/" target="_blank">Iconify documentation</a>.
                </DisclosureItem>
                <DisclosureItem key="react" title="React component">
                    1. Install components:
                    <div className="plugin-code-sample">{reactInstall}</div>
                    2. Import icon component and icon data:
                    <div className="plugin-code-sample">{reactImport1}<br />{reactImport2}</div>
                    3. Use it in your code:
                    <div className="plugin-code-sample">{reactUsage}</div>
                    For more details see <a href="https://github.com/iconify/iconify-react" target="_blank">Iconify for React repository</a>.
                </DisclosureItem>
            </Disclosure>
        </FooterBlock>;
    }

    /**
     * Remember current section selection
     *
     * @param section
     * @private
     */
    _changeSection(section) {
        this.props.app.footerCodeSection = section;
    }
}

export default FooterCode;
