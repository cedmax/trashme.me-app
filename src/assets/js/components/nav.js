import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import Settings from 'js/components/settings';

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
      menu = (
        <Settings {...this.props} closeMenu={this.handleToggleMenu}/>
      );
    }

    return <div>
      <AppBar
        onLeftIconButtonTouchTap={this.handleToggleMenu}
        title="TrashMeme"
      />
      <LeftNav
        width={ document.body.clientWidth }
        docked={ false }
        onRequestChange={ openMenu => this.setState({ openMenu }) }
        open={ this.state.openMenu }
      >
      { menu }
      </LeftNav>
    </div>;
  } 
}



    

    