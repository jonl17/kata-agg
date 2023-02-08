import cn from 'classnames'
import { graphql } from 'gatsby'
import React from 'react'
import Close from '~/components/Close'
import Content from '~/components/Content'

function breakEmailIntoTwoLines(html: string) {
  return html.replace('@', '<br />(at)')
}

const Page: React.FC<{
  data: {
    prismicPage: {
      data: {
        about: { html: string }
        contact_information: { html: string }
        text: {
          text_name: string
          text_pdf_link: {
            url: string
          }
          other_information: {
            html: string
          }
        }[]
        more_text: {
          html: string
        }
      }
    }
  }
}> = ({ data }) => {
  const {
    about,
    contact_information: contactInformation,
    text,
    more_text,
  } = data.prismicPage.data
  return (
    <div className={cn('d-flex container p-5')}>
      <div className='col-lg-11 p-0'>
        {about && <Content className='noMargin' html={about.html} />}
        <br />
        {contactInformation && (
          <Content html={breakEmailIntoTwoLines(contactInformation.html)} />
        )}
        {text &&
          !!text.length &&
          text.map(item => (
            <div className={cn('content textWrap')}>
              <a
                className='anchorClass'
                href={item.text_pdf_link.url}
                target='_blank'
                rel='noreferrer'
              >
                {item.text_name}
              </a>
              <Content
                className='noMargin'
                html={item.other_information.html}
              />
            </div>
          ))}
        {more_text && (
          <div
            className='my-7'
            dangerouslySetInnerHTML={{ __html: more_text.html }}
          />
        )}
      </div>
      <Close />
    </div>
  )
}

export const query = graphql`
  query($id: String!) {
    prismicPage(id: { eq: $id }) {
      data {
        about {
          html
        }
        contact_information {
          html
        }
        text {
          text_name
          text_pdf_link {
            url
          }
          other_information {
            html
          }
        }
        more_text {
          html
        }
      }
    }
  }
`

export default Page
