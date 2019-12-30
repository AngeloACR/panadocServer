import * as passport from 'passport';
import * as mongo from 'mongodb';
import {Counter} from './general/models/counter.schema.model';

const customId = async function (path) {
  let count = await Counter.existCounter(path);
  if(!count){
    count = await Counter.addCollection(path);
  }
  const id = await Counter.incValue(path);
  return id;
}
const fixUid=(databaseObjectWithId)=>{
  const v=databaseObjectWithId.toObject()
  return { ...v,uid:v._id}
}
const sendOk = (okMsg, res, object) => {
  if (!object) {
    res.status(200).json(okMsg);
  } else {
    res.status(200).json(object);
  }
};

const sendError = (errMsg, res, err) => {
  if (err == null) {
    res.status(400).send(errMsg);
  } else {
    res.status(400).send(err.toString());
  }
};


export {
  sendOk,
  sendError,
  customId,
  fixUid,
}