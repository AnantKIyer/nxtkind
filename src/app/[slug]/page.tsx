import Add from "@/components/Add";
import CustomizeProducts from "@/components/CustomizeProducts";
import ProductImages from "@/components/ProductImages";
import { wixClientServer } from "@/lib/wixClientServer";
import { notFound } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";

type tParams = Promise<{ slug: string }>;

const SinglePage = async ({ params }: { params: tParams }) => {
  const { slug } = await params;
  const wixClient = await wixClientServer();

  const products = await wixClient.products
    .queryProducts()
    .eq("slug", slug)
    .find();

  if (!products.items[0]) {
    return notFound();
  }

  const product = products.items[0];
  const [productFirstName = '', productLastName = ''] = product.name ? product.name.split(' ', 2) : [];

  return (
    <div className="scroll-smooth text-gray-800 font-sans pt-20">
      {/* Hero Section */}
      <section className="h-[40vh] min-h-[400px] flex flex-col md:flex-row items-center justify-between px-8 md:px-24 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="w-full md:w-2/3 py-8 md:py-16">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <span>Products</span>
            <span>/</span>
            <span className="font-medium text-green-600">{product.name}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="text-gray-900">{productFirstName}</span><br />
            <span className="text-green-600">{productLastName}</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl">
            Scientifically crafted nutrition designed for hustlers who demand performance without compromise.
          </p>
        </div>
        <div className="w-full md:w-1/3 mt-8 md:mt-0 flex justify-center">
          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <div className="text-6xl mb-4">⚡</div>
            <p className="text-sm text-gray-600 text-center">Premium Performance</p>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="bg-white py-20 px-8 md:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Product Images */}
            <div className="lg:sticky lg:top-8 h-max">
              <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
                <ProductImages items={product?.media?.items || []} />
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col gap-8">
              {/* Product Title & Price */}
              <div className="space-y-6">
                                 <div className="flex items-center gap-4">
                   {product.priceData?.price === product.priceData?.discountedPrice ? (
                     <span className="text-4xl font-bold text-green-600">₹{Number(product.priceData?.price || 0).toFixed(2)}</span>
                   ) : (
                     <div className="flex items-center gap-4">
                       <span className="text-2xl text-gray-400 line-through">₹{Number(product.priceData?.price || 0).toFixed(2)}</span>
                       <span className="text-4xl font-bold text-green-600">₹{Number(product.priceData?.discountedPrice || 0).toFixed(2)}</span>
                       <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                         Save ₹{(Number(product.priceData?.price || 0) - Number(product.priceData?.discountedPrice || 0)).toFixed(2)}
                       </span>
                     </div>
                   )}
                 </div>
              </div>

              {/* Product Description */}
              {product.additionalInfoSections && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">Product Description</h3>
                  <div className="prose prose-lg max-w-none">
                    {product.additionalInfoSections.map((section) => (
                      <div key={section.title} className="text-gray-700 leading-relaxed">
                        {section.title === "shortDesc" && (
                          <div
                            className="text-lg"
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(section.description || ""),
                            }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Product Options & Add to Cart */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                {product.variants && product.productOptions ? (
                  <CustomizeProducts
                    productId={product._id!}
                    variants={product.variants}
                    productOptions={product.productOptions}
                  />
                ) : (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">Add to Cart</h3>
                    <Add
                      productId={product._id!}
                      variantId="00000000-0000-0000-0000-000000000000"
                      stockNumber={product.stock?.quantity || 0}
                    />
                  </div>
                )}
              </div>

              {/* Product Features */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Complete Nutrition</span>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Plant-Based Protein</span>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">25+ Vitamins & Minerals</span>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Gut Health Support</span>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">No Artificial Additives</span>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Ready in 30 Seconds</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Benefits */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-8 md:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose This Blend?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the science-backed benefits that make this product essential for your performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-green-200 hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl mb-6">⚡</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Sustained Energy</h3>
              <p className="text-gray-700 leading-relaxed">
                MCT oils provide clean, sustained energy without crashes, keeping you focused throughout your day.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-200 hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl mb-6">💪</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Muscle Support</h3>
              <p className="text-gray-700 leading-relaxed">
                Complete protein profile supports muscle recovery and maintenance for optimal performance.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-purple-200 hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl mb-6">🧠</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Mental Clarity</h3>
              <p className="text-gray-700 leading-relaxed">
                Essential nutrients and antioxidants support cognitive function and mental focus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nutritional Information */}
      <section className="bg-white py-20 px-8 md:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Complete Nutritional Profile
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every serving delivers comprehensive nutrition designed for optimal health and performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-green-50 p-6 rounded-2xl border border-green-200 text-center">
              <div className="text-4xl mb-4">🥜</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Protein</h3>
              <p className="text-gray-600 text-sm">Complete amino acid profile</p>
            </div>

            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200 text-center">
              <div className="text-4xl mb-4">🥥</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">MCTs</h3>
              <p className="text-gray-600 text-sm">Clean energy source</p>
            </div>

            <div className="bg-purple-50 p-6 rounded-2xl border border-purple-200 text-center">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Probiotics</h3>
              <p className="text-gray-600 text-sm">Gut health support</p>
            </div>

            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-200 text-center">
              <div className="text-4xl mb-4">💊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Vitamins</h3>
              <p className="text-gray-600 text-sm">25+ essential nutrients</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20 px-8 md:px-24">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Experience the Difference?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of hustlers who have transformed their nutrition with NXTKIND&apos;s scientifically formulated products.
          </p>
          <button className="px-8 py-4 bg-white text-green-600 font-bold rounded-full hover:bg-gray-100 transition-colors duration-300 text-lg">
            Add to Cart Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default SinglePage;
