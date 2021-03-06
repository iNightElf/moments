import { useState, useEffect } from 'react';
import { GraphQLClient } from 'graphql-request';

export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://live2live.herokuapp.com/graphql'
    : 'http://localhost:4000/graphql';

export const useClient = () => {
  const [tokenId, setTokenId] = useState('');

  useEffect(() => {
    const token = window.gapi.auth2
      .getAuthInstance()
      .currentUser.get()
      .getAuthResponse().id_token;
    setTokenId(token);
  }, []);

  return new GraphQLClient(BASE_URL, {
    headers: { authorization: tokenId }
  });
};
