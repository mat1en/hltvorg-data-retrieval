const https = require('https');
const cheerio = require('cheerio');
let dest='https://www.hltv.org/news/archive/2019/january';

https.get(dest,function(res){
    let html='';
    res.on('data',function(data){
        html+=data;
    });
    res.on('end',function(){

        getArchiveContent(html);
        console.log('end');
    })
}).on('error',function(){
    console.log('error');
});

function getArchiveContent(html){
    let $=cheerio.load(html);
    let indexList=$('.standard-box .article');
    let dataSet=[];
    indexList.each(function (){
        let newsData=[];
        let title=$(this).find('.newstext').text();
        let etc = $(this).find('.newstc');
        let newsTime=etc.find('.newsrecent').text().trim();
        console.log(title);
        console.log(newsTime);
        dataSet.push(title);
        dataSet.push(newsTime);
    });
}