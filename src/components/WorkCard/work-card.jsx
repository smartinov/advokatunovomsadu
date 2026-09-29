import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArticlesModal } from "../Modal/modal";
import { clickable } from "../../a11y";
import "./work-card.scss";

export const WorkCard = ({ title, img, desc, modalEnabled }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const modalHandler = () => {
    modalOpen ? closeModal() : openModal();
    setModalData({ title, img, desc });
  };

  return (
    <>
      <motion.div
        className={"c-work-card"}
        {...(modalEnabled && clickable(modalHandler))}
      >
        <img
          src={img}
          alt=""
          className="c-work-card__bg"
          loading="lazy"
        />
        <motion.div className="c-work-card__info">
          <motion.h3 layout="position" className="c-work-card__title">
            {title} {modalEnabled}
          </motion.h3>
          <p className="c-work-card__text">{desc}</p>
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {modalOpen && (
          <ArticlesModal
            modalOpen={modalOpen}
            handleClose={closeModal}
            data={modalData}
          />
        )}
      </AnimatePresence>
    </>
  );
};
