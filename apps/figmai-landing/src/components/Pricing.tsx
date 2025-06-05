"use client";

import { Check, Star } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Open Source",
      price: "Free",
      period: "forever",
      description: "Perfect for individual developers and small projects",
      features: [
        "Core CSSMA library",
        "Basic Tailwind to Figma conversion",
        "GitHub community support",
        "MIT license",
        "Documentation access"
      ],
      cta: "Get Started",
      href: "https://github.com/easylogic/cssma",
      popular: false
    },
    {
      name: "Pro Plugin", 
      price: "$29",
      period: "one-time",
      description: "Advanced Figma plugin with extra features",
      features: [
        "All Open Source features",
        "Advanced Figma plugin",
        "Real-time sync",
        "Component templates",
        "Priority support",
        "Regular updates"
      ],
      cta: "Get Plugin",
      href: "#",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For teams and organizations with custom needs",
      features: [
        "All Pro features",
        "Custom integrations",
        "Dedicated support",
        "Training sessions",
        "SLA guarantee",
        "White-label options"
      ],
      cta: "Contact Sales",
      href: "mailto:contact@cssma.dev",
      popular: false
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start for free with our open-source library, upgrade when you need more features
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-8 shadow-lg border ${
                plan.popular
                  ? "border-purple-200 ring-2 ring-purple-100"
                  : "border-gray-200"
              } hover:shadow-xl transition-shadow duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period && (
                    <span className="text-gray-600 ml-2">/ {plan.period}</span>
                  )}
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.href}
                target={plan.href.startsWith("http") ? "_blank" : undefined}
                rel={plan.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`block w-full text-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  plan.popular
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:scale-105"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* FAQ or Additional Info */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">
            Questions about pricing? We're here to help.
          </p>
          <a
            href="mailto:contact@cssma.dev"
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            Contact our team →
          </a>
        </div>
      </div>
    </section>
  );
} 