export default function Memberships() {
  const plans = [
    {
      name: 'Basic',
      price: '₹251',
      duration: '1 Month',
      features: [
        'Profile Visibility',
        '5 Daily Matches',
        'Limited Contact Info Access',
        'Instant Notifications',
      ],
      bgColor: 'bg-pink-100',
      btnColor: 'bg-pink-500',
    },
    {
      name: 'Standard',
      price: '₹501',
      duration: '3 Months',
      features: [
        'Priority Profile Listing',
        '20 Daily Matches',
        'Contact Info Access',
        'Chat with Matches',
        'Instant Notifications',
      ],
      bgColor: 'bg-pink-200',
      btnColor: 'bg-pink-600',
    },
    {
      name: 'Premium',
      price: '₹901',
      duration: '6 Months',
      features: [
        'Top Profile Visibility',
        'Unlimited Matches',
        'Direct Contact Access',
        'Personalized Matchmaking',
        'Instant Notifications',
      ],
      bgColor: 'bg-pink-300',
      btnColor: 'bg-pink-700',
    },
    {
      name: 'Ultimate',
      price: '₹1501',
      duration: '12 Months',
      features: [
        'Top Profile Visibility',
        'Unlimited Matches',
        'Direct Contact Access',
        'Personalized Matchmaking',
        'Instant Notifications',
      ],
      bgColor: 'bg-pink-400',
      btnColor: 'bg-pink-800',
    },
  ];

  return (
    <div className="mx-auto p-8">
      <h1 className="text-4xl font-bold text-pink-600 text-center mb-8">
        Choose Your Membership Plan
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`rounded-lg shadow-lg ${plan.bgColor} p-6 transform hover:scale-105 transition-transform duration-300`}
          >
            <h2 className="text-2xl font-bold text-pink-700 text-center">{plan.name}</h2>
            <p className="text-4xl font-extrabold text-center text-gray-800 mt-4">{plan.price}</p>
            <p className="text-center text-gray-600">{plan.duration}</p>

            <ul className="mt-6 space-y-2 text-gray-700">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center space-x-2">
                  <span className="text-pink-600 font-bold">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`${plan.btnColor} text-white w-full mt-6 py-3 rounded-full font-semibold hover:opacity-90 transition-all`}
            >
              {plan.name === 'Free' ? 'Get Started with Free' : 'Buy Now'}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center text-gray-600">
        <p>Need help choosing the right plan?</p>
        <a href="/contact" className="text-pink-600 font-bold hover:underline">
          Contact Us
        </a>
      </div>
    </div>
  );
}
