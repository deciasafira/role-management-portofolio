import React from 'react'
import './button.css'
import { useNavigate } from "react-router-dom";

export default function Button(props) {

  let navigate = useNavigate()
  const handleOnclick = () => {
    if (props.hasOwnProperty("navigateState"))
      navigate(props.to, props.navigateState)
    else
      navigate(props.to)
  }
  if (props.buttonType === 'btn-modal') {
    return (
      <button title={props.title ? props.title : ''} className={`btn ${props.btnType || 'btn-default'} font-size-small ${props.styleClass}`} style={props.style} type="button" data-modal-toggle={props.btnId} onClick={() => props.hasOwnProperty("click") && props.click()}>
        {props.children}
      </button>
    )

  } else {
    return (
        <button title={props.title ? props.title : ''} className={`btn ${props.btnType || 'btn-default'} font-size-small ${props.styleClass}`} style={props.style} type="button" onClick={(e) => props.hasOwnProperty("click") ? props.click(e, props.value) : handleOnclick()} disabled={props.disabled ? props.disabled : false} hidden={props.hidden? props.hidden : false} >
          {props.children}
        </button>
      )
    }
  }
