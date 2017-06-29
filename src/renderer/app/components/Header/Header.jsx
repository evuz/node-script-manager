import React from 'react';
import { Icon } from 'semantic-ui-react';

import './Header.css';

const HeaderComponent = (props) => (
  <div className="header_component">
    <div className="header">
      <h1 className="title">
        {props.name ? dashToCaps(props.name) : 'Node Script Manager'}
      </h1>
      {
        props.description ?
          <h4 className="subtitle">{props.description}</h4> :
          null
      }
    </div>
    <Icon name="grid layout" size="large" className="hide" />
  </div>
);

function dashToCaps(str) {
  return str.split('-').join(' ').replace(/\b\w/g, l => l.toUpperCase())
}

export default HeaderComponent;
