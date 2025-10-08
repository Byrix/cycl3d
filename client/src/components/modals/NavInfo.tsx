import { type Signal, useSignalEffect } from "@preact/signals";
import { useSignalRef } from '@preact/signals/utils';
import { NavigationHelpButton } from "cesium";

interface HTMLModalElement extends HTMLDialogElement {
  showModal(): void
}

export const NavInfoModal = ({ modalSig }: { modalSig: Signal<boolean> }) => {
  const modalRef = useSignalRef<HTMLModalElement>(null);
  const mouseRef = useSignalRef<HTMLDivElement>(null);
  const touchRef = useSignalRef<HTMLDivElement>(null);

  useSignalEffect(() => {
    if (!modalRef.current) return;
    if (modalSig.value) modalRef.current.showModal()
  });

  useSignalEffect(() => {
    if (!mouseRef.current || !touchRef.current) return;

    const navDiv = document.createElement('div');
    const navHelp = new NavigationHelpButton({ container: navDiv });

    const container = navHelp.container.firstChild?.lastChild;
    mouseRef.current.innerHTML = container?.querySelector('.cesium-click-navigation-help').innerHTML;
    touchRef.current.innerHTML = container?.querySelector('.cesium-touch-navigation-help').innerHTML;
    
    navDiv.remove();
  })

  return (
      <dialog ref={modalRef} id='modal-nav-info' class='modal'>
        <div class='modal-box'>
          <form method='dialog'>
            <button class='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>x</button>
          </form>
          <div class='tabs tabs-lift'>
            <input type='radio' name='nav-info-tab' class='tab' aria-label='Mouse' defaultChecked />
            <div ref={mouseRef} class='tab-content bg-base-100 border-base-300 p-6'>
              Mouse instructions
            </div>

            <input type='radio' name='nav-info-tab' class='tab' aria-label='Touch' />
            <div ref={touchRef} class='tab-content bg-base-100 border-base-300 p-6'>
              Touchscreen instructions
            </div>
          </div>
        </div>
        <form method='dialog' class='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
  );
}
