import { Users, Share2, Award, MessageSquare, Heart, Zap } from 'lucide-react'

export default function Community() {
  const communityFeatures = [
    {
      icon: Share2,
      title: "Share & Collaborate",
      description: "Share your components, templates, and designs with the global maker community",
      stats: "500K+ components shared"
    },
    {
      icon: Award,
      title: "Maker Recognition",
      description: "Get featured for outstanding work and earn maker badges for your contributions",
      stats: "10K+ featured makers"
    },
    {
      icon: MessageSquare,
      title: "Knowledge Exchange",
      description: "Join discussions, get feedback, and learn from experienced makers worldwide",
      stats: "1M+ conversations"
    }
  ]

  const makerSpotlight = [
    {
      name: "Elena Vasquez",
      title: "Design System Architect",
      achievement: "Built the most-used component library",
      downloads: "250K",
      avatar: "EV",
      gradient: "from-pink-400 to-rose-400"
    },
    {
      name: "David Park", 
      title: "Full-Stack Maker",
      achievement: "Created 15 popular templates",
      downloads: "180K",
      avatar: "DP",
      gradient: "from-blue-400 to-cyan-400"
    },
    {
      name: "Lisa Chen",
      title: "AI Design Pioneer", 
      achievement: "Top contributor in AI tools",
      downloads: "320K",
      avatar: "LC",
      gradient: "from-purple-400 to-indigo-400"
    }
  ]

  return (
    <section id="community" className="py-24 bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Join the <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Maker Community</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with 50,000+ designers and developers who are building the future of digital products
          </p>
        </div>

        {/* Community Stats Banner */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16 border border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center mb-3">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">50K+</div>
              <div className="text-sm text-gray-600">Active Makers</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-3">
                <Share2 className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">500K+</div>
              <div className="text-sm text-gray-600">Shared Components</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-3">
                <Heart className="w-8 h-8 text-pink-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">2M+</div>
              <div className="text-sm text-gray-600">Community Likes</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-3">
                <Zap className="w-8 h-8 text-yellow-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">100+</div>
              <div className="text-sm text-gray-600">Countries</div>
            </div>
          </div>
        </div>

        {/* Community Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {communityFeatures.map((feature) => (
            <div key={feature.title} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-purple-600" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <div className="text-sm font-semibold text-purple-600">{feature.stats}</div>
            </div>
          ))}
        </div>

        {/* Maker Spotlight */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Maker Spotlight</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {makerSpotlight.map((maker) => (
              <div key={maker.name} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                {/* Avatar */}
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${maker.gradient} flex items-center justify-center text-white font-bold text-xl mb-6`}>
                  {maker.avatar}
                </div>

                {/* Content */}
                <h4 className="text-xl font-bold text-gray-900 mb-2">{maker.name}</h4>
                <p className="text-purple-600 font-semibold text-sm mb-3">{maker.title}</p>
                <p className="text-gray-600 mb-4">{maker.achievement}</p>
                
                {/* Stats */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">{maker.downloads}</span>
                  <span className="text-sm text-gray-500">downloads</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Join Community CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-white">
                         <h3 className="text-3xl font-bold mb-6">Ready to Join the Movement?</h3>
                         <p className="text-xl mb-8 text-purple-100">
               Become part of the world&apos;s fastest-growing maker community
             </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                Join Community
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300">
                Browse Gallery
              </button>
            </div>

            {/* Social Proof */}
            <div className="mt-8 flex items-center justify-center gap-6 text-purple-200 text-sm">
              <span>• Free to join</span>
              <span>• 24/7 support</span>
              <span>• Weekly maker meetups</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
