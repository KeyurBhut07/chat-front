import React from 'react';
import { Helmet } from 'react-helmet-async';

const Title = ({
  title = 'AK - Chat App',
  description = 'This is the chat app called AK Chat',
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default Title;
