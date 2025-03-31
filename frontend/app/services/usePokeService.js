import { useState, useEffect } from 'react';
import { fetchData, postData } from './api';
import usePokeStore from '../store/usePokeStore';

export function usePokeService() {
    const { setOrders, orders } = usePokeStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        return []
        setLoading(true);
        setError(null);
        try {
            const data = await fetchData('/orders');
            setOrders(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchIngredients = async () => {
        // setLoading(true);
        setError(null);
        return [
            { id: 1, name: 'Avocado' },
            { id: 2, name: 'Cucumber' },
            { id: 3, name: 'Mango' },
            { id: 4, name: 'Edamame' },
            { id: 5, name: 'Seaweed' },
            { id: 6, name: 'Green Onion' },
            { id: 7, name: 'Corn' },
            { id: 8, name: 'Crab Salad' },
        ];
        try {
            return await fetchData('/ingredients');
        } catch (err) {
            setError(err.message);
            return [];
        } finally {
            setLoading(false);
        }
    };

    const createOrder = async (orderData) => {
        setLoading(true);
        setError(null);
        try {
            const newOrder = await postData('/orders', orderData);
            setOrders([...orders, newOrder]);
            return newOrder;
        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        fetchOrders,
        fetchIngredients,
        createOrder,
        loading,
        error,
    };
}
