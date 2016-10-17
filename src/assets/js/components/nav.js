import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/svg-icons/navigation/close';

export default class Nav extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      openMenu: false
    };
    this.handleToggleMenu = this.handleToggleMenu.bind( this );
  }

  handleToggleMenu () {
    this.setState({ openMenu: !this.state.openMenu });
  }

  render() {

    let menu;
    if ( this.state.openMenu ) {
      menu = this.props.children;
    }

    return <div>
      <AppBar
        onLeftIconButtonTouchTap={this.handleToggleMenu}
        title="TrashMeme"
      />
      <Drawer
        width={ document.body.clientWidth }
        docked={ false }
        onRequestChange={ openMenu => this.setState({ openMenu }) }
        open={ this.state.openMenu }
        containerStyle={{top:'10px'}}
      >
      <AppBar
        iconElementLeft={
          <IconButton
            onClick={this.handleToggleMenu}
          >
            <Icon />
          </IconButton>
        }
        title="TrashMeme"
      />
      { menu }
      </Drawer>
    </div>;
  } 
}



    

    