import { NameSpace } from '../../const';
import { Comments } from '../../types/comment';
import { State } from '../../types/state';

export const getComments = (state: State): Comments => state[NameSpace.Comment].comments;
export const getCommentError = (state: State): string => state[NameSpace.Comment].commentError;
