import { Code, Wand2, Box, Rocket, Globe, Users } from 'lucide-react'

export default function Features() {
  const makerJourney = [
    {
      phase: "1",
      title: "Design",
      description: "Create beautiful designs in Figma with AI assistance",
      icon: Wand2,
      features: ["AI Design Generation", "Smart Components", "Auto-complete layouts"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      phase: "2", 
      title: "Convert",
      description: "Transform designs into production-ready code instantly",
      icon: Code,
      features: ["CSS/TailwindCSS", "React Components", "Vue/Angular support"],
      color: "from-purple-500 to-pink-500"
    },
    {
      phase: "3",
      title: "Build", 
      description: "Create complete applications with generated components",
      icon: Box,
      features: ["Component Library", "Design System", "Template Gallery"],
      color: "from-orange-500 to-red-500"
    },
    {
      phase: "4",
      title: "Ship",
      description: "Deploy and scale your creations to the world",
      icon: Rocket,
      features: ["One-click Deploy", "Global CDN", "Performance Optimization"],
      color: "from-green-500 to-teal-500"
    }
  ]

  const platformFeatures = [
    {
      icon: Globe,
      title: "Global Ready",
      description: "Built for creators worldwide with multi-language support and local optimization."
    },
    {
      icon: Users,
      title: "Maker Community", 
      description: "Join thousands of makers sharing components, templates, and knowledge."
    }
  ]

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The Complete <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Maker Journey</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From initial concept to production deployment. Everything you need to transform ideas into reality.
          </p>
        </div>

        {/* Maker Journey Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {makerJourney.map((step, index) => (
            <div key={step.phase} className="relative group">
              {/* Connection Line */}
              {index < makerJourney.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent transform translate-x-4 z-0"></div>
              )}
              
              <div className="relative z-10 bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:border-gray-300 group-hover:scale-105">
                {/* Phase Number */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} text-white font-bold text-lg mb-6`}>
                  {step.phase}
                </div>

                {/* Icon */}
                <step.icon className={`w-8 h-8 mb-4 bg-gradient-to-r ${step.color} bg-clip-text text-transparent`} />

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 mb-6">{step.description}</p>

                {/* Features List */}
                <ul className="space-y-2">
                  {step.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-gray-500">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${step.color} mr-3`}></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Platform Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {platformFeatures.map((feature) => (
            <div key={feature.title} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <feature.icon className="w-10 h-10 text-purple-600 mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full border border-purple-200">
            <Rocket className="w-5 h-5 text-purple-600" />
            <span className="font-semibold text-purple-800">Ready to start your maker journey?</span>
          </div>
        </div>
      </div>
    </section>
  )
} 