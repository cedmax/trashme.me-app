import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import props from 'js/props';
import style from 'js/style';

export default class BorisAutoComplete extends React.Component {
  constructor ( props ) {
    super( props );
    this.state = {
      searchText: '',
      section: props.section
    };

    this.navigateToVideo = this.navigateToVideo.bind( this );
  }

  onFocus() {
    this.setState({
      searchText: ''
    });
  }

  handleUpdateInput( text ) {
    this.setState({
      searchText: text
    });
  }

  handleSelect( text ) {
    this.handleUpdateInput( text );
    this.navigateToVideo( text );
  }

  navigateToVideo( selected ) {
    const {
      options
    } = this.props;

    const keys = Object.keys( options );
    const sel = keys.filter(( key ) => options[ key ].title === selected );
    if ( sel.length ) {
      this.props.navigateTo( this.props.section, sel[ 0 ] );
    }
  }

  render() {
    const {
      options,
      value
    } = this.props;

    let placeHolder = value ?
      value :
      `Prova con "${options[ Object.keys( options )[ 0 ]].title}"`;

    if (placeHolder.length>60){
      placeHolder = placeHolder.substr(0,60)+'...';
    }

    let menuProps;
    if ( this.props.dropDownHeight ) {
      menuProps = {
        maxHeight: this.props.dropDownHeight
      };
    }

    return (
      <div
        style={ style.autocomplete.container }
      >
        <AutoComplete
          dataSource={ Object.keys( options ).map( item => options[ item ].title ).sort() }
          menuProps={ menuProps }
          openOnFocus={ false }
          hintText={ placeHolder }
          onUpdateInput={ this.handleUpdateInput.bind( this ) }
          onClick={ this.onFocus.bind(this) }
          onNewRequest={ this.handleSelect.bind( this ) }
          filter={ AutoComplete.caseInsensitiveFilter }
          id="search"
          searchText={ this.state.searchText }
        />
      </div>
    );
  }
}

BorisAutoComplete.propTypes = {
  options: React.PropTypes.objectOf( props.video ).isRequired,
  navigateTo: React.PropTypes.func.isRequired,
  section: React.PropTypes.string,
  value: React.PropTypes.string,
  dropDownHeight: React.PropTypes.number
};
