'use client'

import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  FlexProps,
} from '@chakra-ui/react'

import SidebarContent from './SidebarContent'
import HeadMenu from './HeadMenu'
import RepositoriesList from './RepositoriesList'


const HomePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <HeadMenu onOpen={onOpen} />
      <Box ml={{ base: 0, md: 500 }}
        p="4"
        borderLeftWidth="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        >
        {/* SEARCH INFORMATION */}
        <RepositoriesList />
      </Box>
    </Box>
  )
}

export default HomePage