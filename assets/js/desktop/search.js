import React from 'react';
import UIAutocomplete from 'react-ui-autocomplete';

export default (props) => {
  const {
    data  
  } = props;
  
  return ( 
    <div>
      <h3>Search your response</h3>
      <UIAutocomplete
        options={data}
        onChange={props.onSelect}
        optionValue="key"
        optionFilter={['title', 'category']}
        suggestionUpdateInterval={20}
        suggestionMinimumInputChar={1}
        optionLabelRender={option => `${option.title}`}/>
    </div>
  );
}