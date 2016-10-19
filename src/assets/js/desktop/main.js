import React from 'react';
import MediaCard from 'js/components/mediacard';
import AutoComplete from 'js/components/autocomplete';
import Container from 'js/components/container';
import Nav from 'js/components/nav';
import filterObject from 'filter-object';
import { getSetting } from 'js/actions';
import Settings from 'js/components/settings';
import List from 'js/components/list';
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
  return filterObject(data, (video)=>{
    if (quick) {
      return video.quick || video.category==='hidden';
    } else {
      return video;
    }
  });
}

export default class DestkopApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      key: '',
      selected: {},
      open: false
    };
    this.onSelect = this.onSelect.bind(this);
    this.closePanel = this.toggleOpen();
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }
  
  toggleOpen(section) {
    return () => {
      this.setState({ open: section || false  });
    };
  }

  render() {
    const currentVideo = this.state.key ? this.state.selected : null;
    const data = filter(this.props.data, getSetting('quick') );
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
      <Nav
        open={this.state.open}
        toggleOpen={this.toggleOpen.bind(this)}
        list={
          <List data={ data } navigateTo={function() {
            this.onSelect.apply(this, arguments);
            this.closePanel();
          }.bind(this)} />
        }
        settings={
          <Settings settingsUpdated={ this.forceUpdate.bind(this) } />
        } 
      />
      <Container>
        <AutoComplete
          { ...this.props }
          navigateTo={this.onSelect}
          value={ currentVideo && currentVideo.title }
          options={ data } />   
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