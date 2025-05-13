import { useEffect, useState } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  articleStructuredData?: boolean;
  canonical?: string;
  type?: string;
  url?: string;
}

export default function SEO({
  title,
  description,
  image = "/og-image.jpg",
  articleStructuredData = false,
  canonical = "https://3mangos.site",
  type = "website",
  url = "https://3mangos.site",
}: SEOProps) {
  const [pathname, setPathname] = useState("");
  
  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);
  
  const defaultTitle = "THREE MANGOS | Development Agency";
  const defaultDescription = 
    "We build beautiful, functional, and high-performance websites and applications with passion. Expert web development, e-commerce, UI/UX, branding, and SEO services.";
  
  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: image,
    url: `${url}${pathname}`,
    type: type
  };

  useEffect(() => {
    if (articleStructuredData) {
      const existingScript = document.getElementById("article-schema");
      if (existingScript) {
        existingScript.remove();
      }
      
      const structuredDataObject = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: seo.title,
        image: [seo.image],
        datePublished: new Date().toISOString(),
        dateModified: new Date().toISOString(),
        author: {
          "@type": "Organization",
          name: "THREE MANGOS",
          url: "https://3mangos.site",
        },
        publisher: {
          "@type": "Organization",
          name: "THREE MANGOS",
          logo: {
            "@type": "ImageObject",
            url: "https://3mangos.site/logo.svg",
          },
        },
        description: seo.description,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": seo.url,
        },
      };
      
      const script = document.createElement('script');
      script.id = "article-schema";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(structuredDataObject);
      document.head.appendChild(script);
      
      return () => {
        const scriptToRemove = document.getElementById("article-schema");
        if (scriptToRemove) {
          scriptToRemove.remove();
        }
      };
    }
  }, [articleStructuredData, seo.title, seo.image, seo.description, seo.url]);

  return (
    <>
      <meta property="og:type" content={seo.type} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={canonical || seo.url} />
    </>
  );
}
