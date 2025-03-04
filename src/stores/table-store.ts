import { create } from 'zustand';

type Store = {
    tableActionUsed: boolean;
    setTableActionUsed: (tableActionUsed: boolean) => void;
};

const useTableStore = create<Store>((set) => ({
    tableActionUsed: false,
    setTableActionUsed: (tableActionUsed) => set((state) => ({ ...state, tableActionUsed })),
}));

export default useTableStore;