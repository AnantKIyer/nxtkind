export default function FAQPage() {
  const faqs = [
    {
      q: "What is NXTKIND?",
      a: "NXTKIND is a scientifically formulated, plant-based complete nutrition meal replacement designed for everyday wellness.",
    },
    {
      q: "How do I use it?",
      a: "Mix one serving with 250–300 ml of water or milk alternative, shake well, and enjoy. Adjust liquid for your preferred thickness.",
    },
    {
      q: "Is it vegan and gluten free?",
      a: "Yes. It is dairy free, soy free, gluten free, and contains no artificial colors, flavors, or preservatives.",
    },
    {
      q: "Can I use it for weight management?",
      a: "Yes. It can replace 1–2 meals per day depending on your goals. Consult a healthcare professional if you have specific conditions.",
    },
    {
      q: "Who should avoid it?",
      a: "Individuals with specific medical conditions, allergies to any listed ingredients, or those who are pregnant or nursing should consult a healthcare professional first.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Quick answers about our products, usage, and policies
          </p>
        </div>
      </div>

      {/* FAQs */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10">
          <div className="divide-y">
            {faqs.map((item, idx) => (
              <details key={idx} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-left">
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">{item.q}</h3>
                  <span className="ml-4 text-green-600 transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-gray-600 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>

          {/* Contact prompt */}
          <div className="mt-10 p-5 rounded-xl bg-green-50 border border-green-200 text-center">
            <p className="text-gray-700">
              Didn&apos;t find what you were looking for? Reach out at
              <span className="font-semibold text-green-700"> support@nxtkind.com</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


