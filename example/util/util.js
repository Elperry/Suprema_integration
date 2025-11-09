function toObjectArray(msgList) {
  var objArray = [];

  if(!Array.isArray(msgList)) {
    console.log(`${msgList} is not an array!`);
    return objArray;
  }

  try {
    for(let i = 0; i < msgList.length; i++) {
      objArray.push(msgList[i].toObject());
    }
  } catch(error) {
    console.log(`Cannot change the message to an object: ${error}`);
  }

  return objArray;
}

module.exports.toObjectArray = toObjectArray;
