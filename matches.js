const cheerio = require('cheerio');
const sendRequest = require('./sendRequest');

function matchesDest() {
    // if the route url has been changed, the root url should be updated to send the request.
    // this situation may happen, for all routes in hltv.org.
    return 'https://www.hltv.org/matches';
}

// testing, waiting for implement.
// function resolveCurrentContent(html, dataSet) {
//     let $ = cheerio.load(html);
//     let liveList = $('.live-match .standard-box');
//     let dataUnit = {};
//     dataUnit.teams=[];
//     let team={
//         name:'',
//         score:{}
//     };
//     liveList.each(function () {
//         dataUnit.eventName=$(this).find('.event-name').text().trim();
//         dataUnit.bestOf=$(this).find('.bestof').text();
//         let teamList=$('.teams',this);
//         dataUnit.teams.push();
//         dataSet.push(dataUnit);
//     });
// }
function resolveUpcomingContent(html, dataSet) {
    let $ = cheerio.load(html);
    let liveList = $('.live-match .standard-box');
    let dataUnit = {};
    dataUnit.teams=[];
    let team={
        name:'',
        score:{}
    };
    liveList.each(function () {
        dataUnit.eventName=$(this).find('.event-name').text().trim();
        dataUnit.bestOf=$(this).find('.bestof').text();
        let teamList=$('.teams',this);
        dataUnit.teams.push();
        dataSet.push(dataUnit);
    });
}

function matches(year, month) {
    return sendRequest.getDataByRequest(matchesDest(year, month),resolveMatchContent);
}

module.exports.matches = matches;