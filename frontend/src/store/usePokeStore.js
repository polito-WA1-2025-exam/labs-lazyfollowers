import { create } from 'zustand';
import { persist } from 'zustand/middleware'

const state = (set) => ({
    bases: [],
    ingredients: [],
    proteins: [],
    portions: [],

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
    setBases: (bases) => set({ bases: bases }),
    setIngredients: (ingredients) => set({ ingredients: ingredients }),
    setProteins: (proteins) => set({ proteins: proteins }),
    setPortions: (portions) => set({ portions: portions }),

});

export const usePokeStore = create()(
    persist(
        state,
        {
            name: 'poke-store', // name of the item in the storage (must be unique)
        },
    ),
)
export default usePokeStore;