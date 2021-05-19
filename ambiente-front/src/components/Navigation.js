import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'

const Navigation = () => {  
        return(
            <div className = "mb1">
            <img  
                src="https://www.ifpb.edu.br/imagens/logotipos/ifpb-1" 
                alt="ifpb" 
                title="ifpb"
                height="5%" width="10%"
                style = {{ position: 'relative', float: 'left'}}
                className = "pa1"
            />
            <nav className = 'flex w-85 page__menu page__custom-settings menu'>
                <ul className="menu__list r-list">
                    <Link to = "/" className = "menu__link r-link text-underlined">
                        <li className = "menu__group"> Inicio </li>
                    </Link>  
                </ul>
            </nav>
            <h1 className = "tc pt2">Monitoramento CO₂ - Ciências do ambiente 2020.2</h1>
            <hr/>
            </div>  
        )    
}

export default Navigation;