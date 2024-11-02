export enum messageDefaultServerError {
  products = 'Ошибка получения товаров',
  server = 'Ошибка на стороне сервера'
}

export enum messageDuplicateTitleError {
  title = 'Невозможно создать товар из-за наличия такого же названия у другого товара'
}

export enum messageBadRequestError {
  productNotFound = 'Такого товара не существует',
  incorrectOrderAmount = 'Неверная сумма заказа'
}
