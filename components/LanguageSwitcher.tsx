"use client"
import { setUserLocale } from '@/library/i18n/services/locale';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function LanguageSwitcher() {
    const router = useRouter();
    const locale = useLocale();

    const toggleLocale = async () => {
        const newLocale = locale === 'en' ? 'zh' : 'en';
        await setUserLocale(newLocale);
        router.refresh(); // 刷新页面以应用新语言
    };

    return (
        <div onClick={toggleLocale} className='cursor-pointer'>
            {locale === 'en' ? '中文' : 'English'}
        </div>
    );
}