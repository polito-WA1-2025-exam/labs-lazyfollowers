// src/pages/PokeCreationPage.jsx
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PokeTable } from "@/components/poke/PokeTable";
import { DraftOrder } from "@/components/poke/DraftOrder";
import { CreatePokeModal } from "@/components/poke/CreatePokeModal";
import usePokeStore from "@/store/usePokeStore";
import { usePokeService } from "@/services/usePokeService";

export default function PokeCreationPage() {
  const { orders, draftOrder, setCreateModalOpen } = usePokeStore();
  const { fetchOrders, loading, error } = usePokeService();

  // useEffect(() => {
  //   fetchOrders();
  // }, [fetchOrders]);

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Poke Bowl Creation</h1>
        <Button onClick={() => setCreateModalOpen(true)}>
          Create New Poke Bowl
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
          {loading ? (
            <div className="text-center py-8">Loading orders...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              Error loading orders: {error}
            </div>
          ) : (
            <PokeTable orders={orders} />
          )}
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Current Draft</h2>
          <DraftOrder draftOrder={draftOrder} />
        </div>
      </div>

      <CreatePokeModal />
    </div>
  );
}

// export default {
//     path: "/",
//     element: <PokeCreationPage />,
//     loader: () => fetchOrders(),
//   };
