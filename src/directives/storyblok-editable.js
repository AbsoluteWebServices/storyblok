const addClass = (el, className) => {
    if (el.classList) {
      el.classList.add(className);
    } else if (!new RegExp('\\b' + className + '\\b').test(el.className)) {
      el.className += ' ' + className;
    }
  };

  function bind(el, binding) {
    if (
      typeof binding.value._editable === 'undefined' ||
      binding.value._editable === null
    ) {
      return;
    }

    const options = JSON.parse(
      binding.value._editable.replace('<!--#storyblok#', '').replace('-->', '')
    );

    el.setAttribute('data-blok-c', JSON.stringify(options));
    el.setAttribute('data-blok-uid', options.id + '-' + options.uid);

    addClass(el, 'storyblok__outline');
  }

  export const StoryblokEditable = {
    bind,
  };

  export default StoryblokEditable;
