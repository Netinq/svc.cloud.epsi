import Head from 'next/head';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const Swagger = () => {

  return (
      <div>
        <Head>
          <title>Atelier SVC Cloud</title>
          <meta name="description" content="Atelier SVC Cloud Swagger" />
          <link rel="icon" href="/favicon.svg" />
        </Head>
        <SwaggerUI url="/api/doc" />
      </div>
  );
};

export default Swagger;