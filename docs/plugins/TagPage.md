---
title: TagPage
tags:

  - plugin/emitter
---

This plugin emits dedicated pages for each tag used in the content. See [[folder and tag listings]] for more information.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

The pages are displayed using the `defaultListPageLayout` in `quartz.layouts.ts`. For the content, the `TagContent` component is used. If you want to modify the layout, you must edit it directly (`quartz/components/pages/TagContent.tsx`).

This plugin accepts the following configuration options:

- `sort`: A function of type `(f1: QuartzPluginData, f2: QuartzPluginData) => number{:ts}` used to sort entries. Defaults to sorting by date and tie-breaking on lexographical order.

## API

- Category: Emitter
- Function name: `Plugin.TagPage()`.
- Source: [`quartz/plugins/emitters/tagPage.tsx`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/emitters/tagPage.tsx).
