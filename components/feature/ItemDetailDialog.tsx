"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { MenuItem } from "@/lib/data";

interface ItemDetailProps {
    item: MenuItem | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onAddToCart: (item: MenuItem, quantity: number) => void;
}

export function ItemDetailDialog({ item, open, onOpenChange, onAddToCart }: ItemDetailProps) {
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (open) setQuantity(1);
    }, [open]);

    if (!item) return null;

    const formattedPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(item.price);

    const totalPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(item.price * quantity);

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent className="max-w-md mx-auto">
                <div className="mx-auto w-full max-w-sm">
                    {/* Image Header */}
                    <div className="relative h-64 w-full rounded-t-[10px] overflow-hidden -mt-4 mb-4">
                        <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
                    </div>

                    <DrawerHeader className="text-left pt-0">
                        <div className="flex justify-between items-start mb-2">
                            <DrawerTitle className="text-2xl font-serif font-bold">{item.name}</DrawerTitle>
                            <span className="text-lg font-semibold text-primary">{formattedPrice}</span>
                        </div>
                        <DrawerDescription className="text-base">
                            {item.description}
                        </DrawerDescription>
                    </DrawerHeader>

                    <div className="p-4 pt-0">
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mb-8 p-4 bg-muted/30 rounded-xl border border-border/50">
                            <span className="font-medium text-muted-foreground">Quantity</span>
                            <div className="flex items-center gap-4">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-10 w-10 rounded-full border-primary/20 text-primary hover:bg-primary/10 hover:text-primary"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1}
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="text-xl font-bold w-6 text-center">{quantity}</span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-10 w-10 rounded-full border-primary/20 text-primary bg-primary/5 hover:bg-primary/10 hover:text-primary"
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <DrawerFooter className="p-0">
                            <Button
                                className="w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/20 flex justify-between items-center px-6"
                                onClick={() => {
                                    onAddToCart(item, quantity);
                                    onOpenChange(false);
                                }}
                            >
                                <span className="font-semibold">Add to Order</span>
                                <div className="flex items-center gap-2">
                                    <span className="opacity-80 text-sm font-normal">Total:</span>
                                    <span className="font-bold">{totalPrice}</span>
                                </div>
                            </Button>
                            <DrawerClose asChild>
                                <Button variant="ghost" className="mt-2 text-muted-foreground">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
