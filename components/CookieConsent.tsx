'use client';
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
type CookieOptions = {
  maxAge?: number;       // 单位：秒
  path?: string;         // 默认 "/"
  domain?: string;
  secure?: boolean;      // 是否仅在 HTTPS 下发送
  httpOnly?: boolean;    // JS 不能读取
  sameSite?: "lax" | "strict" | "none"; // 默认 "lax"
};

/**
 * 设置浏览器 cookie
 * @param name cookie 名称
 * @param value cookie 值
 * @param options 选项
 */

/**
 * 读取浏览器 cookie
 * @param name cookie 名称
 * @returns 返回 cookie 值，如果不存在返回 null
 */
export function getCookie(name: string): string | null {
  const kv = document.cookie
    .split("; ")
    .find((c) => c.startsWith(encodeURIComponent(name) + "="));
  if (!kv) return null;

  return decodeURIComponent(kv.split("=")[1]);
}

export function setCookie(name: string, value: string, options: CookieOptions = {}) {
  let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (options.maxAge) cookieStr += `; max-age=${options.maxAge}`;
  if (options.path) cookieStr += `; path=${options.path}`;
  else cookieStr += `; path=/`;
  if (options.domain) cookieStr += `; domain=${options.domain}`;
  if (options.secure) cookieStr += `; secure`;
  if (options.httpOnly) cookieStr += `; HttpOnly`;
  if (options.sameSite) cookieStr += `; samesite=${options.sameSite}`;

  document.cookie = cookieStr;
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  useEffect(() => {
     const cookie= getCookie("site_cookie_consent_v1")
     console.log(cookie)
    //@ts-ignore
    if (cookie) {
      setShowBanner(false)
    } else {
      setShowBanner(true)
    }
  }, [])
  return (
    <div>
      <button onClick={() => { setShowBanner(true) }}>CookieConsent</button>
      <CookieConsentContext showModal={showBanner} setShowModal={setShowBanner} />
    </div>
  );
}

export function CookieConsentContext({
  showModal,
  setShowModal
}: {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}) {
  const t = useTranslations("Cookie");
  const [customize, setCustomize] = useState(false)
  const [temp, setTemp] = useState({ analytics: false, marketing: false });

  function accept() {
    setCookie("site_cookie_consent_v1", "accepted", {
      maxAge: 365 * 24 * 60 * 60,
      sameSite: "lax",
    });
    setShowModal(false)
  }

  function reject() {
    setCookie("site_cookie_consent_v1", "rejected", {
      maxAge: 365 * 24 * 60 * 60,
      sameSite: "lax",
    });
    setShowModal(false)
  }
  function save() {
    setCookie("site_cookie_consent_v1", `customized:{analytics:${temp.analytics},marketing:${temp.analytics}}`, {
      maxAge: 365 * 24 * 60 * 60,
      sameSite: "lax",
    });
    setCustomize(false)
    setShowModal(false)
  }

  if (!showModal) return null;
  return (
    <>
      {/* Banner */}
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
              onClick={() => setCustomize(true)}
              className="px-3 py-2 text-sm rounded-lg border">
              {t("customize")}
            </button>
            <button className="px-4 py-2 text-sm rounded-lg border"
              onClick={reject}
            >
              {t("reject")}
            </button>
            <button
              onClick={accept}
              className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white">
              {t("accept")}
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {customize && (
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
              <button className="px-4 py-2 border rounded-lg"
                onClick={() => setCustomize(false)}
              >
                {t("cancel")}
              </button>
              <button
                onClick={save}
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
