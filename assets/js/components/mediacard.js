import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CopyButton from 'js/components/buttons/copy';
import GifIcon from 'material-ui/lib/svg-icons/action/gif';
import Button from 'js/components/buttons/generic';
import Link from 'js/components/link';
import Video from 'js/components/video';
import VideoIcon from 'material-ui/lib/svg-icons/av/videocam';
import style from 'js/style';
import props from 'js/props';

function forceGif( props ) {
  return props.format === 'gif';
}

function getVideoTitle( props ) {
  return props.currentVideo && props.currentVideo.title;
}

export default class MediaCard extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      gif: forceGif( props )
    };
    this.toggleGif = this.toggleGif.bind( this );
  }

  toggleGif() {
    this.setState({
      gif: !this.state.gif
    });
  }

  shouldComponentUpdate( nextProps, nextState ) {
    if ( getVideoTitle( nextProps ) !== getVideoTitle( this.props )) {
      nextState.gif = forceGif( nextProps );
    }
    return true;
  }

  render() {
    const {
      currentVideo,
      disableButtons,
      style: mediaCardStyle
    } = this.props;

    let {
      url,
      gif,
      title
    } = currentVideo || {};

    if ( !url ) {
      return ( <div /> );
    }

    let cardTitle;
    let media = ( <Video videoUrl={url} /> );

    if (!disableButtons) {
      let alternateButton;
      const isGifEnabled = gif;
      const isGifVisible = this.state.gif;

      if ( isGifEnabled && !isGifVisible ) {
        alternateButton = (
          <Button
            onClick={ this.toggleGif }
            tooltip='Show the GIF instead'
            icon={ <GifIcon /> }
          />
        );
      } else if ( isGifVisible ) {
        url = gif;
        alternateButton = (
          <Button
            onClick={this.toggleGif }
            tooltip='Show the video instead'
            icon={ <VideoIcon /> }
          />
        );
        media = (
          <img
            title={ title }
            src={ url }
          />
        );
      }

      let subtitle = (
        <div
          style={ style.mediaCard.subtitle }
        >
          {alternateButton}

          <CopyButton
            toBeCopied={ url }
          />
          <Link
            url={ url }
          />
        </div>
      );

      cardTitle = (
        <CardTitle
            subtitle={ subtitle }
          />
      );
    }
    return (
      <Card
        style={ style.mediaCard[mediaCardStyle || 'container'] }
      >
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
