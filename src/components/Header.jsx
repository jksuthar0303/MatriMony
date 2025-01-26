"use client";

import { useState, useEffect } from 'react';
import { FaUserCircle, FaHeart } from 'react-icons/fa';
import { IoMenu, IoClose } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const t = useTranslations('Header');
  const router = useRouter();
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // Check if the user is authenticated
    const checkAuth = async () => {
      const res = await fetch('/api/users/login');
      const data = await res.json();
      setIsAuthenticated(data.isAuthenticated);
    };

    checkAuth();
  }, []);

  const handleLanguageToggle = () => {
    const newLanguage = currentLanguage === 'en' ? 'hi' : 'en';
    setCurrentLanguage(newLanguage);

    const currentPath = window.location.pathname;
    const regex = /^\/(en|hi)/; // Match the language code at the start
    const newPath = currentPath.match(regex)
      ? currentPath.replace(regex, `/${newLanguage}`)
      : `/${newLanguage}${currentPath}`;

    router.push(newPath);
  };

  return (
    <header className="bg-white text-pink-600 p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl md:text-3xl font-playwrite font-extrabold">
          <Link href="/" className="flex items-center">
            Sagairisthe <span className='text-sm mt-2'>.com</span>
          </Link>
        </h1>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-6 xl:space-x-8 font-medium">
          <Link href="/" className="hover:text-pink-500 transition-all">
            {t('navLinks.home')}
          </Link>
          <Link href="/memberships" className="hover:text-pink-500 transition-all">
            {t('navLinks.memberships')}
          </Link>
          <Link href="/success-stories" className="hover:text-pink-500 transition-all">
            {t('navLinks.successStories')}
          </Link>
          <Link href="/contact-us" className="hover:text-pink-500 transition-all">
            {t('navLinks.contactUs')}
          </Link>
        </nav>

        {/* Language Toggle Button */}
        <button
          onClick={handleLanguageToggle}
          className="bg-pink-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-pink-500 transition-all"
        >
          {currentLanguage === 'en' ? 'Switch to हिंदी' : 'Switch to English'}
        </button>

        {/* CTA and User Actions */}
        <div className="hidden md:flex items-center space-x-4 md:space-x-6">
          {!isAuthenticated ? (
            <>
              <Link href="/register">
                <button className="bg-pink-600 text-white px-4 md:px-6 py-2 rounded-full font-semibold hover:bg-pink-600 transition-all">
                  {t('navLinks.register')}
                </button>
              </Link>
              <Link href="/login" className="flex items-center space-x-2 hover:text-pink-500 transition-all">
                <FaUserCircle className="text-xl md:text-2xl" />
                <span className="hidden sm:block">{t('navLinks.login')}</span>
              </Link>
            </>
          ) : (
            <Link href="/profile" className="flex items-center space-x-2 hover:text-pink-500 transition-all">
              <FaUserCircle className="text-xl md:text-2xl" />
              <span className="hidden sm:block">{t('navLinks.profile')}</span>
            </Link>
          )}
          <Link href="/wishlist" className="flex items-center space-x-2 hover:text-pink-500 transition-all">
            <FaHeart className="text-xl md:text-2xl" />
            <span className="hidden sm:block">{t('navLinks.wishlist')}</span>
          </Link>
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
        className={`lg:hidden fixed top-0 left-0 w-full h-full bg-white shadow-lg transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}
      >
        <div className="p-6 flex flex-col space-y-6">
          <button
            className="text-3xl self-end"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <IoClose />
          </button>
          <Link href="/" className="text-xl font-semibold hover:text-pink-500" onClick={() => setIsMobileMenuOpen(false)}>
            {t('navLinks.home')}
          </Link>
          <Link href="/memberships" className="text-xl font-semibold hover:text-pink-500" onClick={() => setIsMobileMenuOpen(false)}>
            {t('navLinks.memberships')}
          </Link>
          <Link href="/success-stories" className="text-xl font-semibold hover:text-pink-500" onClick={() => setIsMobileMenuOpen(false)}>
            {t('navLinks.successStories')}
          </Link>
          <Link href="/contact-us" className="text-xl font-semibold hover:text-pink-500" onClick={() => setIsMobileMenuOpen(false)}>
            {t('navLinks.contactUs')}
          </Link>
          {!isAuthenticated ? (
            <>
              <Link href="/register" className="bg-pink-600 text-white text-center py-3 rounded-lg font-semibold" onClick={() => setIsMobileMenuOpen(false)}>
                {t('navLinks.register')}
              </Link>
              <Link href="/login" className="flex items-center space-x-3 text-lg hover:text-pink-500" onClick={() => setIsMobileMenuOpen(false)}>
                <FaUserCircle className="text-2xl" />
                <span>{t('navLinks.login')}</span>
              </Link>
            </>
          ) : (
            <Link href="/profile" className="flex items-center space-x-3 text-lg hover:text-pink-500" onClick={() => setIsMobileMenuOpen(false)}>
              <FaUserCircle className="text-2xl" />
              <span>{t('navLinks.profile')}</span>
            </Link>
          )}
          <Link href="/wishlist" className="flex items-center space-x-3 text-lg hover:text-pink-500" onClick={() => setIsMobileMenuOpen(false)}>
            <FaHeart className="text-2xl" />
            <span>{t('navLinks.wishlist')}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
