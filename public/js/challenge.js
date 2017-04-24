// write code that turns this list of names:




var name_list = ['bob', 'susan', 'james', 'susan', 'james', 'susan'];







// into a hash that looks like this:


// var expected_result = { 'bob': 1,  'susan': 3, 'james': 2 };

name_list.reduce(obj, name) => {
  // if it doesn't we want to add it with a value of 1
  if (!obj[name]) {
    obj[name] = 1
  } else {
    obj[name]++
  }
  // if name exists in the object we want to increment it's value
  return obj
, {}}
