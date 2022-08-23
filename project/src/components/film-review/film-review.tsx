import { useEffect } from 'react';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { fetchCommentsAction } from '../../store/api-actions';
import UserComment from '../user-comment/user-comment';

type FilmReviewProps = {
  filmId?: string,
}

function FilmReview({ filmId }: FilmReviewProps): JSX.Element {
  useEffect(() => {
    store.dispatch(fetchCommentsAction(filmId));
  }, [filmId]);
  const { comments } = useAppSelector((state) => state);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {comments.filter((_, index) => index % 2 === 0).map((comment) => <UserComment key={comment.id} comment={comment} />)}
      </div>
      <div className="film-card__reviews-col">
        {comments.filter((_, index) => index % 2 !== 0).map((comment) => <UserComment key={comment.id} comment={comment} />)}
      </div>
    </div>
  );
}

export default FilmReview;
