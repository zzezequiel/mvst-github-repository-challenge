import { Box } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { Header } from './Header'
import Navbar from '@/components/Navbar'

interface LayoutProps {
  children: ReactNode
}

const HomeLayaout: React.FC<LayoutProps> = (props) => {
  const { children } = props
  return (
    <Box>
      <Navbar />
      <Box as="main">
        {children}
      </Box>
      {/* <Footer /> */}
    </Box>
  )

}

export default HomeLayaout