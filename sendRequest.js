const https = require('https');

//refactor if needed
class sendRequest {
    getDataByRequest(dest) {
        // let htmlData;
        return new Promise((resolve, reject) => {
            https.get(dest, function (res) {
                let content = '';
                res.on('data', data => content += data)
                    .on('end', () => resolve(content))
            }).on('error', e => reject(e.stack));
        });
    }

    async getData(dest) {
        let data = await this.getDataByRequest(dest);
        console.log(data);
    }
}

module.exports = new sendRequest();