"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

type ConsentState = {
  necessary: true; // 必需总是 true
  analytics: boolean;
  marketing: boolean;
  timestamp?: string;
};

const COOKIE_NAME = "site_cookie_consent_v1";
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year

function readConsentFromCookie(): ConsentState | null {
  try {
    const kv = document.cookie.split("; ").find((c) => c.startsWith(COOKIE_NAME + "="));
    if (!kv) return null;
    const raw = decodeURIComponent(kv.split("=")[1]);
    return JSON.parse(raw) as ConsentState;
  } catch {
    return null;
  }
}

function writeConsentToCookie(consent: ConsentState) {
  const value = encodeURIComponent(JSON.stringify({ ...consent, timestamp: new Date().toISOString() }));
  document.cookie = `${COOKIE_NAME}=${value}; max-age=${COOKIE_MAX_AGE}; path=/; samesite=lax`;
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  useEffect(() => {
    setConsent(readConsentFromCookie());
  }, []);
  const save = (c: Omit<ConsentState, "timestamp">) => {
    const full = { ...c, timestamp: new Date().toISOString() };
    writeConsentToCookie(full as ConsentState);
    setConsent(full as ConsentState);
  };
  const clear = () => {
    document.cookie = `${COOKIE_NAME}=; max-age=0; path=/; samesite=lax`;
    setConsent(null);
  };
  return { consent, save, clear };
}
export default function CookieConsent() {
  const t = useTranslations("Cookie");
  const [showBanner, setShowBanner] = useState(false);
  return <div onClick={() => setShowBanner(true)}
    className="cursor-pointer"
  > {t("CookieConsent")}
    <CookieConsentContext
      showBanner={showBanner}
      setShowBanner={setShowBanner}></CookieConsentContext>
  </div>;
}
export function CookieConsentContext({ showBanner, setShowBanner }: {
  showBanner: boolean;
  setShowBanner: (v: boolean) => void;
}) {
  const t = useTranslations("Cookie");
  const { consent, save } = useCookieConsent();
  const [showModal, setShowModal] = useState(false);
  const [temp, setTemp] = useState({ analytics: false, marketing: false });

  useEffect(() => {
    if (!consent) setShowBanner(true);
    else setShowBanner(false);
  }, [consent]);

  useEffect(() => {
    // 当已有 consent 时将其临时载入（用于展示）
    if (consent) {
      setTemp({ analytics: !!consent.analytics, marketing: !!consent.marketing });
    }
  }, [consent]);

  const acceptAll = () => save({ necessary: true, analytics: true, marketing: true });
  const rejectAll = () => save({ necessary: true, analytics: false, marketing: false });
  const savePreferences = () => save({ necessary: true, analytics: temp.analytics, marketing: temp.marketing });

  if (!showBanner) return null;

  return (
    <>
      <div className="fixed bottom-4 left-4 right-4 z-50 md:left-8 md:right-auto md:max-w-3xl">
        <div className="bg-white dark:bg-slate-900 border rounded-xl p-4 shadow-lg flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex-1 text-sm text-slate-700 dark:text-slate-200">
            <div className="mb-2">{t("message")}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {t("learnMore")}{" "}
              <a href="/privacy" className="underline">
                {t("privacyPolicy")}
              </a>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { setShowModal(true); }}
              className="px-3 py-2 text-sm rounded-lg border"
            >
              {t("customize")}
            </button>
            <button
              onClick={() => { rejectAll(); }}
              className="px-4 py-2 text-sm rounded-lg border"
            >
              {t("reject")}
            </button>
            <button
              onClick={() => { acceptAll(); }}
              className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white"
            >
              {t("accept")}
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-60 flex items-end md:items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowModal(false)} />
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 z-10 w-full max-w-2xl">
            <h3 className="text-lg font-semibold mb-4">{t("prefTitle")}</h3>

            <div className="space-y-4">
              <div>
                <div className="font-medium">{t("necessary.title")}</div>
                <div className="text-sm text-slate-500">{t("necessary.desc")}</div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{t("analytics.title")}</div>
                  <div className="text-sm text-slate-500">{t("analytics.desc")}</div>
                </div>
                <input
                  type="checkbox"
                  checked={temp.analytics}
                  onChange={(e) => setTemp((s) => ({ ...s, analytics: e.target.checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{t("marketing.title")}</div>
                  <div className="text-sm text-slate-500">{t("marketing.desc")}</div>
                </div>
                <input
                  type="checkbox"
                  checked={temp.marketing}
                  onChange={(e) => setTemp((s) => ({ ...s, marketing: e.target.checked }))}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => { setShowModal(false); }} className="px-4 py-2 border rounded-lg">
                {t("cancel")}
              </button>
              <button
                onClick={() => { savePreferences(); setShowModal(false); }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                {t("save")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
