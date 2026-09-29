import React from 'react'
import { motion } from 'framer-motion'
import { Backdrop } from '../Backdrop/backdrop'
import ReactDOM from 'react-dom'
import close from "../../assets/images/close.svg"
import "./modal.scss";

const Dialog = ({ handleClose, className, label, children }) =>
  ReactDOM.createPortal(
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={className}
        role="dialog"
        aria-modal="true"
        aria-label={label}
      >
        <button type="button" className="c-close-button" onClick={handleClose} autoFocus>
          <img src={close} alt="Zatvori" className='c-close-icon' />
        </button>
        {children}
      </motion.div>
    </Backdrop>,
    document.getElementById('portal')
  )

export const Modal = ({ handleClose, data }) => (
  <Dialog handleClose={handleClose} className="c-modal" label={data.name}>
    <img src={data.img} alt={data.name} className="c-modal-img" loading="lazy" />
    <div className="c-modal-text-container">
      <h2 className="c-modal-title">{data.name}</h2>
      <h5 className='c-modal-subtitle'>{data.title}</h5>
      <p className="c-modal-desc">{data.desc}</p>
    </div>
  </Dialog>
)

export const ShortModal = ({ handleClose, data }) => (
  <Dialog handleClose={handleClose} className="c-modal c-modal--short" label={data.title}>
    <img src={data.icon} alt="" className="c-modal-img c-modal-img__short" />
    <div className="c-modal-text-container">
      <h2 className="c-modal-title">{data.title}</h2>
      <p className="c-modal-desc">{data.desc}</p>
    </div>
  </Dialog>
)

export const ArticlesModal = ({ handleClose, data }) => (
  <Dialog handleClose={handleClose} className="c-modal c-modal--article" label={data.title}>
    <img src={data.img} alt="" className="c-modal-img" loading="lazy" />
    <div className="c-modal-text-container">
      <h2 className="c-modal-title">{data.title}</h2>
      <p className="c-modal-desc">{data.desc}</p>
    </div>
  </Dialog>
)
