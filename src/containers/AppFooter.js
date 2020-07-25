/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import styled from '@xstyled/styled-components'
import { FaTwitter, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { Container } from '../components/Container'
import { useLangKey } from '../components/I18nContext'

const Copyright = styled.div`
  color: light400;
  font-size: 12;
  font-family: monospace;
`

const Socials = styled.div`
  margin-left: auto;
  margin-right: -2;
  display: flex;
`

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44;
  width: 44;
  color: lighter;
  transition: base;

  &:hover,
  &:focus {
    outline: none;
    color: accent;
  }
`

const currentYear = new Date().getFullYear()

const locales = {
  en: {
    twitter: 'My Twitter profile',
    github: 'My GitHub profile',
    linkedin: 'My LinkedIn profile',
    email: 'Send me an email',
  },
  fr: {
    twitter: 'Mon profil Twitter',
    github: 'Mon profil GitHub',
    linkedin: 'Mon profil LinkedIn',
    email: 'Écrivez-moi',
  },
}

export function AppFooter() {
  const langKey = useLangKey()
  const t = locales[langKey]
  return (
    <Container display="flex" alignItems="center" mt={4} pb={4}>
      <Copyright>Aditya K. © {currentYear}</Copyright>
      <Socials>
      
        <SocialLink title={t.twitter} href="https://twitter.com/Aditya__50">
          <FaTwitter />
        </SocialLink>
        <SocialLink title={t.github} href="https://github.com/inductor69">
          <FaGithub />
        </SocialLink>
        <SocialLink
          title={t.linkedin}
          href="https://www.linkedin.com/in/aditya-kumar-b99b1519b/"
        >
          <FaLinkedin />
        </SocialLink>
        <SocialLink title={t.email} href="mailto:adityakiitdelhi@gmail.com">
          <FaEnvelope />
        </SocialLink>
      </Socials>
    </Container>
  )
}
