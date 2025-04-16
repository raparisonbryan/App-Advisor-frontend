import StarFull from "@/components/Atoms/stars/StarFull";
import StarHalf from "@/components/Atoms/stars/StarHalf";
import StarEmpty from "@/components/Atoms/stars/StarEmpty";
import styles from "./Rating.module.scss";

interface RatingProps {
  note: number;
  starSize: string | number;
}

const Rating = ({ note, starSize = 24 }: RatingProps) => {
  const safeNote = Math.max(0, Math.min(5, note));
  const fullStars = Math.floor(safeNote);
  const hasHalfStar = safeNote % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
      <div className={styles.ratingContainer}>
        {[...Array(fullStars)].map((_, i) => (
            <span className={styles.starWrapper} key={`full-${i}`}>
          <StarFull size={Number(starSize)} />
        </span>
        ))}

        {hasHalfStar && (
            <span className={styles.starWrapper} key="half">
          <StarHalf size={Number(starSize)} />
        </span>
        )}

        {[...Array(emptyStars)].map((_, i) => (
            <span className={styles.starWrapper} key={`empty-${i}`}>
          <StarEmpty size={Number(starSize)} />
        </span>
        ))}
      </div>
  );
};

export default Rating;