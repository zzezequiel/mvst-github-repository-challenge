
import Navbar from '@/components/Navbar'
import {
    Avatar,
    Box,
    BoxProps,
    Container,
    Flex,
    useColorModeValue,
} from '@chakra-ui/react'
import { useScroll } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export interface HeaderProps extends Omit<BoxProps, 'children'> { }

export const Header = (props: HeaderProps) => {
    const ref = useRef<HTMLHeadingElement>(null)
    const [y, setY] = useState(0)
    const { height = 0 } = ref.current?.getBoundingClientRect() ?? {}

    const { scrollY } = useScroll()
    useEffect(() => {
        return scrollY.onChange(() => setY(scrollY.get()))
    }, [scrollY])

    const bg = useColorModeValue('whiteAlpha.700', 'rgba(29, 32, 37, 0.7)')

    return (
        <Box
            ref={ref}
            as="header"
            top="0"
            w="full"
            position="fixed"
            backdropFilter="blur(5px)"
            zIndex="sticky"
            borderColor="whiteAlpha.100"
            transitionProperty="common"
            transitionDuration="normal"
            bg={y > height ? bg : ''}
            boxShadow={y > height ? 'md' : ''}
            borderBottomWidth={y > height ? '1px' : ''}
            {...props}
        >
            <Container maxW="container.2xl" px={{ lg: "20" }} py="4">
                <Flex width="full" align="center" justify="space-between">
                </Flex>
            </Container>
        </Box>
    )
}
