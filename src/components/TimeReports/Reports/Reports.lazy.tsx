import React, { lazy, Suspense } from 'react';

const LazyTimeReports = lazy(() => import('./Reports.component'));

const Reports = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTimeReports {...props} />
  </Suspense>
);

export default Reports;
