// AboutPage.jsx
import React from "react";
import Link from "next/link";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="scroll-smooth text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-between px-8 md:px-24 bg-gradient-to-b from-white to-gray-100">
        {/* Left: Text + CTA */}
        <div className="w-full md:w-1/2 py-16 md:py-32">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Fuel the Future<br />with <span className="text-blue-600">NxtKind</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-md">
            Clean, efficient, and scientifically designed to power modern lives. No compromises—just pure, performance-ready nutrition.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition"
          >
            Explore Products
          </Link>
        </div>

        {/* Right: Image or Vector */}
        <div className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-center">
          <Image
            src="https://images.pexels.com/photos/4498133/pexels-photo-4498133.jpeg"
            alt="Nutrition Vector"
            width={320}
            height={240}
            className="w-80 h-auto rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* Parallax Divider */}
      <div
        className="bg-fixed bg-center bg-cover h-[300px] flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/699189/pexels-photo-699189.jpeg')",
        }}
      >
        <h2 className="text-white text-3xl md:text-4xl font-bold bg-black bg-opacity-50 px-6 py-3 rounded-lg">
          Why Choose NxtKind?
        </h2>
      </div>

      {/* Why Us Section */}
      <section
        id="why-us"
        className="bg-white py-20 px-6 md:px-32 leading-relaxed"
      >
        <h2 className="text-3xl font-bold mb-6">A Problem Worth Solving</h2>
        <p className="text-gray-700 text-lg mb-4">
          In our fast-paced world, meals have become rushed, often replaced by
          quick bites and empty calories. The result? Energy crashes, chronic
          fatigue, and nutrient deficiencies that silently drain your
          performance and potential.
        </p>
        <p className="text-gray-700 text-lg mb-4">
          NxtKind was built to solve this. We offer more than convenience—we
          offer **precision**. Every serving is engineered with clean, complete
          nutrition that adapts to your life. Whether you&rsquo;re skipping breakfast,
          multitasking through lunch, or hustling post-workout, our blends
          deliver optimal fuel without compromise.
        </p>
        <p className="text-gray-700 text-lg">
          Our formulations prioritize bioavailability, smart energy release, and
          cognitive clarity—so you can stay sharp, strong, and focused all day
          long.
        </p>
      </section>

      {/* Call to Action */}
      <section className="bg-black text-white py-20 text-center">
        <h2 className="text-4xl font-semibold">Ready to Upgrade Your Nutrition?</h2>
        <p className="mt-4 text-lg text-gray-300">
          Join the movement. No shortcuts. Just science, simplicity, and serious fuel.
        </p>
        <Link
          href="/products"
          className="mt-8 inline-block bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition"
        >
          Shop Now
        </Link>
      </section>
    </div>
  );
};

export default AboutPage;