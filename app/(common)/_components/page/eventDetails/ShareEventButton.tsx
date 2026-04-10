"use client";
import { Button } from "@/components/ui/button";
import { Check, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ShareEventButton = ({ title }: { title: string }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Check out this event on Planora: ${title}`,
          url: url,
        });
      } catch (err) {
        console.log("Native share dismissed");
      }
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleShare}
      className="flex-1 gap-2 rounded-xl"
    >
      {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
      {copied ? "Copied" : "Share"}
    </Button>
  );
};

export default ShareEventButton;
