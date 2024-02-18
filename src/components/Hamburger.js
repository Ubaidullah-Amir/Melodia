"use client"
import React from 'react';
import styles from "./hamburgerStyles.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { toggleHamMenu } from '@/redux/features/ui-slice';
const HamburgerMenu = () => {
      const isHamMenuOpen = useSelector((state)=>state.ui.isHamMenuOpen)

      const dispatch = useDispatch()
      return (
            
            <div className={`${styles.hamburgerContainer} lg:hidden  dark:bg-transparent  dark:text-gray-100 text-gray-700`}>
                  <input id="dropdown"  type="checkbox" onChange={()=>dispatch(toggleHamMenu())} checked={isHamMenuOpen} style={{display:"none"}}/>

                  <label htmlFor="dropdown" className={styles.dropdown}>
                  
                        <span >
                              <span className={`${styles.iconbar} ${styles.topbar}` }></span>
                              <span className={`${styles.iconbar} ${styles.middlebar}` }></span>
                              <span className={`${styles.iconbar} ${styles.bottombar}` }></span>
                        </span>
                  </label>
            </div>
      )
};

export default HamburgerMenu;