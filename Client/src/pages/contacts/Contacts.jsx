import React from "react";
import styles from './Contacts.module.css'

function Contacts(){
    return(
        <div className={styles.container}>
            <div className={styles.card}>
            <article>
            <h1><b>Contacts</b></h1>
            <p><b>Email: </b>trashpanda@gmail.com</p>
            <p><b>Mobile:</b> +359898219201</p>
            <p><b>Facebook Page: </b> Trashpanda</p>
            <p><b>Creator: </b> https://github.com/StefanDimitrow</p>
            </article>
            </div>
            
        </div>
    )
}

export default Contacts