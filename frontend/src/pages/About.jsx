import { useEffect, useState } from "react";
import { Heart, ShieldCheck, Target, Users } from "lucide-react";

const About = () => {
  const [counters, setCounters] = useState({
    volunteers: 0,
    donations: 0,
    impact: 0,
  });

  // Animation for counters
  useEffect(() => {
    const targetCounters = {
      volunteers: 150,
      donations: 5000,
      impact: 500,
    };

    const duration = 2000;
    const steps = 50;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setCounters({
        volunteers: Math.min(
          Math.floor((targetCounters.volunteers / steps) * currentStep),
          targetCounters.volunteers
        ),
        donations: Math.min(
          Math.floor((targetCounters.donations / steps) * currentStep),
          targetCounters.donations
        ),
        impact: Math.min(
          Math.floor((targetCounters.impact / steps) * currentStep),
          targetCounters.impact
        ),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-linear-to-r from-primary-600 to-primary-800 text-white rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 py-16 px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Mission & Vision
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Empowering communities, transforming lives, and creating lasting change through compassion and action.
          </p>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
          <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <Target className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-primary-700">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            To uplift underprivileged communities through sustainable development programs,
            education, and healthcare initiatives. We believe in creating opportunities that
            empower individuals to break the cycle of poverty and build better futures for
            themselves and their families.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
          <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <ShieldCheck className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-primary-700">
            Our Vision
          </h2>
          <p className="text-gray-600 leading-relaxed">
            A world where every individual has equal access to opportunities, resources,
            and support needed to thrive. We envision communities where compassion drives
            action, and collective effort creates sustainable positive change for generations
            to come.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <section className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary-700">
          Our Core Values
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Compassion",
              description:
                "Leading with empathy and understanding in all we do",
              icon: <Heart className="w-6 h-6 text-primary-600" />,
            },
            {
              title: "Integrity",
              description: "Acting with honesty and transparency",
              icon: <ShieldCheck className="w-6 h-6 text-primary-600" />,
            },
            {
              title: "Impact",
              description:
                "Focusing on measurable, sustainable change",
              icon: <Target className="w-6 h-6 text-primary-600" />,
            },
            {
              title: "Community",
              description:
                "Working together for collective success",
              icon: <Users className="w-6 h-6 text-primary-600" />,
            },
          ].map((value, index) => (
            <div
              key={index}
              className="text-center p-6 border-2 border-gray-100 rounded-lg hover:border-primary-300 transition duration-300"
            >
              <div className="flex justify-center mb-3">{value.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-primary-600">
                {value.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="bg-primary-50 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary-700">
          Our Impact
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">
              {counters.volunteers}+
            </div>
            <div className="text-gray-600">Active Volunteers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">
              GH₵{counters.donations.toLocaleString()}+
            </div>
            <div className="text-gray-600">Donations Raised</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">
              {counters.impact.toLocaleString()}+
            </div>
            <div className="text-gray-600">Lives Impacted</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          Ready to Make a Difference?
        </h2>
        <div className="flex justify-center space-x-4">
          <a href="/join-us" className="btn-primary">
            Join Our Mission
          </a>
          <a
            href="/donate"
            className="bg-white text-primary-600 border-2 border-primary-600 px-6 py-2 rounded-lg hover:bg-primary-50 transition duration-300"
          >
            Support Our Work
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;