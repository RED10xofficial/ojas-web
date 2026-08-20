import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";

/**
 * Renders a blog's richtext body. MarkdownText only handles inline formatting,
 * so long-form posts come through here and keep their paragraphs, headings,
 * lists and quotes.
 */
const BlogContent = ({ markdown }: { markdown: string }) => (
  <ReactMarkdown
    remarkPlugins={[remarkBreaks]}
    components={{
      h1: ({ children }) => (
        <h2 className="text-28 lg:text-32 font-display font-medium text-text-primary mt-12 mb-5 leading-tight">
          {children}
        </h2>
      ),
      h2: ({ children }) => (
        <h2 className="text-28 lg:text-32 font-display font-medium text-text-primary mt-12 mb-5 leading-tight">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-lg sm:text-28 font-display font-medium text-text-primary mt-10 mb-4 leading-tight">
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className="text-16 font-display font-bold text-text-primary mt-8 mb-3">
          {children}
        </h4>
      ),
      p: ({ children }) => (
        <p className="text-16 leading-relaxed text-text-secondary mb-6">{children}</p>
      ),
      a: ({ children, href }) => (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-blue font-semibold underline underline-offset-4 hover:text-brand-hover transition-colors"
        >
          {children}
        </a>
      ),
      ul: ({ children }) => (
        <ul className="list-disc pl-6 mb-6 space-y-2 text-16 leading-relaxed text-text-secondary marker:text-brand-blue">
          {children}
        </ul>
      ),
      ol: ({ children }) => (
        <ol className="list-decimal pl-6 mb-6 space-y-2 text-16 leading-relaxed text-text-secondary marker:text-brand-blue marker:font-bold">
          {children}
        </ol>
      ),
      li: ({ children }) => <li className="pl-1.5">{children}</li>,
      strong: ({ children }) => (
        <strong className="font-bold text-text-primary">{children}</strong>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-brand-blue bg-brand-subtle/30 rounded-r-2xl pl-6 pr-5 py-4 my-8 italic text-16 leading-relaxed text-text-secondary">
          {children}
        </blockquote>
      ),
      code: ({ children }) => (
        <code className="px-1.5 py-0.5 rounded-md bg-brand-subtle/60 text-text-primary font-mono text-[0.85em]">
          {children}
        </code>
      ),
      pre: ({ children }) => (
        <pre className="bg-brand-dark text-slate-200 rounded-2xl p-5 my-8 overflow-x-auto text-xs font-mono leading-relaxed">
          {children}
        </pre>
      ),
      hr: () => <hr className="my-10 border-brand-subtle" />,
      img: ({ src, alt }) =>
        typeof src === "string" ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={src} alt={alt || ""} className="rounded-2xl my-8 w-full" />
        ) : null,
      table: ({ children }) => (
        <div className="overflow-x-auto my-8 rounded-2xl border border-brand-subtle">
          <table className="w-full text-left text-sm">{children}</table>
        </div>
      ),
      th: ({ children }) => (
        <th className="bg-brand-subtle/40 px-4 py-3 font-bold text-text-primary text-xs uppercase tracking-wider">
          {children}
        </th>
      ),
      td: ({ children }) => (
        <td className="px-4 py-3 border-t border-brand-subtle text-text-secondary">
          {children}
        </td>
      ),
    }}
  >
    {markdown}
  </ReactMarkdown>
);

export default BlogContent;
