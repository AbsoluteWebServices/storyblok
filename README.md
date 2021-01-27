# Storyblok Integration Guide

Here you can find quick installation guide for [Storyblok](https://www.storyblok.com/) CMS integration with Vue Storefront. 

Full documentation can be found [here](https://docs.europe-west1.gcp.storefrontcloud.io/v2-cms-storyblok/).

### Installation

Install module into your app.

```bash
npm install @vuestorefront/storyblok --save
```

or

```bash
yarn add @vuestorefront/storyblok
```

### Setup

Register the module in the `nuxt.config` file.

```javascript
modules: [
  ['@vuestorefront/storyblok/nuxt', {
    accessToken: 'YOUR_PREVIEW_TOKEN',
    cacheProvider: 'memory'
  }],
]
```
