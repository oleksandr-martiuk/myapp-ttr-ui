import React, { lazy, Suspense } from 'react';

const LazyTimeTracker = lazy(() => import('./TimeReports.component'));

const TimeReports = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTimeTracker {...props} />
  </Suspense>
);

export default TimeReports;
