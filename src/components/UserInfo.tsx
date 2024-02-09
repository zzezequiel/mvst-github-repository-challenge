import { useUser } from '@/Context/UserContext';
import { Avatar, Box, Button, Flex, Heading, Image, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { BsThreeDots } from 'react-icons/bs';
import { FiMail, FiMapPin, FiStar, FiUsers } from 'react-icons/fi';
import { LuBuilding2, LuDot } from 'react-icons/lu';

interface Props { }

const UserInfo = () => {
    const { selectedUser } = useUser();

    return (
        selectedUser
            ?
            <Box height={"10vh"} width={"full"} mt={40} >
                <Flex alignItems={"center"} justifyContent={"center"}>
                    <Image
                        borderRadius='full'
                        boxSize='280px'
                        src={selectedUser.avatarUrl}
                        alt='Dan Abramov'
                    />
                </Flex>

                <Stack mt={10}>
                    <Heading as={"h2"} size={"lg"}>{selectedUser.name}</Heading>
                    <Text>{selectedUser.login}</Text>

                    <Text mt={2} fontSize={"large"}>{selectedUser.bio}</Text>
                </Stack>

                <Stack mt={5}>
                    <Flex alignItems={"center"} gap={2}>
                        <Button backgroundColor={useColorModeValue('gray.100', 'gray.900')} border={useColorModeValue("1px","px")} borderColor={useColorModeValue('gray.300', 'gray.700')} width='full'>Follow</Button>
                        <BsThreeDots size={20} />
                    </Flex>
                </Stack>

                <Stack mt={5}>
                    <Flex alignItems={"center"} gap={2} justifyContent={"center"}>
                        <FiUsers />
                        <Text>{selectedUser.followers?.totalCount} Followers </Text>
                        <LuDot />
                        <Text>{selectedUser.following?.totalCount} Following </Text>
                    </Flex>
                </Stack>

                <Stack mt={5}>
                    <Flex alignItems={"center"} gap={2}>
                        <FiMapPin />
                        <Text>{selectedUser.location}</Text>
                    </Flex>
                    {
                        selectedUser.company &&
                        <Flex alignItems={"center"} gap={2}>
                            <LuBuilding2 />
                            <Text>{selectedUser.company}</Text>
                        </Flex>
                    }
                    {
                        selectedUser.email &&
                        <Flex alignItems={"center"} gap={2}>
                            <FiMail />
                            <Text>{selectedUser.email}</Text>
                        </Flex>
                    }


                </Stack>

            </Box>
            :
            <Box>

            </Box>
    )
}

export default UserInfo