export default function PageCustomCss({
  css,
  pageId,
}: {
  css?: string;
  pageId: string;
}) {
  if (!css) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: css
          .split("}")
          .map((rule) => {
            const trimmed = rule.trim();
            if (!trimmed) return "";
            return `#${pageId} ${trimmed}}`;
          })
          .join("\n"),
      }}
    />
  );
}
