import React from 'react';
import MediaCard from 'js/components/mediacard';
import AutoComplete from 'js/components/autocomplete';
import Container from 'js/components/container';
import AppBar from 'material-ui/lib/app-bar';

function forceCopy(){
  setTimeout(()=>{
    const event = document.createEvent('HTMLEvents');
    event.initEvent('click', true, true);
    const target = document.querySelector('.trashme');
    console.log('date');
    target.dispatchEvent(event);
  },500);
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

  render() {
    const currentVideo = this.state.key ? this.state.selected : null;

    let btn;
    if (currentVideo) {
      const urlToCopy = `https://trashme.me/${currentVideo.category}/${this.state.key}`;
      btn = (
        <a
          className="trashme"
          data-clipboard-text={ urlToCopy }>
        </a>
      );
      forceCopy();
    }

    return <div>
        <AppBar
          showMenuIconButton={false}
          title="TrashMeme"
        />
      <Container>
        <AutoComplete
          { ...this.props }
          navigateTo={this.onSelect}
          value={ currentVideo && currentVideo.title }
          options={ this.props.data } />   
      </Container> 
      <MediaCard
        style="stretch"
        disableButtons={true}
        currentVideo={ currentVideo }
      />
      {btn}
    </div>
    ;
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