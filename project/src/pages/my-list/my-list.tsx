import FilmList from '../../components/film-list/film-list';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import { Films } from '../../types/film';

type MyListProps = {
  films: Films,
}

function MyList({ films }: MyListProps): JSX.Element {
  const { favorite } = useAppSelector((state) => state);

  return (
    <div className="user-page">
      <Header page={'My list'} />
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmList films={favorite} />
      </section>
      <Footer />
    </div>
  );
}

export default MyList;
