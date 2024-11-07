export enum messageDefaultServerError {
  products = 'Ошибка получения товаров',
  server = 'Ошибка на стороне сервера'
}

export enum messageDuplicateTitleError {
  title = 'Невозможно создать товар из-за наличия такого же названия у другого товара'
}

export enum messageBadRequestError {
  productNotFound = 'Такого товара не существует',
  productNotCreate = 'Нвозможно добавить товар',
  orderNotCreate = 'Нвозможно создать заказ',
  incorrectOrderAmount = 'Неверная сумма заказа',
  unknownCreateOrderError = 'Неизвестная ошибка создания зазаказ'
}

export enum messageNotFoundError {
  page = 'Такой страницы не существует'
}
