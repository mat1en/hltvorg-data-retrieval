const https = require('https');

class sendRequest {
    getDataByRequest(dest, resolve) {
        let dataSet = [];
        https.get(dest, function (res) {
            let html = '';
            res.on('data', data => html += data).on('end', () => resolve(html, dataSet))
        }).on('error', e => console.error(e.stack));
        return dataSet;
    }
}

module.exports = new sendRequest();