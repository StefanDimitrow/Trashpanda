import React from 'react';
import Button from 'react-bootstrap/Button';
import styles from './Submit.module.css'


export default function Submit({ variant = "primary", type = "submit", children = "Submit", ...props }) {
    return (
        <Button variant={variant} type={type} className={styles.button}{...props}>
            {children}
        </Button>
    );
}
