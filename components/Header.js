import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Menus from '../assets/lang/menus.json'

const HeaderContainer = styled.div.attrs(() => ({
  className: `bg-white p-3 mx-auto border-b border-gray-200`
}))``;

const Container = styled.div.attrs(() => ({
  className: `container flex flex-row items-center flex-1 flex-shrink-0 w-full space-x-4 items-center`
}))`
  min-height: 85px;
`;

const LogoContainer = styled.div.attrs(() => ({
  className: `relative w-14 h-14 md:w-20 md:h-20`
}))``;

const MenuContainer = styled.div.attrs(() => ({
  className: `flex flex-row space-x-2 md:space-x-4 items-center`
}))``;

const Menu = styled.div.attrs(() => ({
  className: `text-xs md:text-sm text-gray-700 p-2 md:p-4 font-semibold hover:bg-amber-400 rounded-md`
}))``;

const ToggleLanguange = styled.div.attrs((props) => ({
  className: `border-2 rounded-md p-2 text-xs md:text-sm text-gray-700 hover:bg-amber-400 hover:border-amber-400 font-semibold ${props.active && ('bg-amber-400 border-amber-400')}`
}))``;

export default function Header(props) {
  const { locale, locales, asPath } = useRouter();
  const menu = Menus?.posts?.filter(m => m.locale === locale).map(elem => (
    {
      items: elem.menu
    }
  ));

  return (
    <HeaderContainer>
      <Container>
        <LogoContainer>
          <Image
            src="/logo_neo.png"
            alt="BNC - Frontend Test"
            layout="fill"
          />
        </LogoContainer>
        <div className='flex w-full justify-between'>
          <MenuContainer>
            {
              menu[0]?.items?.map((item, index) => {
                return (
                  <Link key={index} href={item?.url}>
                    <Menu>
                      {item?.name}
                    </Menu>
                  </Link>
                )
              })
            }
          </MenuContainer>
          <div className='flex items-center justify-end space-x-2'>
            {
              locales?.map((item, index) => {
                return (
                  <Link
                    key={index}
                    href={asPath}
                    locale={item}
                  >
                    <ToggleLanguange
                      active={item === locale}
                    >
                      {item}
                    </ToggleLanguange>
                  </Link>
                )
              })
            }
          </div>
        </div>
      </Container>
    </HeaderContainer>
  )
}
