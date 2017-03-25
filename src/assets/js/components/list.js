import React from 'react';
import {List, ListItem} from 'material-ui/List';

export default class Link extends React.Component {
  render() {
    const {
      data,
      navigateTo
    } = this.props;
    const keys = Object.keys(data).sort();

    return <List style={{height:'calc(100% - 100px)', overflow:'auto'}}>
      { 
        keys.map((key) => (
          <ListItem key={key} onClick={() => navigateTo(null, key)}>
            <div>{data[key].title}</div>
          </ListItem>
        ))
      }
    </List>;
  }
}
