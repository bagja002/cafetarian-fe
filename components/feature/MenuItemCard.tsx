"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MenuItem } from "@/lib/data";
import { cn } from "@/lib/utils";

interface MenuItemCardProps {
    item: MenuItem;
    onClick: () => void;
}

export function MenuItemCard({ item, onClick }: MenuItemCardProps) {
    // Format price to IDR currency
    const formattedPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(item.price);

    return (
        <Card
            className="overflow-hidden border-none shadow-md bg-card/50 hover:bg-card/80 transition-all duration-300 cursor-pointer group"
            onClick={onClick}
        >
            <CardContent className="p-0 flex h-28 sm:h-32 relative">
                {/* Text Section */}
                <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between z-10">
                    <div>
                        <h3 className="font-serif font-bold text-foreground text-lg leading-tight group-hover:text-primary transition-colors">
                            {item.name}
                        </h3>
                        <p className="text-muted-foreground text-xs line-clamp-2 mt-1">
                            {item.description}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                        <span className="font-semibold text-primary text-sm sm:text-base">
                            {formattedPrice}
                        </span>
                        {item.popular && (
                            <span className="text-[10px] font-bold text-amber-500 bg-amber-100 dark:bg-amber-900/30 px-1.5 py-0.5 rounded-sm">
                                POPULAR
                            </span>
                        )}
                    </div>
                </div>

                {/* Image Section */}
                <div className="relative w-28 sm:w-32 h-full flex-shrink-0">
                    <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent to-card/10 dark:to-card/20" />

                    {/* Add Button Overlay */}
                    <div className="absolute bottom-2 right-2">
                        <Button size="icon" className="h-8 w-8 rounded-full shadow-lg bg-white text-primary hover:bg-white/90 dark:bg-zinc-800 dark:text-primary">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
