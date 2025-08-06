"use client"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[300px] bg-black flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{
            backgroundImage: "url('/placeholder.svg?height=300&width=1200&text=Perfume+Background')",
          }}
        />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">About us</h1>
          <nav className="text-sm">
            <Link href="/" className="hover:text-amber-300">
              Home
            </Link>
            <span className="mx-2">&gt;</span>
            <span>About us</span>
          </nav>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-amber-600 text-sm uppercase tracking-wide mb-2">HISTORY OF PERFUME INDUSTRY</p>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">About The Century Scents</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img
                src="/placeholder.svg?height=400&width=500&text=Perfume+Making+Process"
                alt="Perfume Making"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div>
              <p className="text-gray-600 leading-relaxed mb-6">
                The art of perfumery dates back thousands of years, with ancient civilizations like the Egyptians,
                Persians, and Greeks using fragrances in rituals, medicine, and personal grooming. As time progressed,
                perfumery flourished in the Islamic Golden Age and later in Renaissance Europe, especially in France,
                which became the global hub of luxury fragrance.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Today, the perfume industry blends centuries of tradition with cutting-edge technology, and luxury
                fragrance often comes at a high cost—until now.
              </p>
              <p className="text-gray-600 leading-relaxed">
                The Century Scents' slogan: Everyone Deserves to Smell Amazing.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="lg:order-2">
              <img
                src="/placeholder.svg?height=400&width=500&text=Luxury+Perfume+Collection"
                alt="Luxury Perfumes"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div className="lg:order-1">
              <p className="text-gray-600 leading-relaxed mb-6">
                Led by Syed Bilal bin Amir and Syed Talha bin Amir, two highly motivated and committed individuals, The
                Century Scents is more than just a brand—it's a mission. Their passion for excellence and drive to make
                premium fragrance accessible to all has made The Century Scents a reliable and respected source in the
                perfume world.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                The Century Scents has revolutionized the market by offering exceptional quality perfumes at very cheap
                prices. Built on the belief that everyone deserves to experience luxury without paying luxury prices,
                Century Scents is a trusted name for those seeking long-lasting, elegant, and affordable fragrances.
              </p>
              <p className="text-gray-600 leading-relaxed">
                What truly sets The Century Scents apart is its expertise in crafting high-quality impressions of
                world-famous perfume brands—delivering the same luxurious experience at a fraction of the cost. Every
                bottle reflects dedication to quality, attention to detail, and an unwavering commitment to customer
                satisfaction.
              </p>
              <p className="text-gray-600 leading-relaxed mt-6">
                With The Century Scents, you don't just wear a perfume you wear confidence, class, and quality that
                speaks volumes.
              </p>
            </div>
          </div>

          {/* Company History Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <div className="text-center">
              <img
                src="/placeholder.svg?height=300&width=400&text=Our+Company+History"
                alt="Company History"
                className="w-full rounded-lg shadow-lg mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-4">Our company history and facts</h3>
              <p className="text-gray-600 text-sm">
                Founded as incapable of drawing a single stroke at the present moment; and yet I feel that I never was a
                greater artist than now.
              </p>
            </div>
            <div className="text-center">
              <img
                src="/placeholder.svg?height=300&width=400&text=Perfume+3D+Animation"
                alt="3D Animation"
                className="w-full rounded-lg shadow-lg mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-4">Our company history and facts Lorem ipsum</h3>
              <p className="text-gray-600 text-sm">
                A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I
                enjoy with my whole heart.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
