import React from 'react'
import './Liste.css'
import { Link } from 'react-router-dom'
import Imprimer from './imprimer.png'
import Telecharger from './telecharger.png'
import Modifier from './modifier.png'
import Supprimer from './supprimer.png'
import { v4 } from 'uuid'

function Liste(props) {
    
    return (
        <div>
            <h1>{props.titre}</h1>
            <table>
                <thead>
                    <tr>
                        {
                            props.header.map((field) => {
                                return <th key={v4()}>{field}</th>
                                
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        props.data.map((line) => {
                            return (
                                <tr key={v4()}>{line.map((field) => {

                                    return <td key={v4()}>{field}</td>
                                    })}

                                <td><Link to={`/${props.contexte}/modifier/${line[0]}`}><img src={Modifier} alt="Modifier le courrier"/></Link></td>
                                <td><Link to={`/${props.contexte}/supprimer/${line[0]}`}><img src={Supprimer} alt="Supprimer le courrier"/></Link></td>
                                {props.contexte == "courrier" &&
								<>
                                    <td><a href={`https://amandat.promo-73.codeur.online/courriers/server1/pdf/?cmd=imprimer&id=${line[0]}`} target="_blank"><img src={Imprimer} alt="Imprimer le courrier"/></a></td>
                                    <td><a href={`https://amandat.promo-73.codeur.online/courriers/server1/pdf/?cmd=telecharger&id=${line[0]}`} target="_blank"><img src={Telecharger} alt="Télécharger le courrier"/></a></td>  
                                </>  
                                }
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
        
    )
}

export default Liste
