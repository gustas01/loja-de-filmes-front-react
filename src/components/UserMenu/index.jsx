/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import jwt_decode from "jwt-decode";

import './style.css'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import Context from '../Context/Context';

export default function MenuListComposition() {
  const [, setToken] = useContext(Context).token
  const [, setShoppingCart] = useContext(Context).shoppingCart
  const [open, setOpen] = React.useState(false);
  const [decoded, setDecoded] = React.useState('');
  const anchorRef = React.useRef(null);

  function handleLogout(){
    localStorage.removeItem('token')
    setToken('')
    setShoppingCart([])

    if(document.getElementById('sideNavFavoritesContainer').classList.contains('showHideFavorites'))
      document.getElementById('sideNavFavoritesContainer').classList.remove('showHideFavorites')

    if(document.getElementById('sideNavCartContainer').classList.contains('showHideCart'))
      document.getElementById('sideNavCartContainer').classList.remove('showHideCart')
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
        setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);




  React.useEffect(() => {
    if(localStorage.getItem('token')){
      if(jwt_decode(JSON.parse(localStorage.getItem('token'))?.token).exp <= Math.floor(new Date() / 1000)){
        setToken('')
        localStorage.removeItem('token')
      }
      else{
        setDecoded(jwt_decode(JSON.parse(localStorage.getItem('token'))?.token))
      }
    }
  }, []);



  return (
    <Stack direction="row" spacing={2}>
      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          className="userMenuButton"
        >
          {decoded.name}
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          //linha de baixo é a anchor do elemento, onde vai aparecer o menu. Se quiser fazer aparecer pra
          //esquerda é só colocar bottom-end
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                    className="userMenu"
                  >
                    <MenuItem onClick={handleClose}><Link to='/update'>Minha conta</Link> </MenuItem>
                    <MenuItem onClick={handleClose}> <Link onClick={handleLogout} to='/'>Sair</Link> </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
}
