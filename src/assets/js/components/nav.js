import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import Icon from 'material-ui/svg-icons/action/view-list';
import CloseIcon from 'material-ui/svg-icons/navigation/close';

export default class Nav extends React.Component {
  render() {

    let drawerContent;
    if ( this.props.open ) {
      drawerContent = this.props[this.props.open];
    }

    return <div>
      <AppBar
        iconElementLeft={
          <IconButton
            onClick={this.props.toggleOpen('list')}
          >
            <Icon />
          </IconButton>
        }
        iconElementRight={
          <IconButton
            onClick={this.props.toggleOpen('settings')}
          >
            <SettingsIcon />
          </IconButton>
        }
        title="TrashMeme"
      />
      <Drawer
        width={ document.body.clientWidth - 100 }
        docked={ false }
        onRequestChange={ this.props.toggleOpen() }
        open={ !!this.props.open }
        containerStyle={{top:'10px'}}
      >
        <AppBar
          showMenuIconButton={false}
          iconElementRight={
            <IconButton
              onClick={this.props.toggleOpen()}
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