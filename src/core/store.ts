import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type GlobalStoreState = {
  isMounted: boolean;
};

type GlobalStoreActions = {
  mount: () => void;
};

const useGlobalStore = create<GlobalStoreState & GlobalStoreActions>()(
  devtools((set) => ({
    isMounted: false,
    mount: () => {
      set(() => ({ isMounted: true }));
    },
  })),
);

export { useGlobalStore };
