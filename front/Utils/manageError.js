export const manageError = variable => {
  if (variable === 0) {
    return '';
  }
  if (variable === 30) {
    return 'Un champs est manquant';
  } 
  if (variable === 1) {
    return 'Les emails sont différents';
  }
  if (variable === 2) {
    return 'Les mots de passes sont différents';
  }
  if (variable === 3) {
    return "Le téléphone n'est pas correcte";
  }
  if (variable === 4) {
    return 'Message field is missing';
  }
  if (variable === 5) {
    return 'Crypto field is missing';
  }
  if (variable === 6) {
    return 'Option crypto field is missing';
  }
  if (variable === 7) {
    return 'Crypto value field is missing';
  }
  if (variable === 8) {
    return 'Recall field is missing';
  }
  if (variable === 9) {
    return 'Interval field is missing';
  }
  if (variable === 10) {
    return 'Weather field is missing';
  }
  if (variable === 11) {
    return 'Weather Option field is missing';
  }
  if (variable === 12) {
    return 'Youtube Channel field is missing';
  }
  if (variable === 13) {
    return 'Anim name field is missing';
  }
  if (variable === 14) {
    return 'Lol pseudo name field is missing';
  } else {
    return '';
  }
};
