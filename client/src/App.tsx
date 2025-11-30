import {
  ErrorBoundary,
  LocationProvider,
  lazy,
  Route,
  Router,
} from "preact-iso";

const Home = lazy(() => import("$/routes/home.tsx"));

import Contact from "./routes/contact.tsx";

// const Raw = lazy(() => import("./routes/raw.tsx"));
// const NotFound = lazy(() => import('./routes/_404.tsx'));
// const ErrorPage = lazy(() => import('./routes/_error.tsx'));

const App = () => (
  <LocationProvider scope="/app">
    <ErrorBoundary onError={(e) => console.error(e)}>
      <Router>
        <Route path="/app/" component={Home} />
        <Route path="/app/contact/" component={Contact} />
        {/* <Route path='/raw' component={Raw} /> */}
        {/* <Route path='/error' component={ErrorPage} /> */}
        {/* <NotFound default /> */}
      </Router>
    </ErrorBoundary>
  </LocationProvider>
);

export default App;
