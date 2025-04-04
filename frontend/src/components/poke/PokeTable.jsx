import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export function PokeTable({ orders }) {
    if (!orders || orders.length === 0) {
        return <div className="text-center py-8 text-gray-500">No orders yet</div>;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Base</TableHead>
                    <TableHead>Portion</TableHead>
                    <TableHead>Proteins</TableHead>
                    <TableHead>Ingredients</TableHead>
                    <TableHead>Created At</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map((order, key) => (
                    <TableRow key={"order_table" + key + order.id}>
                        <TableCell className="font-medium">{order.order_id}</TableCell>
                        <TableCell>{order.base}</TableCell>
                        <TableCell>{order.portion}</TableCell>
                        <TableCell>{order.protein}</TableCell>
                        <TableCell>
                            {order?.ingredients?.map((ing) => (
                                <Badge key={ing.id} variant="outline" className="mr-1">
                                    {ing.name}
                                </Badge>
                            ))}
                        </TableCell>
                        <TableCell>{format(new Date(order?.createdAt ?? null), 'MMM dd, yyyy')}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
