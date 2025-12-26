import Navbar from "./Navbar";
import Footer from "./Footer";
import MessagingCenter from "@/components/messaging/MessagingCenter";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 lg:pt-20">{children}</main>
      <Footer />
      <MessagingCenter />
    </div>
  );
};

export default Layout;
