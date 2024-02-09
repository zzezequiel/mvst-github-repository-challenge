// RepositoriesList.js
import { useEffect, useState } from 'react';
import { useLazyQuery, gql, useQuery } from '@apollo/client';
import { Box, List, ListItem, Link, Spinner, Stack, Flex, Heading, Button, Tag, IconButton, Text } from '@chakra-ui/react';
import { useUser } from '@/Context/UserContext';
import { Repository } from '@/types/repositories';
import { FiChevronDown, FiStar } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';



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
  const { loading, error, data, refetch } = useQuery(GET_USER_REPOS, {
    variables: { username: selectedUser?.login },
    skip: !selectedUser // Evita realizar la consulta si no hay un usuario seleccionado
  });

  /**
   *  makes the query again if the context changes
   */
  useEffect(() => {
    refetch();
  }, [selectedUser, refetch]);

  if (!selectedUser) {
    return <p>Select a user</p>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const repositories = data.user.repositories.nodes;



  return (
    repositories ?
      <Box>
        {repositories.map((repo: Repository) => (
          
          <Stack key={repo.name}pb={10} px={10} width={"full"} borderBottomWidth="1px" mt={2}>

            {/* FIRST ROW OF THE CARD */}
            <Flex alignItems={"center"} justifyContent={"space-between"} >
              <Box>
                <Flex alignItems={"center"} gap={2}>
                  <Heading color={"blue.600"} as={"h3"} fontSize={"xl"}>{repo.name}</Heading>
                  <Tag variant='outline' borderRadius='full'>Public</Tag>
                </Flex>
              </Box>

              <Box>
                <Flex>

                  <Button leftIcon={<FiStar />} variant='outline'>
                    Star
                  </Button>
                  <IconButton aria-label='arrow down' icon={<FiChevronDown />} variant={"outline"} />
                </Flex>
              </Box>
            </Flex>

            {/* SECOND ROW OF THE CARD */}
            <Flex alignItems={"center"} justifyContent={"space-between"} >
              <Box>
                  <Flex gap={2}>
                    <Text>{repo.primaryLanguage?.name}</Text>
                    <Text>Updated {formatDistanceToNow(new Date(repo.updatedAt))} ago</Text> {/* Formatea la fecha updatedAt */}
                  </Flex>
              </Box>

              {/* stats */}
              <Box>

              </Box>
            </Flex>
          </Stack>
        ))}
      </Box>
      :
      <></>
  );
};

export default RepositoriesList;
