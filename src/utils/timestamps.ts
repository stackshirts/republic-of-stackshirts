import firebase from 'firebase/app';
import 'firebase/firestore';
import { TimestampType } from 'src/types';
import _pick from 'lodash/pick'

export const convertTimestampToDate = (timestamp: TimestampType) => {
  const date = new firebase.firestore.Timestamp(timestamp.seconds, timestamp.nanoseconds).toDate()
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}

export const nowAsFormattedTimestamp = () => {
  return _pick(firebase.firestore.Timestamp.now(), ['seconds', 'nanoseconds'])
}
