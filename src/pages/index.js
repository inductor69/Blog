import React from 'react'
import { graphql } from 'gatsby'
import { SectionTitle } from '../components/Section'
import { Container } from '../components/Container'
import { Hero, HeroIntro, HeroTitle, HeroTeaser } from '../containers/Hero'
import { LatestArticles } from '../containers/LatestArticles'
import { Seo } from '../containers/Seo'

export default function IndexPage({ data }) {
  return (
    <>
      <Hero>
        <Seo />
        <HeroIntro>Hi, my name is</HeroIntro>
        <HeroTitle>
          <strong>Aditya k.</strong>
          <br />Turning scrap to sculpture.
        </HeroTitle>
        <HeroTeaser>
        I am Mechanical Engineering Student at Indian Institute of Technology, Delhi, Passionate about Front-end, Back-end and Competitive programming.
        </HeroTeaser>
      </Hero>
      <Container forwardedAs="section" pb={5}>
        <SectionTitle forwardedAs="h2">Blog</SectionTitle>
        <LatestArticles edges={data.allMdx.edges} />
      </Container>
    </>
  )
}

export const pageQuery = graphql`
  query($langKey: String!) {
    allMdx(
      limit: 5
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { published: { ne: false } }
        fields: { langKey: { eq: $langKey } }
      }
    ) {
      edges {
        node {
          excerpt(pruneLength: 190)
          id
          fields {
            link
          }
          frontmatter {
            title
            slug
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
