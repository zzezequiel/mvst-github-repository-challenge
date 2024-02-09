import { useUser } from '@/Context/UserContext';
import { Avatar, Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { BsThreeDots } from 'react-icons/bs';
import { FiMapPin, FiStar, FiUsers } from 'react-icons/fi';
import { LuBuilding2, LuDot } from 'react-icons/lu';

interface Props { }

const UserInfo = () => {
    const { selectedUser } = useUser();

    return (
        selectedUser
            ?
            <Box height={"10vh"} width={"full"} mt={20} >
                <Flex alignItems={"center"} justifyContent={"center"}>
                    <Avatar src={selectedUser.avatarUrl} size="2xl" />
                </Flex>

                <Stack mt={5}>
                    <Heading as={"h2"} size={"lg"}>{selectedUser.name}</Heading>
                    <Text>{selectedUser.login}</Text>

                    <Text mt={2} fontSize={"large"}>{selectedUser.bio}</Text>
                </Stack>

                <Stack mt={5}>
                    <Flex alignItems={"center"} gap={2}>
                        <Button width='full'>Follow</Button>
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
                    <Flex alignItems={"center"} gap={2}>
                        <LuBuilding2 />
                        <Text>{selectedUser.company}</Text>
                    </Flex>
                    

                </Stack>

            </Box>
            :
            <Box>

            </Box>
    )
}

export default UserInfo