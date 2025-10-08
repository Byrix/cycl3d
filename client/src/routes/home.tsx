import { CesiumMap } from "$/components/cesium";
import { Sidebar } from "$/components/sidebar";
import Toaster from "$/components/Toaster";
import MainLayout from "$/layouts/MainLayout.tsx";
import { ModalConductor } from '$/components/modals/ModalConductor';

import { useToasts, modalState } from "$/shared";

const Home = () => {
  return (
    <MainLayout>
      <div class="flex flex-row w-full h-full">
        <Toaster toasterState={useToasts} />
        <ModalConductor modalState={modalState} />
        <Sidebar />
        <CesiumMap />
      </div>
    </MainLayout>
  );
};

export default Home;
