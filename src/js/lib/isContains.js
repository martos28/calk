export default function isContains(e, el) {

  let isContains = false;

  for (let i=0; i<e.path.length; i++) {

    if(e.path[i]===el) {

      isContains = true;

    }

  }

  return isContains;

}


