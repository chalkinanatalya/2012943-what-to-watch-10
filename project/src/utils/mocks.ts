import { datatype, system, name, internet, image, commerce, music, time, company } from 'faker';
import { Film } from '../types/film';

export const makeFakeFilm = (): Film => ({
  id: datatype.number(),
  name: company.companyName(),
  posterImage: image.image(),
  previewImage: image.image(),
  backgroundImage: image.image(),
  backgroundColor: internet.color(),
  videoLink: system.filePath(),
  previewVideoLink: system.filePath(),
  description: commerce.productDescription(),
  rating: datatype.number(),
  scoresCount: datatype.number(),
  director: name.title(),
  starring: new Array(3).fill(null).map(() => (name.title())),
  runTime: datatype.number(),
  genre: music.genre(),
  released: time.recent(),
  isFavorite: datatype.boolean(),
} as Film);
