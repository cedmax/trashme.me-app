var menubar = require('menubar');
var _ = require('lodash');
var open = require('open');
var request = require('request');
var cheerio = require('cheerio');

var data;
var mb = menubar({
  dir: __dirname,
  preloadWindow: true
});

function arrangeData(data) {
  const hidden = _.mapValues(data.r.videos, (video)=>_.extend(video, {category: 'hidden'}));
  const categories = _.transform(_.mapValues(data.categories, 'videos'), (result, value, key)=>{
    value = _.mapValues(value, (video)=>_.extend(video, {category:key}));
    _.extend(result, value);
  });

  return JSON.stringify(_.extend(hidden,categories));
}

mb.on('ready', function ready () {
  request('https://trashme.me', (err, res)=>{
    var $ = cheerio.load(res.body);
    data = JSON.parse($('#data').html());
    if (mb.window && mb.window.webContents){
      mb.window.webContents.on('new-window', function(event, url){
        event.preventDefault();
        open(url);
      });
      mb.window.webContents.executeJavaScript(`window.data = ${arrangeData(data)};`);
    }
  });  
}); 

mb.on('after-create-window', ()=>{
  var html = mb.window.webContents;

  html.on('dom-ready', () => {
    if (data) {
      html.executeJavaScript(`window.data = ${arrangeData(data)};`);
    }
  });
});

// mb.on('after-hide', ()=>{
//   mb.window.reload();
// });
