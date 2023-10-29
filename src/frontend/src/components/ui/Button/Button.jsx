import React from 'react';
import classes from './Button.module.css'


export default function Button({ children, ...attributes }) {
    return (
      <button type="button" {...attributes}>
        {children}
      </button>
    );
  }