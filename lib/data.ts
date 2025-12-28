export type MenuItem = {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: "Signature" | "Coffee" | "Non-Coffee" | "Meals" | "Desserts";
    popular?: boolean;
};

export const categories = [
    "Signature",
    "Coffee",
    "Non-Coffee",
    "Meals",
    "Desserts",
];

export const menuItems: MenuItem[] = [
    {
        id: "1",
        name: "Truffle Wagyu Don",
        description: "Premium wagyu beef slices with truffle oil, onsen egg, and japanese rice.",
        price: 200,
        image: "https://images.unsplash.com/photo-1628840045765-e97d8e6178b1?q=80&w=600&auto=format&fit=crop",
        category: "Signature",
        popular: true,
    },
    {
        id: "2",
        name: "Golden Saffron Latte",
        description: "Espresso infused with saffron and honey, topped with gold flakes.",
        price: 65000,
        image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600&auto=format&fit=crop",
        category: "Signature",
        popular: true,
    },
    {
        id: "3",
        name: "Classic Cappuccino",
        description: "Rich espresso with steamed milk and deep layer of foam.",
        price: 45000,
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=600&auto=format&fit=crop",
        category: "Coffee",
    },
    {
        id: "4",
        name: "Iced Spanish Latte",
        description: "Sweet and creamy espresso with condensed milk.",
        price: 52000,
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=600&auto=format&fit=crop",
        category: "Coffee",
        popular: true,
    },
    {
        id: "5",
        name: "Matcha Latte Premium",
        description: "Ceremonial grade matcha from Uji, Japan with fresh milk.",
        price: 55000,
        image: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3114?q=80&w=600&auto=format&fit=crop",
        category: "Non-Coffee",
    },
    {
        id: "6",
        name: "Berry Hibiscus Tea",
        description: "Refreshingly tart hibiscus tea with mixed berries.",
        price: 42000,
        image: "https://images.unsplash.com/photo-1621267860478-dbdd58690623?q=80&w=600&auto=format&fit=crop",
        category: "Non-Coffee",
    },
    {
        id: "7",
        name: "Eggs Benedict",
        description: "Poached eggs on toasted brioche with creamy hollandaise and smoked salmon.",
        price: 95000,
        image: "https://images.unsplash.com/photo-1608039829502-d4de71188ca8?q=80&w=600&auto=format&fit=crop",
        category: "Meals",
    },
    {
        id: "8",
        name: "Mushroom Truffle Pasta",
        description: "Creamy fettuccine with wild mushrooms and black truffle.",
        price: 110000,
        image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?q=80&w=600&auto=format&fit=crop",
        category: "Meals",
    },
    {
        id: "9",
        name: "Molten Chocolate Cake",
        description: "Warm chocolate cake with a liquid core, served with vanilla ice cream.",
        price: 65000,
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476d?q=80&w=600&auto=format&fit=crop",
        category: "Desserts",
        popular: true,
    },
    {
        id: "10",
        name: "Basque Burnt Cheesecake",
        description: "Creamy cheesecake with a caramelized burnt top.",
        price: 68000,
        image: "https://images.unsplash.com/photo-1563729768640-d01d77f274cb?q=80&w=600&auto=format&fit=crop",
        category: "Desserts",
    },
];
