import React from "react";

const Modal = ({modal, showModal, restart}) => {
  if (!modal) {
    return null;
  }
  return <section className="modal">
    <button className="modal__close" type="button"><span className="visually-hidden">Закрыть</span></button>
    <h2 className="modal__title">Подтверждение</h2>
    <p className="modal__text">Вы уверены что хотите начать игру заново?</p>
    <div className="modal__buttons">
      <button className="modal__button button" onClick={restart}>Ок</button>
      <button className="modal__button button" onClick={() => showModal(false)}>Отмена</button>
    </div>
  </section>;
};

export default Modal;
