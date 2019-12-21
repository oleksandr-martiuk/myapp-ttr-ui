import React, { lazy, Suspense } from 'react';

const LazyTimeReports = lazy(() => import('./TimeReports'));

const TimeReports = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTimeReports {...props} />
  </Suspense>
);

export default TimeReports;
