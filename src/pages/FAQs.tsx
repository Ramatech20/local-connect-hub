import Layout from "@/components/layout/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Users, CreditCard, Shield, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const faqs = {
  general: [
    {
      question: "What is Huduma?",
      answer: "Huduma is Kenya's trusted marketplace connecting customers with verified local service providers. We offer services ranging from cleaning, plumbing, and electrical work to beauty, tutoring, and more across major cities including Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, and Kakamega."
    },
    {
      question: "How does Huduma work?",
      answer: "Simply search for the service you need, browse verified providers in your area, compare ratings and prices, then book directly through our platform. Pay securely via M-Pesa or card, and enjoy quality service from trusted professionals."
    },
    {
      question: "Is Huduma available in my city?",
      answer: "We currently operate in Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, and Kakamega, covering major estates within these cities. We're continuously expanding to new areas."
    },
    {
      question: "How do I create an account?",
      answer: "Click 'Get Started' on the homepage, fill in your details, and verify your email. You can register as a customer looking for services or as a service provider offering your skills."
    },
  ],
  customers: [
    {
      question: "How do I book a service?",
      answer: "Search for the service you need, select a provider based on ratings and reviews, choose your preferred date and time, add any special instructions, and complete the booking with secure payment."
    },
    {
      question: "How do I pay for services?",
      answer: "We accept M-Pesa (our most popular option), debit/credit cards, and bank transfers. Payment is held securely until the job is completed to your satisfaction."
    },
    {
      question: "What if I'm not satisfied with the service?",
      answer: "If you're unsatisfied, report the issue within 48 hours through our dispute resolution system. Our team will mediate and ensure a fair resolution, including refunds where applicable."
    },
    {
      question: "Can I cancel a booking?",
      answer: "Yes, you can cancel at least 24 hours before the scheduled service for a full refund. Cancellations made less than 24 hours in advance may incur a cancellation fee."
    },
    {
      question: "How do I leave a review?",
      answer: "After your service is completed, you'll receive a prompt to rate and review your provider. Your honest feedback helps maintain quality on our platform."
    },
  ],
  providers: [
    {
      question: "How do I become a service provider on Huduma?",
      answer: "Register as a provider, complete your profile with your services and pricing, submit required documents for verification (ID, certifications), and once approved, you can start receiving bookings."
    },
    {
      question: "What are Huduma's commission rates?",
      answer: "We charge a platform commission of 10-20% on completed bookings, depending on the service category. This covers payment processing, customer support, and marketing."
    },
    {
      question: "How and when do I get paid?",
      answer: "Earnings are paid out weekly via M-Pesa every Friday. The minimum payout threshold is KES 500. You can track all your earnings in your provider dashboard."
    },
    {
      question: "What verification is required?",
      answer: "We require a valid government ID, professional certifications (where applicable), and consent for background checks. This ensures customer trust and platform safety."
    },
    {
      question: "How can I get more bookings?",
      answer: "Maintain a high rating, respond quickly to inquiries, complete your profile fully, add portfolio photos, and consider our featured listing options for increased visibility."
    },
  ],
  payments: [
    {
      question: "Is my payment information secure?",
      answer: "Absolutely. We use bank-level encryption and partner with trusted payment processors (M-Pesa, Flutterwave) to ensure all transactions are secure."
    },
    {
      question: "What is the payment protection policy?",
      answer: "Payments are held securely until the service is completed. This protects both customers and providers, ensuring fair transactions for everyone."
    },
    {
      question: "Are there any hidden fees?",
      answer: "No. The price you see is what you pay. All platform fees are clearly displayed during checkout before you confirm your booking."
    },
    {
      question: "How do refunds work?",
      answer: "Refunds are processed within 5-7 business days to your original payment method. For M-Pesa, refunds typically arrive within 24-48 hours."
    },
  ],
  safety: [
    {
      question: "How are service providers verified?",
      answer: "All providers undergo ID verification, background checks (where applicable), skill assessment, and continuous monitoring through customer reviews and ratings."
    },
    {
      question: "What safety measures are in place?",
      answer: "We verify all providers, offer secure in-app messaging, hold payments until job completion, and have a dedicated support team for any issues."
    },
    {
      question: "How do I report a problem?",
      answer: "Use the 'Report Issue' button in your booking details, contact our support team via chat, email, or phone. We respond to all reports within 24 hours."
    },
  ],
};

const FAQs = () => {
  return (
    <Layout>
      {/* Hero */}
      <div className="py-16 bg-secondary/30">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about using Huduma
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Sections */}
      <div className="py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* General */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">General Questions</h2>
              </div>
              <Accordion type="single" collapsible className="bg-card rounded-2xl shadow-card">
                {faqs.general.map((faq, index) => (
                  <AccordionItem key={index} value={`general-${index}`} className="border-border/50">
                    <AccordionTrigger className="px-6 hover:no-underline text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* For Customers */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">For Customers</h2>
              </div>
              <Accordion type="single" collapsible className="bg-card rounded-2xl shadow-card">
                {faqs.customers.map((faq, index) => (
                  <AccordionItem key={index} value={`customers-${index}`} className="border-border/50">
                    <AccordionTrigger className="px-6 hover:no-underline text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* For Providers */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">For Service Providers</h2>
              </div>
              <Accordion type="single" collapsible className="bg-card rounded-2xl shadow-card">
                {faqs.providers.map((faq, index) => (
                  <AccordionItem key={index} value={`providers-${index}`} className="border-border/50">
                    <AccordionTrigger className="px-6 hover:no-underline text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* Payments */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Payments & Billing</h2>
              </div>
              <Accordion type="single" collapsible className="bg-card rounded-2xl shadow-card">
                {faqs.payments.map((faq, index) => (
                  <AccordionItem key={index} value={`payments-${index}`} className="border-border/50">
                    <AccordionTrigger className="px-6 hover:no-underline text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* Safety */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Trust & Safety</h2>
              </div>
              <Accordion type="single" collapsible className="bg-card rounded-2xl shadow-card">
                {faqs.safety.map((faq, index) => (
                  <AccordionItem key={index} value={`safety-${index}`} className="border-border/50">
                    <AccordionTrigger className="px-6 hover:no-underline text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          </div>
        </div>
      </div>

      {/* Still Have Questions CTA */}
      <div className="py-16 gradient-primary">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Still Have Questions?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-card text-foreground hover:bg-card/90">
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default FAQs;
