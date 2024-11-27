import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as farFaStar } from '@fortawesome/free-regular-svg-icons';

interface RatingProps {
  note: number;
  starSize: string | number;
}

const Rating = ({ note, starSize }: RatingProps) => {
  const baseStars = Math.floor(note);
  const decimalPart = note % 1;
  let fullStars, halfStar, emptyStars;

  if (decimalPart > 0.5) {
    fullStars = baseStars + 1;
    halfStar = 0;
  } else if (decimalPart > 0) {
    fullStars = baseStars;
    halfStar = 1;
  } else {
    fullStars = baseStars;
    halfStar = 0;
  }

  emptyStars = 5 - fullStars - halfStar;

  return (
    <div style={{ display: 'flex' }}>
      {[...Array(fullStars)].map((_, i) => (
        <span style={{ width: starSize }} key={`full-${i}`}>
          <FontAwesomeIcon icon={faStar} />
        </span>
      ))}
      {halfStar > 0 && (
        <span style={{ width: starSize }} key="half">
          <FontAwesomeIcon icon={faStarHalfAlt} />
        </span>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <span style={{ width: starSize }} key={`empty-${i}`}>
          <FontAwesomeIcon icon={farFaStar} />
        </span>
      ))}
    </div>
  );
}

export default Rating;