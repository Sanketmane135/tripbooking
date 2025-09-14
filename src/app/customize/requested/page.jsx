'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

function page() {
    const router=useRouter();
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
            <h1 className="text-4xl font-bold  mb-4 text-gray-800">
Your Trip Customization Request Has Been Submitted!</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
Thank you for customizing your trip with us. We are reviewing your request and will craft the perfect itinerary just for you.            </p>
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
                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#ff0088"><path d="M446.67-240h66.66v-40h53.34q14.16 0 23.75-9.58 9.58-9.59 9.58-23.75V-440q0-14.17-9.58-23.75-9.59-9.58-23.75-9.58h-140v-60H600V-600h-86.67v-40h-66.66v40h-53.34q-14.16 0-23.75 9.58-9.58 9.59-9.58 23.75V-440q0 14.17 9.58 23.75 9.59 9.58 23.75 9.58h140v60H360V-280h86.67v40Zm-220 160q-27 0-46.84-19.83Q160-119.67 160-146.67v-666.66q0-27 19.83-46.84Q199.67-880 226.67-880h334L800-640.67v494q0 27-19.83 46.84Q760.33-80 733.33-80H226.67Zm0-66.67h506.66v-464.66l-202-202H226.67v666.66Zm0 0v-666.66 666.66Z"/></svg>                </div>
                <h3 className="font-semibold  mb-2 text-gray-700">Request Status</h3>
                <p className="text-muted-foreground text-sm">Under Review</p>
              </div>
            </div>

            <div className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
               <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#ff0088"><path d="M146.67-160q-27 0-46.84-19.83Q80-199.67 80-226.67v-506.66q0-27 19.83-46.84Q119.67-800 146.67-800h666.66q27 0 46.84 19.83Q880-760.33 880-733.33v506.66q0 27-19.83 46.84Q840.33-160 813.33-160H146.67ZM480-454.67 146.67-670v443.33h666.66V-670L480-454.67Zm0-66.66 330.67-212H150l330 212ZM146.67-670v-63.33V-226.67-670Z"/></svg>
                </div>
                <h3 className="font-semibold text-gray-700 mb-2">Expected Response Time</h3>
                <p className="text-muted-foreground text-sm">You can expect a personalized response within 24-48 hours</p>
              </div>
            </div>

            <div className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#ff0088"><path d="M653.33-160v-280H800v280H653.33Zm-246.66 0v-640h146.66v640H406.67ZM160-160v-440h146.67v440H160Z"/></svg>
                </div>
                <h3 className="font-semibold text-gray-700 mb-2">What Happens Next</h3>
                <p className="text-muted-foreground text-sm">Our travel experts will review your preferences and create a tailored itinerary with personalized recommendations</p>
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
            
            <button variant="success" size="lg" className='border p-2 px-4 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition' onClick={()=>router.push('/')}>
              Go to Home
            </button>
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