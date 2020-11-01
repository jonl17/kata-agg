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
    <div className='d-flex mt-5'>
      {contact && <Content className='col-lg-3' html={contact.html} />}
      <div className='col-lg-6'>
        <Content html={content.html} />
        {texts && !!texts.length && (
          <div>
            <p className='mb-0 mt-3'>texts</p>
            {texts.map(text => (
              <Content
                className={cn(styles.textBox)}
                html={text.description.html}
              />
            ))}
          </div>
        )}
      </div>
      <Close className='col-lg-1 offset-lg-2' />
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
