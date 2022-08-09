import React from 'react'
import css from './Tag.module.css'

export const Tag = ({color = 'red', label}) => {
  return (
    <div className={`${css[color]} ${css.main}`}>{label}</div>
  )
}
