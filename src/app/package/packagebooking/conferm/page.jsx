import Link from 'next/link'
import React from 'react'

function page() {
  return (
     <div className="min-h-screen bg-gradient-sky">
      {/* Header */}
      

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-success rounded-full mb-6 shadow-success">
              {/* <CheckCircle className="w-10 h-10 text-success-foreground" /> */}
            </div>
            <h1 className="text-4xl font-bold  mb-4 text-gray-800">Trip <span className='text-pink-500'>Successfully</span>  Booked!</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Congratulations! Your amazing adventure awaits. We're processing your booking and will confirm all details within 24 hours.
            </p>
          </div>

          {/* Hero Image */}
          {/* <div className="mb-12 rounded-2xl overflow-hidden shadow-glow">
            <img 
              src="/conferm.jpg" 
              alt="Travel confirmation illustration"
              className="w-1/2  object-cover"
            />
          </div> */}

          {/* Status Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#ff0088"><path d="M312-146.67h336v-124.66q0-70-49-118.67t-119-48.67q-70 0-119 48.67t-49 118.67v124.66Zm168-374.66q70 0 119-49t49-119v-124H312v124q0 70 49 119t119 49ZM160-80v-66.67h85.33v-124.66q0-67.67 36.17-124.17t97.17-84.5q-61-28.67-97.17-85.17t-36.17-124.16v-124H160V-880h640v66.67h-85.33v124q0 67.66-36.17 124.16T581.33-480q61 28 97.17 84.5t36.17 124.17v124.66H800V-80H160Zm320-66.67Zm0-666.66Z"/></svg>
                </div>
                <h3 className="font-semibold  mb-2 text-gray-700">Processing Time</h3>
                <p className="text-muted-foreground text-sm">24 hours for confirmation</p>
              </div>
            </div>

            <div className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
               <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#ff0088"><path d="M146.67-160q-27 0-46.84-19.83Q80-199.67 80-226.67v-506.66q0-27 19.83-46.84Q119.67-800 146.67-800h666.66q27 0 46.84 19.83Q880-760.33 880-733.33v506.66q0 27-19.83 46.84Q840.33-160 813.33-160H146.67ZM480-454.67 146.67-670v443.33h666.66V-670L480-454.67Zm0-66.66 330.67-212H150l330 212ZM146.67-670v-63.33V-226.67-670Z"/></svg>
                </div>
                <h3 className="font-semibold text-gray-700 mb-2">Email Updates</h3>
                <p className="text-muted-foreground text-sm">Check your Gmail inbox</p>
              </div>
            </div>

            <div className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#ff0088"><path d="M653.33-160v-280H800v280H653.33Zm-246.66 0v-640h146.66v640H406.67ZM160-160v-440h146.67v440H160Z"/></svg>
                </div>
                <h3 className="font-semibold text-gray-700 mb-2">Trip Status</h3>
                <p className="text-muted-foreground text-sm">Track in your dashboard</p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="border-0 shadow-xl bg-white/95 backdrop-blur-sm mb-8">
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">What's Next?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Wait for Confirmation</h4>
                    <p className="text-muted-foreground">We'll process your booking within 24 hours and send you a detailed confirmation.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Check Your Email</h4>
                    <p className="text-muted-foreground">Keep an eye on your Gmail inbox for important updates and documents.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Monitor Dashboard</h4>
                    <p className="text-muted-foreground">Track your trip status and access all booking details in your personal dashboard.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
            <button variant="success" size="lg" className='p-2 border bg-pink-500 text-white rounded'>
              Go to Home
            </button>
            </Link>
          </div>

          {/* Support Info */}
          <div className="text-center mt-12 p-6 bg-muted/30 rounded-xl">
            <p className="text-muted-foreground mb-2">
              Need help or have questions about your booking?
            </p>
            <button variant="link" className="text-primary hover:text-primary-glow">
              Contact Support
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default page