import { ModalConductor } from "$/components/modals/ModalConductor";
import Toaster from "$/components/Toaster";
import MainLayout from "$/layouts/MainLayout.tsx";

import { modalState, useToasts } from "$/shared";

const About = () => {
  return (
    <MainLayout>
      <div class="flex flex-row w-full h-full">
        <Toaster toasterState={useToasts} />
        <ModalConductor modalState={modalState} />
        <article class="prose lg:prose-xl text-center w-full h-full p-4">
          <h1>About</h1>
          <p class="lead">Project overview here</p>
          <p>Part two</p>

          <h1>Background</h1>
          <h1>Objectives</h1>
        </article>
      </div>
    </MainLayout>
  );
};

export default About;
