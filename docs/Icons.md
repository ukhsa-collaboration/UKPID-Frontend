# Icons

[@fluent-ui/svg-icons](https://github.com/microsoft/fluentui-system-icons) provides an extensive library of icons for use in this project.

We use [Vite SVG loader](https://github.com/jpkleemans/vite-svg-loader/tree/main) to load SVG files as Vue components. As such, you can use these icons like so:

```vue
<template>
  <div>
    <DashboardIcon />
    <EnquiryIcon />
  </div>
</template>

<script setup>
import DashboardIcon from "@fluentui/svg-icons/icons/home_20_regular.svg";
import EnquiryIcon from "@fluentui/svg-icons/icons/document_multiple_20_regular.svg";
</script>
```

## Finding an icon

Finding the right icon can be a pain. There is an [extensive list of icons](https://github.com/microsoft/fluentui-system-icons/blob/main/icons_regular.md) available, but you can also use [https://fluenticons.co/](https://fluenticons.co/) to search for icons. If using the latter, just take the name and start to import the icon from `@fluentui/svg-icons/icons/`, PhpStorm should soon provide suggestions to the correct icon name.
