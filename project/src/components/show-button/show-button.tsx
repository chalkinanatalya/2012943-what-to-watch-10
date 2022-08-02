type ShowButtonProps = {
  onShowMore: () => void
}

function ShowButton({ onShowMore }: ShowButtonProps): JSX.Element {
  return (
    <button className="catalog__button" type="button" onClick={onShowMore}>Show more</button>
  );
}

export default ShowButton;
