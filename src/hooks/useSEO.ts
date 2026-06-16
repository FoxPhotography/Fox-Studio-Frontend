import { useEffect } from 'react';
import useSettingsStore from '../store/settingsStore';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

export default function useSEO({ title, description, keywords, ogImage }: SEOProps = {}) {
  const seoSettings = useSettingsStore((state) => (state as any).seo || null);

  useEffect(() => {
    // 1. Update Document Title
    const baseTitle = seoSettings?.siteTitle || 'FOX Studio — Premium Photography';
    document.title = title ? `${title} | ${baseTitle}` : baseTitle;

    // 2. Helper to set/update meta tag
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      if (!content) return;
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement('meta');
        if (isProperty) {
          tag.setAttribute('property', name);
        } else {
          tag.setAttribute('name', name);
        }
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // 3. Update Standard Meta Tags
    updateMetaTag('description', description || seoSettings?.metaDescription || '');
    updateMetaTag('keywords', keywords || seoSettings?.keywords || '');
    updateMetaTag('robots', seoSettings?.robots || 'index, follow');

    // 4. Update Open Graph Meta Tags
    updateMetaTag('og:title', title || seoSettings?.ogTitle || baseTitle, true);
    updateMetaTag('og:description', description || seoSettings?.ogDescription || seoSettings?.metaDescription || '', true);
    updateMetaTag('og:image', ogImage || seoSettings?.ogImage?.url || '', true);
    updateMetaTag('og:type', 'website', true);

    // 5. Update Twitter Meta Tags
    updateMetaTag('twitter:card', seoSettings?.twitterCardType || 'summary_large_image');
    updateMetaTag('twitter:title', title || seoSettings?.ogTitle || baseTitle);
    updateMetaTag('twitter:description', description || seoSettings?.ogDescription || seoSettings?.metaDescription || '');
    updateMetaTag('twitter:image', ogImage || seoSettings?.ogImage?.url || '');

    // 6. Dynamic Google Analytics Injection
    if (seoSettings?.googleAnalyticsId) {
      const gaId = seoSettings.googleAnalyticsId;
      const scriptId = 'google-analytics-script';

      if (!document.getElementById(scriptId)) {
        // Add gtag manager script
        const script1 = document.createElement('script');
        script1.id = scriptId;
        script1.async = true;
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        document.head.appendChild(script1);

        // Add gtag config script
        const script2 = document.createElement('script');
        script2.id = `${scriptId}-init`;
        script2.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `;
        document.head.appendChild(script2);
      }
    }
  }, [title, description, keywords, ogImage, seoSettings]);
}
