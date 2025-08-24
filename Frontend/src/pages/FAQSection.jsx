import React, { useState } from "react";

const faqs = [
  {
    question: "Is there a free trial available for Kubaru?",
    answer: "Yes, we offer a free trial so you can experience all features before committing."
  },
  {
    question: "What happens when my trial expires?",
    answer:
      "Access to the Kubaru app will be suspended at the end of your trial. However, you’ll have the option to sign up for a free account without losing any of your data."
  },
  {
    question: "How much does webside cost?",
    answer: " costs 5000/month per user."
  },
  {
    question: "Do I need to purchase a license for every user in my Salesforce org?",
    answer:
      "No, you only need to purchase a license for users who will be administering Kubaru or receiving assignments."
  },
  {
    question: "Is there any additional cost for support?",
    answer: "No, support is included free for all customers."
  },
  {
    question: "Do you offer discounts for non-profits?",
    answer:
      "Yes! We offer a 10% discount for non-profits. Contact us at support@pankaj for details."
  },
  {
    question: "Do you offer volume discounts?",
    answer:
      "Yes! We offer volume discounts for customers purchasing more than 50 licenses. Contact us at support@pankaj for details."
  },
  {
    question: "How do I purchase Kubaru?",
    answer:
      "You can follow these instructions to purchase Kubaru from the Salesforce Appexchange using a credit card (Visa, MasterCard, Discover, AMEX). Or, you can contact us at support@pankaj and we’ll send you an invoice that can be paid via check, ACH, or other payment method."
  },
  {
    question: "How do I purchase additional licenses?",
    answer:
      "You can email us at support@pankaj to purchase additional licenses. Or, if you initially purchased through the Salesforce AppExchange, you can follow these instructions to purchase additional licenses."
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "You can cancel your subscription at any time by emailing us at support@kubaru.io. You’ll still be able to use Kubaru until your next renewal date."
  },
  {
    question: "Which Salesforce editions are compatible with Kubaru?",
    answer:
      "Kubaru is compatible with Salesforce Professional, Enterprise, and Unlimited."
  },
  {
    question: "Who can I contact about other questions?",
    answer: "Contact support@pankaj and we’ll get back to you immediately."
  }
];


function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-gray-100 py-10 mt-10">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
        <span className="text-blue-900">Frequently asked </span>
        <span className="text-orange-500">questions</span>
      </h2>
      <div className="max-w-6xl mx-auto space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white rounded-lg border">
            <button
              className="flex justify-between w-full px-4 py-4 text-left font-medium text-blue-800 focus:outline-none"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <span>+ {faq.question}</span>
            </button>
            {openIndex === idx && (
              <div className="px-6 pb-4 text-gray-700">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}


export default FAQSection;