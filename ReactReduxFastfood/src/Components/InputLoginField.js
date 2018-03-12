import React from 'react';

function isVowel(char) {
  return /^[aeiou]$/.test(char.toLowerCase());
}
const InputLoginField = props => (
  <div className="form-group row">
    <label htmlFor={props.id} className="col-sm-2 col-form-label"><strong>{props.label}</strong></label>
    <div className="col-sm-10">
      <input
        onChange={props.inputAction}
        type={props.type}
        id={props.id}
        className="form-control"
        placeholder={`Enter ${isVowel(props.label[0]) ? 'an' : 'a'} ${props.label}...`}
        style={props.style}
      />
    </div>
  </div>
);
export default InputLoginField;
