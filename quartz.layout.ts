import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// Components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {},
  }),
}

// Shared graph configuration for sidebar and full-page graph views.
export const graphOptions = {
  localGraph: {
    drag: true,
    zoom: true,
    depth: 2,
    scale: 1.0,
    repelForce: 0.4,
    centerForce: 0.5,
    linkDistance: 50,
    fontSize: 0.7,
    opacityScale: 1,
    removeTags: ["excludeGraph"],
    showTags: false,
    enableRadial: true,
  },
  globalGraph: {
    drag: true,
    zoom: true,
    depth: -1,
    scale: 0.9,
    repelForce: 4,
    centerForce: 0.1,
    linkDistance: 150,
    fontSize: 0.4,
    opacityScale: 0.8,
    removeTags: ["excludeGraph"],
    showTags: true,
    enableRadial: true,
  },
}

let graph = Component.Graph(graphOptions)

// Layout for pages that display a single note (non-homepage)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
    Component.CustomMeta(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Explorer(),
    Component.Darkmode(),
  ],
  right: [
    // Graph stays in the right for these pages
    graph,
    Component.DesktopOnly(Component.TableOfContents()),
    // Component.Backlinks(),
  ],
}
// Layout for pages that display lists of pages (e.g., tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Explorer(),
    Component.Darkmode(),
  ],
  right: [],
}
