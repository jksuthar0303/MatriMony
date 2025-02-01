import { useTranslations } from "next-intl";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const t = useTranslations("Footer");

  return (
    <div className="bg-pink-600 text-white py-8">
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Us */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("about.title")}</h3>
            <p className="text-sm">{t("about.description")}</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("quickLinks.title")}</h3>
            <ul className="text-sm space-y-2">
              <li>
                <a href="/about" className="hover:text-gray-200">
                  {t("quickLinks.about")}
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-200">
                  {t("quickLinks.contact")}
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-gray-200">
                  {t("quickLinks.terms")}
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-gray-200">
                  {t("quickLinks.privacy")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("contactInfo.title")}</h3>
            <ul className="text-sm space-y-2">
              <li>
                {t("contactInfo.email")}{" "}
                <a
                  href="mailto:support@mylifepair.com"
                  className="hover:text-gray-200"
                >
                  support@sagairisthe.com
                </a>
              </li>
              <li>{t("contactInfo.phone")} +91 9214881959 , 7737458369</li>
              <li>
                {t("contactInfo.address")} Jayamala Vishwakarma, near Kali Ji
                Mandir, inside Vishwakarma Gate, Bikaner - 334004{" "}
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {t("contactInfo.followUs")}
            </h3>
            <div className="flex space-x-4 cursor-pointer">
              <FaInstagram size={20} />
              <FaLinkedin size={20} />
              <FaFacebook size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
        <p>{t("copyright")}</p>
      </div>
    </div>
  );
};

export default Footer;
