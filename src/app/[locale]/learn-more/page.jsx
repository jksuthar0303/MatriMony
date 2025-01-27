import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const LearnMore = () => {
    const t = useTranslations("learnMore");


    const steps = [
        t("steps.step1"),
        t("steps.step2"),
        t("steps.step3"),
        t("steps.step4"),
      ];
      const whyChooseUsPoints = [
        t("whyChooseUsPoints.point1"),
        t("whyChooseUsPoints.point2"),
        t("whyChooseUsPoints.point3"),
        t("whyChooseUsPoints.point4"),
      ];
  return (
    <div className="bg-gray-100 min-h-screen py-12 px-6 lg:px-24">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-pink-600 mb-6">{t("title")}</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">{t("howItWorks")}</h2>
          <p className="text-gray-600 leading-relaxed">
          {t("howItWorksDescription")}
          </p>
          <ul className="list-disc pl-6 text-gray-600 mt-3">
          {steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">{t("whyChooseUs")}</h2>
          <ul className="list-disc pl-6 text-gray-600">
          {whyChooseUsPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">{t("successStories")}</h2>
          <p className="text-gray-600 leading-relaxed">
           {t("successStoriesDescription")}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">{t("membershipPlans")}</h2>
          <p className="text-gray-600 leading-relaxed">
            {t("membershipPlansDescription")}
          </p>
        </section>

        <div className="text-center mt-8">
          <Link href="/register" className="bg-pink-600 text-white py-3 px-6 rounded-lg text-lg font-bold shadow-lg hover:bg-pink-700 transition-all">
            {t("registerNow")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;
