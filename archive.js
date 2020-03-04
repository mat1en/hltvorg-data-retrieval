const sendRequest = require('./sendRequest');
const cheerio = require('cheerio');
const urlRoot = require('./urlRoot');

function archiveDest(year, month) {
    // if the route url has been changed, the root url should be updated to send the request.
    // this situation may happen, for all routes in hltv.org.
    // const root = 'https://www.hltv.org/news/archive/';
    return `${urlRoot.archive}${year}/${month}`;
}

//
// function getArchiveByRequest(dest) {
//     let archiveSet = [];
//     https.get(dest, function (res) {
//         let html = '';
//         res.on('data', data => html += data).on('end', () => resolveArchiveContent(html, archiveSet))
//     }).on('error', e => console.error(e.stack));
//     return archiveSet;
// }

async function getArchiveContent(dest) {
    let $ = cheerio.load(await sendRequest.getDataByRequest(dest));
    let archiveSet=[];
    let indexList = $('.standard-box .article');
    let dataSet = {};
    indexList.each(function () {
        let title = $(this).find('.newstext').text();
        let etc = $(this).find('.newstc').text().trim();
        // in hltv.org the text of date settles in the div of class '.newsrecent', use it to directly acquire the date.
        // let newsTime = etc.find('.newsrecent').text().trim();
        let newsTime = etc.replace(/\s*\d* comments/, '');
        let comments = etc.replace(/\d{4}-\d{2}-\d{2}\s*/, '').replace(' comments', '');
        console.log(title);
        dataSet.title = title;
        dataSet.date = newsTime;
        dataSet.comments = comments;
        archiveSet.push(dataSet);
    });
    return archiveSet;
}

function archive(year, month) {
    return getArchiveContent(archiveDest(year,month));
}

async function test(){
    let json= await archive('2020','march');
    console.log(JSON.stringify(json));
}

test();
//module export for router using and module package.
module.exports.archive = archive;