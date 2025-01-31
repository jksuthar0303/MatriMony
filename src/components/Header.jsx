"use client";

import { useState, useEffect } from "react";
import { FaUserCircle, FaHeart } from "react-icons/fa";
import { IoMenu, IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [activePage, setActivePage] = useState("/");
  const t = useTranslations("Header");
  const router = useRouter();

  const handleMobileLinkClick = () => {
  };
  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/auth");
      const data = await res.json();
      setIsAuthenticated(data.isAuthenticated);
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/users/logout", {
        method: "DELETE",
        credentials: "same-origin",
      });

      const result = await response.json();

      if (response.ok) {
        setIsAuthenticated(false);
        window.location.reload();
        router.push("/");
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const languageFromUrl = window.location.pathname.startsWith("/hi")
      ? "hi"
      : "en";
    setCurrentLanguage(languageFromUrl);
  }, []);

  // Set active link based on router pathname
  const handleLinkClick = (path) => {
    setActivePage(path);
    setIsMobileMenuOpen(false); 
    router.push(path);
  };

  const handleLanguageToggle = () => {
    const newLanguage = currentLanguage === "en" ? "hi" : "en";
    setCurrentLanguage(newLanguage);

    const currentPath = window.location.pathname;
    const regex = /^\/(en|hi)/;
    const newPath = currentPath.match(regex)
      ? currentPath.replace(regex, `/${newLanguage}`)
      : `/${newLanguage}${currentPath}`;

    router.push(newPath, undefined, { shallow: true });
  };

  return (
    <header className="bg-white text-pink-600 p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl md:text-3xl font-playwrite font-extrabold">
          <Link href="/" className="flex items-center">
            Sagairisthe <span className="text-sm mt-2">.com</span>
          </Link>
        </h1>

        {/* Desktop Navigation */}
        <div>
          {!isAuthenticated ? (
            <nav className="hidden lg:flex space-x-6 xl:space-x-8 font-medium">
              <Link
                href="/"
                onClick={() => handleLinkClick("/")}
                className={`${
                  activePage === "/"
                    ? "bg-pink-600 text-white"
                    : "border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white"
                } hover:text-white w-32 text-center transition-all p-2 rounded-md`}
              >
                {t("navLinks.home")}
              </Link>
              <Link
                href="/memberships"
                onClick={() => handleLinkClick("/memberships")}
                className={`${
                  activePage === "/memberships"
                    ? "bg-pink-600 text-white"
                    : "border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white"
                } hover:text-white w-32 text-center transition-all p-2 rounded-md`}
              >
                {t("navLinks.memberships")}
              </Link>
            </nav>
          ) : (
            <nav className="hidden lg:flex space-x-6 xl:space-x-8 font-medium">
              <Link
                href="/"
                onClick={() => handleLinkClick("/")}
                className={`${
                  activePage === "/"
                    ? "bg-pink-600 text-white"
                    : "border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white"
                } hover:text-white w-32 text-center transition-all p-2 rounded-md`}
              >
                {t("navLinks.home")}
              </Link>
              <Link
                href="/memberships"
                onClick={() => handleLinkClick("/memberships")}
                className={`${
                  activePage === "/memberships"
                    ? "bg-pink-600 text-white"
                    : "border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white"
                } hover:text-white w-32 text-center transition-all p-2 rounded-md`}
              >
                {t("navLinks.memberships")}
              </Link>
              <Link
                href="/success-stories"
                onClick={() => handleLinkClick("/success-stories")}
                className={`${
                  activePage === "/success-stories"
                    ? "bg-pink-600 text-white"
                    : "border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white"
                } hover:text-white w-32 text-center transition-all p-2 rounded-md`}
              >
                {t("navLinks.successStories")}
              </Link>
              <Link
                href="/contact-us"
                onClick={() => handleLinkClick("/contact-us")}
                className={`${
                  activePage === "/contact-us"
                    ? "bg-pink-600 text-white"
                    : "border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white"
                } hover:text-white w-32 text-center transition-all p-2 rounded-md`}
              >
                {t("navLinks.contactUs")}
              </Link>
            </nav>
          )}
        </div>

        {/* Language Toggle */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold">English</span>

          {/* Custom toggle button */}
          <div
            onClick={handleLanguageToggle}
            className="relative inline-block w-12 h-6 cursor-pointer rounded-full transition-all bg-pink-600"
          >
            {/* Toggle knob */}
            <div
              className={`absolute top-1 left-1 transition-all bg-white w-4 h-4 rounded-full ${
                currentLanguage === "en"
                  ? "transform translate-x-0"
                  : "transform translate-x-6"
              }`}
            />
          </div>

          <span className="text-sm font-semibold">हिंदी</span>
        </div>

        {/* CTA and User Actions */}
        <div className="hidden lg:flex items-center space-x-4 md:space-x-6">
          {!isAuthenticated ? (
            <>
              <Link href="/register">
                <button className="bg-pink-600 text-white px-4 md:px-6 py-2 rounded-full font-semibold hover:bg-pink-600 transition-all">
                  {t("navLinks.register")}
                </button>
              </Link>
              <Link
                href="/login"
                className="flex items-center space-x-2 hover:text-pink-500 transition-all"
              >
                <FaUserCircle className="text-xl md:text-2xl" />
                <span className="hidden sm:block">{t("navLinks.login")}</span>
              </Link>
            </>
          ) : (
            <div className="flex">
              <Link
                href="/profile"
                className="flex mr-6 items-center space-x-2 hover:text-pink-500 transition-all"
              >
                <FaUserCircle className="text-xl md:text-2xl" />
                <span className="hidden sm:block">{t("navLinks.profile")}</span>
              </Link>
              <Link
                href="/wishlist"
                className="flex items-center space-x-2 hover:text-pink-500 transition-all"
              >
                <FaHeart className="text-xl md:text-2xl" />
                <span className="hidden sm:block">
                  {t("navLinks.wishlist")}
                </span>
              </Link>
            </div>
          )}

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-pink-600 border-2 border-transparent text-white px-4 md:px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-pink-600 hover:border-pink-600 transition-all"
            >
              {t("navLinks.logout")}
            </button>
          ) : null}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            className="text-3xl focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <IoClose /> : <IoMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-full bg-white shadow-lg transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="p-6 flex flex-col space-y-6">
          <button
            className="text-3xl self-end"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <IoClose />
          </button>
          {!isAuthenticated ? (
            <div className="flex flex-col justify-center space-y-4">
            <Link
                href="/"
                onClick={() => handleLinkClick("/")}
                className={`${
                  activePage === "/"
                    ? "bg-pink-600 text-white"
                    : "border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white"
                } hover:text-white w-full text-md font-bold text-center transition-all p-2 rounded-md`}
              >
                {t("navLinks.home")}
              </Link>
              <Link
                href="/memberships"
                onClick={() => handleLinkClick("/memberships")}
                className={`${
                  activePage === "/memberships"
                    ? "bg-pink-600 text-white"
                    : "border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white"
                } hover:text-white w-full text-md font-bold text-center transition-all p-2 rounded-md`}
              >
                {t("navLinks.memberships")}
              </Link>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center space-y-4">
            <Link
                href="/"
                onClick={() => handleLinkClick("/")}
                className={`${
                  activePage === "/"
                    ? "bg-pink-600 text-white"
                    : "border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white"
                } hover:text-white w-full text-md font-bold text-center transition-all p-2 rounded-md`}
              >
                {t("navLinks.home")}
              </Link>
              <Link
                href="/memberships"
                onClick={() => handleLinkClick("/memberships")}
                className={`${
                  activePage === "/memberships"
                    ? "bg-pink-600 text-white"
                    : "border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white"
                } hover:text-white w-full text-md font-bold text-center transition-all p-2 rounded-md`}
              >
                {t("navLinks.memberships")}
              </Link>
              <Link
                href="/success-stories"
                onClick={() => handleLinkClick("/success-stories")}
                className={`${
                  activePage === "/success-stories"
                    ? "bg-pink-600 text-white"
                    : "border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white"
                } hover:text-white w-full text-md font-bold text-center transition-all p-2 rounded-md`}
              >
                {t("navLinks.successStories")}
              </Link>
              <Link
                href="/contact-us"
                onClick={() => handleLinkClick("/contact-us")}
                className={`${
                  activePage === "/contact-us"
                    ? "bg-pink-600 text-white"
                    : "border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white"
                } hover:text-white w-full text-md font-bold text-center transition-all p-2 rounded-md`}
              >
                {t("navLinks.contactUs")}
              </Link>
            </div>
          )}

          {!isAuthenticated ? (
            <>
              <Link
                href="/login"
                className="flex items-center space-x-3 text-lg hover:text-pink-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaUserCircle className="text-2xl" />
                <span>{t("navLinks.login")}</span>
              </Link>
            </>
          ) : (
            <div>
              <Link
                href="/profile"
                className="flex items-center space-x-3 text-lg hover:text-pink-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaUserCircle className="text-2xl" />
                <span>{t("navLinks.profile")}</span>
              </Link>
              <Link
                href="/wishlist"
                className="flex mt-4 items-center space-x-3 text-lg hover:text-pink-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaHeart className="text-2xl" />
                <span>{t("navLinks.wishlist")}</span>
              </Link>
            </div>
          )}

          {!isAuthenticated ? (
            <Link
              href="/register"
              className="bg-pink-600 text-white text-center py-2 w-56 rounded-full font-semibold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("navLinks.register")}
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-pink-600 w-56 text-white px-4 md:px-6 py-2 rounded-full font-semibold hover:bg-pink-600 transition-all"
            >
              {t("navLinks.logout")}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
