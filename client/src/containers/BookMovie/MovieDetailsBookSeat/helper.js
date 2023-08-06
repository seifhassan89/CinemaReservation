import { format } from 'date-fns';
import { PARTY_TIMES } from '../../../utils/Constants';

export const dateFormat = (date) => {
  const dateObject = new Date(date);
  const formattedDate = format(dateObject, 'yyyy-MM-dd');
  return formattedDate;
};

export const getPartyTime = (partyTimeId) => {
  const partyTime = PARTY_TIMES.find((partyTime) => +partyTime.id === +partyTimeId);
  return partyTime?.name;
};
