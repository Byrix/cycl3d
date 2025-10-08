import { deepSignal } from 'deepsignal';

export type ModalSignal = {
  name: string;
  show: boolean;
}
export type ModalState = {
  modals: Record<string, boolean>;
  reset: () => void;
  enable: (name: string) => void;
}

const modalState = deepSignal<ModalState>({
  modals: {
    navInfo: false,
  },
  reset: () => {
    Object.keys(modalState.modals).map((key: string) => {
      modalState.modals[key] = false;
    });
  },
  enable: (name: string) => {
    console.debug(`Enabling modal ${name}`)
    modalState.reset();
    modalState.modals[name] = true;
  }
});

export { modalState };

