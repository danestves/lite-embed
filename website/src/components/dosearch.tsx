// Dependencies
import * as React from 'react';
import { DocSearch as DocSearchComponent } from '@docsearch/react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import type { DocSearchProps } from '@docsearch/react';

const translations = (locale: string): DocSearchProps['translations'] => {
  switch (locale) {
    case 'es':
      return {
        button: {
          buttonAriaLabel: 'Buscar',
          buttonText: 'Buscar',
        },
        modal: {
          errorScreen: {
            titleText: 'No se pueden obtener resultados',
            helpText: 'Puede que quieras comprobar tu conexión de red.',
          },
          footer: {
            selectText: 'para seleccionar',
            selectKeyAriaLabel: 'Tecla Enter',
            navigateText: 'para navegar',
            navigateUpKeyAriaLabel: 'Flecha arriba',
            navigateDownKeyAriaLabel: 'Flecha abajo',
            closeText: 'para cerrar',
            closeKeyAriaLabel: 'Tecla Escape',
            searchByText: 'Búsqueda por',
          },
          noResultsScreen: {
            noResultsText: 'No hay resultados para',
            suggestedQueryText: 'Prueba a buscar por',
            reportMissingResultsText:
              '¿Cree que esta consulta debería devolver resultados?',
            reportMissingResultsLinkText: 'Háznoslo saber.',
          },
          searchBox: {
            resetButtonTitle: 'Borra la consulta',
            resetButtonAriaLabel: 'Borra la consulta',
            cancelButtonText: 'Cancelar',
            cancelButtonAriaLabel: 'Cancelar',
          },
          startScreen: {
            recentSearchesTitle: 'Reciente',
            noRecentSearchesText: 'No hay búsquedas recientes',
            saveRecentSearchButtonTitle: 'Guardar esta búsqueda',
            removeRecentSearchButtonTitle:
              'Eliminar esta búsqueda del historial',
            favoriteSearchesTitle: 'Favoritos',
            removeFavoriteSearchButtonTitle:
              'Eliminar esta búsqueda de los favoritos',
          },
        },
      };
    default:
      return {
        button: {
          buttonText: 'Search',
          buttonAriaLabel: 'Search',
        },
        modal: {
          searchBox: {
            resetButtonTitle: 'Clear the query',
            resetButtonAriaLabel: 'Clear the query',
            cancelButtonText: 'Cancel',
            cancelButtonAriaLabel: 'Cancel',
          },
          startScreen: {
            recentSearchesTitle: 'Recent',
            noRecentSearchesText: 'No recent searches',
            saveRecentSearchButtonTitle: 'Save this search',
            removeRecentSearchButtonTitle: 'Remove this search from history',
            favoriteSearchesTitle: 'Favorite',
            removeFavoriteSearchButtonTitle:
              'Remove this search from favorites',
          },
          errorScreen: {
            titleText: 'Unable to fetch results',
            helpText: 'You might want to check your network connection.',
          },
          footer: {
            selectText: 'to select',
            selectKeyAriaLabel: 'Enter key',
            navigateText: 'to navigate',
            navigateUpKeyAriaLabel: 'Arrow up',
            navigateDownKeyAriaLabel: 'Arrow down',
            closeText: 'to close',
            closeKeyAriaLabel: 'Escape key',
            searchByText: 'Search by',
          },
          noResultsScreen: {
            noResultsText: 'No results for',
            suggestedQueryText: 'Try searching for',
            reportMissingResultsText:
              'Believe this query should return results?',
            reportMissingResultsLinkText: 'Let us know.',
          },
        },
      };
  }
};

const PLACEHOLDER = {
  en: 'Search docs',
  es: 'Buscar docs',
};

function DocSearch() {
  const { locale } = useRouter();
  const { resolvedTheme, theme } = useTheme();

  React.useEffect(() => {
    // insert attribute data-theme to the html tag
    // to be used by the docsearch.js script
    if (theme === 'system') {
      document.documentElement.setAttribute('data-theme', resolvedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [resolvedTheme, theme]);

  return (
    <DocSearchComponent
      apiKey="b9bb73c075392db09250d2cead932db6"
      appId="1GWUBOSFHQ"
      indexName="lite-embed"
      placeholder={PLACEHOLDER[locale]}
      translations={translations(locale)}
    />
  );
}

export default DocSearch;
