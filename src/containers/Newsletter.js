import React from 'react'
import styled, { Box, up, css } from '@xstyled/styled-components'
import jsonp from 'jsonp'
import { Form } from 'react-final-form'
import { FORM_ERROR } from 'final-form'
import { Container } from '../components/Container'
import { useLangKey } from '../components/I18nContext'
import { useMustBeEmail, InputField, Button } from '../components/Form'

export const FormLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin: -2 -3;

  ${up(
    'md',
    css`
      flex-direction: row;
    `,
  )}
`

const Teaser = styled.h2`
  font-size: 26;
  font-weight: 500;
  color: lighter;
  margin: 4 0;
`

const Success = styled.div`
  text-align: center;

  p:first-child {
    font-size: 26;
    color: lighter;
    margin: 2 0;
  }

  p:last-child {
    font-size: 18;
  }
`

const locales = {
  en: {
    success: (
      <>
        <p>Thankyou...</p>
        <p>
          Please <strong>check your inbox</strong> to confirm your subscription!
        </p>
      </>
    ),
    firstName: 'First Name',
    teaser:
      'Subscribe to our Newsletter & receive notifications about latest tech.',
    submit: 'Submit',
    submitting: 'Submitting',
  },
  
}

export function Newsletter() {
  const langKey = useLangKey()
  const t = locales[langKey]

  const mustBeEmail = useMustBeEmail()

  function handleSubmit({ FNAME, EMAIL }) {
    const params = new URLSearchParams(
      'u=64f44007562ba29666f848b31&amp;id=c571916657',
    )
    params.append('FNAME', FNAME)
    params.append('EMAIL', EMAIL)
    const url = `https://gmail.us10.list-manage.com/subscribe/post-json?${params.toString()}`
    return new Promise((resolve) => {
      jsonp(url, { param: 'c' }, (error) => {
        if (error) {
          resolve({ [FORM_ERROR]: error.message })
          return
        }
        resolve()
      })
    })
  }

  return (
    <Container my={6}>
      <Form onSubmit={handleSubmit}>
        {({ handleSubmit, submitting, submitSucceeded }) => (
          <form noValidate onSubmit={handleSubmit}>
            {submitSucceeded ? (
              <Success>{t.success}</Success>
            ) : (
              <>
                <Teaser>{t.teaser}</Teaser>
                <FormLayout>
                  <Box py={2} px={3}>
                    <InputField
                      name="FNAME"
                      label={t.firstName}
                      placeholder="Aditya"
                      
                    />
                  </Box>
                  <Box py={2} px={3}>
                    <InputField
                      name="EMAIL"
                      label="Email"
                      type="email"
                      placeholder="abc@gmail.com"
                      required
                      validate={mustBeEmail}
                    />
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-end"
                    flex="1 0 auto"
                    py={2}
                    px={3}
                  >
                    <Button type="submit" disabled={submitting}>
                      {submitting ? t.submitting : t.submit}
                    </Button>
                  </Box>
                </FormLayout>
              </>
            )}
          </form>
        )}
      </Form>
    </Container>
  )
}
