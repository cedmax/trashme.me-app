import React from 'react';
import ReactDOM from 'react-dom';
import DesktopApp from 'js/desktop/main';
import ClipBoard from 'clipboard';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

function getAvailableDropDownSpace() {
  return document.body.clientHeight - 200;
}

new ClipBoard( '.trashme' );

function startApp(){
  const data = window.data;

  if (data){
    ReactDOM.render(
      <DesktopApp 
        data={data}
        dropDownHeight={ getAvailableDropDownSpace() } />,
      document.getElementById('app')
    );
  } else {
    setTimeout(startApp, 100);
  } 
}

startApp();
