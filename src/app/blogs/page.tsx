import Image from "next/image";
import Link from "next/link";
import { blogs } from "@/data/data";

export default function BlogsPage() {
  return (
    <div className="scroll-smooth text-gray-800 font-sans pt-20">
      {/* Hero Section */}
      <section className="h-[40vh] min-h-[400px] flex flex-col md:flex-row items-center justify-between px-8 md:px-24 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="w-full md:w-2/3 py-8 md:py-16">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Our <span className="text-green-600">Blog</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl">
            Discover insights, tips, and stories about nutrition, wellness, and sustainable living from our team of experts.
          </p>
        </div>
        <div className="w-full md:w-1/3 mt-8 md:mt-0 flex justify-center">
          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-sm text-gray-600 text-center">Expert Insights</p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="bg-white py-20 px-8 md:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Latest Articles
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay informed with our latest research, tips, and insights on nutrition and wellness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((post) => (
              <Link
                href={`/blogs/${post.slug}`}
                key={post._id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 border border-gray-100"
              >
                {/* Blog Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Blog Content */}
                <div className="p-6">
                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>{new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Read More */}
                  <div className="flex items-center text-green-600 font-semibold group-hover:text-green-700 transition-colors duration-300">
                    Read More
                    <svg 
                      className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-8 md:px-24">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Stay Updated with Our Latest Articles
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Get the latest insights on nutrition, wellness, and sustainable living delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-300">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              No spam, unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Topics */}
      <section className="bg-white py-20 px-8 md:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Explore Topics
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dive deeper into the topics that matter most for your health and wellness journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-green-50 p-6 rounded-2xl border border-green-200 hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-4">🥗</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Nutrition</h3>
              <p className="text-gray-600 text-sm">Expert advice on balanced nutrition and meal planning.</p>
            </div>

            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200 hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-4">💪</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fitness</h3>
              <p className="text-gray-600 text-sm">Workout tips and fitness strategies for busy lifestyles.</p>
            </div>

            <div className="bg-purple-50 p-6 rounded-2xl border border-purple-200 hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Wellness</h3>
              <p className="text-gray-600 text-sm">Mental health and overall wellness strategies.</p>
            </div>

            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-200 hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sustainability</h3>
              <p className="text-gray-600 text-sm">Eco-friendly living and sustainable nutrition choices.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
