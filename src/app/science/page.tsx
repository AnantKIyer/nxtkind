import { science } from "@/data/data";

export default function SciencePage() {
  return (
    <div className="scroll-smooth text-gray-800 font-sans pt-20">
      {/* Hero Section */}
      <section className="h-[40vh] min-h-[400px] flex flex-col md:flex-row items-center justify-between px-8 md:px-24 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="w-full md:w-2/3 py-8 md:py-16">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            The Science Behind<br /> <span className="text-green-600">NXTKIND</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl">
                         Discover the clinical precision and scientific formulation that makes NXTKIND more than just a supplement—it&apos;s nutrition engineered for performance.
          </p>
        </div>
        <div className="w-full md:w-1/3 mt-8 md:mt-0 flex justify-center">
          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <div className="text-6xl mb-4">🔬</div>
            <p className="text-sm text-gray-600 text-center">Scientifically Formulated</p>
          </div>
        </div>
      </section>

      {/* Main Science Content */}
      <section className="bg-white py-20 px-8 md:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Evidence-Based Formulation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every ingredient in NXTKIND is backed by clinical research and carefully selected for its proven benefits.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 mb-16">
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-line text-gray-700 leading-relaxed text-lg">
                {science.content}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Scientific Benefits */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-8 md:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Key Scientific Benefits
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our formulation delivers measurable results through clinically proven ingredients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Complete Protein */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-green-200 hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl mb-6">🥜</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Complete Protein Profile</h3>
              <p className="text-gray-700 leading-relaxed">
                Pea + Rice protein combination provides all 9 essential amino acids with high digestibility and bioavailability.
              </p>
            </div>

            {/* MCT Energy */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-200 hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl mb-6">🥥</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">MCT Energy Boost</h3>
              <p className="text-gray-700 leading-relaxed">
                Rapidly absorbed fats for sustained energy, mental clarity, and enhanced fat metabolism without crashes.
              </p>
            </div>

            {/* Probiotics */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-purple-200 hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl mb-6">🔬</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced Probiotics</h3>
              <p className="text-gray-700 leading-relaxed">
                Heat-stable strains including Bacillus Coagulans for optimal gut health and immune function.
              </p>
            </div>

            {/* Antioxidants */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-orange-200 hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl mb-6">🌈</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Powerful Antioxidants</h3>
              <p className="text-gray-700 leading-relaxed">
                Lutein, Lycopene, and Zeaxanthin for eye health, cellular protection, and anti-aging benefits.
              </p>
            </div>

            {/* Vitamins & Minerals */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-red-200 hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl mb-6">💊</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Complete Nutrition</h3>
              <p className="text-gray-700 leading-relaxed">
                25+ vitamins and minerals aligned with ICMR RDA standards for optimal health and performance.
              </p>
            </div>

            {/* Clean Formula */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl mb-6">✅</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Clean & Pure</h3>
              <p className="text-gray-700 leading-relaxed">
                No artificial colors, flavors, sugars, dairy, soy, or gluten. Pure nutrition without compromise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Evidence */}
      <section className="bg-white py-20 px-8 md:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Clinical Evidence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our formulation is backed by rigorous scientific research and clinical studies.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Research-Backed Results</h3>
              <p className="text-lg text-gray-700 mb-6">
                                 Every ingredient in NXTKIND has been selected based on peer-reviewed studies and clinical trials. We don&apos;t rely on marketing claims—we rely on science.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our protein blend has been shown to support muscle recovery and satiety. MCT oils provide sustained energy without blood sugar spikes. Probiotics improve gut health and immunity.
              </p>
              <p className="text-lg text-gray-700">
                The complete vitamin and mineral profile ensures you meet daily nutritional requirements, even when time is limited.
              </p>
            </div>
            <div className="bg-green-100 p-8 rounded-3xl">
              <div className="text-center">
                <div className="text-6xl mb-6">📊</div>
                                 <blockquote className="text-lg italic text-gray-700 mb-4">
                   &quot;Clinical studies show that our protein blend provides 95% digestibility and complete amino acid profile.&quot;
                 </blockquote>
                <p className="text-sm text-gray-600">- Published Research</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20 px-8 md:px-24">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Experience the Science of Nutrition
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
                         Join thousands who have transformed their health with NXTKIND&apos;s scientifically formulated meal replacement system.
          </p>
          <button className="px-8 py-4 bg-white text-green-600 font-bold rounded-full hover:bg-gray-100 transition-colors duration-300 text-lg">
            Try NXTKIND Today
          </button>
        </div>
      </section>
    </div>
  );
}
