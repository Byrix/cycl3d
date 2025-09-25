import type { ComponentChildren } from "preact";
import Navbar from "$/components/Navbar.tsx";

const MainLayout = ({ children }: { children: ComponentChildren }) => {
	return (
		<>
			<Navbar>
				<a href="#">Item 1</a>
				<a href="#">Item 2</a>
			</Navbar>

			<main class="w-screen grow">{children}</main>

			<footer class="footer sm:footer-horizontal bg-base-200 items-center p-4">
				<aside class="grid-flow-col items-center">
					<p>Sean Brooker s3998599</p>
				</aside>
				<nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
					<a href="/">Home</a>
					<a href="#">About</a>
					<a href={`/openapi`}>API</a>
				</nav>
			</footer>
		</>
	);
};

export default MainLayout;
