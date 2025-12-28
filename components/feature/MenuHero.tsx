"use client";

import { motion } from "framer-motion";
import { MapPin, Clock } from "lucide-react";

export function MenuHero() {
    return (
        <div className="relative h-[30vh] min-h-[250px] w-full overflow-hidden rounded-b-[2rem] shadow-xl">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop')",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-primary text-primary-foreground rounded-full">
                            Open Now
                        </span>
                    </div>
                    <h1 className="text-4xl font-serif font-bold mb-2">Luxe Cafe</h1>
                    <p className="text-white/90 text-sm mb-4">Premium Coffee • Fine Dining • Desserts</p>

                    <div className="flex gap-4 text-xs font-medium text-white/80">
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-primary" />
                            <span>08:00 - 22:00</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span>Jakarta, ID</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
