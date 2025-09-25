import {
	lazy,
	LocationProvider,
	ErrorBoundary,
	Router,
	Route,
} from "preact-iso";

const Home = lazy(() => import("$/routes/home.tsx"));
// import About from './routes/about.tsx';
// const Raw = lazy(() => import("./routes/raw.tsx"));
// const NotFound = lazy(() => import('./routes/_404.tsx'));
// const ErrorPage = lazy(() => import('./routes/_error.tsx'));

const App = () => (
	<LocationProvider scope="/app">
		<ErrorBoundary onError={(e) => console.error(e)}>
			<Router>
				<Route path="/" component={Home} />
				{/* <Route path='/about' component={About} /> */}
				{/* <Route path='/raw' component={Raw} /> */}
				{/* <Route path='/error' component={ErrorPage} /> */}
				{/* <NotFound default /> */}
			</Router>
		</ErrorBoundary>
	</LocationProvider>
);

export default App;
