import React, { Component } from 'react';

//Input: Liked boolean
//out

class Like extends Component {
  render() {
    let classes = 'fa fa-heart';
    if (!this.props.liked) classes += '-o';
    return (
      <i
        className={classes}
        aria-hidden="true"
        onClick={this.props.onClick}
        style={{ cursor: 'pointer' }}
      />
    );
  }
}

export default Like;