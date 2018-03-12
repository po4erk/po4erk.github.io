import React from 'react';
import PlaceCard from './PlaceCard';

const Comment = props => (
  <div className="mt-3">
    <PlaceCard>
      {props.children}
    </PlaceCard>
  </div>
);

export default Comment;
