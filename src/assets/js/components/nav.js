import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import Icon from 'material-ui/svg-icons/action/view-list';
import CloseIcon from 'material-ui/svg-icons/navigation/close';

export default class Nav extends React.Component {
  render() {
    const {
      open,
      toggleOpen
    } = this.props;


    let drawerContent;
    if ( open ) {
      drawerContent = this.props[open];
    }

    return <div>
      <AppBar
        iconElementLeft={
          <IconButton
            onClick={ toggleOpen('list') }
          >
            <Icon />
          </IconButton>
        }
        iconElementRight={
          <IconButton
            onClick={ toggleOpen('settings') }
          >
            <SettingsIcon />
          </IconButton>
        }
        title="TrashMeme"
      />
      <Drawer
        width={ document.body.clientWidth - 100 }
        docked={ false }
        onRequestChange={ toggleOpen() }
        open={ !!open }
        containerStyle={{top:'10px'}}
      >
        <AppBar
          showMenuIconButton={ false }
          iconElementRight={
            <IconButton
              onClick={ toggleOpen() }
            >
              <CloseIcon />
            </IconButton>
          }
          title="TrashMeme"
        />
        { drawerContent }
      </Drawer>
    </div>;
  } 
}