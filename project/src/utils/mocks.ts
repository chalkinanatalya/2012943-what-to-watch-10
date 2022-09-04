import { datatype, system, name, internet, image, commerce, music, time, company, lorem, date } from 'faker';
import { Film } from '../types/film';
import { Comment } from '../types/comment';

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

export const makeFakeComment = (): Comment => ({
  comment: lorem.word(),
  date: date.recent().toString(),
  id: datatype.number(),
  rating: datatype.number(),
  user: {
    id: datatype.number(),
    name: name.title(),
  },
} as Comment);
