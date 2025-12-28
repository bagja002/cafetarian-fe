"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CategoryTabsProps {
    categories: string[];
    activeCategory: string;
    onSelect: (category: string) => void;
}

export function CategoryTabs({ categories, activeCategory, onSelect }: CategoryTabsProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto scroll to active tab
    useEffect(() => {
        if (scrollRef.current) {
            const activeElement = scrollRef.current.querySelector(`[data-category="${activeCategory}"]`);
            if (activeElement) {
                activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    }, [activeCategory]);

    return (
        <div className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border/50 py-3 shadow-sm">
            <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-3 px-6 no-scrollbar pb-1 snap-x"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {categories.map((category) => (
                    <button
                        key={category}
                        data-category={category}
                        onClick={() => onSelect(category)}
                        className={cn(
                            "relative flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 snap-center",
                            activeCategory === category
                                ? "text-primary-foreground"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        )}
                    >
                        {activeCategory === category && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-primary rounded-full"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">{category}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
