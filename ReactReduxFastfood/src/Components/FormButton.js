import React from 'react';
import '../Styles/App.css';

const FormButton = (props) => {
  const {
    submitLabel, otherLabel, goToLink, history,
  } = props;
  return (
    <div className="container">
      <button type="submit" className="btn btn-primary col-sm-12 mt-1">{submitLabel}</button>
      <button
        type="button"
        className="btn btn-info col-sm-12 mt-1"
        onClick={() => {
        history.push(goToLink);
      }}
      >{otherLabel}
      </button>
    </div>
  );
};

export default FormButton;
