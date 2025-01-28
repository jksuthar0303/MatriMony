"use client"

import { usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { FaLanguage } from 'react-icons/fa';

export default function LanguageSwitcher({defaultValue}) {
  const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
  // Handle language change
  const handleLanguageChange = (value) => {
    router.replace(
        {pathname, query: params},
        {locale: value}
    )
  };

  return (
    <div>
      <select onChange={handleLanguageChange} defaultValue={defaultValue}>
        <option value="en">English</option>
        <option value="hi">हिंदी</option>
      </select>
    </div>
  );
}
