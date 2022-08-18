import { ChangeEvent, FormEvent, Fragment, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postCommentAction } from '../../store/api-actions';
import './comment-error.css';

const setErrorMarkup = (commentError: string) => (
  <div className="comment-error__message">
    <p>{commentError}</p>
  </div>
);

function FormComment(): JSX.Element {
  const dispatch = useAppDispatch();
  const { commentError } = useAppSelector((state) => state);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const { id } = useParams();

  const [form, setForm] = useState({
    id: id,
    rating: '',
    reviewtext: ''
  });

  const submitHandler = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    dispatch(postCommentAction({ id: Number(form.id), comment: form.reviewtext, rating: Number(form.rating) }));
  };

  const formChangeHandler = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    if (buttonRef.current !== null) {
      const { name, value } = evt.currentTarget;
      setForm({ ...form, [name]: value });
      if (form.reviewtext.length >= 50 && form.reviewtext.length <= 400 && form.rating !== '') {
        buttonRef.current.disabled = false;
      } else {
        buttonRef.current.disabled = true;
      }
    }
  };

  const createField = (counter: number): JSX.Element => (
    <Fragment key={counter}>
      <input className="rating__input" id={`star-${counter}`} type="radio" name="rating" value={`${11 - counter}`} onChange={formChangeHandler} />
      <label className="rating__label" htmlFor={`star-${counter}`}>Rating {counter}</label>
    </Fragment>
  );

  const createRatingStars = (): JSX.Element[] => {
    const stars = Array.from({ length: 10 }, (_, i) => createField(1 + i));
    return stars;
  };

  return (
    <form action="#" className="add-review__form" onSubmit={submitHandler}>
      <div className="rating">
        <div className="rating__stars">
          {createRatingStars()}
        </div>
      </div>

      <div className="add-review__text">
        <textarea className="add-review__textarea" name="reviewtext" id="review-text" placeholder="Review text" value={form.reviewtext} onChange={formChangeHandler}></textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" ref={buttonRef} disabled>Post</button>
        </div>
      </div>
      {commentError !== '' ? setErrorMarkup(commentError) : null}
    </form>
  );
}

export default FormComment;
