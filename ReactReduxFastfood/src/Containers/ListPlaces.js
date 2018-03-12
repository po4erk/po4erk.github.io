import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPlaces, addPlace, deletePlace } from '../Actions/PlaceActions';
import { Field, reduxForm, reset } from 'redux-form';
import _ from 'lodash';
import PlaceCard from '../Components/PlaceCard';
import { getUser, logout } from '../Actions/UserActions';
import Link from 'react-router-dom/es/Link';

class App extends Component {
  getRating(place) {
    const count = _.size(place.comments);
    return count ?
      Math.round(_.reduce(place.comments, (acc, value) => acc + +value.rating, 0) / count) :
      'Any rating';
  }

  renderPlaces() {
    return _.map(this.props.places, (place, key) => (
      <PlaceCard key={key}>
        <button className="btn btn-danger float-right" onClick={() => this.props.deletePlace(key)}>Delete</button>
        <Link to={`/${key}`}>
          <button className="btn btn-info float-right showMore">Show More</button>
        </Link>
        <h3 className="card-title">
          {place.name}
        </h3>
        <p className="card-text">
          {place.address}
        </p>
        <p className="card-text">
          <strong>Rating: {this.getRating(place)} </strong>
        </p>
        {/* {place.uid === this.props.user.uid && */}
        
      </PlaceCard>
    ));
  }

  renderField(field) {
    return (
      <input type="text" placeholder={`Enter a ${field.label}...`} {...field.input} className={field.class} />
    );
  }

  onSubmit(values) {
    this.props.addPlace(values, this.props.user.uid).then(this.props.dispatch(reset('NewPlace')));
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <div className="navbar"></div>
        <div className="container">
          <div className='row menu'>
            
            <div className="navbar col-sm-10">
              <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="container">
              <div className='row form-control'>
                <Field
                  name="name"
                  component={this.renderField}
                  label="Name"
                  class="header-title col-sm-3"
                />
                <Field
                  name="address"
                  component={this.renderField}
                  label="Address"
                  class="header-body col-sm-6"
                />
                <button type="submit" className="btn header-button btn-info col-sm-2">Add New</button>
              </div>
              </form>
            </div>
            <button className="btn btn-danger signOut col-sm-2" onClick={() => { this.props.logout(); }}>Sign out</button>
          </div>
            <div className="main">
              {this.renderPlaces()}
            </div>
          </div>
      </div>
    );
  }
}

const form = reduxForm({
  form: 'NewPlace',
})(App);

export default connect((state, ownProps) => ({
  places: state.places,
  user: state.user,
}), {
  addPlace, getPlaces, deletePlace, getUser, logout,
})(form);
