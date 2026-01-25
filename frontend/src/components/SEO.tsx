import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article';
}

export const SEO: React.FC<SEOProps> = ({
    title,
    description = "A.P.D.F.E - Action Pour le Développement de la Femme et de l'Enfant. A survivor-led humanitarian organization empowering women and children in conflict-affected Central Africa.",
    keywords = "APDFE, humanitarian, women empowerment, child welfare, Central Africa, survivor-led, development",
    image = "/og-image.jpg", // Make sure to provide a default OG image in public folder
    url = "https://apdf-ong.org", // Replace with actual domain
    type = 'website'
}) => {
    const siteTitle = "A.P.D.F.E";
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{fullTitle}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />

            {/* Twitter */}
            <meta name="twitter:creator" content="@apdfe_org" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
};
