import React, { useMemo } from 'react'
import {
    createGlobalStyle,
    css,
    DefaultTheme,
    ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components'


function theme(): DefaultTheme | any {
    return {
        // css snippets
        flexColumnNoWrap: css`
          display: flex;
          flex-flow: column nowrap;
        `,
        flexRowNoWrap: css`
            display: flex;
            flex-flow: row nowrap;
        `,
    }
}


export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const themeObject = useMemo(() => theme(), [])

    return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}


export const ThemedGlobalStyle = createGlobalStyle`
    html {
      color: black;
      background-color: inherit;
      font-family: 'Roboto', sans-serif;
    }
    
    a {
     color: inherit; 
    }
`
