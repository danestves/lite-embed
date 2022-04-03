// Dependencies
const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.js",
  unstable_flexsearch: true,
  unstable_staticImage: true,
});

/** @type {import('next').NextConfig} */
const options = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
  },
};

module.exports = withNextra(options);