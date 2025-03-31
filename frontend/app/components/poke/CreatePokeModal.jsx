
import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { IngredientSelector } from "./IngredientSelector";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import usePokeStore from "@/store/usePokeStore";
import { usePokeService } from "@/services/usePokeService";

export function CreatePokeModal() {
    const { isCreateModalOpen, setCreateModalOpen, draftOrder, updateDraftOrder, addIngredient, removeIngredient, resetDraftOrder } = usePokeStore();
    const { createOrder, fetchIngredients } = usePokeService();
    const [availableIngredients, setAvailableIngredients] = useState([]);
    const [bases, setBases] = useState(['White Rice', 'Brown Rice', 'Quinoa', 'Mixed Greens']);
    const [proteins, setProteins] = useState(['Salmon', 'Tuna', 'Chicken', 'Tofu']);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        async function loadIngredients() {
            try {
                const ingredients = await fetchIngredients();
                setAvailableIngredients(ingredients);
            } catch (error) {
                // Fallback data if API fails
                setAvailableIngredients([
                    { id: 1, name: 'Avocado' },
                    { id: 2, name: 'Cucumber' },
                    { id: 3, name: 'Mango' },
                    { id: 4, name: 'Edamame' },
                    { id: 5, name: 'Seaweed' },
                    { id: 6, name: 'Green Onion' },
                    { id: 7, name: 'Corn' },
                    { id: 8, name: 'Crab Salad' },
                ]);
            }
        }

        loadIngredients();
    }, []);

    const handleIngredientToggle = (ingredient, isSelected) => {
        if (isSelected) {
            addIngredient(ingredient);
        } else {
            removeIngredient(ingredient.id);
        }
    };

    const handleSubmit = async () => {
        if (!draftOrder.base || !draftOrder.protein) {
            return; // Validation failed
        }

        setIsSubmitting(true);
        try {
            await createOrder(draftOrder);
            setCreateModalOpen(false);
            resetDraftOrder();
        } catch (error) {
            console.error("Failed to create order:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isCreateModalOpen} onOpenChange={setCreateModalOpen}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Create Your Poke Bowl</DialogTitle>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="base">Select Base</Label>
                            <Select
                                value={draftOrder.base}
                                onValueChange={(value) => updateDraftOrder('base', value)}
                            >
                                <SelectTrigger id="base">
                                    <SelectValue placeholder="Choose a base" />
                                </SelectTrigger>
                                <SelectContent>
                                    {bases.map((base) => (
                                        <SelectItem key={base} value={base}>{base}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="protein">Select Protein</Label>
                            <Select
                                value={draftOrder.protein}
                                onValueChange={(value) => updateDraftOrder('protein', value)}
                            >
                                <SelectTrigger id="protein">
                                    <SelectValue placeholder="Choose a protein" />
                                </SelectTrigger>
                                <SelectContent>
                                    {proteins.map((protein) => (
                                        <SelectItem key={protein} value={protein}>{protein}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Select Portion Size</Label>
                        <RadioGroup
                            value={draftOrder.portion}
                            onValueChange={(value) => updateDraftOrder('portion', value)}
                            className="flex space-x-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="regular" id="regular" />
                                <Label htmlFor="regular">Regular</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="large" id="large" />
                                <Label htmlFor="large">Large</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <IngredientSelector
                        ingredients={availableIngredients}
                        selectedIngredients={draftOrder.ingredients}
                        onSelect={handleIngredientToggle}
                    />
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setCreateModalOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!draftOrder.base || !draftOrder.protein || isSubmitting}
                    >
                        {isSubmitting ? "Creating..." : "Create Poke Bowl"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}