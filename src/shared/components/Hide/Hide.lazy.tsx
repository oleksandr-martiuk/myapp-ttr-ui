import React, { lazy, Suspense } from 'react';

const LazyHide = lazy(() => import('./Hide'));

const Hide = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyHide {...props} />
  </Suspense>
);

export default Hide;
