import React from 'react'
import preloader from '../../../assets/img/Rolling-1s-200px.svg'
import s from './Preloader.module.css'

let Preloader = () => {
    return <div className={s.preloader}>
        <img src={preloader} alt="!" />
    </div>
}

export default Preloader