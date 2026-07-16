import { QuartzEmitterPlugin } from "../types"
import { QuartzComponentProps } from "../../components/types"
import HeaderConstructor from "../../components/Header"
import BodyConstructor from "../../components/Body"
import { pageResources, renderPage } from "../../components/renderPage"
import { FullPageLayout } from "../../cfg"
import { FilePath, FullSlug, pathToRoot } from "../../util/path"
import {
  defaultContentPageLayout,
  graphOptions,
  sharedPageComponents,
} from "../../../quartz.layout"
import { ArticleTitle, FullPageGraph } from "../../components"
import { defaultProcessedContent } from "../vfile"
import { write } from "./helpers"
import { i18n } from "../../i18n"
import DepGraph from "../../depgraph"

export const GraphPage: QuartzEmitterPlugin = () => {
  const opts: FullPageLayout = {
    ...sharedPageComponents,
    ...defaultContentPageLayout,
    beforeBody: [],
    pageBody: FullPageGraph({ graph: graphOptions.globalGraph }),
    left: [],
    right: [],
  }

  const { head: Head, header, beforeBody, pageBody, afterBody, left, right, footer: Footer } = opts
  const Header = HeaderConstructor()
  const Body = BodyConstructor()

  return {
    name: "GraphPage",
    getQuartzComponents() {
      return [
        Head,
        Header,
        Body,
        ...header,
        ...beforeBody,
        pageBody,
        ...afterBody,
        ...left,
        ...right,
        Footer,
      ]
    },
    async getDependencyGraph(_ctx, _content, _resources) {
      return new DepGraph<FilePath>()
    },
    async emit(ctx, _content, resources): Promise<FilePath[]> {
      const cfg = ctx.cfg.configuration
      const slug = "graph" as FullSlug
      const title = i18n(cfg.locale).components.graph.title
      const [tree, vfile] = defaultProcessedContent({
        slug,
        text: title,
        description: title,
        frontmatter: { title, tags: [] },
      })
      const externalResources = pageResources(pathToRoot(slug), vfile.data, resources)
      const componentData: QuartzComponentProps = {
        ctx,
        fileData: vfile.data,
        externalResources,
        cfg,
        children: [],
        tree,
        allFiles: [],
      }

      return [
        await write({
          ctx,
          content: renderPage(cfg, slug, componentData, opts, externalResources),
          slug,
          ext: ".html",
        }),
      ]
    },
  }
}
