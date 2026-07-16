import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import script from "./scripts/graph.inline"
import style from "./styles/graph.scss"
import { classNames } from "../util/lang"
import { D3Config } from "./Graph"

interface FullPageGraphOptions {
  graph: Partial<D3Config> | undefined
}

const defaultOptions: FullPageGraphOptions = {
  graph: {
    drag: true,
    zoom: true,
    depth: -1,
    scale: 0.9,
    repelForce: 0.5,
    centerForce: 0.3,
    linkDistance: 30,
    fontSize: 0.6,
    opacityScale: 1,
    showTags: true,
    removeTags: [],
    focusOnHover: true,
    enableRadial: true,
  },
}

export default ((opts?: Partial<FullPageGraphOptions>) => {
  const FullPageGraph: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const graph = { ...defaultOptions.graph, ...opts?.graph }

    return (
      <article class={classNames(displayClass, "graph", "graph-page")}>
        <div id="graph-page-container" data-cfg={JSON.stringify(graph)}></div>
      </article>
    )
  }

  FullPageGraph.css = style
  FullPageGraph.afterDOMLoaded = script

  return FullPageGraph
}) satisfies QuartzComponentConstructor
