const countValues = exports.countValues = (array) => {
  return array.reduce((object, value) => {
    if (value === null) {
      value = 'U'
    }
    if (!object[value]) {
    object[value] = 1
    } else {
    object[value]++
    }
    return object
    }, {})
}

const ratio = exports.ratio = (object, denominator) => {
  return Object.keys(object).reduce((obj, curr) => {
    return Object.assign(object, {
      [curr]: object[curr]/denominator
    })
  }, {})
}

const removeNotTrueOrFalse = exports.removeNotTrueOrFalse = (count) => {
  if (Object.keys(count).length > 2) {
    const keyss = Object.keys(count)
    keyss.forEach(property => {
      if (keyss.indexOf(property) > 1) delete count[property]
    })
  }
}
