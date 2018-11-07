import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../../src/App';

const template = require('../template');
const path = require('path');
const fs = require("fs");

const getAssetHash = (data) => {
    const hashes = [];
    for(let key in data) {
        if(!(/(map)|(html)/).test(data[key]) ) {
            const parts = data[key].split('/');
            const hash = parts[parts.length-1].split('.')[1];
            hashes.push({[key]: hash});
        }
    }
    return hashes;
}

export default (req, res) => {
    
    const f = path.resolve(__dirname,'../../asset-manifest.json');
    console.log('fileddddd: ', f);
    fs.readFile(f, 'utf-8', (err, data) => {
        if(err) {
            console.error('error: ',err);
            return res.send(404).end();
        }
        
        const hashes = getAssetHash(JSON.parse(data));

        console.log('hashes: ', hashes);
        const content = ReactDOMServer.renderToString(<App />);
        console.log('content: ', content);
        res.setHeader('Cache-Control', 'assets, max-age=604800')
        const response = template("Server Rendered Page", content, hashes);
        return res.send(response);

    });
    // const filePath = path.resolve(__dirname, '../../build/index.html');
    // fs.readFile(filePath, 'utf-8', (err, htmlData) => {
    //     if(err) {
    //         console.error('error: ',err);
    //         return res.sendStatus(404).end();
    //     }

    // });

}