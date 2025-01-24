import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

// Define routing configuration with supported locales
export const routing = defineRouting({
  locales: ['en', 'hi'], // A list of all locales that are supported

  defaultLocale: 'en', // Used when no locale matches
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
