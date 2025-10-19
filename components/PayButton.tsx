import { useTranslations } from 'next-intl';
import React from 'react'

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
