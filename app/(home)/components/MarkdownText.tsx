import remarkBreaks from "remark-breaks";
import ReactMarkdown from "react-markdown";

const MarkdownText = ({ markdown }: { markdown: string }) => {
  if (!markdown) return;
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => <>{children}</>,
      }}
      remarkPlugins={[remarkBreaks]}
    >
      {markdown}
    </ReactMarkdown>
  );
};

export default MarkdownText;
