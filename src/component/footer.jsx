import React from 'react'

function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & About */}
        <div>
          <h2 className="text-white text-2xl font-bold mb-4">BagPack </h2>
          <p className="text-sm">
               Discover affordable trip packages or design your own custom travel plan. Explore destinations, book secure trips, and create unforgettable memories with Bagpack Trips
          </p>
        </div>

        {/* About Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">ABOUT</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">About</a></li>
            <li><a href="#" className="hover:text-white">Submit an issue</a></li>
            <li><a href="#" className="hover:text-white">GitHub Repo</a></li>
            <li><a href="#" className="hover:text-white">Slack</a></li>
          </ul>
        </div>

        {/* Getting Started */}
        <div>
          <h3 className="text-white font-semibold mb-3">GETTING STARTED</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Introduction</a></li>
            <li><a href="#" className="hover:text-white">Documentation</a></li>
            <li><a href="#" className="hover:text-white">Usage</a></li>
            <li><a href="#" className="hover:text-white">Globals</a></li>
            <li><a href="#" className="hover:text-white">Elements</a></li>
            <li><a href="#" className="hover:text-white">Collections</a></li>
            <li><a href="#" className="hover:text-white">Themes</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-semibold mb-3">RESOURCES</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">API</a></li>
            <li><a href="#" className="hover:text-white">Form Validations</a></li>
            <li><a href="#" className="hover:text-white">Visibility</a></li>
            <li><a href="#" className="hover:text-white">Accessibility</a></li>
            <li><a href="#" className="hover:text-white">Community</a></li>
            <li><a href="#" className="hover:text-white">Marketplace</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
        <p>© 2025 sanket mane. All rights reserved.</p>

        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#"></a>
          <a href="#"></a>
          <a href="#"></a>
          <a href="#"></a>
        </div>
      </div>
    </footer>
  )
}

export default Footer