"use client";

import { ShoppingBag, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface CartSummaryProps {
    itemCount: number;
    totalPrice: number;
    onClick: () => void;
}

export function CartSummary({ itemCount, totalPrice, onClick }: CartSummaryProps) {
    const formattedTotal = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(totalPrice);

    return (
        <AnimatePresence>
            {itemCount > 0 && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-6 left-4 right-4 z-50 max-w-md mx-auto"
                >
                    <Button
                        onClick={onClick}
                        className="w-full h-16 rounded-2xl bg-foreground text-background shadow-2xl shadow-black/20 hover:bg-foreground/90 flex items-center justify-between px-6"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center bg-primary text-primary-foreground h-8 w-8 rounded-full font-bold text-sm">
                                {itemCount}
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-xs text-background/70 font-medium">Total Order</span>
                                <span className="font-bold text-lg leading-none">{formattedTotal}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 pr-1">
                            <span className="text-sm font-medium">Review</span>
                            <ChevronRight className="h-4 w-4" />
                        </div>
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
