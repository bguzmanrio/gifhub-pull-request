import React from 'react';

const inputStyle = {
  flexGrow: '1',
  marginRight: '5px'
};

const Input = ({ inputValue, handleKeyDown, handleInput }) => (
  <input
    type="text"
    className="form-control"
    placeholder="Comment with a GIF..."
    style={inputStyle}
    value={inputValue}
    onKeyDown={handleKeyDown}
    onChange={e => handleInput(e.target.value)}
  />
);

export default Input;