import React from 'react';

export default (props)=>{
  var style;
  if (props.hide){
    style = {
      visibility: 'hidden'
    };
  }
  return <div style={style}><button className={props.service} data-clipboard-text={props.value}>
    copy from {props.service}
  </button></div>;
};
