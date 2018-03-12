import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/es/Link';
import PlaceCard from '../Components/PlaceCard';
import SubmitComment from './SubmitComment';
import _ from 'lodash';
import Comment from '../Components/Comment';
import { deleteComment, updatePlace } from '../Actions/PlaceActions';
import { storage } from '../Firebase';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import {withGoogleMap,GoogleMap,Marker} from "react-google-maps";


class PlaceDetail extends Component {
  constructor(props) {
    super(props);

    const { place } = this.props;
    this.state = {
      imageUrl: null,
      nameEditorValue: place.name,
      infoEditorValue: place.info,
      addressEditorValue: place.address,
      showNameEditor: false,
      showAddressEditor: false,
      showInfoEditor: false,
      latlng: {}
    };
    this.onChange = (addressEditorValue) => this.setState({ addressEditorValue });
  }

  

  setImageUrl() {
    const { match } = this.props;
    const placeId = match.params.id;
    
    storage.ref(placeId).getDownloadURL()
      .then(url => this.setState({
        imageUrl: url
      }));
  }

  componentDidMount() {
    this.setImageUrl();
    this.handleFormSubmit();
  }
 
  renderComments() {
    const { place, match } = this.props;
    const placeId = match.params.id;
    return _.map(place.comments, (comment, key) => (
      <Comment key={key} id={key}>
        <h3>{comment.name}</h3>
        <p className="commentText">{comment.comment}</p>
        <strong>Rating: {comment.rating}</strong>
        <button className="btn btn-danger float-right" onClick={() => this.props.deleteComment(placeId, key)}>Delete</button>
      </Comment>
    ));
  }

  handleFormSubmit = () => {
    const { place } = this.props;
    geocodeByAddress(place.address)
      .then(results => getLatLng(results[0]))
      .then(LatLng => this.setState({latlng: LatLng}))
      .catch(error => console.error('Error', error))
  }

  nameChanged(){
    const { match } = this.props;
    return(
      <div>
        <input
          className="form-control inputDetail inputTitle" 
          type="text" 
          value={this.state.nameEditorValue} 
          onChange={(event) => this.setState({ nameEditorValue: event.target.value })} />
        <button className="btn btn-success buttonDetail" onClick={() => {
          this.props.updatePlace(match.params.id, { name: this.state.nameEditorValue });
          this.setState({
            showNameEditor: false
          })
        }}>Save</button>
        <button className="btn btn-danger buttonDetail" onClick={() => this.setState({ showNameEditor: false })}>Cancel</button>
      </div>
    )
  }

  addressChanged(){
    const { match } = this.props;
    const inputProps = {
      value: this.state.addressEditorValue,
      onChange: this.onChange,
    }
    return(
      <div className="addressDetail">
          <PlacesAutocomplete inputProps={inputProps}/>
          <button type='button' className="btn btn-success buttonDetail" onClick={() => {
            this.props.updatePlace(match.params.id, { address: this.state.addressEditorValue })
            .then(() => this.handleFormSubmit());
            this.setState({
              showAddressEditor: false
            });
          }}>Save</button>
        <button className="btn btn-danger buttonDetail" onClick={() => this.setState({ showAddressEditor: false })}>Cancel</button>
      </div>
    )
  }

  infoChanged(){
    const { match } = this.props;
    return(
      <div>
        <textarea
          className="form-control textareDetails"
          type="text"
          placeholder = "Enter new info:"
          onChange={(event) => this.setState({ infoEditorValue: event.target.value })} />
        <button className="btn btn-success buttonDetail" onClick={() => {
          this.props.updatePlace(match.params.id, { info: this.state.infoEditorValue });
          this.setState({
            showInfoEditor: false
          })
        }}>Save</button>
        <button className="btn btn-danger buttonDetail" onClick={() => this.setState({ showInfoEditor: false })}>Cancel</button>
      </div>
    )
  }

  uploadImage(event) {
    const { match } = this.props;
    const placeId = match.params.id;
    const file = event.target.files[0];
    storage.ref(placeId).put(file).then(() => this.setImageUrl());
  }

  render() {
    const { place, match } = this.props;
    const MapWithAMarker = withGoogleMap(props =>
      <GoogleMap defaultZoom={15} defaultCenter={this.state.latlng}>
        <Marker position={this.state.latlng} />
      </GoogleMap>
    );
    const imgStyle = {
      width: '350px',
      height: '350px',
      marginLeft: "-15px",
    };
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm-7">
              <PlaceCard>
                <div className='row'>
                  {(
                    this.state.showNameEditor ? 
                    this.nameChanged() : 
                    <h1 className="place-title col-sm-10" onClick={() => 
                      this.setState({showNameEditor: true })}>
                      {place.name}
                    </h1>
                  )}
                  <Link to="/" className="btn btn-primary col-sm-2 gohome-button">
                    Go home
                  </Link>
                </div>
                {(
                  this.state.showAddressEditor ? 
                  this.addressChanged() : 
                  <p className="place-address" onClick={() => 
                    this.setState({showAddressEditor: true })}>
                    {place.address}
                  </p>
                )}
                <div className="row">
                  <div className="col-sm-7">
                    <img alt="" src={this.state.imageUrl} id="image" style={imgStyle} />
                    <div className="form-group row">
                      <input
                        type="file"
                        className="form-control"
                        onChange={(event) => { this.uploadImage(event); }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-5">
                  {(
                    this.state.showInfoEditor ? 
                    this.infoChanged() : 
                    <div className="place-info" onClick={() => 
                      this.setState({showInfoEditor: true })}>
                      <h4>Information about this place:</h4>
                        {place.info}
                    </div>
                  )}
                  </div>
                </div>
              </PlaceCard>
              <MapWithAMarker
                containerElement={<div style={{ height: `600px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            </div>
            <div className="col-sm-5">
              <PlaceCard>
                <SubmitComment id={match.params.id} />
              </PlaceCard>
              <PlaceCard>
                {this.renderComments()}
              </PlaceCard>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return { place: state.places[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { deleteComment, updatePlace })(PlaceDetail);
