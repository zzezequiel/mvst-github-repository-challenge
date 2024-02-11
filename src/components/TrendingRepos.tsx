import useDeviceWidth from '@/Hooks/deviceWidth';
import { Edge, Repository, SearchResponse } from '@/types';
import { useQuery, gql } from '@apollo/client';
import { Box, Button, Flex, Heading, IconButton, Link, Skeleton, Stack, Tag, Text, useColorModeValue } from '@chakra-ui/react';
import { formatDistanceToNow } from 'date-fns';
import { FiChevronDown, FiStar } from 'react-icons/fi';
import { TbStars } from 'react-icons/tb';


const TrendingRepos = () => {

    const GET_TRENDING_REPOSITORIES = gql`
        query {
            search(query: "stars:>100", type: REPOSITORY, first: 10) {
            edges {
                node {
                ... on Repository {
                    name
                    description
                    url
                    primaryLanguage {
                      name
                    }
                    stargazerCount
                    createdAt
                    updatedAt
                }
                }
            }
            }
        }
        `;
    const { loading, error, data } = useQuery<SearchResponse>(GET_TRENDING_REPOSITORIES);
    const device = useDeviceWidth()

    if (error) return <p>Error: {error.message}</p>;

    const trendingRepos = data?.search.edges.map((edge: Edge) => edge.node);

    function formatNumber(number: number) {
        if (number < 1000) {
            return number.toString();
        } else if (number < 1000000) {
            return (number / 1000).toFixed(1) + 'k';
        } else {
            return (number / 1000000).toFixed(1) + 'M';
        }
    }
    return (
        <Stack px={device === "mobile" ? 0 : 20}>
            {
                loading ?
                    (
                        <Stack>
                            <Skeleton height='100px' />
                            <Skeleton height='100px' />
                            <Skeleton height='100px' />
                            <Skeleton height='100px' />
                            <Skeleton height='100px' />
                            <Skeleton height='100px' />
                        </Stack>
                    )
                    :

                    (
                        <Box>
                            <Heading as={"h1"} fontSize={35} textAlign={"center"} p={5}>Trending Repositories</Heading>
                            {trendingRepos?.map((repo: Repository) => (

                                <Stack key={repo.url} pb={10} width={"full"} borderBottomWidth="1px" mt={2}>

                                    {/* FIRST ROW OF THE CARD */}
                                    <Flex alignItems={"center"} justifyContent={"space-between"} >
                                        <Box>
                                            <Flex alignItems={"center"} gap={2}>
                                                <Heading color={"blue.600"} as={"h3"} fontSize={"xl"}><Link href={repo.url} target='_blank'>{repo.name}</Link></Heading>
                                                {device === "desktop" && <Tag variant='outline' borderRadius='full'>Public</Tag>}
                                            </Flex>
                                        </Box>

                                        {device === "desktop" && <Box>
                                            <Flex alignItems={"center"}>
                                                <Button backgroundColor={useColorModeValue('gray.100', 'gray.900')} borderColor={useColorModeValue('gray.100', 'gray.700')} borderEndRadius={0} borderRightWidth={"1px"} borderRightColor={useColorModeValue('gray.300', 'gray.700')} leftIcon={<FiStar />} variant='outline'>
                                                    Star
                                                </Button>
                                                <IconButton backgroundColor={useColorModeValue('gray.100', 'gray.900')} borderColor={useColorModeValue('gray.100', 'gray.700')} borderLeftRadius={0} aria-label='arrow down' icon={<FiChevronDown />} variant={"outline"} />
                                            </Flex>
                                        </Box>}
                                    </Flex>

                                    {/* SECOND ROW OF THE CARD */}
                                    <Flex alignItems={"center"} justifyContent={"space-between"} >
                                        <Box>
                                            <Flex gap={2}>
                                                <Text>{repo.primaryLanguage?.name}</Text>
                                                <Text>Updated {formatDistanceToNow(new Date(repo.updatedAt))} ago</Text>
                                            </Flex>
                                        </Box>

                                        {/* Starreds */}
                                        <Box>
                                            <Flex gap={2} alignItems={"center"}>
                                                <Text>{formatNumber(repo.stargazerCount)}</Text>
                                                <TbStars size={25} />
                                            </Flex>
                                        </Box>
                                    </Flex>
                                </Stack>
                            ))}
                        </Box>
                    )
            }
        </Stack>
    )
}

export default TrendingRepos