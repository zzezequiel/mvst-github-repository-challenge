import { useEffect, useState } from 'react';
import { useLazyQuery, gql, useQuery } from '@apollo/client';
import { Box, List, ListItem, Link, Spinner, Stack, Flex, Heading, Button, Tag, IconButton, Text, Select, Skeleton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { useUser } from '@/Context/UserContext';
import { Repository } from '@/types/repositories';
import { FiChevronDown, FiStar } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import useDeviceWidth from '@/Hooks/deviceWidth';
import TrendingRepos from './TrendingRepos';

const RepositoriesList = () => {
  const GET_USER_REPOS = gql`
    query getUserRepos($username: String!, $afterCursor: String) {
      user(login: $username) {
        repositories(first: 10, after: $afterCursor) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            owner {
              login
              avatarUrl
            }
            isPrivate 
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
  `;

  const { selectedUser } = useUser();

  // Hook to detect device width
  const device = useDeviceWidth();

  // State to store repositories data
  const [repositories, setRepositories] = useState<Repository[]>([]);

  // State to store cursor for fetching more repositories
  const [afterCursor, setAfterCursor] = useState<string | null>(null);


  const { loading, error, data, fetchMore } = useQuery(GET_USER_REPOS, {
    variables: { username: selectedUser?.login },
    skip: !selectedUser,
    onCompleted: (data) => {
      if (data.user.repositories.pageInfo.hasNextPage) {
        setAfterCursor(data.user.repositories.pageInfo.endCursor);
      } else {
        setAfterCursor(null);
      }
    }
  });

  // Updateting the repos state when data changes
  useEffect(() => {
    if (data) {
      setRepositories(data.user.repositories.nodes);
    }
  }, [data]);

  if (!selectedUser) {
    return <TrendingRepos />
  }

  if (error) return <Text>Error: {error.message}</Text>;

  // Load more repos
  const loadMoreRepositories = () => {
    fetchMore({
      variables: {
        username: selectedUser.login,
        afterCursor: afterCursor
      },

      // Update the query result with the newly fetched repositories
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;

        // If there are no more pages, set afterCursor to null
        if (!fetchMoreResult.user.repositories.pageInfo.hasNextPage) {
          setAfterCursor(null);
        } else {
          setAfterCursor(fetchMoreResult.user.repositories.pageInfo.endCursor);
        }
        return {
          // Combine previous and new data and return the updated query result
          user: {
            ...prevResult.user,
            repositories: {
              ...prevResult.user.repositories,
              nodes: [...prevResult.user.repositories.nodes, ...fetchMoreResult.user.repositories.nodes]
            }
          }
        };
      }
    });
  };

  // Handle filtering repositories by programming language
  const handleFilterByLanguage = (language: string) => {
    if (language === "All") {
      setRepositories(data.user.repositories.nodes);
    } else {

      const filteredRepositories = data.user.repositories.nodes.filter((repo: Repository) => repo.primaryLanguage?.name === language);
      setRepositories(filteredRepositories);
    }
  };
  // handle sorting repositories alphabetically
  const handleSortByName = () => {
    const sortedRepositories = [...repositories].sort((a, b) => a.name.localeCompare(b.name));
    setRepositories(sortedRepositories);
  };

  return (
    <Stack px={device === "mobile" ? 0 : 20}>
      {loading ? (
        <Stack>
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} height='100px' />
          ))}
        </Stack>
      ) : (
        <Box>
          <Flex alignItems="center" mb={4}>
            <Select backgroundColor={useColorModeValue('gray.100', 'gray.900')} borderColor={useColorModeValue('gray.100', 'gray.700')} onChange={(e) => handleFilterByLanguage(e.target.value)} width={{ base: '95%', md: '20%' }}>
              <option value="All">All</option>
              <option value="JavaScript">Javascript</option>
              <option value="TypeScript">TypeScript</option>
              <option value="TypeScript">CSS</option>
              <option value="TypeScript">HTML</option>
              <option value="TypeScript">Flutter</option>
              <option value="TypeScript">Nest</option>
              <option value="SQL">SQL</option>
              <option value=".NET">.NET</option>
              <option value="C#">C#</option>
            </Select>
            <Button backgroundColor={useColorModeValue('gray.100', 'gray.900')} border={useColorModeValue("0px", "1px")} borderColor={useColorModeValue('gray.300', 'gray.700')} ml={4} onClick={handleSortByName}>Sort from A-Z</Button>
          </Flex>
          {repositories.map((repo: Repository) => (
            <Stack key={repo.url} width={"full"} borderBottomWidth="1px" mt={2} pb={5}>
              {/* FIRST ROW OF THE CARD */}
              <Flex alignItems={"center"} justifyContent={"space-between"} >
                <Box>
                  <Flex alignItems={"center"} gap={2}>
                    <Heading color={"blue.600"} as={"h3"} fontSize={"xl"}><Link href={repo.url} target='_blank'>{repo.name}</Link></Heading>
                    {device === "desktop" && <Tag variant='outline' borderRadius='full'>{repo.isPrivate ? "Private" : "Public"}</Tag>}
                  </Flex>
                  <Box pt={1}>
                    {repo.owner.login !== selectedUser.login && <Link wordBreak={"break-word"} fontSize={12} href={repo.url} target='_blank'>Forked from {repo.url}</Link>}
                  </Box>
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
              <Flex alignItems={"center"} justifyContent={"space-between"} mt={2}>
                <Box>
                  <Flex gap={2}>
                    <Text>{repo.primaryLanguage?.name}</Text>
                    <Text>Updated {formatDistanceToNow(new Date(repo.updatedAt))} ago</Text>
                  </Flex>
                </Box>
              </Flex>
            </Stack>
          ))}
          {afterCursor && (
            <Button onClick={loadMoreRepositories} mt={4} variant={"outline"} colorScheme="blue">
              Load more repositories
            </Button>
          )}
        </Box>
      )}
    </Stack>
  )
}

export default RepositoriesList;
