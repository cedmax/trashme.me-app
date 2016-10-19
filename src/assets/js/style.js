import prefixAll from 'inline-style-prefix-all';

export default {
  autocomplete: {
    container: prefixAll({
      'minWidth': '250px',
      'width': '40%',
      'margin': 'auto'
    })
  },
  container: {
    main: prefixAll({
      'padding': 20,
      'textAlign': 'center',
      'display': 'block',
      'margin': 'auto'
    })
  },
  mediaCard: {
    container: prefixAll({
      'position': 'absolute',
      'top': 'calc(25% + 200px)',
      'left': '50%',
      'transform': 'translate3D(-50%,-50%,0)',
      'width': '80vmin'
    })
  },
  video: {
    container: prefixAll({
      'position': 'relative',
      'paddingBottom': '56.25%',
      'paddingTop': '25px',
      'height': '0'
    }),
    videoItem: prefixAll({
      'border': '0',
      'position': 'absolute',
      'top': '0',
      'left': '0',
      'width': '100%',
      'height': '100%'
    })
  }
};
