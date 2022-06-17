import styled from "styled-components";

export const NavbarMenu = styled.div`
  height: 80px;
  display: flex;
  justify-content: start;
  align-items: center;
`;

export const NavMenu = styled.nav`
  background-color: #1a1c1e;
  z-index: 99;
  width: 17.5vw;
  min-width: 200px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: -100%;
  transition: 850ms;

  &.active {
    left: 0;
    transition: 350ms;
  }

  .nav-toggle {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: start;
    align-items: center;
  }
`;

export const NavText = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  margin: 8px 16px;
  border-radius: 4px;
  list-style: none;

  a {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 400;
    color: #ffffff;
  }
  
  &:hover {
    background-color: #6239eb;
    path {
      color: #fff;
    }
  }
`;

export const ShowSidebarButton = styled.button`
  background-color: #303234;
  padding: 8px;
  margin-left: 7rem;
  font-size: 1.1rem;
  border-radius: 100%;

  &:hover {
    background-color: #6239eb;
    path {
      color: #fff;
    }
  }
`;
