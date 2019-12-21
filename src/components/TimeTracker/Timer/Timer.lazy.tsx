import React, { lazy, Suspense } from 'react';

const LazyTimer = lazy(() => import('./Timer'));

const Timer = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTimer {...props} />
  </Suspense>
);

export default Timer;
