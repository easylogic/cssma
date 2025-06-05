import { ArrowRight, Download, Zap, CheckCircle, Clock, Users } from 'lucide-react'

export default function GetStarted() {
  const quickStart = [
    {
      step: "1",
      title: "Install Plugin",
      description: "Add Figm.ai to your Figma workspace in seconds",
      time: "30 sec",
      icon: Download
    },
    {
      step: "2", 
      title: "Create Account",
      description: "Join the maker community with one-click signup",
      time: "1 min",
      icon: Users
    },
    {
      step: "3",
      title: "Start Making",
      description: "Convert your first design to code instantly",
      time: "2 min",
      icon: Zap
    }
  ]

  const pricing = [
    {
      name: "Maker Starter",
      price: "Free",
      description: "Perfect for getting started",
      features: [
        "100 conversions/month",
        "Basic CSS generation",
        "Community support",
        "Public gallery access"
      ],
      cta: "Start Free",
      popular: false,
      gradient: "from-gray-50 to-gray-100"
    },
    {
      name: "Maker Pro",
      price: "$19",
      period: "/month",
      description: "For professional makers",
      features: [
        "Unlimited conversions",
        "AI design generation",
        "Private components",
        "Priority support",
        "Advanced templates",
        "Team collaboration"
      ],
      cta: "Start Trial",
      popular: true,
      gradient: "from-purple-50 to-blue-50"
    },
    {
      name: "Maker Team",
      price: "$99",
      period: "/month",
      description: "For teams & enterprises",
      features: [
        "Everything in Pro",
        "Team management",
        "SSO integration",
        "Custom branding",
        "API access",
        "Dedicated support"
      ],
      cta: "Contact Sales",
      popular: false,
      gradient: "from-blue-50 to-indigo-50"
    }
  ]

  return (
    <section id="get-started" className="py-24 bg-gradient-to-br from-white via-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Start Your <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Maker Journey</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join 50,000+ designers who transformed their careers. From mockups to reality in minutes.
          </p>
        </div>

        {/* Quick Start Process */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">Get started in 3 steps</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickStart.map((step, index) => (
              <div key={step.step} className="relative">
                {/* Connection Line */}
                {index < quickStart.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-purple-300 to-transparent transform translate-x-4 z-0"></div>
                )}
                
                <div className="relative z-10 bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                  {/* Step Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold text-lg flex items-center justify-center">
                      {step.step}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      {step.time}
                    </div>
                  </div>

                  {/* Icon */}
                  <step.icon className="w-10 h-10 text-purple-600 mb-4" />

                  {/* Content */}
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h4>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Start CTA */}
          <div className="text-center mt-12">
            <button className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-12 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto">
              Start Your Journey Now
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-sm text-gray-500 mt-3">No credit card required • 14-day free trial</p>
          </div>
        </div>

        {/* Pricing Plans */}
        <div>
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-4">Choose Your Maker Plan</h3>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Scale from hobby projects to enterprise solutions. Upgrade anytime as you grow.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing.map((plan) => (
              <div 
                key={plan.name} 
                className={`relative rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border ${
                  plan.popular 
                    ? 'border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50' 
                    : 'border-gray-200 bg-white'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h4>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    {plan.period && <span className="text-gray-600">{plan.period}</span>}
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button 
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>

          {/* Enterprise CTA */}
          <div className="text-center mt-16">
            <div className="bg-gray-900 rounded-2xl p-8 text-white">
              <h4 className="text-2xl font-bold mb-4">Enterprise Solutions</h4>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Custom integrations, dedicated support, and enterprise-grade security for large organizations.
              </p>
              <button className="bg-white text-gray-900 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                Contact Enterprise Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
