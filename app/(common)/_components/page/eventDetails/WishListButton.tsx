"use client";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const WishlistButton = ({ eventId }: { eventId: string }) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(
      localStorage.getItem("planora_wishlist") || "[]"
    );
    setIsSaved(wishlist.includes(eventId));
  }, [eventId]);

  const toggleWishlist = () => {
    const wishlist = JSON.parse(
      localStorage.getItem("planora_wishlist") || "[]"
    );
    let updatedWishlist;

    if (wishlist.includes(eventId)) {
      updatedWishlist = wishlist.filter((id: string) => id !== eventId);
      setIsSaved(false);
      toast.info("Removed from wishlist");
    } else {
      updatedWishlist = [...wishlist, eventId];
      setIsSaved(true);
      toast.success("Added to wishlist!");
    }

    localStorage.setItem("planora_wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <Button
      variant="outline"
      onClick={toggleWishlist}
      className={`flex-1 gap-2 rounded-xl transition-all ${
        isSaved
          ? "border-pink-500 bg-pink-50 text-pink-600 dark:bg-pink-950/20"
          : ""
      }`}
    >
      <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
      {isSaved ? "Saved" : "Wishlist"}
    </Button>
  );
};

export default WishlistButton;
