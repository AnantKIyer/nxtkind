import { science } from "@/data/data";

export default function SciencePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">The Science Behind NXTKIND</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover the clinical precision and scientific formulation that makes NXTKIND more than just a supplement
          </p>
        </div>
      </div>

      {/* Science Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                {science.content}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Benefits Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Key Scientific Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Complete Protein */}
              <div className="text-center p-6 rounded-xl bg-green-50 border border-green-200">
                <div className="text-4xl mb-4">🥜</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Complete Protein Profile</h3>
                <p className="text-gray-600">
                  Pea + Rice protein combination provides all 9 essential amino acids with high digestibility
                </p>
              </div>

              {/* MCT Energy */}
              <div className="text-center p-6 rounded-xl bg-blue-50 border border-blue-200">
                <div className="text-4xl mb-4">🥥</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">MCT Energy Boost</h3>
                <p className="text-gray-600">
                  Rapidly absorbed fats for sustained energy, mental clarity, and fat metabolism
                </p>
              </div>

              {/* Probiotics */}
              <div className="text-center p-6 rounded-xl bg-purple-50 border border-purple-200">
                <div className="text-4xl mb-4">🔬</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Advanced Probiotics</h3>
                <p className="text-gray-600">
                  Heat-stable strains including Bacillus Coagulans for optimal gut health
                </p>
              </div>

              {/* Antioxidants */}
              <div className="text-center p-6 rounded-xl bg-orange-50 border border-orange-200">
                <div className="text-4xl mb-4">🌈</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Powerful Antioxidants</h3>
                <p className="text-gray-600">
                  Lutein, Lycopene, and Zeaxanthin for eye health and cellular protection
                </p>
              </div>

              {/* Vitamins & Minerals */}
              <div className="text-center p-6 rounded-xl bg-red-50 border border-red-200">
                <div className="text-4xl mb-4">💊</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Complete Nutrition</h3>
                <p className="text-gray-600">
                  25+ vitamins and minerals aligned with ICMR RDA standards for Indian adults
                </p>
              </div>

              {/* Clean Formula */}
              <div className="text-center p-6 rounded-xl bg-gray-50 border border-gray-200">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Clean & Pure</h3>
                <p className="text-gray-600">
                  No artificial colors, flavors, sugars, dairy, soy, or gluten
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Experience the Science of Nutrition
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands who have transformed their health with NXTKIND&apos;s scientifically formulated meal replacement system
          </p>
          <button className="px-8 py-4 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300 text-lg">
            Try NXTKIND Today
          </button>
        </div>
      </div>
    </div>
  );
}
