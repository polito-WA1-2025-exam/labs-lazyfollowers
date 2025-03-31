import { create } from 'zustand';

const usePokeStore = create((set) => ({
    orders: [],
    draftOrder: {
        base: '',
        protein: '',
        portion: 'regular',
        ingredients: [],
    },
    isCreateModalOpen: false,

    setOrders: (orders) => set({ orders }),
    setDraftOrder: (draftOrder) => set({ draftOrder }),
    updateDraftOrder: (field, value) => set((state) => ({
        draftOrder: { ...state.draftOrder, [field]: value }
    })),
    addIngredient: (ingredient) => set((state) => ({
        draftOrder: {
            ...state.draftOrder,
            ingredients: [...state.draftOrder.ingredients, ingredient]
        }
    })),
    removeIngredient: (ingredientId) => set((state) => ({
        draftOrder: {
            ...state.draftOrder,
            ingredients: state.draftOrder.ingredients.filter(i => i.id !== ingredientId)
        }
    })),
    resetDraftOrder: () => set({
        draftOrder: {
            base: '',
            protein: '',
            portion: 'regular',
            ingredients: [],
        }
    }),
    setCreateModalOpen: (isOpen) => set({ isCreateModalOpen: isOpen }),
}));

export default usePokeStore;