import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUser } from '../Actions/UserActions';
import { getPlaces } from '../Actions/PlaceActions';
import Loading from '../Components/Loading';

class LoadingComponent extends Component {
  componentWillMount() {
    const { userLoading, placesLoading } = this.props;
    if (userLoading === undefined) {
      this.props.getUser();
    }

    if (placesLoading === undefined) {
      this.props.getPlaces();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.placesLoading === -1 && nextProps.user !== null) {
      this.props.getPlaces();
    }
  }

  render() {
    const { userLoading, placesLoading, children } = this.props;
    if ((!userLoading && !placesLoading) || (this.props.user === null)) {
      return (
        <div>
          {children}
        </div>
      );
    }

    return (
      <Loading />
    );
  }
}

function mapStateToProps(state) {
  return {
    userLoading: state.loading.user,
    placesLoading: state.loading.places,
    user: state.user,
  };
}

export default withRouter(connect(mapStateToProps, { getUser, getPlaces })(LoadingComponent));
