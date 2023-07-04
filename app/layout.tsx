"use client";

import "./globals.css";

import React from "react";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "@/theme/theme";

interface RootLayoutProps {
    children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
    return (
        <html lang="en">
            {/* TODO: add SEO */}
            <head>
                <link rel="manifest" href="/manifest.json" />
                <title>Truth Table Generator</title>
            </head>
            <body>
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                <ChakraProvider theme={theme}>{children}</ChakraProvider>
            </body>
        </html>
    );
};

export default RootLayout;
