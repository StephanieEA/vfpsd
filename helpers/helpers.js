const countValues = exports.countValues = (array) => {
  return array.reduce((object, value, index) => {
    if (value === null) {
      value = 'U'
    }
    if (!object[value]) {
    object[value] = 1
    } else {
    const increment = object[value]++
    }
    return object
    }, {})
}

const ratio = exports.ratio = (object, denominator) => {
  return Object.keys(object).reduce((obj, curr) => {
    return Object.assign(object, {[curr]: object[curr]/denominator})
  }, {})
}
