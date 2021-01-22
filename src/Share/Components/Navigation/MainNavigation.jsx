import React,{useState} from 'react';
import {Link} from 'react-router-dom'
import MainHeader from './MainHeader';
import NavLinks from './NavLinks'
import style from './MainNavigation.module.css';
import SideDrawer from './SideDrawer';
import BackDrop from '../UiElements/BackDrop';

export default function MainNavigation() {
    const [drawerIsOpen,setDrawerIsOpen]=useState(false);

    const openDrawer=()=>setDrawerIsOpen(true);
    const closeDrawer=()=>setDrawerIsOpen(false);

    return (
        <React.Fragment>
        {
            drawerIsOpen&&<BackDrop onClick={closeDrawer} />
        }
           <SideDrawer show={drawerIsOpen}>
            <nav className={style.main_navigation__drawer_nav}>
                <NavLinks/>
            </nav>
            </SideDrawer>
            <MainHeader>
            <button className={style.main_navigation__menu_btn}
            onClick={openDrawer}
            >
                <span />
                <span />
                <span />
            </button>
            <h1 className={style.main_navigation__title}>
                <Link to="/">Your Places</Link>
            </h1>
            <nav className={style.main_navigation__header_nav}>
                <NavLinks/>
            </nav>
        </MainHeader>
        </React.Fragment>
        
    )
}
