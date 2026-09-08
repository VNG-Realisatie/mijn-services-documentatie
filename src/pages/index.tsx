import type {ReactNode} from 'react';
import Head from '@docusaurus/Head';
import {Redirect} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Home(): ReactNode {
  const targetUrl = useBaseUrl('/initiatieven/mijn-services');
  return (
    <>
      <Head>
        <meta httpEquiv="refresh" content={`0; url=${targetUrl}`} />
      </Head>
      <Redirect to={targetUrl} />
    </>
  );
}
