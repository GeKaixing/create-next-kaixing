/**
 * @description: pay button component
 * @returns {React.ReactNode} pay button component
 */
import { useTranslations } from 'next-intl';

export default function PayButton() {
    const t = useTranslations("home");
    return (
        <div><form action="/api/checkout_sessions" method="POST">
            <section>
                <button type="submit" role="link">
                    {t("Checkout")}
                </button>
            </section>
        </form></div>
    )
}
