import React, { Component } from 'react';
import SimpleBox from '../Components/SimpleBox';
import InputLoginField from '../Components/InputLoginField';
import FormButton from '../Components/FormButton';
import { login, getUser, googleLogin } from '../Actions/UserActions';
import { connect } from 'react-redux';
import ErrorAlert from '../Components/ErrorAlert';
import SocialMediaLogin from '../Components/SocialMediaLogin';
import { errStyle } from '../Helpers/ReduxFormValidation';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
    };
  }

  componentWillMount() {
    if (this.props.user !== null) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== null) {
      nextProps.history.push('/');
    }
  }


  submitLogin(event) {
    event.preventDefault();
    this.props.login(this.state.email, this.state.password).catch((err) => {
      this.setState({
        error: err,
      });
    });
  }

  renderBody() {
    return (
      <form onSubmit={(event) => { this.submitLogin(event); }}>
        <div>
          <InputLoginField
            id="email"
            type="text"
            label="Email"
            inputAction={event => this.setState({ email: event.target.value })}
            style={this.state.error ? errStyle : null}
          />
          <InputLoginField
            id="password"
            type="password"
            label="Password"
            inputAction={event => this.setState({ password: event.target.value })}
            style={this.state.error ? errStyle : null}
          />
          {this.state.error && <ErrorAlert>Your username/password is incorrect</ErrorAlert>}
          <FormButton
            submitLabel="Sign in"
            otherLabel="Create Account"
            goToLink="/CreateAccount"
            {...this.props}
          />
          <SocialMediaLogin {...this.props} />
        </div>
      </form>
    );
  }

  render() {
    return (
      <div>
        <SimpleBox title="Sign in" body={this.renderBody()} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return { user: state.user };
}

export default connect(mapStateToProps, { login, getUser, googleLogin })(Login);
