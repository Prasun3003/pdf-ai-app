"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ShineBorder } from "./magicui/shine-border";

const tiers = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for trying out our PDF tools",
    features: [
      "5 PDF analyses per month",
      "Basic summaries",
      "Text extraction",
      "Standard support",
    ],
    cta: "Get Started",
    href: "/signup",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "19",
    description: "Ideal for professionals and small teams",
    features: [
      "50 PDF analyses per month",
      "Advanced summaries",
      "Smart search capabilities",
      "Priority support",
      "Export in multiple formats",
      "Team sharing",
    ],
    cta: "Start Free Trial",
    href: "/signup?plan=pro",
    highlighted: true,
    shineColors: ["#3b82f6", "#60a5fa", "#93c5fd"],
  },
  {
    name: "Enterprise",
    price: "99",
    description: "For organizations with advanced needs",
    features: [
      "Unlimited PDF analyses",
      "Custom AI models",
      "API access",
      "Advanced analytics",
      "24/7 dedicated support",
      "Custom integrations",
      "SSO & advanced security",
    ],
    cta: "Contact Sales",
    href: "/contact",
    highlighted: false,
  },
];

export const PricingSection = () => {
  return (
    <section className="py-24">
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full text-sm font-medium bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
        >
          Simple Pricing
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400"
        >
          Choose Your Plan
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg"
        >
          Start with our free tier and upgrade as you grow. No hidden fees.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {tiers.map((tier, index) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            viewport={{ once: true }}
            className="relative"
          >
            {tier.highlighted ? (
              <div className="relative">
                <ShineBorder
                  borderWidth={2}
                  duration={4}
                  shineColor={tier.shineColors}
                  className="rounded-2xl absolute -inset-[2px]"
                />
                <div className="relative rounded-2xl p-8 bg-gradient-to-b from-blue-600 to-indigo-600 text-white shadow-xl">
                  <div className="absolute -top-5 left-0 right-0 flex justify-center">
                    <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-medium px-4 py-1 rounded-full shadow-lg">
                      Most Popular
                    </span>
                  </div>
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-4">{tier.name}</h3>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold">${tier.price}</span>
                      <span className="ml-2 text-lg text-blue-100">/month</span>
                    </div>
                    <p className="mt-4 text-sm text-blue-100">
                      {tier.description}
                    </p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <svg
                          className="h-5 w-5 mr-3 text-blue-200"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm text-blue-100">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={tier.href}
                    className="block w-full py-3 px-6 rounded-lg text-center text-sm font-medium transition-colors bg-white text-blue-600 hover:bg-blue-50"
                  >
                    {tier.cta}
                  </a>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl p-8 bg-white dark:bg-gray-800 shadow-lg">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      ${tier.price}
                    </span>
                    <span className="ml-2 text-lg text-gray-500 dark:text-gray-400">
                      /month
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    {tier.description}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <svg
                        className="h-5 w-5 mr-3 text-blue-500 dark:text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={tier.href}
                  className="block w-full py-3 px-6 rounded-lg text-center text-sm font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  {tier.cta}
                </a>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};
