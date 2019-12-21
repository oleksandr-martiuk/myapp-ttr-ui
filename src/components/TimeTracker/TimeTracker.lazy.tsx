import React, { lazy, Suspense } from 'react';

const LazyTimeTracker = lazy(() => import('./TimeTracker'));

const TimeTracker = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTimeTracker {...props} />
  </Suspense>
);

export default TimeTracker;
