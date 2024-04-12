import React, { useState, useEffect } from 'react';
import './navbar.css';
import { useNavigate } from "react-router-dom";
import logo from '../../assets/logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../contexts/Authorization/Authorized';
import {
  Flex, Spacer, HStack, Image, Text, Input, Menu, MenuList, MenuButton, MenuItem, Button,
} from '@chakra-ui/react'
import { Drawer } from '@mui/material';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useOrder } from '../../contexts/Order/Order';


const categories = [
  'Male',
  'Female',
  'Unisex',
  'Clothing',
  'Shoes',
  'Beauty Products',
];

const NavBar = () => {
  const { isAuthenticated, isAdmin, userDetails, logout } = useAuth();
  const { orders, clearOrder } = useOrder();

  const [showNav, setShowNav] = useState(true);

  const [lastScrollY, setLastScrollY] = useState(window.pageYOffset);
  const [direction, setDirection] = useState('');

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  }

  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    let newItemCount = 0;
    orders.forEach(({ Quantity }) => {
      newItemCount += Quantity;
    })
    setItemCount(newItemCount);
  }, [orders])

  useEffect(() => {
    console.log(itemCount)
  }, [itemCount]);


  const NavBarSpacer = () => {
    return (
      <div className={`navbar-spacer ${showNav ? 'visible' : ''}`}></div>
    );
  };

  // Trying to get a dynamic nav bar that disappears and reappears as you scroll up and down.
  // Functionality works I guess.
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;

      if (currentScrollY > lastScrollY && currentScrollY > 96) {
        setDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setDirection('up');
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setShowNav(direction !== 'down');
  }, [direction]);

  let navigate = useNavigate();
  const routeChangeLogin = () => {
    let path = '/login'
    navigate(path);
  }

  const routeChangeHome = () => {
    let path = '/'
    navigate(path);
  }

  const routeChangeRegister = () => {
    let path = '/register'
    navigate(path);
  }

  const routeChangeProfile = () => {
    let path = '/profile'
    navigate(path)
  }

  const routeChangeOrders = () => {
    let path = '/orders'
    navigate(path)
  }

  const routeChangeCustomerOrders = () => {
    let path = '/customerorders'
    navigate(path)
  }

  const handleLogout = () => {
    logout();
    clearOrder();
  }

  const routeChangeReview = () => {
    let path = '/review'
    navigate(path)
  }

  return (
    <>
      <Flex bg="#F3EEEA" py={4} px={2} alignItems="center"
        as="nav"
        align="center"
        color="white"
        position="fixed"
        top="0"
        left="0"
        right="0"
        zIndex="banner"
        style={{ transform: showNav ? 'translateY(0)' : 'translateY(-100%)', transition: 'transform 0.3s ease-in-out' }}
      >
        <HStack>

          {!isAdmin &&
            <Button onClick={toggleDrawer} w="auto" px="0" bg="transparent" _hover={{ bg: "#EBE3D5" }}>
              <FontAwesomeIcon icon={faBars} style={{ color: "#776B5D", padding: "0" }} size="2xl" className="px-4" />
            </Button>}

          <Image src={logo} onClick={routeChangeHome} sx={{ cursor: "pointer" }} />
        </HStack>

        <Spacer />

        {isAuthenticated ?
          (
            <>
              <Flex justifyContent="center">
                <FontAwesomeIcon onClick={routeChangeOrders} icon={faCartShopping} style={{ color: "#776B5D", padding: "20px", display: isAdmin ? "none" : null, cursor: "pointer" }} size="xl" />
                <div style={{ display: itemCount == 0 ? "none" : null }} className="circle">
                  <Text>{itemCount}</Text>
                </div>
              </Flex>
              <Menu>
                <Text className="px-2" color="#776B5D">{userDetails.Username}{isAdmin ? " (ADMIN)" : ""}</Text>
                <MenuButton as={Button} bg="#B0A695" style={{ borderRadius: "40px" }} _hover={{ bg: '#776B5D' }} _expanded={{ bg: "#776B5D" }}>
                  <FontAwesomeIcon icon={faUser} style={{ color: "#F3EEEA" }} />
                </MenuButton>
                <MenuList bg="#B0A695">
                  <MenuItem bg="#B0A695" _hover={{ bg: '#776B5D' }} onClick={routeChangeProfile}>Profile Info</MenuItem>
                  <MenuItem bg="#B0A695" _hover={{ bg: '#776B5D' }} onClick={routeChangeCustomerOrders}>Orders</MenuItem>
                  <MenuItem bg="#B0A695" _hover={{ bg: '#776B5D' }} onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </>
          )
          :
          <>
            <HStack >
              <Button onClick={routeChangeLogin} bg="#B0A695" color="white" _hover={{ bg: "#4f596a" }} w="6rem">
                Login
              </Button>
              <Button onClick={routeChangeRegister} bg="#776B5D" color="white" _hover={{ bg: "#8894a2" }} w="7rem">
                Register
              </Button>
            </HStack>
          </>
        }

      </Flex>
      <NavBarSpacer />
      <Drawer
        open={open}
        onClose={toggleDrawer}
        ModalProps={{ disableScrollLock: true }}
        anchor="left"
        sx={{
          width: 250,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 250,
            boxSizing: 'border-box',
            backgroundColor: '#F3EEEA',
          },
        }}
      >
        <Flex justifyContent="center" sx={{ padding: 2 }}>
          <Typography variant="h6" sx={{ color: '#333' }}>Urban Weave</Typography>
        </Flex>
        <Divider />
        <Button>Men</Button>
        <Button>Women</Button>
        <Button>Unisex</Button>
        <Divider />
        <Button>Clothing</Button>
        <Button>Shoes</Button>
        <Button>Beauty Products</Button>
      </Drawer>
    </>
  );
};

export default NavBar;