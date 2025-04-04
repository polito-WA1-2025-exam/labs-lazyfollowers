
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
import { ProteinSelector } from "./ProteinSelector";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import usePokeStore from "@/store/usePokeStore";
import { usePokeService } from "@/services/usePokeService";

export function CreatePokeModal() {
    const {
        bases,
        ingredients,
        portions,
        isCreateModalOpen,
        setCreateModalOpen,
        draftPoke,
        updatedraftPoke,
        resetdraftPoke
    } = usePokeStore();
    const { createOrder } = usePokeService();

    const [isSubmitting, setIsSubmitting] = useState(false);



    const handleSubmit = async () => {
        if (!draftPoke.base || !draftPoke.proteins) {
            return; // Validation failed
        }

        setIsSubmitting(true);
        try {
            await createOrder(draftPoke);
            setCreateModalOpen(false);
            resetdraftPoke();
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
                            <Label>Select Portion Size</Label>
                            <RadioGroup
                                value={draftPoke.portion?.id}
                                onValueChange={(value) => updatedraftPoke('portion', portions.find((el) => el.id == value))}
                                className="flex space-x-4"
                            >
                                {portions.map((portion) => {
                                    return <div key={"portion" + portion.id} className="flex items-center space-x-2">
                                        <RadioGroupItem value={portion.id} id={"portion-" + portion.id} />
                                        <Label htmlFor={"portion-" + portion.id}>{portion.name}</Label>
                                    </div>
                                })}
                            </RadioGroup>
                        </div>
                        <div className="space-y-2">
                            <Label>Details</Label>
                            <p className={draftPoke.ingredients.length > draftPoke.portion?.max_ingredient
                                ? "bg-yellow-400 rounded-xl p-1 ps-3" : ""}>
                                Ingredients count: {draftPoke.portion?.max_ingredient}
                            </p>
                            <p className={draftPoke.proteins.length > draftPoke.portion?.max_protein
                                ? "bg-yellow-400 rounded-xl p-1 ps-3" : ""}>
                                Proteins count: {draftPoke.portion?.max_protein}
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="base">Select Base</Label>
                            <Select
                                value={draftPoke.base.id}
                                onValueChange={(value) => updatedraftPoke('base', bases.find(e => e.id === value))}
                            >
                                <SelectTrigger id="base">
                                    <SelectValue placeholder="Choose a base" />
                                </SelectTrigger>
                                <SelectContent>
                                    {bases.map((base) => (
                                        <SelectItem key={"base" + base.id} value={base.id}>{base.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <ProteinSelector />
                    <IngredientSelector />
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setCreateModalOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!draftPoke.base || !draftPoke.proteins || isSubmitting}
                    >
                        {isSubmitting ? "Creating..." : "Create Poke Bowl"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}