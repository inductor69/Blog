import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { Location } from '@reach/router'
import { useLangKey } from '../components/I18nContext'
import defaultImage from '../images/social.png'
import { SchemaOrg } from './SchemaOrg'

const locales = {
  en: {
    description:
      'The personal website of Aditya K. Learn and level-up about React & JavaScript.',
  },
  
}

export function Seo({
  title: customTitle,
  description: customDescription,
  image: customImage,
  datePublished,
  isBlogPost,
}) {
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          canonicalUrl
        }
      }
    }
  `)

  const langKey = useLangKey()
  const t = locales[langKey]

  const title = customTitle || 'Aditya K.'
  const description = customDescription || t.description
  const image = customImage || defaultImage

  return (
    <Location>
      {({ location }) => {
        const url = `${siteMetadata.canonicalUrl}${location.pathname}`

        return (
          <>
            <Helmet>
              {/* General tags */}
              <title>{title}</title>
              <meta name="description" content={description} />
              <meta
                name="image"
                content={`${siteMetadata.canonicalUrl}${image}`}
              />
              <link rel="canonical" href={url} />

              {/* OpenGraph tags */}
              <meta property="og:url" content={url} />
              {isBlogPost ? (
                <meta property="og:type" content="article" />
              ) : null}
              <meta property="og:title" content={title} />
              <meta property="og:description" content={description} />
              <meta
                property="og:image"
                content={`${siteMetadata.canonicalUrl}${image}`}
              />

              {/* Twitter Card tags */}
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:creator" content="@Aditya__50" />
              <meta name="twitter:title" content={title} />
              <meta name="twitter:description" content={description} />
              <meta
                name="twitter:image"
                content={`${siteMetadata.canonicalUrl}${image}`}
              />
            </Helmet>
            <SchemaOrg
              title={title}
              url={url}
              defaultTitle="Aditya K."
              isBlogPost={isBlogPost}
              image={image}
              description={description}
              canonicalUrl={siteMetadata.canonicalUrl}
              datePublished={datePublished}
            />
          </>
        )
      }}
    </Location>
  )
}
