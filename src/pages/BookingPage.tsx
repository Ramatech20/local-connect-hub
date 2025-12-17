import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, MapPin, CreditCard, Shield, ChevronLeft, Check } from "lucide-react";
import Layout from "@/components/layout/Layout";

const timeSlots = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
  "4:00 PM", "5:00 PM"
];

const BookingPage = () => {
  const { id } = useParams();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("mpesa");

  // Mock provider data
  const provider = {
    name: "John Kamau",
    profession: "Master Plumber",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    service: "Pipe Repair",
    price: "KSh 1,500",
    duration: "1-2 hours",
  };

  // Generate dates for next 7 days
  const dates = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", { weekday: "short", day: "numeric", month: "short" }).format(date);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <Layout>
      <div className="min-h-screen bg-secondary/30 py-8">
        <div className="container-custom max-w-4xl">
          {/* Back Button */}
          <Link
            to={`/provider/${id}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to profile
          </Link>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    step >= s
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > s ? <Check className="w-5 h-5" /> : s}
                </div>
                <span className={`hidden sm:block text-sm ${step >= s ? "text-foreground" : "text-muted-foreground"}`}>
                  {s === 1 ? "Select Time" : s === 2 ? "Your Details" : "Payment"}
                </span>
                {s < 3 && <div className="w-8 lg:w-16 h-0.5 bg-border" />}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {step === 1 && (
                <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-card animate-fade-in">
                  <h2 className="text-xl font-semibold text-foreground mb-6">Select Date & Time</h2>

                  {/* Date Selection */}
                  <div className="mb-8">
                    <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Choose a Date
                    </h3>
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                      {dates.map((date) => (
                        <button
                          key={date.toISOString()}
                          onClick={() => setSelectedDate(date)}
                          className={`p-3 rounded-xl text-center transition-all ${
                            selectedDate?.toDateString() === date.toDateString()
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted hover:bg-primary/10"
                          }`}
                        >
                          <span className="block text-xs text-muted-foreground mb-1">
                            {isToday(date) ? "Today" : new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date)}
                          </span>
                          <span className="block font-semibold">{date.getDate()}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Choose a Time
                    </h3>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 rounded-xl text-sm font-medium transition-all ${
                            selectedTime === time
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted hover:bg-primary/10"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    className="w-full mt-8"
                    size="lg"
                    disabled={!selectedDate || !selectedTime}
                    onClick={() => setStep(2)}
                  >
                    Continue
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-card animate-fade-in">
                  <h2 className="text-xl font-semibold text-foreground mb-6">Your Details</h2>

                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          First Name
                        </label>
                        <Input placeholder="Enter your first name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Last Name
                        </label>
                        <Input placeholder="Enter your last name" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone Number
                      </label>
                      <Input placeholder="+254 7XX XXX XXX" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address
                      </label>
                      <Input type="email" placeholder="your@email.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        Service Address
                      </label>
                      <Input placeholder="Enter your address" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        className="w-full p-3 rounded-xl border border-border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                        rows={3}
                        placeholder="Any special instructions or details..."
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button className="flex-1" onClick={() => setStep(3)}>
                      Continue to Payment
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-card animate-fade-in">
                  <h2 className="text-xl font-semibold text-foreground mb-6">Payment Method</h2>

                  <div className="space-y-3 mb-8">
                    <button
                      onClick={() => setPaymentMethod("mpesa")}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${
                        paymentMethod === "mpesa"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                        <span className="text-success font-bold text-sm">M-PESA</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">M-Pesa</h3>
                        <p className="text-sm text-muted-foreground">Pay with M-Pesa mobile money</p>
                      </div>
                    </button>

                    <button
                      onClick={() => setPaymentMethod("card")}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${
                        paymentMethod === "card"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="w-12 h-12 rounded-lg bg-info/10 flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-info" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">Credit/Debit Card</h3>
                        <p className="text-sm text-muted-foreground">Pay with Visa or Mastercard</p>
                      </div>
                    </button>

                    <button
                      onClick={() => setPaymentMethod("paypal")}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${
                        paymentMethod === "paypal"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="w-12 h-12 rounded-lg bg-info/10 flex items-center justify-center">
                        <span className="text-info font-bold text-xs">PayPal</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">PayPal</h3>
                        <p className="text-sm text-muted-foreground">Pay with your PayPal account</p>
                      </div>
                    </button>
                  </div>

                  {paymentMethod === "mpesa" && (
                    <div className="p-4 rounded-xl bg-muted mb-6">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        M-Pesa Phone Number
                      </label>
                      <Input placeholder="+254 7XX XXX XXX" />
                      <p className="text-xs text-muted-foreground mt-2">
                        You will receive an M-Pesa prompt to complete the payment
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <Shield className="w-5 h-5 text-success" />
                    Your payment is secure and encrypted
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button className="flex-1" size="lg">
                      Pay {provider.price}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl p-6 shadow-card sticky top-24">
                <h3 className="font-semibold text-foreground mb-4">Booking Summary</h3>

                {/* Provider Info */}
                <div className="flex items-center gap-4 pb-4 border-b border-border mb-4">
                  <img
                    src={provider.image}
                    alt={provider.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-foreground">{provider.name}</h4>
                    <p className="text-sm text-muted-foreground">{provider.profession}</p>
                  </div>
                </div>

                {/* Service Details */}
                <div className="space-y-3 pb-4 border-b border-border mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service</span>
                    <span className="font-medium text-foreground">{provider.service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium text-foreground">{provider.duration}</span>
                  </div>
                  {selectedDate && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-medium text-foreground">{formatDate(selectedDate)}</span>
                    </div>
                  )}
                  {selectedTime && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time</span>
                      <span className="font-medium text-foreground">{selectedTime}</span>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service Fee</span>
                    <span className="text-foreground">{provider.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Platform Fee</span>
                    <span className="text-foreground">KSh 150</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-border">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="font-semibold text-primary text-lg">KSh 1,650</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingPage;
