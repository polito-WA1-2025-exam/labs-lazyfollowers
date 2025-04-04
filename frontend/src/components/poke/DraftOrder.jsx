
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function DraftOrder({ draftOrder }) {
    const { base, protein, portion, ingredients } = draftOrder;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Current Draft Order</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <h4 className="text-sm font-medium">Base</h4>
                            <p>{base || "Not selected"}</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium">Protein</h4>
                            <p>{protein || "Not selected"}</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium">Portion</h4>
                            <p className="capitalize">{portion}</p>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-medium mb-2">Ingredients</h4>
                        {ingredients.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                                {ingredients.map((ing) => (
                                    <Badge key={ing.id} variant="outline">
                                        {ing.name}
                                    </Badge>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No ingredients selected</p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

