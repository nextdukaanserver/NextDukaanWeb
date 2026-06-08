import Navbar       from './components/Navbar';
import Hero         from './components/Hero';
import Services     from './components/Services';
import Pricing      from './components/Pricing';
import Portfolio    from './components/Portfolio';
import WhyUs        from './components/WhyUs';
import Process      from './components/Process';
import Testimonials from './components/Testimonials';
import ContactCTA   from './components/ContactCTA';
import Footer       from './components/Footer';
import WhatsAppFAB  from './components/WhatsAppFAB';
import Technology from './components/Technology';


export default function App() {
  return (
    <div className="relative" style={{ background: '#020617', color: '#f8fafc' }}>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Pricing />
        <Portfolio />
        <Technology />
        <WhyUs />
        
        <Process />
        <Testimonials />
        <ContactCTA />
      </main>
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
