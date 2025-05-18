
import { Alert, AlertCircle, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ContactAlertsProps {
  error?: string;
  isRateLimited?: boolean;
}

export function ContactAlerts({ error, isRateLimited }: ContactAlertsProps) {
  if (!error && !isRateLimited) return null;
  
  return (
    <>
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {isRateLimited && (
        <Alert className="mb-6 border-amber-600">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertTitle>Rate Limited</AlertTitle>
          <AlertDescription>
            You can submit another message after 5 minutes.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
