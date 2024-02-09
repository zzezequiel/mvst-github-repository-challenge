import useDeviceWidth from '@/Hooks/deviceWidth';
import { Edge, Repository, SearchResponse } from '@/types';
import { useQuery, gql } from '@apollo/client';
import { Box, Button, Flex, Heading, IconButton, Link, Skeleton, Stack, Tag, Text, useColorModeValue } from '@chakra-ui/react';
import { formatDistanceToNow } from 'date-fns';
import { FiChevronDown, FiStar } from 'react-icons/fi';


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
    console.log(trendingRepos)
    return (
        <Stack>
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
                        <Stack>
                            <Heading as={"h1"} textAlign={"center"} py={10}>Trending Repositories</Heading>

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
                                                <Button backgroundColor={useColorModeValue('gray.100', 'gray.900')} borderColor={useColorModeValue('gray.300', 'gray.700')} borderEndRadius={0} borderRightWidth={"1px"} borderRightColor={useColorModeValue('gray.300', 'gray.700')} leftIcon={<FiStar />} variant='outline'>
                                                    Star
                                                </Button>
                                                <IconButton backgroundColor={useColorModeValue('gray.100', 'gray.900')} borderColor={useColorModeValue('gray.300', 'gray.700')} borderLeftRadius={0} aria-label='arrow down' icon={<FiChevronDown />} variant={"outline"} />
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

                                        {/* stats */}
                                        <Box>

                                        </Box>
                                    </Flex>
                                </Stack>
                            ))}
                        </Stack>
                    )
            }
        </Stack>
    )
}

export default TrendingRepos