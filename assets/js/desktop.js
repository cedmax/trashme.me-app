import React from 'react';
import ReactDOM from 'react-dom';
import DesktopApp from 'js/desktop/main';
import ClipBoard from 'clipboard';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const data = window.data;

function getAvailableDropDownSpace() {
  return document.body.clientHeight - 200;
}

ReactDOM.render(
  <DesktopApp 
    data={data}
    dropDownHeight={ getAvailableDropDownSpace() } />,
  document.getElementById('app')
);

new ClipBoard( '.trashme' );
