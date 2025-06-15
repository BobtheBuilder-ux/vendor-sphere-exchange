
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Target, TrendingUp, Users, ShoppingCart, CreditCard, CheckCircle } from "lucide-react";

const ConversionTracking = () => {
  const conversionMetrics = [
    {
      metric: "Overall Conversion Rate",
      current: 3.8,
      target: 4.5,
      change: "+0.3%",
      status: "improving"
    },
    {
      metric: "Cart Abandonment Rate",
      current: 68.5,
      target: 65.0,
      change: "-2.1%",
      status: "improving"
    },
    {
      metric: "Email Signup Rate",
      current: 12.4,
      target: 15.0,
      change: "+1.2%",
      status: "improving"
    },
    {
      metric: "Return Customer Rate",
      current: 34.7,
      target: 40.0,
      change: "+4.3%",
      status: "improving"
    }
  ];

  const funnelSteps = [
    { step: "Landing Page Views", visitors: 10000, rate: 100, icon: Users },
    { step: "Product Page Views", visitors: 4200, rate: 42, icon: Target },
    { step: "Add to Cart", visitors: 890, rate: 8.9, icon: ShoppingCart },
    { step: "Checkout Started", visitors: 420, rate: 4.2, icon: CreditCard },
    { step: "Purchase Completed", visitors: 380, rate: 3.8, icon: CheckCircle },
  ];

  const channelPerformance = [
    { channel: "Direct", visitors: 2840, conversions: 152, rate: 5.35 },
    { channel: "Organic Search", visitors: 3250, conversions: 143, rate: 4.4 },
    { channel: "Social Media", visitors: 1890, conversions: 64, rate: 3.39 },
    { channel: "Email Marketing", visitors: 1420, conversions: 71, rate: 5.0 },
    { channel: "Paid Ads", visitors: 600, conversions: 21, rate: 3.5 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "improving": return "text-green-600";
      case "declining": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 90) return "bg-green-500";
    if (percentage >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      {/* Key Conversion Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {conversionMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{metric.current}%</span>
                  <Badge variant="outline" className={getStatusColor(metric.status)}>
                    {metric.change}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Target: {metric.target}%</span>
                    <span>{Math.round((metric.current / metric.target) * 100)}%</span>
                  </div>
                  <Progress 
                    value={(metric.current / metric.target) * 100} 
                    className="h-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Conversion Funnel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {funnelSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <step.icon className="h-5 w-5 text-gray-600" />
                    <div>
                      <h4 className="font-medium">{step.step}</h4>
                      <p className="text-sm text-gray-600">{step.visitors.toLocaleString()} visitors</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">{step.rate}%</div>
                    <div className="text-sm text-gray-600">conversion rate</div>
                  </div>
                </div>
                {index < funnelSteps.length - 1 && (
                  <div className="flex justify-center my-2">
                    <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-300"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Channel Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Conversion by Traffic Channel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {channelPerformance.map((channel, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div>
                    <h4 className="font-medium">{channel.channel}</h4>
                    <p className="text-sm text-gray-600">{channel.visitors.toLocaleString()} visitors</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-lg font-bold">{channel.conversions}</div>
                    <div className="text-xs text-gray-600">conversions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">{channel.rate}%</div>
                    <div className="text-xs text-gray-600">rate</div>
                  </div>
                  <div className="w-24">
                    <Progress value={channel.rate * 10} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Goal Tracking */}
      <Card>
        <CardHeader>
          <CardTitle>Goal Tracking & KPIs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">127%</div>
              <div className="text-gray-600">Revenue Goal Progress</div>
              <Progress value={127} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">89%</div>
              <div className="text-gray-600">User Acquisition Goal</div>
              <Progress value={89} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">94%</div>
              <div className="text-gray-600">Vendor Onboarding Goal</div>
              <Progress value={94} className="mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversionTracking;
