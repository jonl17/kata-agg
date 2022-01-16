import React from 'react'
import Content from '~/components/Content'
import { graphql, Link } from 'gatsby'
import Close from '~/components/Close'
import cn from 'classnames'

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
      }
    }
  }
}> = ({ data }) => {
  const {
    about,
    contact_information: contactInformation,
    text,
  } = data.prismicPage.data
  return (
    <div className={cn('d-flex container pageWrap')}>
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
              <Link className='anchorClass' to={item.text_pdf_link.url}>
                {item.text_name}
              </Link>
              <Content
                className='noMargin'
                html={item.other_information.html}
              />
            </div>
          ))}
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
      }
    }
  }
`

export default Page
