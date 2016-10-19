const menubar = require('menubar');
const _ = require('lodash');
const open = require('open');
const request = require('request');
const cheerio = require('cheerio');
const electron = require('electron');
const Settings = require('electron-settings');

var data;
var settings = {
  copyYoutubeUrl: false,
  quick: true, 
  mute: false,
  shortcut: ['Super', 'Alt', 'Space']
};

var mb = menubar({
  dir: __dirname,
  preloadWindow: true,
  height: 410,
  transparent: true
});

Settings.defaults({
  appSettings: settings
});


function setShortcut(shortcut) {
  electron.globalShortcut.register(shortcut.join('+'), function(){
    mb.window.isVisible() ? mb.window.hide() : mb.window.show();
    mb.positioner.move('trayCenter', mb.tray.getBounds() );
  });
}

Settings.get('appSettings').then((val) => {
  settings = _.extend(settings, val);
  setShortcut(settings.shortcut);
});

function arrangeData(data) {
  const hidden = _.mapValues(data.r.videos, (video)=>_.extend(video, {category: 'hidden', title: video.title.replace(/(\(.*\))/, '')}));
  const categories = _.transform(_.mapValues(data.categories, 'videos'), (result, value, key)=>{
    value = _.mapValues(value, (video)=>_.extend(video, { category:key }));
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
      mb.window.webContents.executeJavaScript(`window.data = ${arrangeData(data)};window.settings = ${JSON.stringify(settings)};`);
    }
  });  
}); 

mb.on('after-create-window', ()=>{
  var html = mb.window.webContents;
  
  html.executeJavaScript('document.getElementById("search") && document.getElementById("search").focus();');

  // html.openDevTools({
  //   mode:'detach'
  // });

  html.on('dom-ready', () => {
    if (data) {
      html.executeJavaScript(`window.data = ${arrangeData(data)};window.settings = ${JSON.stringify(settings)};`);
    }
  });
});

electron.ipcMain.on('save-settings', (event, appSettings) => {
  Settings.set('appSettings', appSettings);
});

electron.ipcMain.on('new-shortcut', (event, shortcut) => {
  electron.globalShortcut.unregisterAll();
  setShortcut(shortcut);
});

electron.ipcMain.on('mute', (event, muted) => {
  electron.webContents.getFocusedWebContents().setAudioMuted(muted);
});
