import { CesiumMap } from "$/components/cesium";
import { Sidebar } from "$/components/sidebar";
import Toaster from "$/components/Toaster";
import MainLayout from "$/layouts/MainLayout.tsx";

import { useToasts } from "$/shared/toasts.store";

const Home = () => {
	return (
		<MainLayout>
			<div class="flex flex-row w-full h-full">
				<Toaster toasterState={useToasts} />
				<Sidebar />
				<CesiumMap />
			</div>
		</MainLayout>
	);
};

export default Home;
