import React from "react";
import Link from "next/link";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="scroll-smooth text-gray-800 font-sans pt-20">
      {/* Hero Section */}
      <section className="h-[40vh] min-h-[400px] flex flex-col md:flex-row items-center justify-between px-8 md:px-24 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="w-full md:w-1/2 py-8 md:py-16">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Redefining Nutrition<br />for <span className="text-green-600">Hustlers</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-lg">
            We&apos;re on a mission to fuel ambitious lives with scientifically crafted nutrition that doesn&apos;t compromise on health or time.
          </p>
        </div>
        <div className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-center">
          <Image
            src="/nxt-logo.png"
            alt="NXTKIND Logo"
            width={200}
            height={150}
            className="w-64 h-auto"
          />
        </div>
      </section>

      {/* Problem Statement */}
      <section className="bg-white py-20 px-8 md:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              The Hustlers Dilemma
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              In a world that moves at breakneck speed, proper nutrition has become the first casualty of ambition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-red-50 p-8 rounded-2xl border border-red-200">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">No Time to Eat Right</h3>
              <p className="text-gray-700">
                12-hour workdays, back-to-back meetings, and endless deadlines leave no room for proper meal planning or preparation.
              </p>
            </div>

            <div className="bg-orange-50 p-8 rounded-2xl border border-orange-200">
              <div className="text-4xl mb-4">🍕</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Fix Culture</h3>
              <p className="text-gray-700">
                Instant noodles, energy drinks, and processed snacks become the default fuel, leading to energy crashes and brain fog.
              </p>
            </div>

            <div className="bg-yellow-50 p-8 rounded-2xl border border-yellow-200">
              <div className="text-4xl mb-4">📉</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Performance Decline</h3>
              <p className="text-gray-700">
                Poor nutrition leads to decreased productivity, weakened immunity, and long-term health consequences that hustlers can&apos;t afford.
              </p>
            </div>
          </div>

          <div className="bg-gray-900 text-white p-12 rounded-3xl text-center">
            <h3 className="text-3xl font-bold mb-4">The Hidden Cost of Success</h3>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              &quot;We&apos;re building empires but destroying our bodies. We&apos;re achieving professional milestones while missing out on the energy and vitality needed to truly enjoy them.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-8 md:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Story
        </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Born from the lived experiences of founders who understood the struggle firsthand.
            </p>
      </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">The Genesis</h3>
              <p className="text-lg text-gray-700 mb-6">
                NXTKIND was born in the cramped office spaces and late-night startup sessions where our founders realized they were sacrificing their health for their dreams. Surviving on coffee, takeouts, and sporadic meals, they experienced firsthand the energy crashes, digestive issues, and mental fatigue that comes with poor nutrition.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                &quot;We were building the future but neglecting our own,&quot; recalls our founding team. &quot;That&apos;s when we realized there had to be a better way—nutrition that could keep up with our ambitions without compromising our health.&quot;
              </p>
              <p className="text-lg text-gray-700">
                After months of research, consultation with nutritionists, and testing with fellow hustlers, NXTKIND was born—a complete meal solution designed specifically for people who refuse to choose between success and health.
              </p>
            </div>
            <div className="bg-green-100 p-8 rounded-3xl">
              <div className="text-center">
                <Image
                  src="/nxtProduct_vanilla.png"
                  alt="NXTKIND Product"
                  width={300}
                  height={400}
                  className="mx-auto mb-6"
                />
                <blockquote className="text-lg italic text-gray-700">
                  &quot;We&apos;re not just selling nutrition; we&apos;re enabling dreams by ensuring your body can keep up with your ambitions.&quot;
                </blockquote>
                <p className="text-sm text-gray-600 mt-4">- NXTKIND Founding Team</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="bg-white py-20 px-8 md:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Solution
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              NXTKIND bridges the gap between ambition and nutrition with scientifically crafted meal solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Complete Nutrition in 30 Seconds</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-lg text-gray-700"><strong>25+ Essential Nutrients:</strong> Complete vitamin and mineral profile aligned with ICMR RDA standards</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-lg text-gray-700"><strong>Premium Plant Protein:</strong> Complete amino acid profile from pea and rice protein</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-lg text-gray-700"><strong>Smart Energy:</strong> MCT oils for sustained focus and cognitive clarity</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-lg text-gray-700"><strong>Gut Health:</strong> Multi-strain probiotics for better digestion and immunity</span>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Image
                src="/nxtProduct_chocolate.png"
                alt="Chocolate Flavor"
                width={200}
                height={250}
                className="rounded-2xl shadow-lg"
              />
              <Image
                src="/nxtProduct_coffee.png"
                alt="Coffee Flavor"
                width={200}
                height={250}
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-12 rounded-3xl text-center">
            <h3 className="text-3xl font-bold mb-4">Built for Hustlers</h3>
            <p className="text-xl text-green-100 max-w-4xl mx-auto mb-8">
              Whether you&apos;re closing deals, coding through the night, or building your empire, NXTKIND ensures your body gets the fuel it deserves—so you can perform at your peak without compromise.
        </p>
        <Link
              href="/list"
              className="inline-block bg-white text-green-600 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors duration-300 text-lg"
        >
              Fuel Your Ambition
        </Link>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-gray-50 py-20 px-8 md:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Mission & Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="text-5xl mb-6">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Mission</h3>
              <p className="text-gray-700">
                To empower ambitious individuals with nutrition that fuels both immediate performance and long-term health, without compromising on time or convenience.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="text-5xl mb-6">🔬</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Science-First</h3>
              <p className="text-gray-700">
                Every ingredient is clinically researched and precisely formulated. We don&apos;t compromise on quality or efficacy—your health deserves nothing less.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="text-5xl mb-6">🌱</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Sustainability</h3>
              <p className="text-gray-700">
                Plant-based nutrition that&apos;s better for you and the planet. We believe in building a future that&apos;s sustainable for both your body and the environment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;