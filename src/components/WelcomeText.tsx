import useDeviceWidth from '@/Hooks/deviceWidth'
import { Heading, Stack, Text } from '@chakra-ui/react'
import React from 'react'


const WelcomeText = () => {
  const device = useDeviceWidth()
  return (
    <Stack mt={500}>
      <Heading as={"h1"} fontSize={60} textAlign={"center"}>MVST.</Heading>
      <Heading color={"blue.600"} mt={5} as={"h2"} textAlign={"start"}> Github repository challenge - By Ezequiel Z</Heading>

      <Text mt={5} fontSize={device === "desktop" ? 20 : 15}>
        The goal is to allow the user to type the name of a GitHub user and display their repositories in a list. The user should then be able to filter the repositories by name and/or programming language. The interface should be responsive and follow the principles of good user experience. The official GitHub API must be used to obtain the repositories per user.
      </Text>
    </Stack>
  )
}

export default WelcomeText