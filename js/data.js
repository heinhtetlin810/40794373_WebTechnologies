const CONTINENTS = ["Africa","Asia","Europe","North America","South America","Oceania"];

const COUNTRIES = [
  // EASY
  { name:"France",           capital:"Paris",           continent:"Europe",   language:"French",    code:"fr", num:"250", diff:"easy" },
  { name:"Germany",          capital:"Berlin",          continent:"Europe",   language:"German",   code:"de", num:"276", diff:"easy" },
  { name:"Italy",            capital:"Rome",            continent:"Europe",   language:"Italian",    code:"it", num:"380", diff:"easy" },
  { name:"Spain",            capital:"Madrid",          continent:"Europe",   language:"Spanish",    code:"es", num:"724", diff:"easy" },
  { name:"United Kingdom",   capital:"London",          continent:"Europe",   language:"English",    code:"gb", num:"826", diff:"easy" },
  { name:"Japan",            capital:"Tokyo",           continent:"Asia",     language:"Japanese",    code:"jp", num:"392", diff:"easy" },
  { name:"China",            capital:"Beijing",         continent:"Asia",     language:"Mandarin",    code:"cn", num:"156", diff:"easy" },
  { name:"India",            capital:"New Delhi",       continent:"Asia",     language:"Hindi",    code:"in", num:"356", diff:"easy" },
  { name:"United States",    capital:"Washington D.C.", continent:"North America",language:"English (USA)",code:"us", num:"840", diff:"easy" },
  { name:"Canada",           capital:"Ottawa",          continent:"North America",language:"French (Canada)",code:"ca", num:"124", diff:"easy" },
  { name:"Mexico",           capital:"Mexico City",     continent:"North America",language:"Spanish (Mexico)",code:"mx", num:"484", diff:"easy" },
  { name:"Brazil",           capital:"Brasília",        continent:"South America",language:"Portuguese (Brazil)",code:"br", num:"076", diff:"easy" },
  { name:"Australia",        capital:"Canberra",        continent:"Oceania",   language:"English (Australia)",    code:"au", num:"036", diff:"easy" },
  { name:"Egypt",            capital:"Cairo",           continent:"Africa",    language:"Arabic (Egypt)",    code:"eg", num:"818", diff:"easy" },
  { name:"South Korea",      capital:"Seoul",           continent:"Asia",       language:"Korean",   code:"kr", num:"410", diff:"easy" },
  { name:"Greece",           capital:"Athens",          continent:"Europe",     language:"Greek",   code:"gr", num:"300", diff:"easy" },
  { name:"Portugal",         capital:"Lisbon",          continent:"Europe",     language:"Portuguese",   code:"pt", num:"620", diff:"easy" },
  { name:"The Netherlands",  capital:"Amsterdam",       continent:"Europe",     language:"Dutch",   code:"nl", num:"528", diff:"easy" },
  { name:"Russia",           capital:"Moscow",          continent:"Europe",     language:"Russian",   code:"ru", num:"643", diff:"easy" },
  { name:"Argentina",        capital:"Buenos Aires",    continent:"South America",language:"Spanish (Argentina)", code:"ar", num:"032", diff:"easy" },
  { name:"Cambodia",         capital:"Phnom Penh",      continent:"Asia",        language:"Khmer",  code:"kh", num:"116", diff:"easy" },

  // MEDIUM
  { name:"Switzerland",      capital:"Bern",            continent:"Europe",   language:"German,French,Italian",     code:"ch", num:"756", diff:"medium" },
  { name:"Sweden",           capital:"Stockholm",       continent:"Europe",   language:"Swedish",     code:"se", num:"752", diff:"medium" },
  { name:"Norway",           capital:"Oslo",            continent:"Europe",    language:"Norwegian",    code:"no", num:"578", diff:"medium" },
  { name:"Poland",           capital:"Warsaw",          continent:"Europe",    language:"Polish",    code:"pl", num:"616", diff:"medium" },
  { name:"Ukraine",          capital:"Kyiv",            continent:"Europe",    language:"Ukrainian",    code:"ua", num:"804", diff:"medium" },
  { name:"Turkey",           capital:"Ankara",          continent:"Asia",      language:"Turkish",    code:"tr", num:"792", diff:"medium" },
  { name:"Saudi Arabia",     capital:"Riyadh",          continent:"Asia",      language:"Arabic",    code:"sa", num:"682", diff:"medium" },
  { name:"Indonesia",        capital:"Jakarta",         continent:"Asia",      language:"Bahasa Indonesia",    code:"id", num:"360", diff:"medium" },
  { name:"Pakistan",         capital:"Islamabad",       continent:"Asia",      language:"German",    code:"pk", num:"586", diff:"medium" },
  { name:"Thailand",         capital:"Bangkok",         continent:"Asia",      language:"Thai",    code:"th", num:"764", diff:"medium" },
  { name:"Vietnam",          capital:"Hanoi",           continent:"Asia",      language:"Vietnamese",    code:"vn", num:"704", diff:"medium" },
  { name:"Philippines",      capital:"Manila",          continent:"Asia",      language:"Tagalog",    code:"ph", num:"608", diff:"medium" },
  { name:"Malaysia",         capital:"Kuala Lumpur",    continent:"Asia",      language:"Bahasa Malayu",    code:"my", num:"458", diff:"medium" },
  { name:"Iran",             capital:"Tehran",          continent:"Asia",      language:"Persian",    code:"ir", num:"364", diff:"medium" },
  { name:"South Africa",     capital:"Pretoria",        continent:"Africa",    language:"Afrikaans,English",    code:"za", num:"710", diff:"medium" },
  { name:"Nigeria",          capital:"Abuja",           continent:"Africa",    language:"Xhosa",    code:"ng", num:"566", diff:"medium" },
  { name:"Kenya",            capital:"Nairobi",         continent:"Africa",    language:"German",    code:"ke", num:"404", diff:"medium" },
  { name:"Ethiopia",         capital:"Addis Ababa",     continent:"Africa",    language:"German",    code:"et", num:"231", diff:"medium" },
  { name:"Morocco",          capital:"Rabat",           continent:"Africa",    language:"Arabic (Morocco)",    code:"ma", num:"504", diff:"medium" },
  { name:"Colombia",         capital:"Bogotá",          continent:"South America", language:"Spanish (Colombia)",code:"co", num:"170", diff:"medium" },
  { name:"Peru",             capital:"Lima",            continent:"South America", language:"Spanish (Peru)",code:"pe", num:"604", diff:"medium" },
  { name:"Chile",            capital:"Santiago",        continent:"South America", language:"Spanish (Chile)",code:"cl", num:"152", diff:"medium" },
  { name:"New Zealand",      capital:"Wellington",      continent:"Oceania",       language:"English, Maori",code:"nz", num:"554", diff:"medium" },

  // HARD
  { name:"Kazakhstan",       capital:"Astana",          continent:"Asia",     language:"Kazakh",        code:"kz", num:"398", diff:"hard" },
  { name:"Uzbekistan",       capital:"Tashkent",        continent:"Asia",     language:"Uzbek",       code:"uz", num:"860", diff:"hard" },
  { name:"Kyrgyzstan",       capital:"Bishkek",         continent:"Asia",     language:"Kyrgyz",       code:"kg", num:"417", diff:"hard" },
  { name:"Tajikistan",       capital:"Dushanbe",        continent:"Asia",     language:"Tajik",      code:"tj", num:"762", diff:"hard" },
  { name:"Turkmenistan",     capital:"Ashgabat",        continent:"Asia",     language:"Turkmen",      code:"tm", num:"993", diff:"hard" },
  { name:"Azerbaijan",       capital:"Baku",            continent:"Asia",     language:"Azerbaijani",      code:"az", num:"031", diff:"hard" },
  { name:"Georgia",          capital:"Tbilisi",         continent:"Asia",     language:"Georgian",      code:"ge", num:"268", diff:"hard" },
  { name:"Armenia",          capital:"Yerevan",         continent:"Asia",     language:"Armenian",      code:"am", num:"051", diff:"hard" },
  { name:"Mongolia",         capital:"Ulaanbaatar",     continent:"Asia",     language:"Mongolian",      code:"mn", num:"496", diff:"hard" },
  { name:"Nepal",            capital:"Kathmandu",       continent:"Asia",     language:"Nepali",      code:"np", num:"524", diff:"hard" },
  { name:"Iraq",             capital:"Baghdad",         continent:"Asia",     language:"Kurdish",    code:"iq", num:"368", diff:"hard" },
  { name:"Belarus",          capital:"Minsk",           continent:"Europe",   language:"Russian,Belarusian",      code:"by", num:"112", diff:"hard" },
  { name:"Latvia",           capital:"Riga",            continent:"Europe",   language:"Latvian",      code:"lv", num:"428", diff:"hard" },
  { name:"Lithuania",        capital:"Vilnius",         continent:"Europe",   language:"Lithuanian",      code:"lt", num:"440", diff:"hard" },
  { name:"Estonia",          capital:"Tallinn",         continent:"Europe",   language:"Estonian",      code:"ee", num:"233", diff:"hard" },
  { name:"Slovenia",         capital:"Ljubljana",       continent:"Europe",   language:"Slovene",      code:"si", num:"705", diff:"hard" },
  { name:"Moldova",          capital:"Chișinău",        continent:"Europe",   language:"Romanian",      code:"md", num:"498", diff:"hard" },
  { name:"Tanzania",         capital:"Dodoma",          continent:"Africa",   language:"English, Swahili",      code:"tz", num:"834", diff:"hard" },
  { name:"Mozambique",       capital:"Maputo",          continent:"Africa",   language:"Portuguese (Mozambique)",      code:"mz", num:"508", diff:"hard" },
  { name:"Zambia",           capital:"Lusaka",          continent:"Africa",   language:"English, Nyanja, Bemba",    code:"zm", num:"894", diff:"hard" },
  { name:"Zimbabwe",         capital:"Harare",          continent:"Africa",   language:"English, Shona",  code:"zw", num:"716", diff:"hard" },
  { name:"Equatorial Guinea",capital:"Malabo",          continent:"Africa",   language:"Spanish (Equatorial Guinea)",    code:"gq", num:"226", diff:"hard" },
  { name:"Niger",            capital:"Niamey",          continent:"Africa",   language:"French (Niger)",     code:"ne", num:"562", diff:"hard" },
  { name:"Benin",            capital:"Porto-Novo",      continent:"Africa",   language:"French (Benin)",       code:"bj", num:"204", diff:"hard" },
  { name:"Ivory Coast",      capital:"Yamoussoukro",    continent:"Africa",   language:"French (Ivory Coast)",     code:"ci", num:"384", diff:"hard" },
  { name:"Uruguay",          capital:"Montevideo",      continent:"South America", language:"Spanish (Uruguay)",code:"uy", num:"858", diff:"hard" },
  { name:"Paraguay",         capital:"Asunción",        continent:"South America", language:"Spanish (Paraguay)",code:"py", num:"600", diff:"hard" },
  { name:"Bolivia",          capital:"Sucre",           continent:"South America", language:"Spanish (Bolivia)",code:"bo", num:"068", diff:"hard" },
  { name:"Guyana",           capital:"Georgetown",      continent:"South America", language:"English",     code:"gy", num:"328", diff:"hard" },
  { name:"Suriname",         capital:"Paramaribo",      continent:"South America", language:"Dutch",       code:"sr", num:"740", diff:"hard" },
  { name:"Papua New Guinea", capital:"Port Moresby",    continent:"Oceania",       language:"English,Tok Pisin,Hiri Motu",code:"pg", num:"598", diff:"hard" },
  { name:"Venezuela",        capital:"Caracas",         continent:"South America", language:"Spanish (Venezuela)",code:"ve", num:"862", diff:"hard" },
  { name:"Bhutan",           capital:"Thimphu",         continent:"Asia",          language:"Dzongkha",   code:"bt", num:"064", diff:"hard" },
  { name:"Ireland",          capital:"Dublin",          continent:"Europe",        language:"Irish",   code:"ie", num:"372", diff:"hard" },
  { name:"Mauritania",       capital:"Nouakchott",      continent:"Africa",        language:"Arabic (Mauritania)",       code:"mr", num:"478", diff:"hard" },
  { name:"Chad",             capital:"N'Djamena",       continent:"Africa",        language:"Arabic (Chad), French (Chad)",    code:"td", num:"148", diff:"hard" },
  { name:"Romania",          capital:"Bucharest",       continent:"Europe",        language:"Romanian",      code:"ro", num:"642", diff:"hard" },
  { name:"Faroe Islands",    capital:"Tórshavn",        continent:"Europe",        language:"Faroese",   code:"fo", num:"234", diff:"hard" },

];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getPool(difficulty) {
  return COUNTRIES.filter(c => c.diff === difficulty);
}

function wrongOptions(correct, field, pool, count = 3) {
  const others = pool.filter(c => c[field] !== correct[field]);
  return shuffle(others).slice(0, count).map(c => c[field]);
}


function makeCapitalQuestion(country, pool) {
  const wrong   = wrongOptions(country, "capital", pool);
  const options = shuffle([country.capital, ...wrong]);
  return {
    category: "capitals",
    text: `What is the capital city of <strong>${country.name}</strong>?`,
    correct: country.capital,
    options,
    country,
  };
}

function makeFlagQuestion(country, pool) {
  const wrong   = wrongOptions(country, "name", pool);
  const options = shuffle([country.name, ...wrong]);
  return {
    category: "flags",
    text: "Which country does this flag belong to?",
    flagUrl: `https://flagcdn.com/w160/${country.code}.png`,
    correct: country.name,
    options,
    country,
  };
}

function makeContinentQuestion(country, pool) {
  const wrongConts = CONTINENTS.filter(c => c !== country.continent);
  const options    = shuffle([country.continent, ...shuffle(wrongConts).slice(0, 3)]);
  return {
    category: "continents",
    text: `Which continent is <strong>${country.name}</strong> located in?`,
    correct: country.continent,
    options,
    country,
  };
}

function makeShapeQuestion(country, pool) {
  const wrong   = wrongOptions(country, "name", pool);
  const options = shuffle([country.name, ...wrong]);
  return {
    category: "shapes",
    text: "Which country does this outline belong to?",
    shapeCode: country.num,   // numeric ISO used by world-atlas topojson
    shapeIso2: country.code,  // fallback for mapsicon
    correct: country.name,
    options,
    country,
  };
}

/* Generate a quiz for one category */
function generateQuiz(category, difficulty, count = 10) {
  const pool      = getPool(difficulty);
  const countries = shuffle(pool).slice(0, count);

  return countries.map(c => {
    switch(category) {
      case "capitals":   return makeCapitalQuestion(c, pool);
      case "flags":      return makeFlagQuestion(c, pool);
      case "continents": return makeContinentQuestion(c, pool);
      case "shapes":     return makeShapeQuestion(c, pool);
      default:           return makeCapitalQuestion(c, pool);
    }
  });
}

/* Category metadata */
const CATEGORIES = {
  capitals:   { label: "Capital Cities", icon: "🌆", color: "var(--teal)",   desc: "Name the capital city of the randomized country." },
  flags:      { label: "Flags",          icon: "🚩", color: "var(--gold)",   desc: "Identify the country from its national flag." },
  continents: { label: "Continents",     icon: "🌍", color: "var(--purple)", desc: "Place the country on the correct continent." },
  shapes:     { label: "Map Shapes",     icon: "🗺️", color: "var(--red)",    desc: "Identify the country from its map outline." },
};