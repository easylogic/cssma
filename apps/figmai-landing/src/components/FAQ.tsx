"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is CSSMA and how does it work?",
      answer:
        "CSSMA is a powerful library that converts Tailwind CSS classes to Figma properties and vice versa. It bridges the gap between design and development by providing seamless bi-directional conversion between design tokens and code.",
    },
    {
      question: "Is CSSMA really free to use?",
      answer:
        "Yes! CSSMA core library is completely free and open-source under the MIT license. You can use it in personal and commercial projects without any restrictions. We also offer premium plugins and enterprise support for advanced use cases.",
    },
    {
      question: "How accurate is the CSS to Figma conversion?",
      answer:
        "CSSMA provides highly accurate conversions for most common CSS properties. It supports layout properties (flexbox, grid), spacing, colors, typography, borders, and more. While not every CSS property has a direct Figma equivalent, we cover 95%+ of common use cases.",
    },
    {
      question: "Can I use CSSMA with existing Figma designs?",
      answer:
        "Absolutely! CSSMA can analyze existing Figma designs and generate equivalent Tailwind CSS classes. This makes it perfect for converting designs to code or maintaining consistency between design systems and frontend implementations.",
    },
    {
      question: "Do I need to be a developer to use CSSMA?",
      answer:
        "Not necessarily! While the core library is developer-focused, our Figma plugin provides a user-friendly interface for designers. Designers can work with familiar Figma interfaces while automatically generating developer-friendly CSS code.",
    },
    {
      question: "How does CSSMA compare to other design-to-code tools?",
      answer:
        "CSSMA stands out because it's specifically designed for the Tailwind CSS + Figma workflow. Instead of generating arbitrary CSS, it produces clean, maintainable Tailwind classes that developers actually want to use. Plus, it's open-source and extensible.",
    },
    {
      question: "Can I contribute to CSSMA development?",
      answer:
        "We welcome contributions! CSSMA is open-source on GitHub. You can report issues, suggest features, submit pull requests, or help with documentation. Check our contributing guidelines to get started.",
    },
    {
      question: "What's the difference between the free and pro versions?",
      answer:
        "The free version includes the core library and basic conversion features. The pro version adds the advanced Figma plugin, real-time sync, component templates, and priority support. Enterprise plans include custom integrations and dedicated support.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about CSSMA
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
              >
                <span className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our team is here to help you get the most out of CSSMA
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:contact@cssma.dev"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Contact Support
              </a>
              <a
                href="https://github.com/easylogic/cssma/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-gray-900 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Join Discussion
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 