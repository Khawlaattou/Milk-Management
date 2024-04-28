import React from 'react';
import { Link,  useLocation } from 'react-router-dom';
import { Flex, Box, Text, Spacer, Image } from '@chakra-ui/react';
import logo from "../assets/Logo.png";

const NavBar = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="white"
      color="black"
    >
      {/* Logo */}
      <Box>
        <Image src={logo} alt="logo" width="100px" />
      </Box>

      {/* Navigation links */}
      <Box
        display={{ base: 'none', md: 'flex' }} // Hide links on small screens
        width={{ base: 'full', md: 'auto' }} // Take full width on small screens
      >
        <NavLink to="/" text="Cows" />
        <NavLink to="/tests" text="Tests" />
        <NavLink to="/births" text="Births" />
        <NavLink to="/productions" text="Productions" />
      </Box>
    </Flex>
  );
}

const NavLink = ({ to, text }) => {
  const location = useLocation();
  
  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <Text
        display="inline-block"
        fontSize="20px"
        fontWeight="bold"
        ml="5rem" 
        borderBottom="3px solid transparent"
        _hover={{ borderBottom: '3px solid black' }}
        borderBottomColor={location.pathname === to ? 'black' : 'transparent'}
      >
        {text}
      </Text>
    </Link>
  );
}
export default NavBar;
