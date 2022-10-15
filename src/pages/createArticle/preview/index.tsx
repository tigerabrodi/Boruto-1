/* eslint-disable react/no-children-prop */
/* eslint-disable react/react-in-jsx-scope */
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import '../../../index.css'

type PreviewProps = {
  textField: string
}

export function Preview({ textField }: PreviewProps) {
  return (
    <ReactMarkdown
      children={textField}
      className="preview"
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={
        {
          // code({ node, inline, className, children, ...props }) {
          //   const match = /language-(\w+)/.exec(className || '')
          //   return !inline && match ? (
          //     <SyntaxHighlighter
          //       style={oneDark}
          //       className="SyntaxHighlighter"
          //       children={String(children).replace(/\n$/, '')}
          //       language={match[1]}
          //       PreTag="div"
          //       {...props}
          //     />
          //   ) : (
          //     <code className={className} {...props}>
          //       {children}
          //     </code>
          //   )
          // },
        }
      }
    />
  )
}
