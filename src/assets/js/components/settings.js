import React from 'react';
import Toggle from 'material-ui/lib/Toggle';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Subheader from 'material-ui/lib/Subheader';
import Divider from 'material-ui/lib/Divider';
import IconButton from 'material-ui/lib/icon-button';
import Icon from 'material-ui/lib/svg-icons/navigation/close';
import { saveSettings, quit, getSetting } from 'js/actions';

export default class NavMenu extends React.Component {
  constructor(props) {
    super(props);

    this.saveSettings = this.saveSettings.bind(this);
  }

  saveSettings(setting){   
    return (e, value) => {
      saveSettings(setting, value);
      this.forceUpdate();
    };
  }

  render() {
    return (
      <List>
        <Subheader>
          <div style={{float:'right'}}>
          <IconButton
            onClick={this.props.closeMenu}
          >
            <Icon />
          </IconButton>
          </div>
          Settings
        </Subheader>
        <ListItem
          primaryText="Copia l'url di youtube"
          secondaryText="invece di quello di TrashMeme"
          rightToggle={<Toggle toggled={getSetting('copyYoutubeUrl')} onToggle={this.saveSettings('copyYoutubeUrl')} />}
        />
        <Divider />
        <ListItem
          primaryText="Quit"
          onClick={quit}
        />
        <Divider />
      </List>
    );
  }
}