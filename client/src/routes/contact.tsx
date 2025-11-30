import ContactCard from "$/components/contact/ContactCard";
import { ModalConductor } from "$/components/modals/ModalConductor";
import Toaster from "$/components/Toaster";
import MainLayout from "$/layouts/MainLayout.tsx";

import { modalState, useToasts } from "$/shared";

const Contact = () => {
  return (
    <MainLayout>
      <div class="flex flex-row w-full h-full">
        <Toaster toasterState={useToasts} />
        <ModalConductor modalState={modalState} />

        <div class="flex w-full flex-col lg:flex-row place-items-center justify-center">
          <ContactCard
            title="Issues"
            body="Any issues can be reported via the host Github repository."
            btnName="Report"
            btnLink="https://github.com/Byrix/cycl3d/issues"
          />
          <div class="divider lg:divider-horizontal"></div>
          <ContactCard
            title="Contact"
            body="Any general queries can be directed via email to cycl3d@seanbrooker.com"
            btnName="Contact"
            btnLink="mailto:cycl3d@seanbrooker.com"
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;
