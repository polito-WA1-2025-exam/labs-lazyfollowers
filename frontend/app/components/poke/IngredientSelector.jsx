
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function IngredientSelector({ ingredients, selectedIngredients, onSelect }) {
    return (
        <ScrollArea className="h-72 rounded-md border p-4">
            <div className="space-y-4">
                <h4 className="font-medium">Select Ingredients</h4>
                <div className="grid grid-cols-2 gap-2">
                    {ingredients.map((ingredient) => {
                        const isSelected = selectedIngredients.some(i => i.id === ingredient.id);
                        return (
                            <div key={ingredient.id} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`ingredient-${ingredient.id}`}
                                    checked={isSelected}
                                    onCheckedChange={() => onSelect(ingredient, !isSelected)}
                                />
                                <Label
                                    htmlFor={`ingredient-${ingredient.id}`}
                                    className="text-sm cursor-pointer"
                                >
                                    {ingredient.name}
                                </Label>
                            </div>
                        );
                    })}
                </div>
            </div>
        </ScrollArea>
    );
}