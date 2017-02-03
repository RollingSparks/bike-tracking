/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';

import { render } from 'react-dom';
import { Map, TileLayer } from 'react-leaflet';
const stamenTonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const mapCenter = [39.9528, -75.1638];
const zoomLevel = 8;

import s from './styles.css';
import { title, html } from './index.md';

class MapPage extends React.Component {

    componentDidMount() {
        document.title = title;
    }

    render() {
        return (
            <Layout className={s.content}>
                <h1>{title}</h1>
                <div dangerouslySetInnerHTML={{ __html: html }} />
                <div>
                <Map
            center={mapCenter}
            zoom={zoomLevel}
                >
                <TileLayer
            attribution={stamenTonerAttr}
            url={stamenTonerTiles}
                />
                </Map>
                </div>
                </Layout>
        );
    }

}

export default MapPage;
