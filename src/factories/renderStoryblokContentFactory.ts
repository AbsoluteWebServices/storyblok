
import { VNode } from 'vue';
import { PropOptions } from 'vue-demi';
import {
  RenderComponent,
} from '@absolute-web/vsf-core';

import StoryblokEditable from '../directives/storyblok-editable';

export declare type RenderStoryblokContentFactoryParams<CONTENT = any> = {
    extractContent: (content) => CONTENT;
  };

  export function renderStoryblokContentFactory(
    factoryParams: RenderStoryblokContentFactoryParams<RenderComponent[]>
  ) {
    return {
      render: function render(createElement) {
        const components: VNode[] = [];
        // eslint-disable-next-line
        const self = this;
        const content = self.content;
        const resolvedContent: RenderComponent[] = factoryParams.extractContent(content);
        resolvedContent.map(function component(component: RenderComponent) {
          const { componentName, props: { _editable, ...props } } = component;
          const componentData: any = {
            key: props._uid,
            attrs: { ...self.$attrs, name: componentName },
            props,
            on: self.$listeners
          }

          if(typeof _editable !== 'undefined' && _editable !== null) {
            componentData.directives = [
              {
                name: 'storyblok-editable',
                value: { _editable },
              },
            ]
          }

          components.push(createElement(componentName, componentData, self.$slots.default));
        });
        return components;
      },
      inheritAttrs: false,
      props: {
        content: {
          type: [Array, Object] as PropOptions<[] | any>,
          required: true,
        },
      },
      directives: {
        StoryblokEditable,
      },
    };
  }
