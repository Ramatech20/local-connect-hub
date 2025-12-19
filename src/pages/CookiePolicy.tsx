import Layout from "@/components/layout/Layout";
import { Cookie, Settings, BarChart3, Shield, Mail } from "lucide-react";

const CookiePolicy = () => {
  return (
    <Layout>
      <div className="py-16 bg-secondary/30">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                <Cookie className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Cookie Policy</h1>
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
                This Cookie Policy explains how Huduma uses cookies and similar technologies to 
                recognize you when you visit our platform. It explains what these technologies are 
                and why we use them, as well as your rights to control our use of them.
              </p>
            </div>

            {/* Section 1 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">1. What Are Cookies?</h2>
              <div className="bg-card rounded-xl p-6 shadow-card">
                <p className="text-muted-foreground mb-4">
                  Cookies are small data files that are placed on your computer or mobile device when 
                  you visit a website. They are widely used to make websites work efficiently and provide 
                  reporting information.
                </p>
                <p className="text-muted-foreground">
                  Cookies set by the website owner (Huduma) are called "first-party cookies." Cookies 
                  set by parties other than the website owner are called "third-party cookies." Third-party 
                  cookies enable features like analytics and advertising.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground m-0">2. Types of Cookies We Use</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-card rounded-xl p-6 shadow-card">
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-success" />
                    Essential Cookies
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    These cookies are strictly necessary for the website to function. They enable core 
                    functionality such as security, network management, and account access.
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Authentication and login status</li>
                    <li>Security tokens</li>
                    <li>Session management</li>
                    <li>Load balancing</li>
                  </ul>
                </div>

                <div className="bg-card rounded-xl p-6 shadow-card">
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Analytics Cookies
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    These cookies help us understand how visitors interact with our website by collecting 
                    and reporting information anonymously.
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Page views and navigation patterns</li>
                    <li>Time spent on pages</li>
                    <li>Error reporting</li>
                    <li>Feature usage statistics</li>
                  </ul>
                </div>

                <div className="bg-card rounded-xl p-6 shadow-card">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Functional Cookies</h3>
                  <p className="text-muted-foreground mb-2">
                    These cookies enable enhanced functionality and personalization:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Remember your location preferences</li>
                    <li>Language settings</li>
                    <li>Theme preferences (dark/light mode)</li>
                    <li>Recently viewed services</li>
                  </ul>
                </div>

                <div className="bg-card rounded-xl p-6 shadow-card">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Marketing Cookies</h3>
                  <p className="text-muted-foreground mb-2">
                    These cookies are used to track visitors across websites to display relevant 
                    advertisements:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Google Ads tracking</li>
                    <li>Facebook Pixel</li>
                    <li>Retargeting campaigns</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Cookie Duration</h2>
              <div className="bg-card rounded-xl p-6 shadow-card">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Session Cookies</h3>
                    <p className="text-muted-foreground">
                      Temporary cookies that expire when you close your browser. Used for essential 
                      functions like maintaining your login session.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Persistent Cookies</h3>
                    <p className="text-muted-foreground">
                      Remain on your device for a set period (up to 2 years). Used to remember your 
                      preferences and provide personalized experience.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Managing Cookies</h2>
              <div className="bg-card rounded-xl p-6 shadow-card">
                <p className="text-muted-foreground mb-4">
                  You can control and manage cookies in several ways:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>
                    <strong>Browser Settings:</strong> Most browsers allow you to refuse or accept 
                    cookies, delete existing cookies, and set preferences for certain websites
                  </li>
                  <li>
                    <strong>Our Cookie Banner:</strong> When you first visit our site, you can choose 
                    which types of cookies to accept
                  </li>
                  <li>
                    <strong>Opt-out Links:</strong> For analytics and advertising cookies, you can 
                    opt out through Google Ads Settings and Facebook Ad Preferences
                  </li>
                </ul>
                <p className="text-muted-foreground mt-4 p-4 bg-secondary/50 rounded-lg">
                  <strong>Note:</strong> Blocking essential cookies may impact website functionality 
                  and your ability to use certain features.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Third-Party Cookies</h2>
              <div className="bg-card rounded-xl p-6 shadow-card">
                <p className="text-muted-foreground mb-4">We use services from these third parties:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Google Analytics:</strong> Website analytics and reporting</li>
                  <li><strong>Flutterwave:</strong> Payment processing</li>
                  <li><strong>M-Pesa:</strong> Mobile payment integration</li>
                  <li><strong>Google Ads:</strong> Advertising and remarketing</li>
                  <li><strong>Facebook:</strong> Social features and advertising</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Each third party has their own privacy and cookie policies. We encourage you to 
                  review them.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground m-0">6. Contact Us</h2>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-card">
                <p className="text-muted-foreground mb-4">
                  If you have questions about our use of cookies, contact us at:
                </p>
                <p className="text-foreground font-medium">Email: privacy@huduma.co.ke</p>
                <p className="text-foreground font-medium">Phone: +254 700 000 000</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CookiePolicy;
