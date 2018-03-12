import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import { errStyle, required } from '../Helpers/ReduxFormValidation';
import { saveComment } from '../Actions/PlaceActions';

class SubmitComment extends Component {
  commentName(field) {
    const { meta: touched, error } = field;
    return (
      <div className='col-sm-8 inputName'>
        <input type="text" placeholder="Enter your name:" className="form-control" style={touched && error ? errStyle : null} {...field.input} />
      </div>
    );
  }
  commentArea(field) {
    const { meta: touched, error } = field;
    return (
      <div>
        <textarea className="form-control textarea" placeholder="Enter your comment about this place:" style={touched && error ? errStyle : null} {...field.input} />
      </div>
    );
  }
  commentRating(field) {
    const { meta: touched, error } = field;
    return (
      <div className="col-sm-4">
        <select className="form-control" style={touched && error ? errStyle : null} {...field.input} >
          <option>Rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
    );
  }

  onSubmit(values) {
    const {
      saveComment, id, uid, dispatch
    } = this.props;
    saveComment(id, values, uid).then(() => {
      dispatch(reset('SubmitCommentForm'));
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        
        <div className="container">
        <h3>Your comments</h3>
          <div className="row">
            <Field
              name="name"
              component={this.commentName}
              validate={required}
            />
            <Field
              name="rating"
              component={this.commentRating}
              validate={required}
            />
          </div>
        <Field
          name="comment"
          component={this.commentArea}
          validate={required}
        />
        <button type="submit" className="btn btn-info btn-small mt-1">Send</button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return { uid: state.user.uid };
}

export default reduxForm({
  form: 'SubmitCommentForm',
})(connect(mapStateToProps, { saveComment })(SubmitComment));
