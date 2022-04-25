// Dependencies
import * as React from 'react';
import { ColorSchemeProvider, MantineProvider, Select } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';

const LABEL_WITH_TRANSLATIONS = {
  en: 'Choose an aspect ratio',
  es: 'Elige una relación de aspecto',
};

function AspectRatioShowcase({
  children,
}: {
  children({ aspectRatio }: { aspectRatio: number }): React.ReactNode;
}) {
  let [aspectRatio, setAspectRatio] = React.useState('16 / 9');
  let router = useRouter();
  let { theme: themeValue, setTheme } = useTheme();
  let colorScheme = useColorScheme();
  let theme = themeValue === 'system' ? colorScheme : themeValue;

  return (
    <ColorSchemeProvider colorScheme={theme} toggleColorScheme={setTheme}>
      <MantineProvider
        theme={{
          colorScheme: theme,
        }}
      >
        <Select
          data={[
            { value: '21 / 9', label: '21:9' },
            { value: '16 / 9', label: '16:9' },
            { value: '9 / 16', label: '9:16' },
            { value: '4 / 3', label: '4:3' },
            { value: '3 / 4', label: '3:4' },
            { value: '1 / 1', label: '1:1' },
          ]}
          label={LABEL_WITH_TRANSLATIONS[router.locale]}
          onChange={(value) => setAspectRatio(value)}
          placeholder="16:9"
          value={aspectRatio}
        />

        {children({
          // transform "16 / 9" to 16 / 9
          aspectRatio: aspectRatio
            .split(' / ')
            .map(Number)
            .reduce((a, b) => a / b),
        })}
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export { AspectRatioShowcase };
