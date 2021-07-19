# Storyblok Integration

Here you can find quick installation guide for [Storyblok](https://www.storyblok.com/) CMS integration with Vue Storefront. 

Full documentation can be found [here](https://docs.vuestorefront.io/storyblok).

### Installation

---

Install module into your app.

```bash
npm install @absolute-web/storyblok --save
```

or

```bash
yarn add @absolute-web/storyblok
```

### Setup

---

Register the module in the `nuxt.config` file.

```javascript
modules: [
  ['@absolute-web/storyblok/nuxt', {
    token: 'CONTENT_DELIVERY_TOKEN',
    cacheProvider: 'memory'
  }],
]
```

### Content Rendering 

---

Create the `RenderContent.vue` component with next content:

```html
<script>
import { renderStoryblokContent } from '@absolute-web/storyblok';

export default {
  name: 'RenderContent',
  ...renderStoryblokContent,
};
</script>
```
