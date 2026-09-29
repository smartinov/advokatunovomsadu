import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react'
import { useContext } from 'react'
import GeneralContext from '../../context/GeneralContext'
import { Modal } from "../Modal/modal";
import { clickable } from "../../a11y";
import "./interns.scss"

export const Interns = () => {
  const { interns } = useContext(GeneralContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(0);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="c-interns-container">
      <h2 className="c-interns__title">Naši advokatski pripravnici</h2>
      <svg className="c-divider-title" width="574" height="34" viewBox="0 0 574 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="77.8747" cy="17.4449" r="4.12535" transform="rotate(180 77.8747 17.4449)" stroke="currentColor" strokeWidth="2"></circle><path className="nesto" d="M33.1192 28.8098C40.5188 21.623 45.673 19.07 56.7047 17.222C45.673 15.3741 40.5188 12.821 33.1192 5.6343L13.0279 17.222L33.1192 28.8098Z" stroke="currentColor" strokeWidth="2"></path><path d="M15.7019 23.9073C21.2729 20.119 22.61 19.2276 29.5181 17.222C23.2785 15.6622 20.8273 13.8794 15.2562 10.314L2.99997 17.222L15.7019 23.9073Z" stroke="currentColor" strokeWidth="2"></path><path d="M71.3318 25.7969C72.4225 33.4067 62.1277 34.866 58.5246 30.0145C56.6551 27.4971 56.281 24.6094 57.3715 21.8831C58.0259 20.2473 59.5571 18.978 60.9797 18.3441C62.4023 17.7101 65.2659 17.2379 66.9554 17.222C65.2659 17.2062 62.4023 16.7415 60.9797 16.1075C59.5571 15.4736 58.0259 14.2043 57.3715 12.5685C56.281 9.84221 56.6551 6.95448 58.5246 4.43709C62.1277 -0.414404 72.4225 1.04488 71.3318 8.65466M71.3318 25.7969C71.3005 25.5791 71.26 25.3562 71.2097 25.1283M71.3318 25.7969C71.3119 25.5711 71.2704 25.3475 71.2097 25.1283M71.3318 25.7969C71.3358 25.8434 71.339 25.89 71.3412 25.9367M71.2097 25.1283C71.198 25.0752 71.1857 25.0218 71.1729 24.9682M71.2097 25.1283C70.4555 22.4043 66.7438 20.3522 64.9195 22.8513C63.6305 24.6172 64.8113 27.2251 67.6066 26.9695M71.3318 8.65466C71.3005 8.8725 71.26 9.09537 71.2097 9.32328M71.3318 8.65466C71.3119 8.88054 71.2704 9.10409 71.2097 9.32328M71.3318 8.65466C71.3358 8.60817 71.339 8.56157 71.3412 8.5149M71.2097 9.32328C71.198 9.37639 71.1857 9.42976 71.1729 9.48341M71.2097 9.32328C70.4555 12.0473 66.7438 14.0994 64.9195 11.6003C63.6305 9.83438 64.8113 7.22651 67.6066 7.48207" stroke="currentColor" strokeWidth="2"></path><path d="M66.5097 17.222C68.263 17.222 71.6943 17.222 71.3937 17.222" stroke="currentColor" strokeWidth="2"></path><path className="lastLine" d="M487 17.2258L87 17.2258" stroke="currentColor" strokeWidth="2" strokeLinecap="square"></path>
      </svg>
      <div className="c-interns__wrapper">
        {interns.length ? interns.map((intern, index) => {
          return (
            <div className='c-intern' key={index}
              {...clickable(() => {
                modalOpen ? closeModal() : openModal();
                setModalData(intern);
              })}
            >
              <img src={intern.img} alt="" className="c-intern__image" loading="lazy" />
              <h3 className="c-intern__name">{intern.name}</h3>
              <p className="c-intern__title">{intern.title}</p>
              <p className="c-intern__desc">{intern.desc}</p>
            </div>
          )
        }
        ) : null}

        <div className={`c-interns__register ${!(interns.length) && 'span-full'}`}>
          <h2 className="c-interns__register-title">Želiš da apliciraš za pripravničko mesto?</h2>
          <p className="c-interns__register-desc">Advokatski pripravnik je diplomirani pravnik upisan u imenik advokatskih pripravnika, koji
            se obavljanjem pripravničke vežbe kod advokata, osposobljava za rad u advokaturi shodno Zakonu
            o advokaturi.
          </p>
          <p className="c-interns__register-desc">Pravosudni ispit može polagati lice koje je diplomiralo na pravnom fakultetu i koje je posle
            završenog pravnog fakulteta steklo dve godine radnog iskustva na poslovima pravne struke u
            advokaturi.
          </p>
          <p className="c-interns__register-desc">Ukoliko želite da budete advokatski pripravnik i da obavljate advokatsku pripravničku
            vežbu u našoj kancelariji pošaljite CV na neki od sledećih mailova:</p>
          <div className="c-interns__register-desc c-interns__register-desc--mail">
            <a href='mailto:adv.davormaric@gmail.com' className="c-interns__register-desc">adv.davormaric@gmail.com</a>
            <a href='mailto:nedicmilan9@gmail.com' className="c-interns__register-desc">nedicmilan9@gmail.com</a>
            <a href='mailto:adv.birodijana@gmail.com' className="c-interns__register-desc">adv.birodijana@gmail.com</a>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <Modal
            modalOpen={modalOpen}
            handleClose={closeModal}
            data={modalData}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
