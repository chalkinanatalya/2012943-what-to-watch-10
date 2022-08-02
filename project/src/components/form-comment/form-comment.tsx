import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';


function FormComment(): JSX.Element {

  const { id } = useParams();

  const [form, setForm] = useState({
    id: id,
    rating: '',
    reviewtext: ''
  });

  const submitHandler = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
  };

  const formChangeHandler = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = evt.currentTarget;
    setForm({ ...form, [name]: value });
  };

  const createField = (counter: number): JSX.Element => (
    <Fragment key={counter}>
      <input className="rating__input" id={`star-${counter}`} type="radio" name="rating" value={`${counter}`} onChange={formChangeHandler} />
      <label className="rating__label" htmlFor={`star-${counter}`}>Rating {counter}</label>
    </Fragment>
  );

  const createRatingStars = (): JSX.Element[] => {
    const stars = Array.from({ length: 10 }, (_, i) => createField(i));
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
          <button className="add-review__btn" type="submit" >Post</button>
        </div>

      </div>
    </form>
  );
}

export default FormComment;
