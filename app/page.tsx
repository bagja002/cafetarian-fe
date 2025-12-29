"use client";

import axios from "axios";

// Add global declaration for Midtrans Snap
declare global {
  interface Window {
    snap: any;
  }
}

import { useState, useEffect } from "react";
import { categories, menuItems, MenuItem } from "@/lib/data";
import { MenuHero } from "@/components/feature/MenuHero";
import { CategoryTabs } from "@/components/feature/CategoryTabs";
import { MenuItemCard } from "@/components/feature/MenuItemCard";
import { ItemDetailDialog } from "@/components/feature/ItemDetailDialog";
import { CartReviewDrawer } from "@/components/feature/CartReviewDrawer";
import { CartSummary } from "@/components/feature/CartSummary";
import { Toaster, toast } from "sonner";

// Simple Cart Item Item (extending MenuItem with quantity)
type CartItem = MenuItem & { quantity: number };

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Scroll to category function
  const scrollToCategory = (category: string) => {
    setActiveCategory(category);
    const element = document.getElementById(category);
    if (element) {
      const offset = 80; // Height of sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleAddToCart = (item: MenuItem, quantity: number) => {
    if (pendingPaymentToken) {
      toast.error("Please complete your pending payment first", {
        description: "You have a transaction waiting to be paid."
      });
      setIsCartOpen(true);
      return;
    }

    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { ...item, quantity }];
    });
    toast.success(`Added ${quantity} ${item.name} to order`);
  };


  const updateCartQuantity = (itemId: string, newQuantity: number) => {
    if (pendingPaymentToken) {
      toast.error("Cannot modify order", {
        description: "Please complete or cancel your pending payment first."
      });
      return;
    }

    if (newQuantity <= 0) {
      setCart(prev => prev.filter(i => i.id !== itemId));
    } else {
      setCart(prev => prev.map(i => i.id === itemId ? { ...i, quantity: newQuantity } : i));
    }
  };

  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [pendingPaymentToken, setPendingPaymentToken] = useState<string | null>(null);

  const handleSnapPayment = (token: string) => {
    window.snap.pay(token, {
      onSuccess: function (result: any) {
        toast.success("Payment Successful!", { description: "Thank you for your order." });
        setCart([]);
        setPendingPaymentToken(null);
        console.log(result);
      },
      onPending: function (result: any) {
        toast.info("Waiting for payment...", { description: "Please complete your payment." });
        setCart([]);
        setPendingPaymentToken(null);
        console.log(result);
      },
      onError: function (result: any) {
        toast.error("Payment Failed", { description: "Please try again." });
        console.log(result);
      },
      onClose: function () {
        toast.warning("Payment window closed", { description: "You can retry payment from your order history." });
        // Re-open drawer so user can try again if they want
        setIsCartOpen(true);
      }
    });
  };

  const handleContinuePayment = () => {
    if (pendingPaymentToken) {
      setIsCartOpen(false);
      handleSnapPayment(pendingPaymentToken);
    }
  };


  const handleCheckout = async (data: { name: string; table_number: string; payment_method: string, email: string }) => {
    setIsCheckoutLoading(true);

    try {
      const payload = {
        customer: data,
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total_price: item.price * item.quantity
        })),
        transaction_summary: {
          subtotal: cartTotal,
          tax_amount: cartTotal * 0.11,
          grand_total: cartTotal * 1.11
        },
        timestamp: new Date().toISOString()
      };

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, payload);

      console.log(payload);
      console.log(response);

      if (response.status === 200 || response.status === 201) {
        const responseData = response.data;

        if (data.payment_method === "Cash") {
          toast.success("Pesanan Berhasil Dibuat!", {
            description: "Silahkan ke kasir untuk melakukan pembayaran."
          });
          setCart([]);
          setIsCartOpen(false);
        } else if (responseData.snap_token) {
          // Close the drawer immediately so Snap popup is visible
          setIsCartOpen(false);
          setPendingPaymentToken(responseData.snap_token);

          // Trigger Snap Popup
          handleSnapPayment(responseData.snap_token);
        } else if (responseData.redirect_url) {
        } else {
          toast.success(`Order Placed Successfully!`, {
            description: `Order ID: ${responseData.orderId || 'N/A'}. Table ${data.table_number}.`
          });
          setCart([]);
          setIsCartOpen(false);
        }
      } else {
        throw new Error(response.data.message || "Failed to place order");
      }
    } catch (error) {
      let errorMessage = "Something went wrong";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error("Checkout Failed", {
        description: errorMessage
      });
    } finally {
      setIsCheckoutLoading(false);
    }
  };



  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Intersection Observer for Scroll Spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -70% 0px" } // Trigger when section is near top
    );

    categories.forEach((cat) => {
      const element = document.getElementById(cat);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-background pb-32">
      <MenuHero />

      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onSelect={scrollToCategory}
      />

      <div className="max-w-md mx-auto px-4 py-6 space-y-12">
        {categories.map((category) => (
          <section key={category} id={category} className="scroll-mt-24 space-y-4">
            <h2 className="text-2xl font-serif font-bold pl-2 border-l-4 border-primary/50">
              {category}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {menuItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    onClick={() => {
                      setSelectedItem(item);
                      setIsDetailOpen(true);
                    }}
                  />
                ))}
            </div>
          </section>
        ))}
      </div>

      <ItemDetailDialog
        item={selectedItem}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        onAddToCart={handleAddToCart}
      />

      <CartReviewDrawer
        open={isCartOpen}
        onOpenChange={setIsCartOpen}
        cart={cart}
        onUpdateQuantity={updateCartQuantity}
        onCheckout={handleCheckout}
        isLoading={isCheckoutLoading}
        pendingToken={pendingPaymentToken}
        onContinuePayment={handleContinuePayment}
      />

      <CartSummary
        itemCount={cartCount}
        totalPrice={cartTotal}
        onClick={() => setIsCartOpen(true)}
      />

      {/* Configure Sonner in layout later, but for now using default toast if installed or fallback */}
    </main>
  );
}
