// does nothing; used for gql coloration
module.exports = (literals, ...substitutions) => {
  let result = '';
  for (let i = 0; i < substitutions.length; i += 1) {
    result += literals[i];
    result += substitutions[i];
  }
  result += literals[literals.length - 1];
  return result;
};
