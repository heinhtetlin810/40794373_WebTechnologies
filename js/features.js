/* ================================================================
   features.js — GeoQuester: Fun Facts + Share Score
   
   HOW TO USE:
   Add ONE line in quiz.html before </body>, AFTER quiz-engine.js:
     <script src="js/features.js"></script>
   
   What this file does:
     1. Overrides showFeedback() to append a fun fact after each answer
     2. Injects a "Share Score" button into the result panel
   
   Zero changes to existing files required.
   ================================================================ */


/* ================================================================
   1. FUN FACTS — one for each country in data.js
   ================================================================ */

const FUN_FACTS = {
  // ── EASY ────────────────────────────────────────────────────────
  "France":
    "The Louvre in Paris is the world's most visited art museum, welcoming over 9 million visitors each year.",
  "Germany":
    "Germany has over 1,500 different types of beer brewed within its borders, and hosts the world-famous Oktoberfest every autumn.",
  "Italy":
    "Italy has more UNESCO World Heritage Sites than any other country in the world — over 55 recognised locations.",
  "Spain":
    "Spain is one of the oldest wine-producing countries in the world, with winemaking traditions dating back over 3,000 years.",
  "United Kingdom":
    "The United Kingdom drives on the left side of the road, a custom shared by only about 35% of countries worldwide.",
  "Japan":
    "Japan has the world's oldest continuously operating monarchy — the Imperial House of Japan traces back over 2,600 years.",
  "China":
    "Four of humanity's most transformative inventions — paper, printing, gunpowder, and the compass — all originated in China.",
  "India":
    "Chess was invented in India around the 6th century AD, originally known as 'Chaturanga'.",
  "United States":
    "Alaska has more coastline than all other U.S. states combined, stretching over 47,000 miles of shoreline.",
  "Canada":
    "Canada has the longest coastline of any country in the world at approximately 202,000 kilometres.",
  "Mexico":
    "Mexico City is built on the ruins of Tenochtitlán, the capital of the Aztec Empire, which once stood on an island in a lake.",
  "Brazil":
    "Brazil is the only Portuguese-speaking country in South America, and the fifth largest country in the world by area.",
  "Australia":
    "Australia is the only continent governed as a single country, and it is wider than the moon.",
  "Egypt":
    "Egypt is home to the only surviving Ancient Wonder of the World — the Great Pyramid of Giza, built around 2560 BC.",
  "South Korea":
    "South Korea consistently ranks among the world's fastest average internet speeds and has one of the highest smartphone penetration rates globally.",
  "Greece":
    "Greece has more archaeological museums than any other country, and the Olympic Games originated there in 776 BC.",
  "Portugal":
    "Portugal is the oldest nation-state in Europe, with its current borders largely unchanged since 1139 AD.",
  "The Netherlands":
    "The Netherlands has more bicycles than people — over 22 million bikes for a population of around 17 million.",
  "Russia":
    "Russia spans 11 time zones, more than any other country on Earth, covering nearly one-eighth of the world's land area.",
  "Argentina":
    "Argentina has the highest number of psychologists per capita in the world, earning Buenos Aires the nickname 'the city of psychoanalysis'.",
  "Cambodia":
    "Angkor Wat in Cambodia is the world's largest religious monument, covering an area of over 400 acres.",

  // ── MEDIUM ──────────────────────────────────────────────────────
  "Switzerland":
    "Switzerland has four official languages — German, French, Italian, and Romansh — yet has no single official capital city equivalent to others.",
  "Sweden":
    "Sweden invented the adjustable spanner, the safety match, the zipper, and the modern computer mouse.",
  "Norway":
    "Norway is home to the world's longest road tunnel — the Lærdal Tunnel — stretching 24.5 kilometres through the mountains.",
  "Poland":
    "Poland is the birthplace of Marie Curie, the first woman to win a Nobel Prize and the only person to win Nobel Prizes in two different sciences.",
  "Ukraine":
    "Ukraine is the largest country located entirely within Europe by land area, bigger than any other fully European nation.",
  "Turkey":
    "Istanbul is the only city in the world that straddles two continents — Europe and Asia — divided by the Bosphorus strait.",
  "Saudi Arabia":
    "Saudi Arabia is the world's largest country with no permanent rivers or lakes, relying heavily on desalination plants for fresh water.",
  "Indonesia":
    "Indonesia is the world's largest archipelago nation, made up of over 17,000 islands spanning a distance wider than the continental United States.",
  "Pakistan":
    "Pakistan is home to K2, the world's second highest mountain at 8,611 metres — considered harder to climb than Everest.",
  "Thailand":
    "Thailand is the world's largest exporter of rice and has been known as the 'Rice Bowl of Asia' for centuries.",
  "Vietnam":
    "Vietnam is home to Hang Sơn Đoòng, the world's largest cave by volume — large enough to fit a New York City block inside.",
  "Philippines":
    "The Philippines consists of over 7,600 islands and has the world's longest coastline among archipelago nations.",
  "Malaysia":
    "Malaysia's Taman Negara rainforest is estimated to be 130 million years old, making it one of the oldest tropical rainforests on Earth.",
  "Iran":
    "Iran (ancient Persia) is home to one of the world's oldest continuously inhabited cities, with civilisation dating back over 7,000 years.",
  "South Africa":
    "South Africa is the only country in the world with three capital cities — Pretoria (executive), Cape Town (legislative), and Bloemfontein (judicial).",
  "Nigeria":
    "Nigeria's film industry, known as 'Nollywood', is the second largest in the world by volume of films produced, surpassing Hollywood.",
  "Kenya":
    "Kenya is home to the Great Rift Valley, a massive geological fault running 6,000 km from the Middle East to Mozambique.",
  "Ethiopia":
    "Ethiopia has its own unique calendar with 13 months and is approximately 7–8 years behind the Gregorian calendar.",
  "Morocco":
    "Morocco is the only African country with coastlines on both the Atlantic Ocean and the Mediterranean Sea.",
  "Colombia":
    "Colombia is the world's leading producer of emeralds, responsible for 70–90% of the world's supply.",
  "Peru":
    "Peru is home to Machu Picchu, the 15th-century Inca citadel, one of the New Seven Wonders of the World.",
  "Chile":
    "Chile is the world's longest country from north to south, stretching over 4,300 kilometres — yet averages only 177 km wide.",
  "New Zealand":
    "New Zealand was the first country in the world to grant women the right to vote in national elections, in 1893.",

  // ── HARD ────────────────────────────────────────────────────────
  "Kazakhstan":
    "Kazakhstan is the world's largest landlocked country by area — nearly the size of Western Europe.",
  "Uzbekistan":
    "Uzbekistan is one of only two doubly landlocked countries in the world, meaning it is surrounded entirely by other landlocked countries.",
  "Kyrgyzstan":
    "Kyrgyzstan's Lake Issyk-Kul is one of the world's largest mountain lakes and — despite temperatures below freezing around it — never freezes.",
  "Tajikistan":
    "Over 90% of Tajikistan's territory is covered by mountains, making it the most mountainous country in Central Asia.",
  "Turkmenistan":
    "Turkmenistan's 'Door to Hell' — the Darvaza Crater — is a natural gas field that has been burning continuously since 1971 when Soviet engineers set it alight.",
  "Azerbaijan":
    "Azerbaijan was one of the first countries in the world to produce oil commercially, with the world's first oil well drilled near Baku in 1846.",
  "Georgia":
    "Georgia is considered one of the oldest wine-making regions on Earth, with evidence of winemaking dating back 8,000 years.",
  "Armenia":
    "Armenia is home to one of the world's oldest Christian churches — the Etchmiadzin Cathedral, built in 301–303 AD.",
  "Mongolia":
    "Mongolia has the lowest population density of any sovereign country on Earth — fewer than 2 people per square kilometre on average.",
  "Nepal":
    "Nepal is home to eight of the world's ten tallest mountains, including Mount Everest, the highest point on Earth at 8,849 metres.",
  "Iraq":
    "Iraq is home to Mesopotamia — the 'Cradle of Civilisation' — where the world's first writing system and cities emerged over 5,000 years ago.",
  "Belarus":
    "Belarus is home to the Białowieża Forest, the last and largest primeval forest remaining in Europe.",
  "Latvia":
    "Latvia's capital Riga has the largest collection of Art Nouveau architecture in the world, with over 700 Art Nouveau buildings.",
  "Lithuania":
    "Lithuania was the last country in Europe to officially convert to Christianity, in 1387 — more than 1,000 years after most of the continent.",
  "Estonia":
    "Estonia was one of the first countries in the world to allow citizens to vote online in national elections, starting in 2005.",
  "Slovenia":
    "Slovenia is the only country in the world with the word 'love' hidden inside its name — sLOVEnia.",
  "Moldova":
    "Moldova produces more wine per capita than almost any other country, and its Milestii Mici wine cellar holds the world's largest wine collection.",
  "Tanzania":
    "Tanzania is home to the Serengeti, where over 1.5 million wildebeest participate in the world's largest annual animal migration.",
  "Mozambique":
    "Mozambique's national flag is the only one in the world that features an AK-47 assault rifle — symbolising defence and vigilance.",
  "Zambia":
    "Zambia shares Victoria Falls with Zimbabwe — the waterfall is so powerful its mist can be seen from 50 kilometres away.",
  "Zimbabwe":
    "Zimbabwe's Victoria Falls — shared with Zambia — is the world's largest waterfall by total water flow, dropping over 500 million litres per minute.",
  "Equatorial Guinea":
    "Equatorial Guinea is the only country in Africa where Spanish is an official language, due to its colonial history.",
  "Niger":
    "Niger is the largest country in West Africa by land area and has one of the world's youngest populations — the median age is around 15.",
  "Benin":
    "Benin is considered one of the birthplaces of the Voodoo religion, and Voodoo remains an official religion there today.",
  "Ivory Coast":
    "Ivory Coast (Côte d'Ivoire) is the world's largest producer of cocoa beans, supplying roughly 40% of the global cocoa harvest.",
  "Uruguay":
    "Uruguay was the first country in the world to fully legalise the production, sale, and consumption of cannabis, in 2013.",
  "Paraguay":
    "Paraguay and Bolivia are the only two landlocked countries in South America.",
  "Bolivia":
    "Bolivia has two capitals — Sucre, the constitutional capital, and La Paz, the seat of government — the highest-elevation capital city in the world.",
  "Guyana":
    "Guyana is the only English-speaking country in South America, a legacy of British colonial rule that ended in 1966.",
  "Suriname":
    "Suriname is the smallest country in South America by area, yet it has one of the most ethnically diverse populations on Earth.",
  "Papua New Guinea":
    "Papua New Guinea has over 800 distinct languages — more than any other country on Earth — representing about 12% of all human languages.",
  "Venezuela":
    "Venezuela is home to Angel Falls, the world's highest uninterrupted waterfall at 979 metres — nearly 20 times the height of Niagara Falls.",
  "Bhutan":
    "Bhutan is the world's only carbon-negative country — its forests absorb more CO₂ than the nation produces each year.",
  "Ireland":
    "Ireland is home to Sean's Bar in Athlone, believed to be the world's oldest pub, with records placing it around 900 AD.",
  "Mauritania":
    "Mauritania is home to the Eye of the Sahara (Richat Structure), a massive 50 km wide circular geological formation clearly visible from space.",
  "Chad":
    "Lake Chad has shrunk by approximately 90% since the 1960s due to climate change and increasing water demands — once one of Africa's largest lakes.",
  "Romania":
    "Romania is home to Bran Castle in Transylvania, popularly associated with Bram Stoker's Dracula — though the real Vlad the Impaler had little connection to it.",
  "Faroe Islands":
    "The Faroe Islands have approximately twice as many sheep as people — around 80,000 sheep for a population of about 55,000.",
};


/* ================================================================
   2. OVERRIDE showFeedback — append a fun fact below country info
   
   How it works:
   - quiz-engine.js defines showFeedback() in global scope
   - This script (loaded after it) wraps it: calls the original first,
     then appends a fun fact to the #feedbackFact element
   - Existing behaviour is 100% preserved
   ================================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* Guard: only run on the quiz page */
  if (!document.getElementById('feedback')) return;

  /* Store reference to the original function */
  var _origShowFeedback = window.showFeedback;

  /* Replace with our extended version */
  window.showFeedback = function (correct, msg) {
    /* 1. Call the original — fills #feedbackMain and #feedbackFact */
    _origShowFeedback(correct, msg);

    /* 2. Append fun fact below the existing country info line */
    var country = (typeof questions !== 'undefined' && typeof current !== 'undefined')
      ? questions[current] && questions[current].country
      : null;

    if (!country) return;

    var fact = FUN_FACTS[country.name];
    if (!fact) return;

    var factEl = document.getElementById('feedbackFact');
    if (!factEl) return;

    /* Build the fun fact element */
    var factLine = document.createElement('span');
    factLine.className   = 'fun-fact-line';
    factLine.textContent = '💡 ' + fact;

    factEl.appendChild(factLine);
  };

});


/* ================================================================
   3. SHARE SCORE BUTTON — injected into .result-actions on quiz page
   
   Uses Web Share API on mobile (native share sheet).
   Falls back to clipboard copy on desktop, with a toast confirmation.
   ================================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* Guard: only run on the quiz page */
  var resultActions = document.querySelector('.result-actions');
  if (!resultActions) return;

  /* ── Build the share button ────────────────────────────────── */
  var shareBtn = document.createElement('button');
  shareBtn.id        = 'shareScoreBtn';
  shareBtn.className = 'btn btn--outline';
  shareBtn.type      = 'button';
  shareBtn.innerHTML = '📤 Share';

  resultActions.appendChild(shareBtn);

  /* ── Build the toast element ───────────────────────────────── */
  var toast = document.createElement('div');
  toast.className = 'share-toast';
  toast.textContent = '✅ Score copied to clipboard!';
  document.body.appendChild(toast);

  /* ── Show toast helper ─────────────────────────────────────── */
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(function () {
      toast.classList.remove('show');
    }, 2800);
  }

  /* ── Build the share text from result panel ────────────────── */
  function buildShareText() {
    var score   = (document.getElementById('finalScore')    || {}).textContent || '0';
    var correct = (document.getElementById('finalCorrect')  || {}).textContent || '-';
    var pct     = (document.getElementById('finalPct')      || {}).textContent || '-';
    var cat     = (document.getElementById('resultCatLabel')|| {}).textContent || 'Quiz';
    var diff    = (document.getElementById('resultDiffBadge')|| {}).textContent || '';

    return (
      '🌍 GeoQuester — ' + cat + ' (' + diff + ')\n' +
      '🏆 Score: ' + score + ' pts\n' +
      '✅ Correct: ' + correct + '  |  🎯 Accuracy: ' + pct + '\n' +
      'Can you beat me? Play at GeoQuester!'
    );
  }

  /* ── Click handler ─────────────────────────────────────────── */
  shareBtn.addEventListener('click', function () {
    var text = buildShareText();

    /* Try native Web Share API first (works on mobile / some desktops) */
    if (navigator.share) {
      navigator.share({
        title: 'My GeoQuester Score',
        text:  text,
      }).catch(function () {
        /* User cancelled or share failed — silently ignore */
      });
      return;
    }

    /* Fallback: copy to clipboard */
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(function ()  { showToast('✅ Score copied to clipboard!'); })
        .catch(function () { showToast('⚠️ Could not copy — try selecting manually.'); });
      return;
    }

    /* Last resort: execCommand (old browsers) */
    try {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity  = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast('✅ Score copied to clipboard!');
    } catch (e) {
      showToast('⚠️ Could not copy automatically.');
    }
  });

});
