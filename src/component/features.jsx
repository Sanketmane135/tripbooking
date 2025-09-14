import React from 'react'

function Features() {
    const features = [
    {
      id: "01",
      title: "Fast Performance",
      desc: "Our system is optimized to load quickly and handle high traffic effortlessly.",
      color: "from-pink-400 to-rose-500",
    },
    {
      id: "02",
      title: "Secure Authentication",
      desc: "We use industry-leading security protocols to protect your data.",
      color: "from-blue-400 to-indigo-500",
    },
    {
      id: "03",
      title: "Customizable",
      desc: "Easily tailor the platform to your unique needs with flexible options.",
      color: "from-purple-400 to-pink-500",
    },
    {
      id: "04",
      title: "24/7 Support",
      desc: "Our team is always available to help you whenever you need assistance.",
      color: "from-orange-400 to-red-500",
    },
  ];

  return (
     <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-gray-600 text-lg">
            Explore the key benefits that make our platform stand out.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 group"
            >
              {/* Number Badge */}
              <span
                className={`absolute -top-5 left-6 bg-gradient-to-r ${feature.color} text-white font-bold rounded-xl px-3 py-1 text-sm shadow-md`}
              >
                {feature.id}
              </span>

              {/* Content */}
              <h3 className="mt-6 text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition">
                {feature.title}
              </h3>
              <p className="mt-3 text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features