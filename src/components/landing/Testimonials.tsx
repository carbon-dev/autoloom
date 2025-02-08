import React from 'react';

const testimonials = [
  {
    quote: "The AI background removal is incredibly accurate. It's saved our team countless hours of manual editing.",
    author: "Sarah Chen",
    role: "Creative Director, Studio Nine",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    quote: "We've integrated the API into our e-commerce platform. The results are fantastic and our customers love it.",
    author: "Michael Rodriguez",
    role: "CTO, ShopifyPlus Store",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200"
  }
];

export const Testimonials: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-sky-50 to-indigo-50 py-24">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Trusted by Industry Leaders</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="h-12 w-12 rounded-full mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-gray-500">{testimonial.role}</div>
                </div>
              </div>
              <p className="text-xl text-gray-600 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};