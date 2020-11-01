import React from 'react'
import Content from '~/components/Content'
import { graphql, PageProps } from 'gatsby'
import Close from '~/components/Close'
import styles from './Page.module.scss'
import cn from 'classnames'

const Page: React.FC<
  PageProps & {
    data: {
      prismicPage: {
        data: {
          content: { html: string }
          contact?: { html: string }
          texts: {
            pdf: { url: string }
            description: {
              html: string
            }
          }[]
        }
      }
    }
  }
> = ({ pageContext, data }) => {
  const { content, contact, texts } = data.prismicPage.data
  return (
    <div className='d-flex mt-4 position-relative container'>
      <div className={cn('col-lg-9', styles.content)}>
        <Content html={content.html} />
        {contact && <Content html={contact.html} />}
        {texts && !!texts.length && (
          <div>
            <p className='mb-0 mt-3 larger-text'>texts</p>
            {texts.map((text, idx) => (
              <a
                key={idx}
                className={cn(styles.textBox, 'anchorClass')}
                href={text.pdf.url}
                target='_blank'
              >
                <Content html={text.description.html} />
              </a>
            ))}
          </div>
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
        content {
          html
        }
        contact {
          html
        }
        texts {
          pdf {
            url
          }
          description {
            html
          }
        }
      }
    }
  }
`

export default Page
