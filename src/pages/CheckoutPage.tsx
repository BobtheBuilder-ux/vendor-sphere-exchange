import { useState, useEffect } from "react";
import { ArrowLeft, CreditCard, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import PayPalButton from "@/components/PayPalButton";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { createOrder } from "@/lib/firestore";

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { cartItems, getCartTotal, getCartItemCount, clearCart } = useCart();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  if (!user || cartItems.length === 0) {
    return null;
  }

  const subtotal = getCartTotal();
  const shipping = shippingMethod === "express" ? 15.99 : shippingMethod === "overnight" ? 25.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // Check inventory before proceeding
  const checkInventory = () => {
    for (const item of cartItems) {
      if (!item.product) {
        toast({
          title: "Product Not Found",
          description: "Some items in your cart are no longer available.",
          variant: "destructive",
        });
        return false;
      }
      
      if (item.product.stock < item.quantity) {
        toast({
          title: "Insufficient Stock",
          description: `${item.product.name} only has ${item.product.stock} items available.`,
          variant: "destructive",
        });
        return false;
      }
      
      if (!item.product.isActive) {
        toast({
          title: "Product Unavailable",
          description: `${item.product.name} is no longer available for purchase.`,
          variant: "destructive",
        });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!checkInventory()) {
      return;
    }

    if (paymentMethod === "card") {
      setIsProcessing(true);
      
      try {
        // Create order with form data
        const formData = new FormData(e.target as HTMLFormElement);
        const orderData = {
          userId: user.id,
          items: cartItems.map(item => ({
            productId: item.productId,
            vendorId: item.product?.vendorId || "",
            name: item.product?.name || "",
            price: item.product?.price || 0,
            quantity: item.quantity,
            total: (item.product?.price || 0) * item.quantity
          })),
          total,
          subtotal,
          tax,
          shipping,
          status: "pending" as const,
          shippingAddress: {
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            address: formData.get("address") as string,
            apartment: formData.get("apartment") as string,
            city: formData.get("city") as string,
            state: formData.get("state") as string,
            zipCode: formData.get("zip") as string
          },
          shippingMethod,
          paymentMethod: "credit_card",
          paymentStatus: "completed"
        };

        const orderId = await createOrder(orderData);
        await clearCart();
        
        toast({
          title: "Order Placed Successfully!",
          description: `Your order ${orderId} has been confirmed.`,
        });
        
        navigate("/customer/dashboard");
      } catch (error) {
        console.error("Order creation failed:", error);
        toast({
          title: "Order Failed",
          description: "There was an error processing your order. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handlePayPalSuccess = async (paypalOrderId: string) => {
    if (!checkInventory()) {
      return;
    }

    try {
      const orderData = {
        userId: user.id,
        items: cartItems.map(item => ({
          productId: item.productId,
          vendorId: item.product?.vendorId || "",
          name: item.product?.name || "",
          price: item.product?.price || 0,
          quantity: item.quantity,
          total: (item.product?.price || 0) * item.quantity
        })),
        total,
        subtotal,
        tax,
        shipping,
        status: "pending" as const,
        shippingAddress: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: "",
          address: "",
          apartment: "",
          city: "",
          state: "",
          zipCode: ""
        },
        shippingMethod,
        paymentMethod: "paypal",
        paymentStatus: "completed",
        paypalOrderId
      };

      const orderId = await createOrder(orderData);
      await clearCart();
      
      toast({
        title: "Order Placed Successfully!",
        description: `Your order ${orderId} has been confirmed.`,
      });
      
      navigate("/customer/dashboard");
    } catch (error) {
      console.error("PayPal order creation failed:", error);
      toast({
        title: "Order Failed",
        description: "There was an error processing your PayPal order.",
        variant: "destructive",
      });
    }
  };

  const handlePaymentError = (error: any) => {
    console.error("Payment failed:", error);
    toast({
      title: "Payment Failed",
      description: "There was an issue processing your payment.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/cart" className="inline-flex items-center text-sm text-gray-600 hover:text-primary">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Cart
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Checkout ({getCartItemCount()} items)
        </h1>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" name="firstName" defaultValue={user.firstName} required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" name="lastName" defaultValue={user.lastName} required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" defaultValue={user.email} required />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" />
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" name="address" required />
                  </div>
                  <div>
                    <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                    <Input id="apartment" name="apartment" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" name="city" required />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Select name="state">
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ca">California</SelectItem>
                          <SelectItem value="ny">New York</SelectItem>
                          <SelectItem value="tx">Texas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" name="zip" required />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="standard" id="standard" />
                      <div className="flex-1 flex justify-between">
                        <div>
                          <Label htmlFor="standard" className="font-medium">Standard Shipping</Label>
                          <p className="text-sm text-gray-600">5-7 business days</p>
                        </div>
                        <span className="font-medium">Free</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="express" id="express" />
                      <div className="flex-1 flex justify-between">
                        <div>
                          <Label htmlFor="express" className="font-medium">Express Shipping</Label>
                          <p className="text-sm text-gray-600">2-3 business days</p>
                        </div>
                        <span className="font-medium">$15.99</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="overnight" id="overnight" />
                      <div className="flex-1 flex justify-between">
                        <div>
                          <Label htmlFor="overnight" className="font-medium">Overnight Shipping</Label>
                          <p className="text-sm text-gray-600">Next business day</p>
                        </div>
                        <span className="font-medium">$25.99</span>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Credit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex items-center">
                        <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.067 8.478c.492-3.164-.786-5.321-3.212-6.464C15.763 1.385 14.72 1 13.44 1H5.607a.75.75 0 0 0-.741.633L2.334 19.59a.45.45 0 0 0 .444.527h3.538l.891-5.64-.028.177a.75.75 0 0 1 .741-.633h1.541c3.033 0 5.406-1.228 6.097-4.781.027-.14.053-.281.074-.423.218-1.465-.001-2.462-.56-3.339" />
                        </svg>
                        PayPal
                      </Label>
                    </div>
                  </RadioGroup>
                  
                  {paymentMethod === "card" && (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" name="expiry" placeholder="MM/YY" required />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" name="cvv" placeholder="123" required />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "paypal" && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <PayPalButton
                        total={total}
                        onSuccess={handlePayPalSuccess}
                        onError={handlePaymentError}
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="billing" />
                    <Label htmlFor="billing" className="text-sm">
                      Billing address same as shipping address
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                        <img 
                          src={item.product?.imageUrl || "/placeholder.svg"} 
                          alt={item.product?.name || "Product"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.product?.name || "Product"}</h4>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                        {item.product && item.product.stock < item.quantity && (
                          <p className="text-xs text-red-600">Insufficient stock!</p>
                        )}
                      </div>
                      <span className="font-medium">
                        ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Shield className="h-4 w-4 text-green-600 mr-2" />
                      <span>Secure 256-bit SSL encryption</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Truck className="h-4 w-4 text-blue-600 mr-2" />
                      <span>Free returns within 30 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {paymentMethod === "card" && (
                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : `Complete Order - $${total.toFixed(2)}`}
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
