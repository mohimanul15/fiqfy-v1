import React, { useState, useEffect } from 'react';
import { ArrowRight, Package, TrendingUp, Clock, Shield, CheckCircle, Menu, X, Star, Zap, Users, BarChart3 } from 'lucide-react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Framer Motion-like animation hook
const useInView = (ref) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return isInView;
};

// Animation wrapper component
const Motion = ({ children, className = '', delay = 0, type = 'fadeUp' }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const animations = {
    fadeUp: {
      initial: 'opacity-0 translate-y-10',
      animate: 'opacity-100 translate-y-0'
    },
    fadeIn: {
      initial: 'opacity-0',
      animate: 'opacity-100'
    },
    scaleIn: {
      initial: 'opacity-0 scale-95',
      animate: 'opacity-100 scale-100'
    },
    slideLeft: {
      initial: 'opacity-0 translate-x-10',
      animate: 'opacity-100 translate-x-0'
    },
    slideRight: {
      initial: 'opacity-0 -translate-x-10',
      animate: 'opacity-100 translate-x-0'
    }
  };

  const animation = animations[type] || animations.fadeUp;

  return (
    <div
      ref={ref}
      className={`${animation.initial} ${hasAnimated ? animation.animate : ''} transition-all duration-700 ease-out ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Package className="w-8 h-8" />,
      title: "Inventory Management",
      description: "Automated inventory tracking and restocking to prevent stockouts and maximize sales opportunities."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Dynamic Pricing",
      description: "AI-powered pricing strategies that adapt to market conditions and competitor movements in real-time."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Operations",
      description: "Round-the-clock automation ensures your store never sleeps, capturing sales at every hour."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Compliance & Security",
      description: "Stay compliant with Amazon policies while protecting your account from potential risks."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Analytics Dashboard",
      description: "Comprehensive insights into your store performance with actionable data visualizations."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Listing Optimization",
      description: "Automated SEO optimization for product listings to increase visibility and conversion rates."
    }
  ];

  const stats = [
    { number: "500+", label: "Active Stores" },
    { number: "2.5M+", label: "Orders Processed" },
    { number: "150%", label: "Avg Revenue Growth" },
    { number: "99.9%", label: "Uptime Guarantee" }
  ];

  const plans = [
    {
      name: "Starter",
      price: "299",
      features: ["Up to 100 SKUs", "Basic automation", "Email support", "Monthly reports", "Single marketplace"]
    },
    {
      name: "Professional",
      price: "699",
      features: ["Up to 1,000 SKUs", "Advanced automation", "Priority support", "Weekly reports", "Multi-marketplace", "Custom pricing rules"],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: ["Unlimited SKUs", "Full automation suite", "Dedicated account manager", "Real-time analytics", "Global marketplaces", "API access", "Custom integrations"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className={`flex items-center space-x-2 transition-all duration-500 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <Package className="w-8 h-8 text-orange-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">Fiqfy</span>
            </div>
            
            <div className={`hidden md:flex space-x-8 transition-all duration-700 delay-200 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
              <a href="#features" className="hover:text-orange-500 transition">Features</a>
              <a href="#how-it-works" className="hover:text-orange-500 transition">How It Works</a>
              <a href="#pricing" className="hover:text-orange-500 transition">Pricing</a>
              <a href="#testimonials" className="hover:text-orange-500 transition">Testimonials</a>
            </div>

            <div className={`hidden md:flex space-x-4 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <button className="px-4 py-2 hover:text-orange-500 transition">Sign In</button>
              <button className="px-6 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition transform hover:scale-105">
                Get Started
              </button>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-slate-800 border-t border-slate-700 animate-slideDown">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block hover:text-orange-500">Features</a>
              <a href="#how-it-works" className="block hover:text-orange-500">How It Works</a>
              <a href="#pricing" className="block hover:text-orange-500">Pricing</a>
              <a href="#testimonials" className="block hover:text-orange-500">Testimonials</a>
              <button className="w-full px-6 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg font-semibold mt-4">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Motion type="scaleIn" delay={100}>
            <div className="inline-flex items-center space-x-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-8">
              <Zap className="w-4 h-4 text-orange-500" />
              <span className="text-sm text-orange-400">Trusted by 500+ Amazon Sellers</span>
            </div>
          </Motion>
          
          <Motion type="fadeUp" delay={200}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Automate Your Amazon Store,
              <br />
              <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                Scale Your Success
              </span>
            </h1>
          </Motion>
          
          <Motion type="fadeUp" delay={400}>
            <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
              Transform your Amazon business with intelligent automation. Increase revenue by 150% while reducing manual work by 90%.
            </p>
          </Motion>
          
          <Motion type="fadeUp" delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-orange-500/50 transition transform hover:scale-105 flex items-center space-x-2">
                <span>Start Free Trial</span>
                <ArrowRight className="group-hover:translate-x-1 transition" />
              </button>
              <button className="px-8 py-4 border-2 border-slate-600 rounded-lg font-semibold text-lg hover:border-orange-500 transition">
                Watch Demo
              </button>
            </div>
          </Motion>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
            {stats.map((stat, index) => (
              <Motion key={index} type="scaleIn" delay={800 + index * 100}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-slate-400">{stat.label}</div>
                </div>
              </Motion>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <Motion type="fadeUp">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Powerful Features for
                <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent"> Modern Sellers</span>
              </h2>
              <p className="text-xl text-slate-300">Everything you need to run a successful Amazon business on autopilot</p>
            </div>
          </Motion>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Motion key={index} type="fadeUp" delay={index * 100}>
                <div className="group p-8 bg-slate-900/50 rounded-2xl border border-slate-700 hover:border-orange-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10 transform hover:-translate-y-2">
                  <div className="text-orange-500 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </div>
              </Motion>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Motion type="fadeUp">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
              <p className="text-xl text-slate-300">Get started in three simple steps</p>
            </div>
          </Motion>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Connect Your Store", desc: "Securely link your Amazon Seller Central account in minutes with our simple integration." },
              { step: "02", title: "Configure Automation", desc: "Set your business rules, pricing strategies, and inventory thresholds with our intuitive dashboard." },
              { step: "03", title: "Watch It Grow", desc: "Sit back as our AI handles operations 24/7, optimizing your store for maximum profitability." }
            ].map((item, index) => (
              <Motion key={index} type="fadeUp" delay={index * 200}>
                <div className="text-center transform hover:scale-105 transition-transform duration-300">
                  <div className="text-6xl font-bold text-orange-500/20 mb-4 transition-all duration-300 hover:text-orange-500/40">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-slate-400">{item.desc}</p>
                </div>
              </Motion>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <Motion type="fadeUp">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-xl text-slate-300">Choose the plan that fits your business</p>
            </div>
          </Motion>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Motion key={index} type="scaleIn" delay={index * 150}>
                <div className={`relative p-8 rounded-2xl transition-all duration-300 hover:scale-105 ${plan.popular ? 'bg-gradient-to-b from-orange-500/20 to-slate-900 border-2 border-orange-500 shadow-2xl shadow-orange-500/20' : 'bg-slate-900/50 border border-slate-700 hover:border-orange-500/30'}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 animate-bounce">
                      <span className="bg-gradient-to-r from-orange-500 to-yellow-500 text-slate-900 px-4 py-1 rounded-full text-sm font-bold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-5xl font-bold">${plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-slate-400">/month</span>}
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start space-x-3 opacity-0 animate-slideIn" style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'forwards' }}>
                        <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${plan.popular ? 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:shadow-lg hover:shadow-orange-500/50' : 'border-2 border-slate-600 hover:border-orange-500'}`}>
                    Get Started
                  </button>
                </div>
              </Motion>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Motion type="fadeUp">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Loved by Sellers Worldwide</h2>
              <p className="text-xl text-slate-300">See what our customers have to say</p>
            </div>
          </Motion>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Johnson", role: "Store Owner", text: "AutoStore transformed my business. Revenue up 200% in 6 months with half the effort!", rating: 5 },
              { name: "Michael Chen", role: "E-commerce Manager", text: "The automation is incredibly smart. It's like having a full team managing my store 24/7.", rating: 5 },
              { name: "Emily Rodriguez", role: "Amazon Seller", text: "Best investment I've made. The ROI was positive within the first month.", rating: 5 }
            ].map((testimonial, index) => (
              <Motion key={index} type="slideRight" delay={index * 150}>
                <div className="p-8 bg-slate-900/50 rounded-2xl border border-slate-700 hover:border-orange-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10 transform hover:-translate-y-2">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-orange-500 text-orange-500 animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                    ))}
                  </div>
                  <p className="text-slate-300 mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center font-bold text-slate-900 animate-pulse">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold">{testimonial.name}</div>
                      <div className="text-sm text-slate-400">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </Motion>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <Motion type="scaleIn">
        <section className="py-20 px-4 bg-gradient-to-r from-orange-500 to-yellow-500 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Ready to Scale Your Amazon Business?
            </h2>
            <p className="text-xl text-slate-800 mb-8">
              Join 500+ successful sellers and start your 14-day free trial today
            </p>
            <button className="px-8 py-4 bg-slate-900 text-white rounded-lg font-semibold text-lg hover:bg-slate-800 transition transform hover:scale-105 inline-flex items-center space-x-2 shadow-2xl">
              <span>Start Free Trial</span>
              <ArrowRight className="animate-pulse" />
            </button>
          </div>
        </section>
      </Motion>

      {/* Footer */}
      <footer className="py-12 px-4 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <Motion type="fadeUp" delay={0}>
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Package className="w-6 h-6 text-orange-500" />
                  <span className="text-xl font-bold">AutoStore</span>
                </div>
                <p className="text-slate-400">Automating Amazon success, one store at a time.</p>
              </div>
            </Motion>
            
            <Motion type="fadeUp" delay={100}>
              <div>
                <h4 className="font-bold mb-4">Product</h4>
                <ul className="space-y-2 text-slate-400">
                  <li><a href="#" className="hover:text-orange-500 transition">Features</a></li>
                  <li><a href="#" className="hover:text-orange-500 transition">Pricing</a></li>
                  <li><a href="#" className="hover:text-orange-500 transition">Integration</a></li>
                </ul>
              </div>
            </Motion>
            
            <Motion type="fadeUp" delay={200}>
              <div>
                <h4 className="font-bold mb-4">Company</h4>
                <ul className="space-y-2 text-slate-400">
                  <li><a href="#" className="hover:text-orange-500 transition">About</a></li>
                  <li><a href="#" className="hover:text-orange-500 transition">Blog</a></li>
                  <li><a href="#" className="hover:text-orange-500 transition">Careers</a></li>
                </ul>
              </div>
            </Motion>
            
            <Motion type="fadeUp" delay={300}>
              <div>
                <h4 className="font-bold mb-4">Support</h4>
                <ul className="space-y-2 text-slate-400">
                  <li><a href="#" className="hover:text-orange-500 transition">Help Center</a></li>
                  <li><a href="#" className="hover:text-orange-500 transition">Contact</a></li>
                  <li><a href="#" className="hover:text-orange-500 transition">API Docs</a></li>
                </ul>
              </div>
            </Motion>
          </div>
          
          <Motion type="fadeIn" delay={400}>
            <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
              <p>&copy; 2024 AutoStore. All rights reserved.</p>
            </div>
          </Motion>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        
        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }
      `}</style>
      <SpeedInsights />
    </div>
  );
}

export default App;