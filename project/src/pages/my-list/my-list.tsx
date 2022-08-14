import FilmList from '../../components/film-list/film-list';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { Films } from '../../types/film';

type MyListProps = {
  films: Films,
}

function MyList({ films }: MyListProps): JSX.Element {

  return (
    <div className="user-page">
      <Header />
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmList films={films} />
      </section>
      <Footer />
    </div>
  );
}

export default MyList;
