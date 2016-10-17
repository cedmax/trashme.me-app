import React from 'react';
import Card from 'material-ui/Card';
import { CardMedia } from 'material-ui/Card';
import Video from 'js/components/video';
import props from 'js/props';


export default class MediaCard extends React.Component {
  render() {
    const {
      currentVideo
    } = this.props;

    let {
      url
    } = currentVideo || {};

    if ( !url ) {
      return ( <div /> );
    }

    let cardTitle;
    let media = ( <Video videoUrl={url} /> );

    return (
      <Card>
        <CardMedia>
          { media }
        </CardMedia>
        { cardTitle }
      </Card>
    );
  }
}

MediaCard.propTypes = {
  style: React.PropTypes.string,
  disableButtons: React.PropTypes.bool,
  title: React.PropTypes.string,
  currentVideo: props.video,
  selected: React.PropTypes.string
};
