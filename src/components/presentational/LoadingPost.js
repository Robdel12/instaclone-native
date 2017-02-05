import Photo from '../presentational/Photo';
import React from 'react';

// Fake loading post for when the data is still loading
const LoadingPost = (props) => {
  let photo = {
    imageUrl: 'loading.com',
    description: 'Loading...',
    createdAt: new Date(),
  };

  let user = {
    profileImage: 'loading.com',
    name: 'Loading...',
    displayName: 'Loading...',
  };

  return <Photo photo={photo} user={user} />;
};

export default LoadingPost;
