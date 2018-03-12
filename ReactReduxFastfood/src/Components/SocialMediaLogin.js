import React from 'react';
import '../Styles/bootstrap-social.css';

const SocialMediaLogin = (props) => {
  const { googleLogin } = props;
  return (
    <div className="container mt-1">
      <button type="button" className="btn btn-social btn-google col-sm-12" onClick={googleLogin}>
        <span className="fa fa-google" /> <span className='social'>Sign in with Google</span>
      </button>
    </div>
  );
};

export default SocialMediaLogin;
