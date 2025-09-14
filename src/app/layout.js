import "./globals.css"
import Providers from "./providers"


export const metadata = {
  title: "Book Trip Packages & Plan Custom Tours | Bagpack Trips",
  icons: {
    icon: "/logo.jpg",
  },
  description:
    "Discover affordable trip packages or design your own custom travel plan. Explore destinations, book secure trips, and create unforgettable memories with Bagpack Trips.",
  keywords: [
    "trip booking website",
    "travel packages",
    "custom trips",
    "holiday booking",
    "vacation planner",
    "family tours",
    "honeymoon packages",
    "budget trips",
    "adventure tours",
  ],
  openGraph: {
    title: "Book Trip Packages & Plan Custom Tours | Bagpack Trips",
    description:
      "Browse curated travel packages or plan your own custom trip. Safe booking, flexible itineraries, and unforgettable experiences.",
    url: "https://yourdomain.com",
    siteName: "Bagpack Trips",
    images: [
      {
        src: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Bagpack Trips Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Trip Packages & Plan Custom Tours | Bagpack Trips",
    description:
      "Discover travel packages or create your own custom trip plan with Bagpack Trips.",
    images: ["https://yourdomain.com/preview-image.jpg"],
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
