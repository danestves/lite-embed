// Dependencies
import endent from "endent";

export default {
  docsRepositoryBase: endent`
    https://github.com/danestves/lite-embed/blob/main/website/src/pages
  `,
  floatTOC: true,
  footer: true,
  footerEditLink: `Edit this page on GitHub`,
  footerText: `MIT ${new Date().getFullYear()} © Daniel Esteves.`,
  i18n: [
    {
      locale: "en",
      text: "English",
    },
    {
      locale: "es",
      text: "Español",
    },
  ],
  nextLinks: true,
  prevLinks: true,
  projectLink: "https://github.com/danestves/lite-embed",
  search: true,
  titleSuffix: " - lite-embed",
  unstable_flexsearch: true,
};
