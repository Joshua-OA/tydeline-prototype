import { useState } from "react";

type Plan = "basic" | "premium" | "api";

interface PricingProps {
  onBack: () => void;
  onSubscribe: (plan: Plan) => void;
}

const plans: { id: Plan; name: string; price: string; period: string; features: string[]; highlight?: boolean }[] = [
  {
    id: "basic",
    name: "Basic",
    price: "$29",
    period: "/month",
    features: [
      "Track up to 50 containers",
      "Email notifications",
      "7-day tracking history",
      "Standard ETA predictions",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "$79",
    period: "/month",
    highlight: true,
    features: [
      "Track up to 500 containers",
      "Email + WhatsApp alerts",
      "90-day tracking history",
      "Predictive ETA with ML",
      "Demurrage risk alerts",
      "Priority support",
    ],
  },
  {
    id: "api",
    name: "API",
    price: "$199",
    period: "/month",
    features: [
      "Unlimited containers",
      "Full REST API access",
      "Webhooks & integrations",
      "Unlimited history",
      "Custom ETA models",
      "Dedicated support",
      "SLA guarantee",
    ],
  },
];

export default function Pricing({ onBack, onSubscribe }: PricingProps) {
  const [selected, setSelected] = useState<Plan>("premium");
  const [processing, setProcessing] = useState(false);

  function handlePay() {
    setProcessing(true);
    setTimeout(() => {
      onSubscribe(selected);
    }, 1500);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-5 flex-1 overflow-y-auto">
        <p className="text-sm text-gray-500 mb-6">
          Choose a plan to unlock full tracking, alerts, and dashboard access.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelected(plan.id)}
              className={`relative text-left p-5 rounded-lg border-2 transition-all cursor-pointer ${
                selected === plan.id
                  ? "border-[#0753BB] bg-blue-50/40 shadow-sm"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-2.5 left-4 bg-[#0753BB] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                  Popular
                </span>
              )}

              <h4 className="text-base font-bold text-gray-900 mb-1">{plan.name}</h4>
              <div className="mb-4">
                <span className="text-2xl font-extrabold text-gray-900">{plan.price}</span>
                <span className="text-sm text-gray-500">{plan.period}</span>
              </div>

              <ul className="space-y-2">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                    <svg className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              {selected === plan.id && (
                <div className="absolute top-4 right-4">
                  <svg className="w-5 h-5 text-[#0753BB]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-gray-100">
        <button
          onClick={onBack}
          disabled={processing}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Back
        </button>
        <button
          onClick={handlePay}
          disabled={processing}
          className="px-6 py-2 text-sm font-medium text-white bg-[#0753BB] rounded-md hover:bg-[#064299] transition-colors cursor-pointer flex items-center gap-2"
        >
          {processing ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Subscribe to {plans.find((p) => p.id === selected)?.name} — {plans.find((p) => p.id === selected)?.price}/mo
            </>
          )}
        </button>
      </div>
    </div>
  );
}
