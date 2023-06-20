import Image from 'next/image';
import React, { useState } from 'react';
import { useWindowSize } from '../../hooks';
// import LogoImage from '../../public/assets/images/'
import { WindowSize } from '../../types';
import sislogo from '../../public/sislogo.png.jpg';
import {
  CloseButtonContainer,
  CloseIcon,
  LogoContainer,
  MenuIcon,
  MenuLinkContainer,
  Nav,
  NavLinkContainer,
  OverlayMenu,
} from './NavElements';

import NavLink from './NavLink';
import { useSession } from 'next-auth/react';
import { BsFillPersonFill } from 'react-icons/bs';

const Navbar = () => {
  const size: WindowSize = useWindowSize();
  const [showMenu, setShowMenu] = useState(false);
  const { data: session } = useSession();

  const openMenu = () => {
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <Nav>
      <LogoContainer>
        <NavLink route="/">
          <Image
            src={sislogo}
            alt="logo"
            width={100}
            height={100}
            className="rounded-full background:zinc-500"
          />
        </NavLink>
      </LogoContainer>

      <NavLinkContainer>
        {size.width > 768 ? (
          <>
            <NavLink route="/">Home</NavLink>
            <NavLink route="/admin/projects'">Projects</NavLink>
            {/* <NavLink route="/mhb"></NavLink> */}
            {/* <NavLink route="/products">Products</NavLink> */}
            <NavLink route='/about_us'>About Us</NavLink>
            <NavLink route='/contactus'>Contact Us</NavLink>

            {session ? (
              <NavLink route="/profile">
                <BsFillPersonFill size={30} />
              </NavLink>
            ) : (
              <NavLink route="/login">Login</NavLink>
            )}
          </>
        ) : (
          <MenuIcon size={30} onClick={openMenu} />
        )}
      </NavLinkContainer>

      {showMenu && (
        <OverlayMenu>
          <CloseButtonContainer>
            <CloseIcon size={40} color={'white'} onClick={closeMenu} />
          </CloseButtonContainer>
          <MenuLinkContainer>
            <NavLink route="/" large color="white" onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink route="/products" large color="white" onClick={closeMenu}>
              Projects
            </NavLink>
            <NavLink route="/login" large color="white" onClick={closeMenu}>
              Login
            </NavLink>
          </MenuLinkContainer>
        </OverlayMenu>
      )}
    </Nav>
  );
};

export default Navbar;
