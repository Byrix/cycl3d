import { type ModalState } from '$/shared/modal.store';
import { NavInfoModal } from './NavInfo';

const Conductor = ({ modalState }: { modalState: ModalState }) => {
  return (
    <div class='z-100 w-1 h-1 relative top-0 left-0'>
      <NavInfoModal modalSig={modalState.modals.$navInfo} />
    </div>
  );
}

export { Conductor as ModalConductor };
