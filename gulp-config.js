const global = {
  folder: {
    tasks: 'tasks',
    build: 'public',
  },
  file: {
    html: {
      main: 'index.html',
    },
    js: {
      main: 'app',
      build: 'jquery.main',
      vendor: 'vendor',
    },
    styles: {
      main: 'styles',
      vendor: 'vendor',
    },
  },
  buildHtml: {
    templates: 'html',
  },
  buildStyles: {
    // Sorting type css media queries: 'desktop-first' || 'mobile-first'
    sortType: 'desktop-first',
    custom: {
      isSortMedia: false,
    },
  },
  buildJs: {
    externalLibs: {
      jquery: 'jQuery',
    },
    getEntryPoints() {
      return {
        [global.file.js.build]: `./js/${global.file.js.main}`,
      };
    },
  },
  error: {
    sound: true,
    title: '< SYSTEM ERROR >',
    icon: './system_files/icons/error_icon.png',
    wait: true,
  },
};

module.exports = global;
