
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
}

export default function SEO({
  title = 'Full-Stack Developer Portfolio',
  description = 'Professional portfolio showcasing full-stack development expertise in Next.js, React, TypeScript, and cloud architecture.',
  canonical = 'https://yourwebsite.com',
  ogImage = 'https://yourwebsite.com/og-image.jpg',
  ogType = 'website',
  twitterCard = 'summary_large_image',
}: SEOProps) {
  const siteTitle = title ? `${title} | Developer Portfolio` : 'Developer Portfolio';
  
  return (
    <Helmet>
      {/* Standard metadata */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* JSON-LD structured data */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Your Name",
            "url": "${canonical}",
            "image": "${ogImage}",
            "jobTitle": "Full-Stack Developer",
            "worksFor": {
              "@type": "Organization",
              "name": "Freelance"
            },
            "sameAs": [
              "https://github.com/yourusername",
              "https://linkedin.com/in/yourusername",
              "https://twitter.com/yourusername"
            ]
          }
        `}
      </script>
    </Helmet>
  );
}
