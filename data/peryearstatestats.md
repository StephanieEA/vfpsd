stats from const findRatePerMillion = (d, population) => {
  fetch(`http://localhost:3000/api/v1/state-territory/${nameToAbbreviation(d.properties.name)}/incidents`)
  .then(response => response.json())
  .then(response => {
    let perYear = ((response.length*1000000)/population) / 2.25
    return perYear
  })
  .then(response => {
    console.log(d.properties.name, response)
  })}

Alaska 7.7878750573232525
city-finder.js:41 Alabama 4.021046523051335
city-finder.js:41 Arizona 6.219978284901584
city-finder.js:41 Arkansas 3.4208078520331053
city-finder.js:41 California 4.234959241475544
city-finder.js:41 Colorado 5.294304681819809
city-finder.js:41 Connecticut 0.8698875620618174
city-finder.js:41 Delaware 2.800929208264842
city-finder.js:41 District of Columbia 6.524721353618692
city-finder.js:41 Florida 2.9108636779956023
city-finder.js:41 Georgia 2.715712169814258
city-finder.js:41 Hawaii 3.111142533650701
city-finder.js:41 Idaho 3.96085094921793
city-finder.js:41 Illinois 1.9094926355686175
city-finder.js:41 Indiana 2.546171256115229
city-finder.js:41 Iowa 1.417824470991081
city-finder.js:41 Kansas 3.210321826737326
city-finder.js:41 Kentucky 4.307239824058268
city-finder.js:41 Louisiana 4.8415813231158875
city-finder.js:41 Maine 3.004178060637832
city-finder.js:41 Maryland 2.6593768714325914
city-finder.js:41 Massachusetts 1.370175593385125
city-finder.js:41 Michigan 1.4772586109068688
city-finder.js:41 Minnesota 2.3349639433257554
city-finder.js:41 Mississippi 2.825432791244311
city-finder.js:41 Missouri 3.9389463318562283
city-finder.js:41 Montana 3.8368568468710436
city-finder.js:41 Nebraska 3.495679689471782
city-finder.js:41 Nevada 5.4420695101933365
city-finder.js:41 New Hampshire 1.664841584080119
city-finder.js:41 New Jersey 1.5900577465495405
city-finder.js:41 New Mexico 9.397123786015745
city-finder.js:41 New York 0.9228642954895329
city-finder.js:41 North Carolina 2.9346999048149796
city-finder.js:41 North Dakota 1.7591263474907821
city-finder.js:41 Ohio 2.4873395136258227
city-finder.js:41 Oklahoma 7.5894774613617
city-finder.js:41 Oregon 3.474372499147354
city-finder.js:41 Pennsylvania 1.5644277905891377
city-finder.js:41 Rhode Island 0.8414114087393617
city-finder.js:41 South Carolina 3.493835429735375
city-finder.js:41 South Dakota 3.5947735074436205
city-finder.js:41 Texas 3.222161272330036
city-finder.js:41 Utah 3.058888742863367
city-finder.js:41 Tennessee 3.474731170239676
city-finder.js:41 Vermont 2.134720047476174
city-finder.js:41 Virginia 2.007759674125811
city-finder.js:41 Washington 3.0491523356506893
city-finder.js:41 West Virginia 6.067991357723988
city-finder.js:41 Wisconsin 2.61496360624401
city-finder.js:41 Wyoming 6.072672045915473
