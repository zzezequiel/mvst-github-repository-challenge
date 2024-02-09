// RepositoriesList.js
import { useEffect, useState } from 'react';
import { useLazyQuery, gql, useQuery } from '@apollo/client';
import { Box, List, ListItem, Link, Spinner, Stack, Flex, Heading, Button, Tag, IconButton, Text, Select, Skeleton } from '@chakra-ui/react';
import { useUser } from '@/Context/UserContext';
import { Repository } from '@/types/repositories';
import { FiChevronDown, FiStar } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import useDeviceWidth from '@/Hooks/deviceWidth';
import TrendingRepos from './TrendingRepos';



const RepositoriesList = () => {
  /**
   * @requires $username - username clicked, storage in context. 
   * @returns
   */
  const GET_USER_REPOS = gql`
    query getUserRepos($username: String!) {
      user(login: $username) {
        repositories(first: 90) {
          nodes {
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



  /**
   *  I use "useQuery" just because the method first searh in cache if tje query was made before, so it prevent to make the query again.
   */
  const { selectedUser } = useUser();
  const device = useDeviceWidth()
  const { loading, error, data, refetch } = useQuery(GET_USER_REPOS, {
    variables: { username: selectedUser?.login },
    skip: !selectedUser // Evita realizar la consulta si no hay un usuario seleccionado
  });

  /**
   *  makes the query again if the context changes
   */
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    if (data) {
      setRepositories(data.user.repositories.nodes);
    }
  }, [data]);


  if (!selectedUser) {
    return <TrendingRepos />;
  }

  if (error) return <p>Error: {error.message}</p>;


  const handleFilterByLanguage = (language: string) => {
    if (language === "All") {
      setRepositories(data.user.repositories.nodes);
    } else {

      const filteredRepositories = data.user.repositories.nodes.filter((repo: Repository) => repo.primaryLanguage?.name === language);
      setRepositories(filteredRepositories);
    }
  };

  const handleSortByName = () => {
    const sortedRepositories = [...repositories].sort((a, b) => a.name.localeCompare(b.name));
    setRepositories(sortedRepositories);
  };

  console.log("ACTUALREPOS", repositories)
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
            <Box>
              <Flex alignItems="center" mb={4}>
                <Select placeholder="Filter" onChange={(e) => handleFilterByLanguage(e.target.value)}>
                  <option value="All">All</option>
                  <option value="JavaScript">Javascript</option>
                  <option value="TypeScript">TypeScript</option>
                  <option value="SQL">SQL</option>
                  <option value=".NET">.NET</option>
                  <option value="C#">C#</option>

                </Select>
                <Button ml={4} onClick={handleSortByName}>Sort from A-Z</Button>
              </Flex>
              {repositories.map((repo: Repository) => (

                <Stack key={repo.url} pb={10} px={device === "mobile" ? 0 : 10} width={"full"} borderBottomWidth="1px" mt={2}>

                  {/* FIRST ROW OF THE CARD */}
                  <Flex alignItems={"center"} justifyContent={"space-between"} >
                    <Box>
                      <Flex alignItems={"center"} gap={2}>
                        <Heading color={"blue.600"} as={"h3"} fontSize={"xl"}><Link href={repo.url} target='_blank'>{repo.name}</Link></Heading>
                        {device === "desktop" && <Tag variant='outline' borderRadius='full'>Public</Tag>}
                      </Flex>
                    </Box>

                    {device === "desktop" && <Box>
                      <Flex>

                        <Button leftIcon={<FiStar />} variant='outline'>
                          Star
                        </Button>
                        <IconButton aria-label='arrow down' icon={<FiChevronDown />} variant={"outline"} />
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
            </Box>
          )
      }
    </Stack>
  )
}

export default RepositoriesList;
