"use client";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { colors } from "@/constants/colors";

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [scroll, setScroll] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!scroll && document.documentElement.scrollTop > 100) {
        setScroll(true);
      } else if (scroll && document.documentElement.scrollTop < 70) {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scroll]);

  // BUG: Resizing of the font is causing strange shit on webkit (safari)
  return (
    <>
      <Box minH={scroll ? 70 : 100} transition={"min-height 0.4s"} w={"full"}>
        s
      </Box>
      <Grid
        position={"fixed"}
        top={0}
        w={"full"}
        minH={scroll ? 70 : 100}
        transition={"min-height 0.4s"}
        p={3}
        templateColumns={"1fr 8fr 1fr"}
        alignItems={"center"}
        bg={useColorModeValue(...colors.headerBg)}
        color={useColorModeValue(...colors.headerColor)}
        zIndex={99}
      >
        {/*TODO add a little transparency to tooltip and change description dynamically*/}
        <GridItem>
          <Tooltip
            hasArrow
            label={`switch to ${colorMode === "dark" ? "light" : "dark"} mode`}
            borderRadius={"lg"}
          >
            <IconButton
              onClick={toggleColorMode}
              size={"md"}
              variant={"ghost"}
              icon={colorMode === "dark" ? <MoonIcon boxSize={5} /> : <SunIcon boxSize={5} />}
              aria-label={"Switch color mode"}
            />
          </Tooltip>
        </GridItem>
        <GridItem textAlign={"center"}>
          <Heading m={"auto"} transition={"font-size 0.4s"} fontSize={scroll ? "4xl" : "6xl"}>
            Truth Table Wizard
          </Heading>
        </GridItem>
      </Grid>
    </>
  );
}
