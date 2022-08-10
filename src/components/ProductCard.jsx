import css from './ProductCard.module.css';
import image from '../assets/Image.png';
import { ReactComponent as HeightIcon } from '../assets/bouquetHeightIcon.svg';
import { ReactComponent as WidthIcon } from '../assets/bouquetWidthIcon.svg';
import { ReactComponent as CountIcon } from '../assets/flowersCountIcon.svg';
import { ReactComponent as HeartIcon } from '../assets/fillHeartIcon.svg';
import { ReactComponent as EmptyHeartIcon } from '../assets/emptyFavoriteIcon.svg';
import { Button } from './Button';
import { Tag } from './Tag';

export const ProductCard = (props) => {
  const {
    bouquetHeight,
    bouquetWidth,
    currentPrice,
    flowersCount,
    imageUrl,
    isFavorite,
    isHit,
    isSale,
    oldPrice,
    title,
  } = props;

  return (
    <div data-testid='product-card' className={css.wrapper}>
      <div className={css.panel}>
        <span className={css.tags}>
          {isHit && <Tag color={'red'} label={'хит'} />}
          {oldPrice && isSale && <Tag color={'green'} label={'скидка'} />}
        </span>
        <span className={css.favorite}>
          {isFavorite ? <HeartIcon data-testid='product-icon-fill-heart'/> : <EmptyHeartIcon data-testid='product-icon-empty-heart'/>}
        </span>
      </div>
      <img
        src={imageUrl}
        className={css.image}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = image;
        }}
        alt='bouquet'
      ></img>
      <div className={css.info}>
        <h3 className={css.title}>{flowersCount + ' ' + title}</h3>
        <p className={css.priceWrapper}>
          <span
          data-testid='product-current-price'
            className={`${css.price} ${isSale && oldPrice ? css.sale : ''}`}
          >
            {currentPrice} ₽
          </span>
          {oldPrice && isSale && (
            <span data-testid='product-old-price' className={css.oldPrice}>{oldPrice} ₽</span>
          )}
        </p>
        <div className={css.parameters}>
          <span className={css.parameter}>
            <CountIcon></CountIcon>
            {flowersCount ?? 0} шт.
          </span>
          <span className={css.parameter}>
            <HeightIcon></HeightIcon>
            {bouquetHeight} см
          </span>
          <span className={css.parameter}>
            <WidthIcon></WidthIcon>
            {bouquetWidth} см
          </span>
        </div>
      </div>
      <div className={css.buttons}>
        <Button data-testid="product-card-button" disabled={!flowersCount}>В корзину</Button>
        <Button data-testid="product-buy-button" disabled={!flowersCount} type='secondary'>Купить сразу</Button>
      </div>
    </div>
  );
};
