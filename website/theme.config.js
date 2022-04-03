// Dependencies
import endent from 'endent';

/**
 * @param {import("react").SVGProps<SVGSVGElement>} props
 */
function Logo(props) {
  return (
    <svg viewBox="0 0 512 366.47" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M135 53.41c-5.76 0-11.51 2.1-15.94 6.31L6.57 166.94c-8.76 8.44-8.76 21.99 0 30.36l112.49 107.29c8.79 8.37 23.02 8.37 31.82 0 8.76-8.44 8.76-22.02 0-30.33L54.3 182.11l96.58-92.09c8.76-8.37 8.76-21.99 0-30.33-4.4-4.17-10.15-6.27-15.88-6.27ZM375.54 56.97c5.82 0 11.61 2 16.07 6.14l113.72 105.67c8.89 8.25 8.89 21.63 0 29.84L391.61 304.3c-8.86 8.28-23.28 8.28-32.17 0-8.83-8.28-8.83-21.63 0-29.88l97.65-90.7-97.65-90.67c-8.83-8.28-8.83-21.66 0-29.94 4.46-4.11 10.31-6.14 16.1-6.14Z"
        fill="currentColor"
        fillRule="evenodd"
        opacity=".9"
      />
      <path
        d="m206.67 366.47 182.82-205.9-110.6-1.3L319.58 0 122.54 208.72h122.52l-38.39 157.75z"
        fill="#29abe2"
      />
    </svg>
  );
}

const TITLE_WITH_TRANSLATIONS = {
  en: 'Embed videos on your website without extra work',
  es: 'Inserta videos en tu sitio sin trabajo extra',
};

const config = {
  docsRepositoryBase: endent`
    https://github.com/danestves/lite-embed/blob/canary/website/src/pages
  `,
  floatTOC: true,
  footer: true,
  footerEditLink: `Edit this page on GitHub`,
  footerText: `MIT ${new Date().getFullYear()} © Daniel Esteves.`,
  i18n: [
    {
      locale: 'en',
      text: 'English',
    },
    {
      locale: 'es',
      text: 'Español',
    },
  ],
  logo: ({ locale }) => {
    return (
      <>
        <Logo width="2.5rem" />
        <span
          className="mx-2 font-extrabold hidden md:inline select-none"
          title={`lite-embed: ${TITLE_WITH_TRANSLATIONS[locale]}`}
        >
          lite-embed
        </span>
      </>
    );
  },
  nextLinks: true,
  prevLinks: true,
  projectLink: 'https://github.com/danestves/lite-embed',
  search: true,
  titleSuffix: ' - lite-embed',
  unstable_flexsearch: true,
};

export default config;
