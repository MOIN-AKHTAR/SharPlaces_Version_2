import React from 'react';
import style from './SideDrawer.module.css'

export default function SideDrawer(props) {
    return (
           <aside className={style.side_drawer} 
           style={{
            transform: props.show ? "translateX(0)" : "translateX(-100%)"
               }}
           >
              {props.children}
           </aside>
        
    )
}
