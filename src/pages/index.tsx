// src/pages/index.tsx
import type { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { VStack, Heading, Box, LinkOverlay, LinkBox } from "@chakra-ui/layout";
import { Text, Button } from "@chakra-ui/react";

import ReadERC20 from "../components/ReadERC20";
import About from "../components/about";
import Faq from "../components/faq";

const addressContract = "0x23Ec454378D92c0db3365F924fD12840F8e78246";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Big Cheeze</title>
      </Head>

      <div className="div-block-1201">
        <div className="form-block w-form">
          <ReadERC20 addressContract={addressContract} />
        </div>
      </div>
      <Faq />
      <About />
    </>
  );
};

export default Home;
