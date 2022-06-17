import React, { Suspense } from "react";
import ErrorBound from "./ErrorBound";

const ClassDemo = React.lazy(() => import("./ClassDemo"));
const OtherComponent = React.lazy(() => import('./OtherComponent'))

export default function ReactLazyDemo() {
  return (
    <div>
      <p>非懒加载组件</p>
      <ErrorBound>
        <Suspense fallback={<p>loading....</p>}>
            <OtherComponent />
            <ClassDemo />
        </Suspense>
      </ErrorBound>
    </div>
  );
}
