import Layout from "@/components/layout/Layout";
import { Shield, Eye, Database, Lock, Globe, Mail, UserCheck } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="py-16 bg-secondary/30">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Privacy Policy</h1>
                <p className="text-muted-foreground">Last updated: January 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl p-8 shadow-card mb-8">
              <p className="text-muted-foreground leading-relaxed">
                At Huduma, we take your privacy seriously. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our platform. Please read 
                this policy carefully.
              </p>
            </div>

            {/* Section 1 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground m-0">1. Information We Collect</h2>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-card">
                <h3 className="text-lg font-semibold text-foreground mb-3">Personal Information</h3>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Full name and contact information (email, phone number)</li>
                  <li>Government ID for verification (service providers)</li>
                  <li>Location data (city, estate)</li>
                  <li>Profile photos and portfolio images</li>
                  <li>Payment information (M-Pesa number, bank details)</li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground mb-3">Usage Information</h3>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Booking history and service preferences</li>
                  <li>Reviews and ratings you provide</li>
                  <li>Messages and communications on the platform</li>
                  <li>Device information and IP address</li>
                  <li>Browsing behavior and search queries</li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground mb-3">Automatically Collected</h3>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Cookies and similar tracking technologies</li>
                  <li>Log files and analytics data</li>
                  <li>Location data (with your permission)</li>
                </ul>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground m-0">2. How We Use Your Information</h2>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-card">
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Facilitate connections between customers and service providers</li>
                  <li>Process payments and manage transactions</li>
                  <li>Verify service provider identities and credentials</li>
                  <li>Improve our platform and user experience</li>
                  <li>Send service updates, marketing communications (with consent)</li>
                  <li>Detect and prevent fraud and abuse</li>
                  <li>Comply with legal obligations</li>
                  <li>Resolve disputes and provide customer support</li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground m-0">3. Information Sharing</h2>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-card">
                <p className="text-muted-foreground mb-4">We may share your information with:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Service Providers/Customers:</strong> To facilitate bookings and service delivery</li>
                  <li><strong>Payment Processors:</strong> M-Pesa, Flutterwave, and banks for transactions</li>
                  <li><strong>Verification Partners:</strong> For background checks and ID verification</li>
                  <li><strong>Legal Authorities:</strong> When required by law or to protect rights</li>
                  <li><strong>Analytics Partners:</strong> To improve our services (anonymized data)</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  We do NOT sell your personal information to third parties for marketing purposes.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground m-0">4. Data Security</h2>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-card">
                <p className="text-muted-foreground mb-4">We implement industry-standard security measures:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>SSL/TLS encryption for all data transmission</li>
                  <li>Encrypted storage of sensitive information</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Access controls and authentication protocols</li>
                  <li>Employee training on data protection</li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <UserCheck className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground m-0">5. Your Rights</h2>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-card">
                <p className="text-muted-foreground mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                  <li><strong>Portability:</strong> Receive your data in a portable format</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                  <li><strong>Withdraw Consent:</strong> Revoke permissions at any time</li>
                </ul>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Data Retention</h2>
              <div className="bg-card rounded-xl p-6 shadow-card">
                <p className="text-muted-foreground">
                  We retain your personal information for as long as your account is active or as needed 
                  to provide services. After account deletion, we may retain certain information for up 
                  to 7 years for legal compliance, dispute resolution, and fraud prevention purposes.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Children's Privacy</h2>
              <div className="bg-card rounded-xl p-6 shadow-card">
                <p className="text-muted-foreground">
                  Our platform is not intended for users under 18 years of age. We do not knowingly 
                  collect personal information from children. If we become aware of such collection, 
                  we will delete the information immediately.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground m-0">8. Contact Us</h2>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-card">
                <p className="text-muted-foreground mb-4">
                  For privacy-related inquiries or to exercise your rights, contact us at:
                </p>
                <p className="text-foreground font-medium">Email: privacy@huduma.co.ke</p>
                <p className="text-foreground font-medium">Phone: +254 700 000 000</p>
                <p className="text-foreground font-medium">Data Protection Officer: dpo@huduma.co.ke</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
