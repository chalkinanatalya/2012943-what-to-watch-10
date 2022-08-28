import { ChangeEvent, FormEvent, Fragment, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { sendCommentAction } from '../../store/api-actions';
import { getCommentError } from '../../store/comment-store/selector';
import './form-comment.css';

const getErrorMarkup = (commentError: string) => {
  if (commentError !== '') {
    return (
      <div className="comment-error__message">
        <p>{commentError}</p>
      </div>
    );
  } else {
    return null;
  }
};

function FormComment(): JSX.Element {
  const dispatch = useAppDispatch();
  const commentError = useAppSelector(getCommentError);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const { id } = useParams();

  const [form, setForm] = useState({
    id: id,
    rating: '',
    reviewText: ''
  });

  useEffect(() => {
    if (buttonRef.current) {
      if (form.reviewText.length >= 50 && form.reviewText.length <= 400 && form.rating !== '') {
        buttonRef.current.disabled = false;
      } else {
        buttonRef.current.disabled = true;
      }
    }
  });

  const handleSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    dispatch(sendCommentAction({ id: Number(form.id), comment: form.reviewText, rating: Number(form.rating) }));
  };

  const handleFormChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    if (buttonRef.current !== null) {
      const { name, value } = evt.currentTarget;
      setForm({ ...form, [name]: value });
    }
  };

  const createField = (counter: number): JSX.Element => (
    <Fragment key={counter}>
      <input className="rating__input" id={`star-${counter}`} type="radio" name="rating" value={`${11 - counter}`} onChange={handleFormChange} />
      <label className="rating__label" htmlFor={`star-${counter}`}>Rating {counter}</label>
    </Fragment>
  );

  const createRatingStars = (): JSX.Element[] => {
    const stars = Array.from({ length: 10 }, (_, i) => createField(1 + i));
    return stars;
  };

  return (
    <form action="#" className="add-review__form" onSubmit={handleSubmit}>
      <div className="rating">
        <div className="rating__stars">
          {createRatingStars()}
        </div>
      </div>

      <div className="add-review__text">
        <textarea className="add-review__textarea" name="reviewText" id="review-text" placeholder="Review text" value={form.reviewText} onChange={handleFormChange}></textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" ref={buttonRef} disabled>Post</button>
        </div>
      </div>
      {getErrorMarkup(commentError)}
    </form>
  );
}

export default FormComment;
