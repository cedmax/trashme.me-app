import React from 'react';
import MediaCard from 'js/components/mediacard';
import AutoComplete from 'js/components/autocomplete';
import Container from 'js/components/container';
import Nav from 'js/components/nav';
import filterObject from 'filter-object';
import { getSetting } from 'js/actions';
import Settings from 'js/components/settings';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

function forceCopy(){
  setTimeout(()=>{
    const event = document.createEvent('HTMLEvents');
    event.initEvent('click', true, true);
    const target = document.querySelector('.trashme');
    target.dispatchEvent(event);
  }, 500);
}

function filter(data, quick) {
  return filterObject(data, (video)=>(quick)?video.quick:!video.quick);
}

export default class DestkopApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      key: '',
      selected: {}
    };
    this.onSelect = this.onSelect.bind(this);
  }

  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  }


  render() {
    const currentVideo = this.state.key ? this.state.selected : null;

    let btn;
    if (currentVideo) {
      const urlToCopy = getSetting('copyYoutubeUrl')?currentVideo.url:`https://trashme.me/${currentVideo.category}/${this.state.key}`;
      btn = (
        <a
          className="trashme"
          data-clipboard-text={ urlToCopy }>
        </a>
      );
      forceCopy();
    }

    return <div>
      <Nav>
        <Settings settingsUpdated={ this.forceUpdate.bind(this) } />
      </Nav>
      <Container>
        <AutoComplete
          { ...this.props }
          navigateTo={this.onSelect}
          value={ currentVideo && currentVideo.title }
          options={ filter(this.props.data, getSetting('quick') ) } />   
      </Container> 
      <MediaCard
        style="stretch"
        disableButtons={true}
        currentVideo={ currentVideo }
      />
      {btn}
    </div>;
  }

  onSelect(nouse, key) {
    const {
      data
    } = this.props;

    this.setState({
      key,
      selected: data[key]
    });
  }
}

DestkopApp.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};