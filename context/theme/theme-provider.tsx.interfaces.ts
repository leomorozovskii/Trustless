interface IThemeValues {
  theme: string;
  toggleTheme(theme: 'light' | 'dark'): void;
}

export type { IThemeValues };
