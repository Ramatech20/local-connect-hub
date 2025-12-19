import Layout from "@/components/layout/Layout";
import { FileText, Shield, CreditCard, AlertTriangle, Scale, Mail } from "lucide-react";

const TermsOfService = () => {
  return (
    <Layout>
      <div className="py-16 bg-secondary/30">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Terms of Service</h1>
                <p className="text-muted-foreground">Last updated: January 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="bg-card rounded-2xl p-8 shadow-card mb-8">
              <p className="text-muted-foreground leading-relaxed">
                Welcome to Huduma ("Platform", "we", "us", or "our"). By accessing or using our platform, 
                you agree to be bound by these Terms of Service. Please read them carefully before using 
                our services.
              </p>
            </div>

            {/* Section 1 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground m-0">1. Platform Overview</h2>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-card">
                <p className="text-muted-foreground mb-4">
                  Huduma is a marketplace platform that connects customers seeking local services with 
                  verified service providers in Kenya. We facilitate bookings, payments, and communication 
                  between parties but are not ourselves the provider of such services.
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>We act as an intermediary between service providers and customers</li>
                  <li>We charge a commission on completed bookings (10-20%)</li>
                  <li>We provide secure payment processing through M-Pesa and other methods</li>
                  <li>We verify service providers but do not guarantee their work</li>
                </ul>
              </div>
            </section>

            {/* Section 2 - For Customers */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground m-0">2. Terms for Customers</h2>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-card">
                <h3 className="text-lg font-semibold text-foreground mb-3">Account Responsibilities</h3>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>You must provide accurate and complete information when creating an account</li>
                  <li>You are responsible for maintaining the confidentiality of your account</li>
                  <li>You must be at least 18 years old to use our platform</li>
                  <li>You agree to use the platform only for lawful purposes</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-foreground mb-3">Booking & Payment</h3>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>All prices displayed are in Kenyan Shillings (KES)</li>
                  <li>Payment is held securely until service completion</li>
                  <li>Cancellations must be made at least 24 hours before scheduled service</li>
                  <li>Refunds are processed within 5-7 business days</li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground mb-3">Customer Conduct</h3>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Treat service providers with respect and dignity</li>
                  <li>Provide accurate job descriptions and requirements</li>
                  <li>Be available at the scheduled time for service delivery</li>
                  <li>Report any issues through our dispute resolution system</li>
                </ul>
              </div>
            </section>

            {/* Section 3 - For Providers */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground m-0">3. Terms for Service Providers</h2>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-card">
                <h3 className="text-lg font-semibold text-foreground mb-3">Verification Requirements</h3>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Provide valid government-issued ID for verification</li>
                  <li>Consent to background checks where applicable</li>
                  <li>Maintain accurate profile information and service listings</li>
                  <li>Keep certifications and licenses up to date</li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground mb-3">Commission & Payments</h3>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Huduma charges a platform commission of 10-20% on completed bookings</li>
                  <li>Earnings are paid out weekly via M-Pesa</li>
                  <li>Minimum payout threshold is KES 500</li>
                  <li>Providers are responsible for their own tax obligations</li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground mb-3">Service Standards</h3>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Deliver services as described in your listings</li>
                  <li>Respond to booking requests within 2 hours</li>
                  <li>Maintain a minimum 4.0 star rating</li>
                  <li>Complete jobs within agreed timeframes</li>
                  <li>Carry appropriate insurance for your services</li>
                </ul>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground m-0">4. Prohibited Activities</h2>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-card">
                <p className="text-muted-foreground mb-4">The following activities are strictly prohibited:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Fraudulent or misleading information</li>
                  <li>Circumventing platform payments</li>
                  <li>Harassment or discrimination of any kind</li>
                  <li>Sharing account credentials</li>
                  <li>Posting false reviews or ratings</li>
                  <li>Soliciting customers outside the platform</li>
                  <li>Using the platform for illegal services</li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Dispute Resolution</h2>
              <div className="bg-card rounded-xl p-6 shadow-card">
                <p className="text-muted-foreground mb-4">
                  In case of disputes between customers and service providers:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Report issues within 48 hours of service completion</li>
                  <li>Our support team will mediate within 5 business days</li>
                  <li>Decisions are final and binding on both parties</li>
                  <li>Repeated violations may result in account suspension</li>
                </ul>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Limitation of Liability</h2>
              <div className="bg-card rounded-xl p-6 shadow-card">
                <p className="text-muted-foreground">
                  Huduma is not liable for the quality of services provided by service providers, 
                  damages arising from service delivery, or disputes between parties. Our liability 
                  is limited to the platform fees collected. We are not responsible for any indirect, 
                  incidental, or consequential damages.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground m-0">7. Contact Us</h2>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-card">
                <p className="text-muted-foreground mb-4">
                  If you have questions about these Terms of Service, contact us at:
                </p>
                <p className="text-foreground font-medium">Email: legal@huduma.co.ke</p>
                <p className="text-foreground font-medium">Phone: +254 700 000 000</p>
                <p className="text-foreground font-medium">Address: Nairobi, Kenya</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfService;
