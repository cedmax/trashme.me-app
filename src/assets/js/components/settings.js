import React from 'react';
import Toggle from 'material-ui/Toggle';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ChipInput from 'material-ui-chip-input';
import { saveSettings, quit, getSetting, saveShortcut } from 'js/actions';
import { availableShortcuts } from 'js/config';
import { Tabs, Tab } from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';

export default class NavMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shortcut: getSetting('shortcut')
    };
    this.saveSettings = this.saveSettings.bind(this);
    this.saveShortcut = this.saveShortcut.bind(this);
  }

  saveSettings(setting){   
    return (e, value) => {
      saveSettings(setting, value);
      this.forceUpdate();
      this.props.settingsUpdated();
    };
  }

  shortCutState(shortcut){
    this.setState({
      shortcut
    });
  }

  saveShortcut(e){
    this.saveSettings('shortcut')(e, this.state.shortcut);
    saveShortcut(this.state.shortcut);
  }

  render() {
    return (
      <Tabs>
        <Tab label="Settings" >
          <List>
            <ListItem
              primaryText="Copia l'url di youtube"
              secondaryText="invece di quello di TrashMeme"
              rightToggle={<Toggle toggled={getSetting('copyYoutubeUrl')} onToggle={this.saveSettings('copyYoutubeUrl')} />}
            />
            <ListItem
              primaryText="Mostra solo le risposte veloci"
              secondaryText="invece di tutti i video disponibili"
              rightToggle={<Toggle toggled={getSetting('quick')} onToggle={this.saveSettings('quick')} />}
            />
            <Divider />
            
            <ListItem
              primaryText="Quit"
              onClick={quit}
            />
            <Divider />
          </List>
        </Tab>
        <Tab label="Shortcut">
          <List>
            <ListItem>
              <ChipInput
                style={{width:'100%'}}
                defaultValue={this.state.shortcut} 
                dataSource={availableShortcuts}
                onChange={this.shortCutState.bind(this)}
              />
              <RaisedButton onClick={this.saveShortcut} label="Save" primary={true} />
            </ListItem>
          </List>
        </Tab>
      </Tabs>
    );
  }
}