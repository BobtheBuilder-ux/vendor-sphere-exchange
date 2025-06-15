
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CreditCard, Plus, Trash2 } from "lucide-react";

interface PaymentMethod {
  id: string;
  type: "card" | "paypal";
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "card",
      last4: "4242",
      brand: "visa",
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true
    }
  ]);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCard, setNewCard] = useState({
    number: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
    name: ""
  });

  const handleAddCard = () => {
    // In a real app, this would integrate with Stripe or similar
    const cardNumber = newCard.number.replace(/\s/g, "");
    const last4 = cardNumber.slice(-4);
    
    const newPaymentMethod: PaymentMethod = {
      id: Date.now().toString(),
      type: "card",
      last4,
      brand: "visa", // Would be detected from card number
      expiryMonth: parseInt(newCard.expiryMonth),
      expiryYear: parseInt(newCard.expiryYear),
      isDefault: paymentMethods.length === 0
    };

    setPaymentMethods([...paymentMethods, newPaymentMethod]);
    setIsAddingCard(false);
    setNewCard({ number: "", expiryMonth: "", expiryYear: "", cvc: "", name: "" });
  };

  const handleRemoveCard = (id: string) => {
    setPaymentMethods(methods => methods.filter(method => method.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(methods =>
      methods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Payment Methods</h2>
        <Dialog open={isAddingCard} onOpenChange={setIsAddingCard}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Payment Method
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Credit Card</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  value={newCard.number}
                  onChange={(e) => setNewCard({ ...newCard, number: formatCardNumber(e.target.value) })}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </div>
              <div>
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input
                  id="cardName"
                  value={newCard.name}
                  onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="expiryMonth">Month</Label>
                  <Input
                    id="expiryMonth"
                    value={newCard.expiryMonth}
                    onChange={(e) => setNewCard({ ...newCard, expiryMonth: e.target.value })}
                    placeholder="MM"
                    maxLength={2}
                  />
                </div>
                <div>
                  <Label htmlFor="expiryYear">Year</Label>
                  <Input
                    id="expiryYear"
                    value={newCard.expiryYear}
                    onChange={(e) => setNewCard({ ...newCard, expiryYear: e.target.value })}
                    placeholder="YYYY"
                    maxLength={4}
                  />
                </div>
                <div>
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    value={newCard.cvc}
                    onChange={(e) => setNewCard({ ...newCard, cvc: e.target.value })}
                    placeholder="123"
                    maxLength={4}
                  />
                </div>
              </div>
              <Button onClick={handleAddCard} className="w-full">
                Add Card
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {paymentMethods.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <CreditCard className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No payment methods saved yet.</p>
              <p className="text-sm text-gray-500 mt-2">
                Add a payment method to make checkout faster and easier.
              </p>
            </CardContent>
          </Card>
        ) : (
          paymentMethods.map((method) => (
            <Card key={method.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                      <CreditCard className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">
                          **** **** **** {method.last4}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {method.brand?.toUpperCase()}
                        </Badge>
                        {method.isDefault && (
                          <Badge variant="default" className="text-xs">
                            Default
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        Expires {method.expiryMonth?.toString().padStart(2, '0')}/{method.expiryYear}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!method.isDefault && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSetDefault(method.id)}
                      >
                        Set as Default
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveCard(method.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default PaymentMethods;
