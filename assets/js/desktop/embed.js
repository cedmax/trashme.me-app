import React from 'react';

const style = {
  container: {
    'position': 'relative',
    'paddingBottom': '56.25%',
    'paddingTop': '25px',
    'height': '0'
  },
  videoItem: {
    'border': '0',
    'position': 'absolute',
    'top': '0',
    'left': '0',
    'width': '100%',
    'height': '100%'
  }
};

export default (props)=>{
  const {
    videoUrl
  } = props;
  const matches = videoUrl && videoUrl.match( /youtu.be\/([^\?]+)|v=([^\&\s]+)/ );
  const videoId = matches && matches.length && ( matches[ 1 ] || matches[ 2 ] );

  if ( !videoId ) {
    return ( <div/> );
  }

  return (
    <div
      style={ style.container }
    >
      <iframe
        style={ style.videoItem }
        src={ `https://www.youtube.com/embed/${videoId}?autoplay=1&showinfo=0&rel=0` }
        allowFullScreen="allowFullScreen"
      ></iframe>
    </div>
  );
}