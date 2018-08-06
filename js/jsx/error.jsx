import React from "react";

const ErrorView = ({error}) => <section className="modal">
  <h2 className="modal__title">Произошла ошибка!</h2>
  <p className="modal__text">{error + ``} Пожалуйста, перезагрузите страницу.</p>
</section>;

export default ErrorView;
