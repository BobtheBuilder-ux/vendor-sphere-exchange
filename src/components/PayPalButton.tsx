
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useToast } from "@/hooks/use-toast";

interface PayPalButtonProps {
  total: number;
  onSuccess: (orderId: string) => void;
  onError?: (error: any) => void;
}

const PayPalButton = ({ total, onSuccess, onError }: PayPalButtonProps) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const { toast } = useToast();

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: total.toFixed(2),
            currency_code: "USD",
          },
        },
      ],
    });
  };

  const onApprove = async (data: any, actions: any) => {
    try {
      const details = await actions.order.capture();
      console.log("PayPal transaction completed:", details);
      
      toast({
        title: "Payment Successful",
        description: `Transaction completed. Order ID: ${details.id}`,
      });
      
      onSuccess(details.id);
    } catch (error) {
      console.error("PayPal payment error:", error);
      toast({
        title: "Payment Failed",
        description: "There was an issue processing your payment.",
        variant: "destructive",
      });
      
      if (onError) onError(error);
    }
  };

  const onErrorHandler = (error: any) => {
    console.error("PayPal error:", error);
    toast({
      title: "Payment Error",
      description: "Unable to process PayPal payment.",
      variant: "destructive",
    });
    
    if (onError) onError(error);
  };

  if (isPending) {
    return <div className="text-center">Loading PayPal...</div>;
  }

  return (
    <PayPalButtons
      createOrder={createOrder}
      onApprove={onApprove}
      onError={onErrorHandler}
      style={{
        layout: "vertical",
        color: "blue",
        shape: "rect",
        label: "paypal",
      }}
    />
  );
};

export default PayPalButton;
