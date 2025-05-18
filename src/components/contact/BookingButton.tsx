
import { Button } from "@/components/ui/button";

export function BookingButton() {
  return (
    <div className="mt-8 text-center">
      <p className="text-sm text-muted-foreground mb-2">Or schedule a call directly</p>
      <Button variant="outline" asChild>
        <a href="#" target="_blank" rel="noopener noreferrer">
          Book a consultation
        </a>
      </Button>
    </div>
  );
}
