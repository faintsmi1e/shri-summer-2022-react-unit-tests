import { render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker/locale/ru';
import events from '@testing-library/user-event';
import { ProductCard } from './ProductCard';

function getTestCardProps(data) {
  return {
    bouquetHeight: faker.datatype.number({ min: 30, max: 100 }),
    bouquetWidth: faker.datatype.number({ min: 30, max: 100 }),
    currentPrice: faker.commerce.price(0, 99999, 0),
    flowersCount: faker.datatype.number({ min: 1, max: 1000 }),
    id: faker.datatype.uuid(),
    imageUrl: faker.image.imageUrl(400, 400, 'nature', true),
    isFavorite: faker.datatype.boolean(),
    isHit: faker.datatype.boolean(),
    isSale: faker.datatype.boolean(),
    oldPrice: faker.datatype.boolean()
      ? faker.commerce.price(0, 99999, 0)
      : undefined,
    title: faker.commerce.productName(),
    ...data,
  };
}

describe('Компонент «Карточка товара»', () => {
  it('Карточка отрисовалась в документе', () => {
    render(<ProductCard {...getTestCardProps()} />);
    expect(screen.getByTestId('product-card')).toBeInTheDocument();
  });
  it(' Тэг хит отображается на карточке', () => {
    render(<ProductCard {...getTestCardProps({ isHit: true })} />);
    expect(screen.getByTestId('product-card')).toContainElement(
      screen.getByText(/хит/i)
    );
  });
  it('Тег скидка отображается на карточке', () => {
    render(<ProductCard {...getTestCardProps({ isSale: true, oldPrice: 1000 })} />);
    expect(screen.getByTestId('product-card')).toContainElement(
      screen.getByText(/скидка/i)
    );
  });
  it('Сердечко favorite отображается на карточке', () => {
    render(<ProductCard {...getTestCardProps({ isFavorite: true })} />);
    const fillHeartSvg = screen.getByTestId('product-icon-fill-heart')
    expect(screen.getByTestId('product-card')).toContainElement(fillHeartSvg);
  });
  it('Пустое сердечко favorite отображается на карточке', () => {
    render(<ProductCard {...getTestCardProps({ isFavorite: false })} />);
    const emptyHeartSvg = screen.getByTestId('product-icon-empty-heart')
    expect(screen.getByTestId('product-card')).toContainElement(emptyHeartSvg);
  });
  it('Отображается старая цена', () => {
    render(<ProductCard {...getTestCardProps({ isSale: true, oldPrice: 12312 })} />);
    const oldPrice = screen.getByTestId('product-old-price')
    expect(screen.getByTestId('product-card')).toContainElement(oldPrice);
  });
  it('Не отображается старая цена', () => {
    render(<ProductCard {...getTestCardProps({ isSale: false, oldPrice: 12312 })} />);
    screen.logTestingPlaygroundURL()
    const currentPrive = screen.getByTestId('product-current-price')
    expect(currentPrive.nextElementSibling).toBeNull()
  });
  it('Кнопка В корзину disabled если нет товара', () => {
    render(<ProductCard {...getTestCardProps({ flowersCount: 0})} />);
    const cardButton = screen.getByTestId('product-card-button')
    expect(cardButton).toBeDisabled();
  });
  it('Кнопка Купить disabled если нет товара', () => {
    render(<ProductCard {...getTestCardProps({ flowersCount: 0 })} />);
    const buyButton = screen.getByTestId('product-buy-button')
    expect(buyButton).toBeDisabled();
  });
});
