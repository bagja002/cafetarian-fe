"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MenuItem } from "@/lib/data";

// Reuse the CartItem type definition if exported, or redefine locally for prop clarity
type CartItem = MenuItem & { quantity: number };

export type CheckoutData = {
    name: string;
    table_number: string;
    payment_method: "Cash" | "QRIS" | "Transfer";
};

interface CartReviewProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    cart: CartItem[];
    onUpdateQuantity: (itemId: string, newQuantity: number) => void;
    onCheckout: (data: CheckoutData) => void;
    isLoading?: boolean;
    pendingToken?: string | null;
    onContinuePayment?: () => void;
}

export function CartReviewDrawer({
    open,
    onOpenChange,
    cart,
    onUpdateQuantity,
    onCheckout,
    isLoading = false,
    pendingToken,
    onContinuePayment
}: CartReviewProps) {
    const [step, setStep] = useState<"review" | "form">("review");
    const [formData, setFormData] = useState<CheckoutData>({
        name: "",
        table_number: "",
        payment_method: "QRIS"
    });

    // Reset step when drawer closes
    useEffect(() => {
        if (!open) {
            // delay reset to allow animation to finish
            const timer = setTimeout(() => setStep("review"), 300);
            return () => clearTimeout(timer);
        }
    }, [open]);

    // If pending token exists, automatically go to form step or stay there?
    // Actually, maybe we should just change the button in the form step.

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const tax = subtotal * 0.11; // 11% Tax
    const total = subtotal + tax;

    const formatPrice = (price: number) => new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);

    const handleConfirm = () => {
        if (pendingToken && onContinuePayment) {
            onContinuePayment();
            return;
        }

        if (!formData.name || !formData.table_number) {
            // Simple validation could be better
            return;
        }
        onCheckout(formData);
    };

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent className="max-w-md mx-auto h-[85vh] flex flex-col">
                <DrawerHeader className="text-left border-b border-border/50 pb-4">
                    <div className="flex justify-between items-center">
                        <DrawerTitle className="text-2xl font-serif font-bold">
                            {step === "review" ? "Your Order" : "Checkout Details"}
                        </DrawerTitle>
                        <DrawerClose asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                <X className="h-4 w-4" />
                            </Button>
                        </DrawerClose>
                    </div>
                    <DrawerDescription>
                        {step === "review"
                            ? (cart.length > 0 ? `You have ${cart.length} items in your order.` : "Your cart is empty.")
                            : "Please fill in your details to place the order."
                        }
                    </DrawerDescription>
                </DrawerHeader>

                {cart.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
                        <div className="bg-muted/50 p-6 rounded-full mb-4">
                            <Trash2 className="h-10 w-10 opacity-50" />
                        </div>
                        <p className="text-lg font-medium">No items yet</p>
                        <p className="text-sm mt-1">Browse the menu to add delicious items.</p>
                        <Button
                            variant="outline"
                            className="mt-6"
                            onClick={() => onOpenChange(false)}
                        >
                            Back to Menu
                        </Button>
                    </div>
                ) : (
                    <>
                        {step === "review" ? (
                            <div className="flex-1 overflow-y-auto px-4 py-2">
                                <div className="space-y-4 py-2">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex gap-4">
                                            {/* Item Image */}
                                            <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>

                                            {/* Item Details */}
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <h4 className="font-semibold text-foreground line-clamp-1">{item.name}</h4>
                                                    <p className="text-sm text-primary font-medium">{formatPrice(item.price)}</p>
                                                </div>

                                                <div className="flex items-center justify-between mt-2">
                                                    <div className="flex items-center gap-3 bg-muted/40 rounded-lg p-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-6 w-6 rounded-md hover:bg-background shadow-sm"
                                                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </Button>
                                                        <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-6 w-6 rounded-md hover:bg-background shadow-sm"
                                                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                                <div className="space-y-3">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Full Name
                                    </label>
                                    <Input
                                        placeholder="Enter your name"
                                        className="h-12 rounded-xl"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Table Number
                                    </label>
                                    <Input
                                        placeholder="e.g. 12"
                                        type="number"
                                        className="h-12 rounded-xl"
                                        value={formData.table_number}
                                        onChange={(e) => setFormData({ ...formData, table_number: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Payment Method
                                    </label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {["Cash", "QRIS", "Transfer"].map((method) => (
                                            <button
                                                key={method}
                                                onClick={() => setFormData({ ...formData, payment_method: method as any })}
                                                className={cn(
                                                    "h-12 rounded-xl border font-medium text-sm transition-all duration-200",
                                                    formData.payment_method === method
                                                        ? "border-primary bg-primary/10 text-primary"
                                                        : "border-input bg-transparent hover:bg-accent hover:text-accent-foreground"
                                                )}
                                            >
                                                {method}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="p-4 bg-muted/20 border-t border-border/50 space-y-3">
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <span>Service & Tax (11%)</span>
                                    <span>{formatPrice(tax)}</span>
                                </div>
                                <Separator className="my-2" />
                                <div className="flex justify-between text-lg font-bold text-foreground">
                                    <span>Total</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                            </div>

                            <DrawerFooter className="p-0 pt-2">
                                {step === "review" ? (
                                    <Button
                                        className="w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/20"
                                        onClick={() => setStep("form")}
                                    >
                                        Proceed to Checkout
                                    </Button>
                                ) : (
                                    <Button
                                        className="w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/20"
                                        onClick={handleConfirm}
                                        disabled={(!pendingToken && (!formData.name || !formData.table_number)) || isLoading}
                                    >
                                        {isLoading ? "Processing..." : (pendingToken ? "Resume Payment" : "Confirm Order")}
                                    </Button>
                                )}
                            </DrawerFooter>
                        </div>
                    </>
                )}
            </DrawerContent>
        </Drawer>
    );
}
