import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const CustomMeta: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  return (
    <>
      <div
        class={
          fileData.frontmatter?.bib
            ? classNames(displayClass, "custom-meta", "meta-border")
            : classNames(displayClass, "custom-meta")
        }
      >
        {fileData.frontmatter?.bib && <div>{fileData.frontmatter.bib}</div>}
        {fileData.frontmatter?.link && (
          <div class="meta">
            <a href={fileData.frontmatter.link.toString()} target="_blank" rel="noopener">
              {fileData.frontmatter.link}
            </a>
          </div>
        )}
      </div>
    </>
  )
}

CustomMeta.css = `
.custom-meta {
  margin-top: 0.5rem;
  font-size: 1rem;
  color: var(--gray);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.meta-border {
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--lightgray);
}
`

export default (() => CustomMeta) satisfies QuartzComponentConstructor
