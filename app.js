const STORAGE_KEY = "property-search-form-state-v2";
const KATOWICE_DISTRICTS_GEOJSON_URL =
  "https://services1.arcgis.com/BNOHq9FCYUCPx1D8/ArcGIS/rest/services/dzielnice_Katowic/FeatureServer/0/query?where=1%3D1&outFields=NAZWA&f=geojson";
const POLISH_CITIES_DATA_URL =
  "https://unpkg.com/polish-cities@2025.1.2/data/city.json";
const POLISH_COUNTIES_DATA_URL =
  "https://unpkg.com/polish-cities@2025.1.2/data/county.json";
const POLISH_VOIVODESHIPS_DATA_URL =
  "https://unpkg.com/polish-cities@2025.1.2/data/voivodeship.json";
let katowiceDistrictsGeoJsonPromise;
let locationCatalog = [];
let locationCatalogByLabel = new Map();
let locationCatalogPromise;
const locationSearchState = {};

const countyCitiesByVoivodeship = {
  "dolnośląskie": [
    "Bolesławiec",
    "Dzierżoniów",
    "Głogów",
    "Góra",
    "Jawor",
    "Jelenia Góra",
    "Kamienna Góra",
    "Kłodzko",
    "Legnica",
    "Lubań",
    "Lubin",
    "Lwówek Śląski",
    "Milicz",
    "Oleśnica",
    "Oława",
    "Polkowice",
    "Strzelin",
    "Środa Śląska",
    "Świdnica",
    "Trzebnica",
    "Wałbrzych",
    "Wołów",
    "Wrocław",
    "Ząbkowice Śląskie",
    "Zgorzelec",
    "Złotoryja",
  ],
  "kujawsko-pomorskie": [
    "Aleksandrów Kujawski",
    "Brodnica",
    "Bydgoszcz",
    "Chełmno",
    "Golub-Dobrzyń",
    "Grudziądz",
    "Inowrocław",
    "Lipno",
    "Mogilno",
    "Nakło nad Notecią",
    "Radziejów",
    "Rypin",
    "Sępólno Krajeńskie",
    "Świecie",
    "Toruń",
    "Tuchola",
    "Wąbrzeźno",
    "Włocławek",
    "Żnin",
  ],
  lubelskie: [
    "Biała Podlaska",
    "Biłgoraj",
    "Chełm",
    "Hrubieszów",
    "Janów Lubelski",
    "Krasnystaw",
    "Kraśnik",
    "Lubartów",
    "Lublin",
    "Łęczna",
    "Łuków",
    "Opole Lubelskie",
    "Parczew",
    "Puławy",
    "Radzyń Podlaski",
    "Ryki",
    "Świdnik",
    "Tomaszów Lubelski",
    "Włodawa",
    "Zamość",
  ],
  lubuskie: [
    "Gorzów Wielkopolski",
    "Krosno Odrzańskie",
    "Międzyrzecz",
    "Nowa Sól",
    "Słubice",
    "Strzelce Krajeńskie",
    "Sulęcin",
    "Świebodzin",
    "Wschowa",
    "Zielona Góra",
    "Żagań",
    "Żary",
  ],
  "łódzkie": [
    "Bełchatów",
    "Brzeziny",
    "Kutno",
    "Łask",
    "Łęczyca",
    "Łowicz",
    "Łódź",
    "Opoczno",
    "Pabianice",
    "Pajęczno",
    "Piotrków Trybunalski",
    "Poddębice",
    "Radomsko",
    "Rawa Mazowiecka",
    "Sieradz",
    "Skierniewice",
    "Tomaszów Mazowiecki",
    "Wieluń",
    "Wieruszów",
    "Zduńska Wola",
    "Zgierz",
  ],
  "małopolskie": [
    "Bochnia",
    "Brzesko",
    "Chrzanów",
    "Dąbrowa Tarnowska",
    "Gorlice",
    "Kraków",
    "Limanowa",
    "Miechów",
    "Myślenice",
    "Nowy Sącz",
    "Nowy Targ",
    "Olkusz",
    "Oświęcim",
    "Proszowice",
    "Sucha Beskidzka",
    "Tarnów",
    "Wadowice",
    "Wieliczka",
    "Zakopane",
  ],
  mazowieckie: [
    "Białobrzegi",
    "Ciechanów",
    "Garwolin",
    "Gostynin",
    "Grodzisk Mazowiecki",
    "Grójec",
    "Kozienice",
    "Legionowo",
    "Lipsko",
    "Łosice",
    "Maków Mazowiecki",
    "Mińsk Mazowiecki",
    "Mława",
    "Nowy Dwór Mazowiecki",
    "Ostrołęka",
    "Ostrów Mazowiecka",
    "Otwock",
    "Ożarów Mazowiecki",
    "Piaseczno",
    "Płock",
    "Płońsk",
    "Pruszków",
    "Przasnysz",
    "Przysucha",
    "Pułtusk",
    "Radom",
    "Siedlce",
    "Sierpc",
    "Sochaczew",
    "Sokołów Podlaski",
    "Szydłowiec",
    "Warszawa",
    "Węgrów",
    "Wołomin",
    "Wyszków",
    "Zwoleń",
    "Żuromin",
    "Żyrardów",
  ],
  opolskie: [
    "Brzeg",
    "Głubczyce",
    "Kędzierzyn-Koźle",
    "Kluczbork",
    "Krapkowice",
    "Namysłów",
    "Nysa",
    "Olesno",
    "Opole",
    "Prudnik",
    "Strzelce Opolskie",
  ],
  podkarpackie: [
    "Brzozów",
    "Dębica",
    "Jarosław",
    "Jasło",
    "Kolbuszowa",
    "Krosno",
    "Lesko",
    "Leżajsk",
    "Lubaczów",
    "Łańcut",
    "Mielec",
    "Nisko",
    "Przemyśl",
    "Przeworsk",
    "Ropczyce",
    "Rzeszów",
    "Sanok",
    "Stalowa Wola",
    "Strzyżów",
    "Tarnobrzeg",
    "Ustrzyki Dolne",
  ],
  podlaskie: [
    "Augustów",
    "Białystok",
    "Bielsk Podlaski",
    "Grajewo",
    "Hajnówka",
    "Kolno",
    "Łomża",
    "Mońki",
    "Sejny",
    "Siemiatycze",
    "Sokółka",
    "Suwałki",
    "Wysokie Mazowieckie",
    "Zambrów",
  ],
  pomorskie: [
    "Bytów",
    "Chojnice",
    "Człuchów",
    "Gdynia",
    "Kartuzy",
    "Kościerzyna",
    "Kwidzyn",
    "Lębork",
    "Malbork",
    "Nowy Dwór Gdański",
    "Pruszcz Gdański",
    "Puck",
    "Słupsk",
    "Sopot",
    "Starogard Gdański",
    "Sztum",
    "Tczew",
    "Wejherowo",
    "Gdańsk",
  ],
  "śląskie": [
    "Będzin",
    "Bielsko-Biała",
    "Bieruń",
    "Cieszyn",
    "Częstochowa",
    "Gliwice",
    "Kłobuck",
    "Lubliniec",
    "Mikołów",
    "Myszków",
    "Pszczyna",
    "Racibórz",
    "Ruda Śląska",
    "Rybnik",
    "Tarnowskie Góry",
    "Tychy",
    "Wodzisław Śląski",
    "Zawiercie",
    "Żywiec",
    "Katowice",
    "Bytom",
    "Chorzów",
    "Dąbrowa Górnicza",
    "Jastrzębie-Zdrój",
    "Jaworzno",
    "Mysłowice",
    "Piekary Śląskie",
    "Siemianowice Śląskie",
    "Sosnowiec",
    "Świętochłowice",
    "Zabrze",
    "Żory",
  ],
  "świętokrzyskie": [
    "Busko-Zdrój",
    "Jędrzejów",
    "Kazimierza Wielka",
    "Kielce",
    "Końskie",
    "Opatów",
    "Ostrowiec Świętokrzyski",
    "Pińczów",
    "Sandomierz",
    "Skarżysko-Kamienna",
    "Starachowice",
    "Staszów",
    "Włoszczowa",
  ],
  "warmińsko-mazurskie": [
    "Bartoszyce",
    "Braniewo",
    "Działdowo",
    "Elbląg",
    "Ełk",
    "Giżycko",
    "Gołdap",
    "Iława",
    "Kętrzyn",
    "Lidzbark Warmiński",
    "Mrągowo",
    "Nidzica",
    "Nowe Miasto Lubawskie",
    "Olecko",
    "Olsztyn",
    "Ostróda",
    "Pisz",
    "Szczytno",
    "Węgorzewo",
  ],
  wielkopolskie: [
    "Chodzież",
    "Czarnków",
    "Gniezno",
    "Gostyń",
    "Grodzisk Wielkopolski",
    "Jarocin",
    "Kalisz",
    "Kępno",
    "Koło",
    "Konin",
    "Kościan",
    "Krotoszyn",
    "Leszno",
    "Międzychód",
    "Nowy Tomyśl",
    "Oborniki",
    "Ostrów Wielkopolski",
    "Ostrzeszów",
    "Piła",
    "Pleszew",
    "Poznań",
    "Rawicz",
    "Słupca",
    "Szamotuły",
    "Śrem",
    "Środa Wielkopolska",
    "Turek",
    "Wągrowiec",
    "Wolsztyn",
    "Września",
    "Złotów",
  ],
  zachodniopomorskie: [
    "Białogard",
    "Choszczno",
    "Drawsko Pomorskie",
    "Goleniów",
    "Gryfice",
    "Gryfino",
    "Kamień Pomorski",
    "Kołobrzeg",
    "Koszalin",
    "Łobez",
    "Myślibórz",
    "Police",
    "Pyrzyce",
    "Sławno",
    "Stargard Szczeciński",
    "Szczecin",
    "Szczecinek",
    "Świdwin",
    "Świnoujście",
    "Wałcz",
  ],
};

const cityDistricts = {
  Warszawa: [
    "Śródmieście",
    "Mokotów",
    "Żoliborz",
    "Wola",
    "Ursynów",
    "Praga-Południe",
    "Białołęka",
  ],
  Kraków: ["Stare Miasto", "Krowodrza", "Podgórze", "Czyżyny", "Dębniki"],
  Katowice: [
    "Śródmieście",
    "Os. Paderewskiego-Muchowiec",
    "Koszutka",
    "Bogucice",
    "Załęże",
    "Osiedle Witosa",
    "Osiedle Tysiąclecia",
    "Dąb",
    "Wełnowiec-Józefowiec",
    "Załęska Hałda-Brynów",
    "Brynów-Os. Zgrzebnioka",
    "Ligota-Panewniki",
    "Zawodzie",
    "Dąbrówka Mała",
    "Szopienice-Burowiec",
    "Janów-Nikiszowiec",
    "Giszowiec",
    "Murcki",
    "Piotrowice-Ochojec",
    "Zarzecze",
    "Kostuchna",
    "Podlesie",
  ],
  Wrocław: ["Krzyki", "Fabryczna", "Śródmieście", "Psie Pole", "Stare Miasto"],
  Gdańsk: ["Wrzeszcz", "Oliwa", "Przymorze", "Jasień", "Śródmieście"],
  Poznań: ["Jeżyce", "Grunwald", "Wilda", "Rataje", "Stare Miasto"],
};

const sections = [
  {
    id: "section-1",
    short: "Cel",
    title: "Cel i tryb poszukiwania",
    fields: [
      {
        id: "purpose",
        label: "1.1. W jakim celu szukasz nieruchomości?",
        type: "single",
        options: [
          "dla siebie / rodziny",
          "inwestycyjnie, np. do wynajmu",
          "pod działalność / dla firmy",
        ],
      },
    ],
  },
  {
    id: "section-1-household",
    short: "Dom",
    title: "Gospodarstwo domowe",
    visible: (state) => state.purpose === "dla siebie / rodziny",
    fields: [
      {
        id: "adults",
        label: "1.3. Ile osób dorosłych będzie mieszkać lub korzystać z tej nieruchomości?",
        type: "count-slider",
        min: 1,
        max: 10,
        step: 1,
        visible: (state) => state.purpose === "dla siebie / rodziny",
      },
      {
        id: "children",
        label: "1.4. Ile dzieci będzie mieszkać w tej nieruchomości?",
        type: "count-slider",
        min: 0,
        max: 10,
        step: 1,
        visible: (state) => state.purpose === "dla siebie / rodziny",
      },
    ],
  },
  {
    id: "section-1-mode",
    short: "Tryb",
    title: "Zakup czy najem",
    fields: [
      {
        id: "mode",
        label: "1.2. Interesuje Cię zakup, najem czy oba warianty?",
        type: "multi",
        options: ["kupno", "najem"],
      },
      {
        id: "timeline",
        label: "1.5. Kiedy chcesz się wprowadzić?",
        type: "single",
        options: [
          "jak najszybciej",
          "do 1 miesiąca",
          "1-3 miesiące",
          "3-6 miesięcy",
          "nie spieszy mi się",
        ],
      },
    ],
  },
  {
    id: "section-2",
    short: "Lokalizacja",
    title: "Lokalizacja",
    fields: [
      {
        id: "cities",
        label: "3.1. Jakie miasta lub miejscowości bierzesz pod uwagę?",
        description:
          "Zacznij wpisywać nazwę lokalizacji. Możesz dodać kilka miast lub miejscowości, a także wybrać całe województwo.",
        type: "location-search",
      },
      {
        id: "districts",
        label: "3.2. Czy interesują Cię konkretne dzielnice lub obszary?",
        description:
          "Jeśli wybierzesz Katowice, możesz też zaznaczać dzielnice bezpośrednio na mapie.",
        type: "multi-dynamic",
        visible: (state) =>
          getDistrictOptions(state).length > 0 && !hasSelectedCityName(state, "Katowice"),
      },
      {
        id: "cityMap",
        label: "3.3. Podgląd wybranego miasta",
        type: "city-map",
        visible: (state) => getSelectedCityNames(state).length > 0,
      },
      {
        id: "locationNeeds",
        label: "3.4. Co jest dla Ciebie ważne w lokalizacji?",
        type: "matrix",
        columns: ["konieczne", "ważne", "bez znaczenia"],
        rows: [
          "blisko komunikacji miejskiej",
          "blisko szkoły",
          "blisko przedszkola",
          "spokojna okolica",
          "blisko parku / terenów zielonych",
          "blisko usług",
          "łatwy wyjazd z miasta",
        ],
      },
    ],
  },
  {
    id: "section-3",
    short: "Budynek",
    title: "Budynek",
    fields: [
      {
        id: "initialRenovationProfile",
        label: "1.6. Jaki stan nieruchomości bierzesz pod uwagę na tym etapie?",
        description: "To tylko wstępne profilowanie: co wchodzi w grę już na starcie.",
        type: "matrix",
        columns: ["preferuję", "dopuszczam", "nie chcę"],
        rows: ["na gotowo", "lekki remont", "duży remont"],
      },
      {
        id: "marketType",
        label: "4.1. Który rynek wchodzi w grę?",
        type: "matrix",
        columns: ["preferuję", "dopuszczam", "nie chcę"],
        rows: ["rynek wtórny", "rynek pierwotny"],
      },
      {
        id: "propertyTypes",
        label: "4.2. Jakiego typu nieruchomości szukasz?",
        type: "matrix",
        columns: ["preferuję", "dopuszczam", "nie chcę"],
        rows: [
          "mieszkanie w niskim budynku",
          "mieszkanie w średnim / wysokim budynku",
          "mieszkanie w wysokościowcu",
          "mieszkanie w kamienicy",
          "dom szeregowy",
          "dom jednorodzinny",
        ],
      },
      {
        id: "apartmentLevels",
        label: "4.3. Czy mieszkanie może być dwupoziomowe?",
        type: "single",
        options: [
          "tylko jednopoziomowe",
          "może być dwupoziomowe",
          "preferuję dwupoziomowe",
          "bez znaczenia",
        ],
        visible: (state) => hasApartmentSelected(state),
      },
      {
        id: "floorAcceptance",
        label: "4.4. Jakie położenie mieszkania bierzesz pod uwagę?",
        type: "matrix",
        columns: ["preferuję", "dopuszczam", "nie chcę"],
        rows: [
          "parter",
          "niskie piętro, 1-2",
          "średnie piętro, 3-5",
          "wysokie piętro, 6+",
          "ostatnie piętro",
        ],
        visible: (state) => hasApartmentSelected(state),
      },
      {
        id: "liftRequired",
        label: "4.5. Czy winda jest dla Ciebie ważna?",
        type: "single",
        options: [
          "tak, zawsze",
          "tak, jeśli powyżej 2. piętra",
          "tak, jeśli powyżej 3. piętra",
          "nie jest wymagana",
        ],
        visible: (state) => hasApartmentSelected(state),
      },
      {
        id: "buildingStandard",
        label: "4.6. Jak ważny jest dla Ciebie standard budynku i części wspólnych?",
        type: "matrix",
        columns: [
          "wysoka jakość",
          "bez znaczenia",
          "może być słabe",
        ],
        rows: [
          "klatka schodowa",
          "elewacja",
          "otoczenie budynku",
          "bezpieczeństwo / monitoring",
          "zarządzanie budynkiem / wspólnota",
        ],
      },
    ],
  },
  {
    id: "section-4",
    short: "Metraż",
    title: "Metraż i pomieszczenia",
    fields: [
      {
        id: "roomNeeds",
        label: "5.1. Jakich pomieszczeń potrzebujesz?",
        type: "room-needs",
      },
      {
        id: "area",
        label: "5.2. Jakiej powierzchni szukasz?",
        description: "Wprowadź przedział w m².",
        type: "range",
        minLabel: "Od",
        maxLabel: "Do",
        min: 0,
        max: 500,
        step: 5,
        ticks: [0, 100, 200, 300, 400, 500],
      },
    ],
  },
  {
    id: "section-6",
    short: "Kuchnia",
    title: "Kuchnia i jadalnia",
    fields: [
      {
        id: "kitchenLayout",
        label: "7.1. Jaki układ kuchni Ci odpowiada?",
        type: "matrix",
        columns: ["preferuję", "dopuszczam", "nie chcę"],
        rows: ["osobna kuchnia", "aneks kuchenny", "salon z aneksem"],
      },
      {
        id: "diningSpace",
        label: "7.2. Czy potrzebujesz miejsca do jedzenia?",
        type: "single",
        options: [
          "tak, stół dla 2 osób",
          "tak, stół dla 4 osób",
          "tak, stół dla 6+ osób",
          "wystarczy wyspa / blat / barek",
          "nie jest potrzebne",
          "bez znaczenia",
        ],
      },
      {
        id: "readyKitchen",
        label: "7.3. Jeśli kuchnia nie spełnia oczekiwań od razu, co akceptujesz?",
        type: "single",
        options: [
          "musi być gotowa od razu",
          "może wymagać drobnego odświeżenia w budżecie",
          "może wymagać większej zmiany, jeśli całość się opłaca",
          "kuchnia nie jest dla mnie kluczowa na starcie",
        ],
      },
      {
        id: "kitchenEquipment",
        label: "7.4. Jakie wyposażenie kuchni jest dla Ciebie ważne?",
        type: "matrix",
        columns: ["konieczne", "preferuję", "bez znaczenia", "nie chcę"],
        rows: [
          "zmywarka",
          "piekarnik",
          "płyta indukcyjna",
          "płyta gazowa",
          "lodówka pełnowymiarowa",
          "mała lodówka",
          "okap",
        ],
      },
    ],
  },
  {
    id: "section-7",
    short: "Łazienka",
    title: "Łazienka, WC, pralka i suszarka",
    fields: [
      {
        id: "bathroomLayout",
        label: "8.1. Jaki układ łazienki i WC bierzesz pod uwagę?",
        type: "matrix",
        columns: ["preferuję", "dopuszczam", "nie chcę"],
        rows: [
          "jedna łazienka z WC",
          "łazienka + osobne WC",
          "dwie łazienki",
          "łazienka + osobne WC z prysznicem",
        ],
      },
      {
        id: "bathroomDetails",
        label: "8.2. Co jest dla Ciebie ważne w łazience?",
        type: "matrix",
        columns: ["konieczne", "preferuję", "bez znaczenia", "nie chcę"],
        rows: [
          "prysznic",
          "wanna",
          "wanna i prysznic",
          "jedna umywalka",
          "dwie umywalki",
          "WC w łazience",
          "bidet",
          "miejsce na pralkę",
          "miejsce na suszarkę",
        ],
      },
      {
        id: "wcFeatures",
        label: "8.3. Co jest dla Ciebie ważne w osobnym WC?",
        type: "matrix",
        columns: ["konieczne", "preferuję", "bez znaczenia", "nie chcę"],
        rows: ["WC", "umywalka", "prysznic", "bidet"],
        visible: (state) => bathroomAllowsSeparateWc(state),
      },
      {
        id: "washingMachineLocation",
        label: "8.4. Gdzie może znajdować się pralka?",
        type: "matrix",
        columns: ["preferuję", "dopuszczam", "nie chcę"],
        rows: [
          "w łazience",
          "w kuchni",
          "w osobnej pralni / pomieszczeniu gospodarczym",
          "w szafie gospodarczej",
          "bez znaczenia",
        ],
      },
      {
        id: "dryerSpace",
        label: "8.5. Czy potrzebujesz miejsca na suszarkę bębnową?",
        type: "single",
        options: [
          "tak, obok pralki",
          "tak, w słupku nad pralką",
          "tak, ale miejsce nie ma znaczenia",
          "nie",
          "bez znaczenia",
        ],
      },
    ],
  },
  {
    id: "section-8",
    short: "Dodatki",
    title: "Cechy dodatkowe",
    fields: [
      {
        id: "balcony",
        label: "10.1. Balkon",
        type: "single",
        options: ["konieczne", "preferuję", "bez znaczenia"],
        visible: (state) => hasApartmentSelected(state),
      },
      {
        id: "terrace",
        label: "9.1. Taras",
        type: "single",
        options: ["konieczne", "preferuję", "bez znaczenia"],
      },
      {
        id: "garden",
        label: "9.2. Ogródek / dostęp do ogródka",
        type: "single",
        options: ["konieczne", "preferuję", "bez znaczenia"],
      },
      {
        id: "parking",
        label: "9.3. Miejsce postojowe / garaż",
        type: "single",
        options: ["konieczne", "preferuję", "bez znaczenia"],
      },
      {
        id: "parkingType",
        label: "9.4. Jaki typ miejsca postojowego bierzesz pod uwagę?",
        type: "multi",
        options: ["miejsce naziemne", "hala garażowa", "garaż indywidualny", "dowolne"],
        visible: (state) => state.parking && state.parking !== "bez znaczenia",
      },
    ],
  },
  {
    id: "section-9",
    short: "Stan",
    title: "Stan, styl i zakres prac",
    fields: [
      {
        id: "maxWorks",
        label: "10.2. Jaki największy zakres prac po zakupie bierzesz pod uwagę?",
        description:
          "Wybierasz maksymalny poziom prac. Wszystko powyżej tego progu powinno być odrzucane przez system.",
        type: "progressive",
        options: [
          { code: "A0", label: "chcę wejść i mieszkać bez prac" },
          { code: "A1", label: "akceptuję malowanie / lampy / drobne poprawki" },
          { code: "A2", label: "akceptuję wymianę podłóg" },
          { code: "A3", label: "akceptuję wymianę kuchni" },
          { code: "A4", label: "akceptuję remont łazienki / WC" },
          { code: "A5", label: "akceptuję większy remont / instalacje / zmianę układu" },
        ],
      },
      {
        id: "layoutChanges",
        label: "6.1. Czy dopuszczasz zmiany w układzie?",
        type: "single",
        options: [
          "nie, układ musi być dobry od razu",
          "tak, dopuszczam drobne zmiany",
          "tak, dopuszczam większą przebudowę",
          "bez znaczenia, jeśli cena to rekompensuje",
        ],
      },
      {
        id: "elementsTolerance",
        label: "10.3. Jaki stan tych elementów akceptujesz?",
        type: "matrix",
        columns: [
          "musi być gotowe / nie chcę ruszać",
          "może wymagać drobnych zmian",
          "mogą wymagać większych zmian, jeśli całość się spina",
          "bez znaczenia / mogę zrobić od zera",
        ],
        rows: [
          "kuchnia",
          "łazienka",
          "WC",
          "podłogi",
          "drzwi wewnętrzne",
          "zabudowy stałe / szafy",
          "okna",
          "instalacje",
          "układ ścian",
        ],
      },
      {
        id: "styleImportance",
        label: "10.4. Jak ważny jest dla Ciebie styl wykończenia?",
        type: "single",
        options: [
          "bardzo ważny, szukam konkretnego stylu",
          "ważny, ale dopuszczam kompromisy",
          "ma być neutralnie i schludnie",
          "styl jest drugorzędny wobec ceny i parametrów",
          "bez znaczenia, i tak będę remontować",
        ],
      },
      {
        id: "acceptedStyles",
        label: "10.5. Jakie style wchodzą w grę?",
        type: "matrix",
        columns: ["preferuję", "dopuszczam", "nie chcę"],
        rows: [
          "minimalistyczny",
          "klasyczny / tradycyjny",
          "skandynawski",
          "loftowy / industrialny",
          "glamour",
          "retro / PRL",
          "neutralny / uniwersalny",
          "nie wiem / wybiorę na przykładach",
        ],
        visible: (state) => styleMatters(state),
      },
      {
        id: "styleElements",
        label: "10.6. W których elementach styl ma dla Ciebie największe znaczenie?",
        type: "matrix",
        columns: ["bardzo ważny", "ważny", "bez znaczenia"],
        rows: [
          "kuchnia",
          "łazienka",
          "WC",
          "podłogi",
          "drzwi",
          "zabudowy stałe",
          "pokoje / ściany",
          "oświetlenie",
        ],
        visible: (state) => styleMatters(state),
      },
      {
        id: "finishQualityMatrix",
        label: "10.7. Jakie wykończenie akceptujesz?",
        type: "single",
        options: [
          "nowe, nawet jeśli standard jest podstawowy",
          "kilkuletnie, jeśli jest zadbane",
          "starsze, jeśli jest dobrej jakości",
          "tylko nowe lub prawie nowe",
          "wiek i jakość mają mniejsze znaczenie, jeśli cena się spina",
        ],
      },
      {
        id: "furnished",
        label: "10.8. Czy lokal ma być umeblowany?",
        type: "single",
        options: [
          "tak, chcę lokal gotowy do zamieszkania z meblami",
          "nie, wystarczy gotowa kuchnia i łazienka",
          "nie, wolę umeblować samodzielnie",
          "bez znaczenia",
        ],
      },
      {
        id: "primaryCondition",
        label: "10.9. Jeśli bierzesz pod uwagę rynek pierwotny, jaki stan lokalu akceptujesz?",
        type: "multi",
        options: [
          "stan deweloperski",
          "wykończone pod klucz",
          "pakiet wykończeniowy ekonomiczny",
          "pakiet wykończeniowy średni",
          "pakiet wykończeniowy premium",
        ],
        visible: (state) => primaryMarketAllowed(state),
      },
      {
        id: "primaryWait",
        label: "10.10. Jeśli bierzesz pod uwagę rynek pierwotny, jak długo możesz czekać na odbiór?",
        type: "single",
        options: [
          "tylko gotowe / oddane",
          "do 3 miesięcy",
          "do 6 miesięcy",
          "do 12 miesięcy",
          "powyżej 12 miesięcy, jeśli oferta jest dobra",
        ],
        visible: (state) => primaryMarketAllowed(state),
      },
    ],
  },
  {
    id: "section-5a-renovation",
    short: "Remont",
    title: "Remont i wykończenie",
    visible: (state) => showRenovationBudget(state),
    fields: [
      {
        id: "renovationBudget",
        label: "2.3. Ile maksymalnie możesz przeznaczyć na remont lub wykończenie?",
        type: "number",
        min: 0,
        step: 10000,
        visible: (state) => showRenovationBudget(state),
      },
      {
        id: "renovationFlex",
        label: "2.4. Czy budżet na remont / wykończenie jest elastyczny?",
        type: "single",
        options: [
          "nie, to twardy limit",
          "tak, jeśli cena zakupu jest niższa",
          "tak, przy bardzo dobrej okazji",
          "nie wiem, chcę żeby system to policzył",
        ],
        visible: (state) => showRenovationBudget(state),
      },
    ],
  },
  {
    id: "section-10-purchase",
    short: "Budżet zakupu",
    title: "Budżet zakupu i finansowanie",
    visible: (state) => includesPurchaseMode(state),
    fields: [
      {
        id: "totalBudget",
        label: "2.1. Jaki budżet łącznie bierzesz pod uwagę?",
        description:
          "Budżet łączny = zakup nieruchomości + remont / wykończenie.",
        type: "budget-range",
        min: 0,
        max: 5000000,
        step: 10000,
        minLabel: "Od",
        maxLabel: "Do",
        visible: (state) => includesPurchaseMode(state),
      },
      {
        id: "purchaseBudget",
        label: "2.2. Ile maksymalnie chcesz przeznaczyć na sam zakup nieruchomości?",
        type: "number",
        min: 0,
        step: 10000,
        visible: (state) => includesPurchaseMode(state),
      },
      {
        id: "financing",
        label: "2.5. Jak planujesz sfinansować zakup?",
        type: "single",
        options: [
          "gotówka",
          "kredyt wstępnie sprawdzony",
          "będę brać kredyt, ale jeszcze nie sprawdzałem zdolności",
          "sprzedaż innej nieruchomości",
          "inne",
        ],
        visible: (state) => (state.mode || []).includes("kupno"),
      },
    ],
  },
  {
    id: "section-10-rent",
    short: "Budżet najmu",
    title: "Budżet najmu",
    visible: (state) => includesRentMode(state),
    fields: [
      {
        id: "rentBudget",
        label: "2.6. Jaki miesięczny budżet na najem bierzesz pod uwagę?",
        type: "number",
        min: 0,
        step: 100,
        visible: (state) => includesRentMode(state),
      },
    ],
  },
];

const state = loadState();
let currentStep = 0;
let hasStarted = Boolean(state.hasStarted);

const elements = {
  welcomeScreen: document.querySelector("#welcome-screen"),
  startForm: document.querySelector("#start-form"),
  propertyForm: document.querySelector("#property-form"),
  formFooter: document.querySelector("#form-footer"),
  wizardHeader: document.querySelector(".wizard-header"),
  formFields: document.querySelector("#form-fields"),
  sectionTitle: document.querySelector("#section-title"),
  stepCounter: document.querySelector("#step-counter"),
  stepTabs: document.querySelector("#step-tabs"),
  prevStep: document.querySelector("#prev-step"),
  nextStep: document.querySelector("#next-step"),
};

renderTabs();
ensureLocationCatalog().then(() => {
  if (hasStarted) {
    renderStep();
  }
});
renderStep();

elements.startForm.addEventListener("click", () => {
  hasStarted = true;
  state.hasStarted = true;
  persistState();
  renderStep();
});

elements.prevStep.addEventListener("click", () => {
  currentStep = Math.max(0, currentStep - 1);
  renderStep();
});

elements.nextStep.addEventListener("click", () => {
  advanceStep();
});

function advanceStep() {
  const visibleSections = getVisibleSections();
  const currentSection = visibleSections[currentStep];
  if (currentSection?.id === "section-1" && !state.purpose) {
    renderStep();
    return;
  }
  if (currentStep < visibleSections.length - 1) {
    currentStep += 1;
  }
  renderStep();
}

function getVisibleSections() {
  return sections.filter((section) => !section.visible || section.visible(state));
}

function renderTabs() {
  elements.stepTabs.innerHTML = "";

  const visibleSections = getVisibleSections();

  visibleSections.forEach((section, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "step-tab";
    button.dataset.stepIndex = String(index);
    if (index === currentStep) {
      button.classList.add("is-active");
    }
    button.innerHTML = `<strong>${index + 1}</strong><span>${section.title}</span>`;
    button.addEventListener("click", () => {
      currentStep = index;
      renderStep();
    });
    elements.stepTabs.appendChild(button);
  });

  syncStepTabsScroll();
}

function syncStepTabsScroll() {
  const activeTab = elements.stepTabs.querySelector(".step-tab.is-active");
  if (!activeTab) {
    return;
  }

  requestAnimationFrame(() => {
    const targetLeft = Math.max(activeTab.offsetLeft - elements.stepTabs.offsetLeft, 0);
    elements.stepTabs.scrollTo({
      left: targetLeft,
      behavior: "smooth",
    });
  });
}

function renderStep() {
  elements.welcomeScreen.classList.toggle("is-hidden", hasStarted);
  elements.wizardHeader.classList.toggle("is-hidden", !hasStarted);
  elements.stepTabs.classList.toggle("is-hidden", !hasStarted);
  elements.propertyForm.classList.toggle("is-hidden", !hasStarted);
  elements.formFooter.classList.toggle("is-hidden", !hasStarted);

  if (!hasStarted) {
    return;
  }

  const visibleSections = getVisibleSections();
  currentStep = Math.min(currentStep, Math.max(visibleSections.length - 1, 0));
  const section = visibleSections[currentStep];
  const hideStepLabels = section.id === "section-1";
  const isPurposeStep = section.id === "section-1";

  elements.wizardHeader.classList.toggle("is-hidden", hideStepLabels);
  elements.stepTabs.classList.toggle("is-hidden", hideStepLabels);
  elements.formFooter.classList.remove("is-hidden");
  elements.propertyForm.classList.toggle("is-purpose-step", isPurposeStep);
  elements.sectionTitle.textContent = section.title;
  elements.stepCounter.textContent = `Etap ${currentStep + 1} / ${visibleSections.length}`;
  elements.prevStep.disabled = currentStep === 0;
  elements.nextStep.textContent =
    currentStep === visibleSections.length - 1 ? "Dalej" : "Dalej";

  renderTabs();

  elements.formFields.innerHTML = "";

  section.fields
    .filter((field) => isVisible(field))
    .forEach((field) => {
      elements.formFields.appendChild(renderField(field));
    });

  hydrateCityMap();
}

function renderField(field) {
  const wrapper = document.createElement("section");
  wrapper.className = "field-card";
  if (field.id === "purpose") {
    wrapper.classList.add("field-card--purpose");
  }

  const header = document.createElement("div");
  header.className = "field-header";
  header.innerHTML = `<h3 class="field-title">${field.label}</h3>${
    field.description ? `<p class="field-description">${field.description}</p>` : ""
  }`;
  wrapper.appendChild(header);

  let control;
  switch (field.type) {
    case "single":
      control = renderChoiceField(field, false);
      break;
    case "multi":
      control = renderChoiceField(field, true);
      break;
    case "multi-dynamic":
      control = renderChoiceField(
        {
          ...field,
          options: getDistrictOptions(state),
        },
        true,
      );
      break;
    case "city-map":
      control = renderCityMapField();
      break;
    case "location-search":
      control = renderLocationSearchField(field);
      break;
    case "search-single":
      control = renderSearchSingleField(field);
      break;
    case "search-multi":
      control = renderSearchMultiField(field);
      break;
    case "number":
      control = renderNumberField(field);
      break;
    case "count-slider":
      control = renderCountSliderField(field);
      break;
    case "room-needs":
      control = renderRoomNeedsField(field);
      break;
    case "budget-range":
      control = renderBudgetRangeField(field);
      break;
    case "range":
      control = renderRangeField(field);
      break;
    case "matrix":
      control = renderMatrixField(field);
      break;
    case "progressive":
      control = renderProgressiveField(field);
      break;
    case "two-d-grid":
      control = renderTwoDGrid(field);
      break;
    default:
      control = document.createElement("p");
      control.textContent = "Nieobsługiwany typ pola";
  }

  wrapper.appendChild(control);
  return wrapper;
}

function renderChoiceField(field, multiple) {
  const container = document.createElement("div");
  container.className = "choice-grid";
  const isPurposeField = field.id === "purpose" && !multiple;
  if (isPurposeField) {
    container.classList.add("choice-grid--purpose");
  }
  const values = multiple ? state[field.id] || [] : state[field.id];

  if (!field.options.length) {
    const info = document.createElement("span");
    info.className = "chip-note";
    info.textContent = "Dla wybranego miasta nie mamy jeszcze listy dzielnic.";
    container.appendChild(info);
    return container;
  }

  field.options.forEach((option, index) => {
    const item = document.createElement("div");
    item.className = "choice-card";
    if (isPurposeField) {
      item.classList.add("choice-card--purpose");
    }
    const input = document.createElement("input");
    input.type = multiple ? "checkbox" : "radio";
    input.name = field.id;
    input.id = `${field.id}-${index}`;
    input.checked = multiple ? values.includes(option) : values === option;
    if (isPurposeField) {
      input.classList.add("choice-input--hidden");
    }
    const commitChoice = () => {
      if (multiple) {
        const next = new Set(state[field.id] || []);
        if (input.checked) {
          next.add(option);
        } else {
          next.delete(option);
        }
        state[field.id] = Array.from(next);
      } else {
        state[field.id] = option;
      }
      normalizeState();
      persistState();

      renderStep();
    };

    input.addEventListener("change", () => {
      commitChoice();
    });

    const label = document.createElement("label");
    label.htmlFor = input.id;
    if (isPurposeField) {
      label.className = "purpose-card-label";

      const media = document.createElement("div");
      media.className = "purpose-card-media";
      media.textContent = "placeholder";

      const title = document.createElement("span");
      title.className = "purpose-card-title";
      title.textContent = option;

      label.append(media, title);
      label.addEventListener("dblclick", () => {
        state[field.id] = option;
        normalizeState();
        persistState();

        const visibleSections = getVisibleSections();
        const currentSection = visibleSections[currentStep];
        if (currentSection?.id === "section-1") {
          advanceStep();
        } else {
          renderStep();
        }
      });
    } else {
      label.textContent = option;
    }

    item.append(input, label);
    container.appendChild(item);
  });

  return container;
}

function renderSearchSingleField(field) {
  const container = document.createElement("div");
  container.className = "number-grid";

  const group = document.createElement("div");
  group.className = "input-group";
  group.innerHTML = `<label for="${field.id}">Wybierz z listy lub wpisz nazwę</label>`;

  const input = document.createElement("input");
  const listId = `${field.id}-options`;
  input.setAttribute("list", listId);
  input.id = field.id;
  input.value = state[field.id] || "";
  input.placeholder = "Zacznij wpisywać nazwę województwa";
  input.addEventListener("change", () => {
    const allowed = new Set(field.options);
    state[field.id] = allowed.has(input.value) ? input.value : "";
    normalizeState();
    persistState();
    renderStep();
  });

  const datalist = document.createElement("datalist");
  datalist.id = listId;
  field.options.forEach((option) => {
    const item = document.createElement("option");
    item.value = option;
    datalist.appendChild(item);
  });

  group.append(input, datalist);
  container.appendChild(group);
  return container;
}

function renderSearchMultiField(field) {
  const container = document.createElement("div");
  container.className = "number-grid";
  const options = getCountyCityOptions();
  const selected = state[field.id] || [];

  const group = document.createElement("div");
  group.className = "input-group";
  group.innerHTML = `<label for="${field.id}-search">Wyszukaj miasto i dodaj do listy</label>`;

  const input = document.createElement("input");
  const listId = `${field.id}-options`;
  input.setAttribute("list", listId);
  input.id = `${field.id}-search`;
  input.placeholder = state.voivodeship
    ? "Zacznij wpisywać nazwę miasta powiatowego"
    : "Najpierw wybierz województwo";
  input.disabled = !state.voivodeship;

  const addButton = document.createElement("button");
  addButton.type = "button";
  addButton.className = "ghost-button";
  addButton.textContent = "Dodaj";
  addButton.disabled = !state.voivodeship;
  addButton.addEventListener("click", () => {
    const value = input.value.trim();
    if (!options.includes(value)) {
      return;
    }
    const next = new Set(state[field.id] || []);
    next.add(value);
    state[field.id] = Array.from(next).sort((a, b) => a.localeCompare(b, "pl"));
    input.value = "";
    normalizeState();
    persistState();
    renderStep();
  });

  const datalist = document.createElement("datalist");
  datalist.id = listId;
  options.forEach((option) => {
    const item = document.createElement("option");
    item.value = option;
    datalist.appendChild(item);
  });

  group.append(input, datalist, addButton);
  container.appendChild(group);

  const selectedWrap = document.createElement("div");
  selectedWrap.className = "choice-grid";
  if (!selected.length) {
    const empty = document.createElement("span");
    empty.className = "chip-note";
    empty.textContent = state.voivodeship
      ? "Nie dodano jeszcze żadnego miasta."
      : "Najpierw wybierz województwo.";
    selectedWrap.appendChild(empty);
  } else {
    selected.forEach((city) => {
      const item = document.createElement("div");
      item.className = "choice-card";
      const button = document.createElement("button");
      button.type = "button";
      button.className = "ghost-button";
      button.textContent = `${city} usuń`;
      button.addEventListener("click", () => {
        state[field.id] = (state[field.id] || []).filter((value) => value !== city);
        normalizeState();
        persistState();
        renderStep();
      });
      item.appendChild(button);
      selectedWrap.appendChild(item);
    });
  }

  container.appendChild(selectedWrap);
  return container;
}

function renderLocationSearchField(field) {
  const container = document.createElement("div");
  container.className = "location-search-field";

  const group = document.createElement("div");
  group.className = "input-group location-search-input-group";

  const label = document.createElement("label");
  label.htmlFor = `${field.id}-search`;
  label.textContent = "Wyszukaj miasto lub miejscowość";

  const input = document.createElement("input");
  input.type = "text";
  input.id = `${field.id}-search`;
  input.autocomplete = "off";
  input.placeholder = locationCatalog.length
    ? "Np. Katowice, Sopot albo całe woj. śląskie"
    : "Ładuję listę miejscowości...";
  input.value = locationSearchState[field.id] || "";
  input.disabled = !locationCatalog.length;

  const suggestions = document.createElement("div");
  suggestions.className = "location-search-suggestions";

  const selectedWrap = document.createElement("div");
  selectedWrap.className = "location-selected-list";

  const addLocation = (entry) => {
    const next = new Set(state[field.id] || []);
    next.add(entry.label);
    state[field.id] = Array.from(next).sort((left, right) => left.localeCompare(right, "pl"));
    locationSearchState[field.id] = "";
    normalizeState();
    persistState();
    renderStep();
  };

  const renderSuggestions = () => {
    const query = (locationSearchState[field.id] || "").trim();
    suggestions.innerHTML = "";

    if (!locationCatalog.length) {
      const loading = document.createElement("div");
      loading.className = "chip-note";
      loading.textContent = "Ładuję listę miejscowości...";
      suggestions.appendChild(loading);
      return;
    }

    if (query.length < 2) {
      return;
    }

    const normalizedQuery = normalizeSearchText(query);
    const selectedLabels = new Set(state[field.id] || []);
    const matches = locationCatalog
      .filter((entry) => entry.searchKey.includes(normalizedQuery) && !selectedLabels.has(entry.label))
      .sort((left, right) => {
        const leftStarts = left.searchKey.startsWith(normalizedQuery) ? 1 : 0;
        const rightStarts = right.searchKey.startsWith(normalizedQuery) ? 1 : 0;
        if (leftStarts !== rightStarts) {
          return rightStarts - leftStarts;
        }
        if (left.type !== right.type) {
          return left.type === "voivodeship" ? -1 : 1;
        }
        return left.label.localeCompare(right.label, "pl");
      })
      .slice(0, 12);

    if (!matches.length) {
      const empty = document.createElement("div");
      empty.className = "chip-note";
      empty.textContent = "Nie znaleźliśmy pasującej miejscowości.";
      suggestions.appendChild(empty);
      return;
    }

    matches.forEach((entry) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "location-suggestion";
      button.innerHTML =
        `<strong>${entry.type === "voivodeship" ? entry.label : entry.name}</strong><span>${entry.metaLabel}</span>`;
      button.addEventListener("click", () => {
        addLocation(entry);
      });
      suggestions.appendChild(button);
    });
  };

  input.addEventListener("input", () => {
    locationSearchState[field.id] = input.value;
    renderSuggestions();
  });

  input.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") {
      return;
    }
    event.preventDefault();
    const query = normalizeSearchText(locationSearchState[field.id] || "");
    if (!query) {
      return;
    }
    const selectedLabels = new Set(state[field.id] || []);
    const match = locationCatalog.find((entry) =>
      entry.searchKey.includes(query) && !selectedLabels.has(entry.label)
    );
    if (match) {
      addLocation(match);
    }
  });

  group.append(label, input);
  container.append(group);

  const selectedLabels = state[field.id] || [];
  if (selectedLabels.length) {
    selectedLabels.forEach((selectedLabel) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "location-chip";
      chip.textContent = selectedLabel;

      const remove = document.createElement("span");
      remove.className = "location-chip-remove";
      remove.textContent = "usuń";
      chip.appendChild(remove);

      chip.addEventListener("click", () => {
        state[field.id] = (state[field.id] || []).filter((value) => value !== selectedLabel);
        normalizeState();
        persistState();
        renderStep();
      });

      selectedWrap.appendChild(chip);
    });
  }

  container.append(selectedWrap, suggestions);

  if (!locationCatalog.length) {
    ensureLocationCatalog().then(() => {
      if (document.body.contains(container)) {
        renderStep();
      }
    });
  } else {
    renderSuggestions();
  }

  return container;
}

function renderCityMapField() {
  const container = document.createElement("div");
  const cityLabels = state.cities || [];
  const cityNames = getSelectedCityNames(state);
  const city = cityNames[0];
  const cityLabel = cityLabels[0] || city;

  if (!city) {
    const info = document.createElement("span");
    info.className = "chip-note";
    info.textContent = "Wybierz miasto, aby zobaczyć mapę.";
    container.appendChild(info);
    return container;
  }

  const note = document.createElement("p");
  note.className = "field-description";
  note.textContent = cityLabels.length > 1
    ? `Pokazuję mapę dla pierwszej wybranej lokalizacji: ${cityLabel}.`
    : `Mapa dla lokalizacji: ${cityLabel}.`;

  if (city === "Katowice") {
    const mapContainer = document.createElement("div");
    mapContainer.id = "city-map-canvas";
    mapContainer.className = "city-map-canvas";

    const helper = document.createElement("p");
    helper.className = "field-description";
    helper.textContent =
      "Kliknij dzielnicę na mapie, aby dodać ją lub usunąć z wyboru.";

    container.append(note, helper, mapContainer);
    return container;
  }

  const iframe = document.createElement("iframe");
  iframe.src = `https://www.google.com/maps?q=${encodeURIComponent(`${city}, Polska`)}&output=embed`;
  iframe.title = `Mapa miasta ${city}`;
  iframe.loading = "lazy";
  iframe.referrerPolicy = "no-referrer-when-downgrade";
  iframe.style.width = "100%";
  iframe.style.maxWidth = "100%";
  iframe.style.height = "320px";
  iframe.style.border = "1px solid #ccc";

  const link = document.createElement("a");
  link.href = `https://www.google.com/maps/search/${encodeURIComponent(`${city}, Polska`)}`;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.textContent = "Otwórz większą mapę";

  container.append(note, iframe, link);
  return container;
}

function hydrateCityMap() {
  const mapContainer = document.querySelector("#city-map-canvas");
  const city = getSelectedCityNames(state)[0];

  if (!mapContainer || city !== "Katowice" || !window.L) {
    return;
  }

  window.setTimeout(async () => {
    if (!document.body.contains(mapContainer)) {
      return;
    }

    mapContainer.innerHTML = "";

    const map = window.L.map(mapContainer, {
      scrollWheelZoom: false,
    }).setView([50.2649, 19.0238], 11);

    window.L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        subdomains: "abcd",
        attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
      },
    ).addTo(map);

    const geoJson = await getKatowiceDistrictsGeoJson();
    const selectedDistricts = new Set(state.districts || []);

    const normalizeDistrictName = (name) =>
      String(name || "")
        .replace(/\s+/g, " ")
        .trim()
        .replace("Osiedle ", "Os. ");

    const districtLayer = window.L.geoJSON(geoJson, {
      style: (feature) => {
        const name = normalizeDistrictName(feature?.properties?.NAZWA);
        const selected = selectedDistricts.has(name);
        return {
          color: selected ? "#f97316" : "#64748b",
          weight: selected ? 3 : 2,
          fillColor: selected ? "#fb923c" : "#94a3b8",
          fillOpacity: selected ? 0.35 : 0.16,
        };
      },
      onEachFeature: (feature, layer) => {
        const districtName = normalizeDistrictName(feature?.properties?.NAZWA);
        layer.bindTooltip(districtName, { sticky: true });
        layer.on("click", () => {
          const next = new Set(state.districts || []);
          if (next.has(districtName)) {
            next.delete(districtName);
          } else {
            next.add(districtName);
          }
          state.districts = Array.from(next).sort((a, b) => a.localeCompare(b, "pl"));
          persistState();
          renderStep();
        });
      },
    }).addTo(map);

    map.fitBounds(districtLayer.getBounds(), { padding: [16, 16] });
  }, 0);
}

async function getKatowiceDistrictsGeoJson() {
  if (!katowiceDistrictsGeoJsonPromise) {
    katowiceDistrictsGeoJsonPromise = fetch(KATOWICE_DISTRICTS_GEOJSON_URL).then((response) =>
      response.json(),
    );
  }
  return katowiceDistrictsGeoJsonPromise;
}

function renderNumberField(field) {
  const container = document.createElement("div");
  container.className = "number-grid";
  const group = document.createElement("div");
  group.className = "input-group";
  const numberLabel =
    field.id === "adults"
      ? "Liczba dorosłych"
      : field.id === "children"
        ? "Liczba dzieci"
        : field.id === "purchaseBudget" || field.id === "renovationBudget"
          ? "Kwota w zł"
          : field.id === "rentBudget"
            ? "Kwota miesięczna w zł"
        : "Podaj kwotę lub liczbę";
  group.innerHTML = `<label for="${field.id}">${numberLabel}</label>`;

  const input = document.createElement("input");
  input.type = "number";
  input.id = field.id;
  input.min = field.min ?? 0;
  input.step = field.step ?? 1;
  input.value = state[field.id] ?? "";
  input.addEventListener("input", () => {
    state[field.id] = input.value === "" ? "" : Number(input.value);
    persistState();
  });

  group.appendChild(input);
  container.appendChild(group);
  return container;
}

function renderCountSliderField(field) {
  const container = document.createElement("div");
  container.className = "count-slider-field";

  const currentValue =
    typeof state[field.id] === "number" ? state[field.id] : (field.min ?? 0);

  const sliderWrap = document.createElement("div");
  sliderWrap.className = "count-slider-wrap";

  const bubble = document.createElement("div");
  bubble.className = "count-slider-value";
  bubble.innerHTML = `<strong>${currentValue}</strong>`;

  const slider = document.createElement("input");
  slider.type = "range";
  slider.className = "count-slider-input";
  slider.min = field.min ?? 0;
  slider.max = field.max ?? 10;
  slider.step = field.step ?? 1;
  slider.value = currentValue;

  const applySliderValue = (nextValue) => {
    slider.value = String(nextValue);
    state[field.id] = Number(nextValue);
    persistState();
    updateBubble();
  };

  const getValueFromClientX = (clientX) => {
    const rect = slider.getBoundingClientRect();
    const min = Number(slider.min);
    const max = Number(slider.max);
    const step = Number(slider.step) || 1;
    const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    const rawValue = min + ratio * (max - min);
    const steppedValue = Math.round((rawValue - min) / step) * step + min;
    return Math.min(max, Math.max(min, steppedValue));
  };

  const updateBubble = () => {
    const min = Number(slider.min);
    const max = Number(slider.max);
    const value = Number(slider.value);
    const percent = ((value - min) / (max - min || 1)) * 100;
    bubble.style.left = `${percent}%`;
    bubble.querySelector("strong").textContent = String(value);
  };

  slider.addEventListener("input", () => {
    applySliderValue(Number(slider.value));
  });

  bubble.addEventListener("pointerdown", (event) => {
    event.preventDefault();

    const onMove = (moveEvent) => {
      applySliderValue(getValueFromClientX(moveEvent.clientX));
    };

    const onEnd = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onEnd);
      window.removeEventListener("pointercancel", onEnd);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onEnd);
    window.addEventListener("pointercancel", onEnd);
  });

  const ticks = document.createElement("div");
  ticks.className = "count-slider-ticks";
  const tickValues = [];
  for (let value = Number(slider.min); value <= Number(slider.max); value += Number(slider.step)) {
    tickValues.push(value);
  }
  ticks.style.gridTemplateColumns = `repeat(${tickValues.length}, minmax(0, 1fr))`;
  tickValues.forEach((value) => {
    const tick = document.createElement("span");
    tick.textContent = String(value);
    ticks.appendChild(tick);
  });

  updateBubble();
  sliderWrap.append(bubble, slider, ticks);
  container.append(sliderWrap);
  return container;
}

function renderRoomNeedsField(field) {
  const container = document.createElement("div");
  container.className = "room-needs-field";

  const rows = [
    { key: "adultBedroom", label: "sypialnia dorosłych" },
    {
      key: "childRoom",
      label: "pokój dzieci",
      visible: () => Number(state.children || 0) > 0,
      hasCount: true,
    },
    { key: "guestRoom", label: "pokój gościnny" },
    { key: "diningRoom", label: "jadalnia" },
    { key: "livingRoom", label: "pokój dzienny" },
    { key: "office", label: "gabinet" },
  ];

  const roomNeeds = state[field.id] || {};
  const childCount = Math.max(1, Number(state.children || 0));

  rows
    .filter((row) => !row.visible || row.visible())
    .forEach((row) => {
      const rowElement = document.createElement("div");
      rowElement.className = "room-needs-row";

      const title = document.createElement("div");
      title.className = "room-needs-title";
      title.textContent = row.label;

      const controls = document.createElement("div");
      controls.className = "room-needs-controls";

      const toggle = document.createElement("div");
      toggle.className = "room-needs-toggle";

      ["tak", "nie"].forEach((option) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "room-needs-button";
        button.textContent = option;
        if (roomNeeds[row.key] === option) {
          button.classList.add("is-active");
        }

        button.addEventListener("click", () => {
          const next = { ...(state[field.id] || {}) };
          next[row.key] = option;
          if (row.hasCount && option === "nie") {
            delete next.childRoomCount;
          }
          state[field.id] = next;
          normalizeState();
          persistState();
          renderStep();
        });

        toggle.appendChild(button);
      });

      controls.appendChild(toggle);

      if (row.hasCount && roomNeeds[row.key] === "tak") {
        const countWrap = document.createElement("label");
        countWrap.className = "room-needs-count";

        const countLabel = document.createElement("span");
        countLabel.textContent = "Ilość";

        const select = document.createElement("select");
        for (let value = 1; value <= childCount; value += 1) {
          const option = document.createElement("option");
          option.value = String(value);
          option.textContent = String(value);
          select.appendChild(option);
        }
        select.value = String(roomNeeds.childRoomCount || 1);
        select.addEventListener("change", () => {
          const next = { ...(state[field.id] || {}) };
          next.childRoomCount = Number(select.value);
          state[field.id] = next;
          persistState();
        });

        countWrap.append(countLabel, select);
        controls.appendChild(countWrap);
      }

      rowElement.append(title, controls);
      container.appendChild(rowElement);
    });

  return container;
}

function renderDualSliderField(field, options = {}) {
  const container = document.createElement("div");
  container.className = "budget-range-field";

  const rangeMin = Number(field.min ?? 0);
  const rangeMax = Number(field.max ?? 100);
  const step = Number(field.step ?? 1);
  const defaultRange = {
    min: field.defaultMin ?? rangeMin,
    max: field.defaultMax ?? rangeMax,
  };
  const current = state[field.id] || defaultRange;
  const valuesRow = document.createElement("div");
  valuesRow.className = "budget-values-row";

  let minValueInput;
  let maxValueInput;
  let ignoreTrackClickUntil = 0;

  const formatInputValue =
    options.formatInputValue ||
    ((value) =>
      new Intl.NumberFormat("pl-PL").format(Number(value || 0)).replace(/\u00A0/g, " "));

  const parseInputValue =
    options.parseInputValue ||
    ((rawValue) => {
      const digitsOnly = String(rawValue || "").replace(/[^\d]/g, "");
      return digitsOnly ? Number(digitsOnly) : null;
    });

  const formatTick = options.formatTick || ((value) => String(value));
  const tickValues = (options.tickValues || field.ticks || [rangeMin, rangeMax]).filter(
    (value, index, array) => array.indexOf(value) === index && value >= rangeMin && value <= rangeMax,
  );

  const clampToStep = (rawValue) => {
    const stepped = Math.round(rawValue / step) * step;
    return Math.min(rangeMax, Math.max(rangeMin, stepped));
  };

  const getCurrentRange = () => ({
    min: Number((state[field.id] || {}).min ?? current.min ?? rangeMin),
    max: Number((state[field.id] || {}).max ?? current.max ?? rangeMax),
  });

  const sliderGroup = document.createElement("div");
  sliderGroup.className = "budget-slider-group";

  const baseTrack = document.createElement("div");
  baseTrack.className = "budget-slider-base";

  const activeTrack = document.createElement("div");
  activeTrack.className = "budget-slider-active";

  const minHandle = document.createElement("button");
  minHandle.type = "button";
  minHandle.className = "budget-handle";
  minHandle.setAttribute("aria-label", options.minHandleLabel || "Wartość minimalna");

  const maxHandle = document.createElement("button");
  maxHandle.type = "button";
  maxHandle.className = "budget-handle";
  maxHandle.setAttribute("aria-label", options.maxHandleLabel || "Wartość maksymalna");

  const ticks = document.createElement("div");
  ticks.className = "budget-slider-ticks";

  const updateTrack = () => {
    const { min, max } = getCurrentRange();
    const start = ((min - rangeMin) / (rangeMax - rangeMin)) * 100;
    const end = ((max - rangeMin) / (rangeMax - rangeMin)) * 100;
    activeTrack.style.left = `${start}%`;
    activeTrack.style.width = `${Math.max(end - start, 0)}%`;
    minHandle.style.left = `${start}%`;
    maxHandle.style.left = `${end}%`;
  };

  const applyState = (nextMin, nextMax, rerender = false) => {
    const boundedMin = Math.max(rangeMin, Math.min(nextMin, nextMax));
    const boundedMax = Math.min(rangeMax, Math.max(nextMin, nextMax));
    state[field.id] = { min: boundedMin, max: boundedMax };
    if (minValueInput) {
      minValueInput.value = formatInputValue(boundedMin);
    }
    if (maxValueInput) {
      maxValueInput.value = formatInputValue(boundedMax);
    }
    updateTrack();
    persistState();
    if (rerender) {
      renderStep();
    }
  };

  const buildValueInput = (key, label) => {
    const box = document.createElement("label");
    box.className = "budget-value-box";

    const caption = document.createElement("span");
    caption.textContent = label;

    const input = document.createElement("input");
    input.type = "text";
    input.inputMode = "numeric";
    input.className = "budget-value-input";
    input.autocomplete = "off";
    input.value = formatInputValue(current[key] ?? defaultRange[key]);
    input.addEventListener("input", () => {
      const parsedValue = parseInputValue(input.value);
      if (parsedValue === null) {
        input.value = "";
        return;
      }

      const next = state[field.id] || { ...defaultRange };
      next[key] = parsedValue;
      input.value = formatInputValue(parsedValue);
      applyState(Number(next.min ?? rangeMin), Number(next.max ?? rangeMax));
    });
    input.addEventListener("blur", () => {
      const currentRange = state[field.id] || defaultRange;
      input.value = formatInputValue(currentRange[key] ?? defaultRange[key]);
    });

    if (key === "min") {
      minValueInput = input;
    } else {
      maxValueInput = input;
    }

    box.append(caption, input);
    return box;
  };

  const getValueFromClientX = (clientX) => {
    const rect = sliderGroup.getBoundingClientRect();
    const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    return clampToStep(rangeMin + ratio * (rangeMax - rangeMin));
  };

  const moveNearestHandle = (clientX) => {
    const nextValue = getValueFromClientX(clientX);
    const currentRange = getCurrentRange();
    const moveMin =
      Math.abs(nextValue - currentRange.min) <= Math.abs(nextValue - currentRange.max);

    if (moveMin) {
      applyState(Math.min(nextValue, currentRange.max), currentRange.max);
    } else {
      applyState(currentRange.min, Math.max(nextValue, currentRange.min));
    }
  };

  const bindHandleDrag = (handle, edge) => {
    handle.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      ignoreTrackClickUntil = Date.now() + 200;

      const onMove = (moveEvent) => {
        const nextValue = getValueFromClientX(moveEvent.clientX);
        const currentRange = getCurrentRange();

        if (edge === "min") {
          applyState(Math.min(nextValue, currentRange.max), currentRange.max);
        } else {
          applyState(currentRange.min, Math.max(nextValue, currentRange.min));
        }
      };

      const onEnd = () => {
        ignoreTrackClickUntil = Date.now() + 200;
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onEnd);
        window.removeEventListener("pointercancel", onEnd);
      };

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onEnd);
      window.addEventListener("pointercancel", onEnd);
    });
  };

  valuesRow.append(
    buildValueInput("min", field.minLabel || "Od"),
    buildValueInput("max", field.maxLabel || "Do"),
  );

  ticks.style.gridTemplateColumns = `repeat(${tickValues.length}, minmax(0, 1fr))`;
  tickValues.forEach((value, index) => {
    const tick = document.createElement("span");
    tick.textContent = formatTick(value);
    if (index === 0) {
      tick.classList.add("budget-tick-start");
    }
    if (index === tickValues.length - 1) {
      tick.classList.add("budget-tick-end");
    }
    ticks.appendChild(tick);
  });

  bindHandleDrag(minHandle, "min");
  bindHandleDrag(maxHandle, "max");

  sliderGroup.addEventListener("click", (event) => {
    if (Date.now() < ignoreTrackClickUntil) {
      return;
    }
    if (event.target === minHandle || event.target === maxHandle) {
      return;
    }
    moveNearestHandle(event.clientX);
  });

  sliderGroup.append(baseTrack, activeTrack, minHandle, maxHandle);
  updateTrack();
  container.append(valuesRow, sliderGroup, ticks);
  return container;
}

function renderBudgetRangeField(field) {
  const formatBudgetTick = (value) => {
    if (value >= 1000000) {
      const millions = value / 1000000;
      return Number.isInteger(millions) ? `${millions} mln` : `${millions.toFixed(1)} mln`;
    }
    if (value >= 1000) {
      return `${Math.round(value / 1000)} tys.`;
    }
    return String(value);
  };

  return renderDualSliderField(field, {
    minHandleLabel: "Minimalny budżet",
    maxHandleLabel: "Maksymalny budżet",
    tickValues:
      field.ticks ||
      [field.min ?? 0, 1000000, 2000000, 3000000, 4000000, field.max ?? 5000000],
    formatTick: formatBudgetTick,
  });
}

function renderRangeField(field) {
  return renderDualSliderField(field, {
    minHandleLabel: `${field.label} od`,
    maxHandleLabel: `${field.label} do`,
    tickValues: field.ticks,
    formatTick: (value) => String(value),
  });
}

function renderMatrixField(field) {
  const container = document.createElement("div");
  container.className = "matrix-table";
  container.style.setProperty("--cols", field.columns.length);

  const orderedColumns = getOrderedMatrixColumns(field.columns);
  const defaultColumn = getDefaultMatrixColumn(field.columns);

  const header = document.createElement("div");
  header.className = "matrix-header";
  header.appendChild(document.createElement("span"));
  orderedColumns.forEach((column) => {
    const span = document.createElement("span");
    span.textContent = column;
    header.appendChild(span);
  });
  container.appendChild(header);

  const values = state[field.id] || {};
  field.rows.forEach((rowLabel, rowIndex) => {
    const row = document.createElement("div");
    row.className = "matrix-row";

    const title = document.createElement("div");
    title.className = "matrix-row-title";
    title.textContent = rowLabel;
    row.appendChild(title);

    const options = document.createElement("div");
    options.className = "matrix-options";

    const selectedValue = values[rowLabel] ?? defaultColumn;

    orderedColumns.forEach((column, colIndex) => {
      const cell = document.createElement("div");
      cell.className = "matrix-cell";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `${field.id}-${rowIndex}`;
      input.id = `${field.id}-${rowIndex}-${colIndex}`;
      input.checked = selectedValue === column;
      input.addEventListener("change", () => {
        const next = { ...(state[field.id] || {}) };
        next[rowLabel] = column;
        state[field.id] = next;
        normalizeState();
        persistState();
        renderStep();
      });

      const label = document.createElement("label");
      label.htmlFor = input.id;
      label.textContent = column;

      cell.append(input, label);
      options.appendChild(cell);
    });

    row.appendChild(options);

    container.appendChild(row);
  });

  return container;
}

function getOrderedMatrixColumns(columns) {
  if (
    columns.length === 3 &&
    columns.includes("preferuję") &&
    columns.includes("dopuszczam") &&
    columns.includes("nie chcę")
  ) {
    return ["nie chcę", "dopuszczam", "preferuję"];
  }

  return columns;
}

function getDefaultMatrixColumn(columns) {
  if (columns.includes("nie chcę")) {
    return "nie chcę";
  }

  return null;
}

function renderProgressiveField(field) {
  const container = document.createElement("div");
  container.className = "progressive-scale";

  field.options.forEach((option, index) => {
    const item = document.createElement("div");
    item.className = "progressive-item";
    const input = document.createElement("input");
    input.type = "radio";
    input.name = field.id;
    input.id = `${field.id}-${index}`;
    input.checked = state[field.id] === option.code;
    input.addEventListener("change", () => {
      state[field.id] = option.code;
      persistState();
      renderStep();
    });

    const label = document.createElement("label");
    label.htmlFor = input.id;
    label.innerHTML = `<strong>${option.code}</strong><span>${option.label}</span>`;

    item.append(input, label);
    container.appendChild(item);
  });

  return container;
}

function renderTwoDGrid(field) {
  const container = document.createElement("div");
  container.className = "two-d-grid";

  const caption = document.createElement("p");
  caption.className = "two-d-caption";
  caption.textContent =
    "Im więcej zaznaczonych pól, tym szerszy zakres dopuszczalnych wykończeń.";
  container.appendChild(caption);

  const board = document.createElement("div");
  board.className = "two-d-board";
  const values = new Set(state[field.id] || []);

  const corner = document.createElement("div");
  corner.className = "corner";
  corner.textContent = "Wiek / jakość";
  board.appendChild(corner);

  field.xAxis.forEach((label) => {
    const axis = document.createElement("div");
    axis.className = "axis-label";
    axis.textContent = label;
    board.appendChild(axis);
  });

  field.yAxis.forEach((yLabel) => {
    const axis = document.createElement("div");
    axis.className = "axis-label";
    axis.textContent = yLabel;
    board.appendChild(axis);

    field.xAxis.forEach((xLabel) => {
      const key = `${yLabel} | ${xLabel}`;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "cell-button";
      button.classList.toggle("is-selected", values.has(key));
      button.textContent = "Akceptuję";
      button.title = key;
      button.addEventListener("click", () => {
        const next = new Set(state[field.id] || []);
        if (next.has(key)) {
          next.delete(key);
        } else {
          next.add(key);
        }
        state[field.id] = Array.from(next);
        persistState();
        renderStep();
      });
      board.appendChild(button);
    });
  });

  container.appendChild(board);
  return container;
}

function isVisible(field) {
  return typeof field.visible === "function" ? field.visible(state) : true;
}

function hasApartmentSelected(currentState) {
  const types = currentState.propertyTypes || {};
  return Object.keys(types).some(
    (key) => key.includes("mieszkanie") && ["preferuję", "dopuszczam"].includes(types[key]),
  );
}

function primaryMarketAllowed(currentState) {
  const market = currentState.marketType || {};
  return ["preferuję", "dopuszczam"].includes(market["rynek pierwotny"]);
}

function styleMatters(currentState) {
  return [
    "bardzo ważny, szukam konkretnego stylu",
    "ważny, ale dopuszczam kompromisy",
    "ma być neutralnie i schludnie",
  ].includes(currentState.styleImportance);
}

function bathroomAllowsSeparateWc(currentState) {
  const layout = currentState.bathroomLayout || {};
  return ["preferuję", "dopuszczam"].includes(layout["łazienka + osobne WC"]) ||
    ["preferuję", "dopuszczam"].includes(layout["łazienka + osobne WC z prysznicem"]);
}

function includesPurchaseMode(currentState) {
  return (currentState.mode || []).includes("kupno");
}

function includesRentMode(currentState) {
  return (currentState.mode || []).includes("najem");
}

function showRenovationBudget(currentState) {
  return includesPurchaseMode(currentState);
}

function normalizeSearchText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .replace(/[^a-z0-9ąćęłńóśźż]+/gi, " ")
    .trim();
}

function buildLocationCatalog(cityRows, countyRows, voivodeshipRows) {
  const countyByCode = new Map(
    countyRows.map((county) => [county.code, county]),
  );
  const voivodeshipByCode = new Map(
    voivodeshipRows.map((voivodeship) => [voivodeship.code, voivodeship]),
  );

  const nameCounts = new Map();
  const nameVoivodeshipCounts = new Map();

  cityRows.forEach((city) => {
    const county = countyByCode.get(city.county_code);
    const voivodeship = voivodeshipByCode.get(county?.voivodeship_code);
    const cityName = city.name;
    const voivodeshipName = voivodeship?.name || "";
    const nameKey = cityName;
    const nameVoivodeshipKey = `${cityName}|${voivodeshipName}`;
    nameCounts.set(nameKey, (nameCounts.get(nameKey) || 0) + 1);
    nameVoivodeshipCounts.set(
      nameVoivodeshipKey,
      (nameVoivodeshipCounts.get(nameVoivodeshipKey) || 0) + 1,
    );
  });

  const cityEntries = cityRows
    .map((city) => {
      const county = countyByCode.get(city.county_code);
      const voivodeship = voivodeshipByCode.get(county?.voivodeship_code);
      const name = city.name;
      const countyName = county?.name || "";
      const voivodeshipName = voivodeship?.name || "";
      const voivodeshipMeta = voivodeshipName.toLowerCase();
      const nameVoivodeshipKey = `${name}|${voivodeshipName}`;

      let label = name;
      let metaLabel = voivodeshipMeta;
      if ((nameCounts.get(name) || 0) > 1) {
        label = `${name}, ${voivodeshipMeta}`;
        metaLabel = `${voivodeshipMeta}`;
      }
      if ((nameVoivodeshipCounts.get(nameVoivodeshipKey) || 0) > 1) {
        label = `${name}, pow. ${countyName}, ${voivodeshipMeta}`;
        metaLabel = `pow. ${countyName}, ${voivodeshipMeta}`;
      }

      return {
        type: "city",
        name,
        label,
        countyName,
        voivodeshipName,
        metaLabel,
        searchKey: normalizeSearchText(`${name} ${countyName} ${voivodeshipName}`),
      };
    })
    .sort((left, right) => left.label.localeCompare(right.label, "pl"));

  const voivodeshipEntries = voivodeshipRows.map((voivodeship) => ({
    type: "voivodeship",
    name: voivodeship.name,
    label: `woj. ${voivodeship.name}`,
    countyName: "",
    voivodeshipName: voivodeship.name,
    metaLabel: "całe województwo",
    searchKey: normalizeSearchText(`${voivodeship.name} wojewodztwo cale`),
  }));

  return [...voivodeshipEntries, ...cityEntries];
}

function ensureLocationCatalog() {
  if (locationCatalog.length) {
    return Promise.resolve(locationCatalog);
  }
  if (!locationCatalogPromise) {
    locationCatalogPromise = Promise.all([
      fetch(POLISH_CITIES_DATA_URL).then((response) => response.json()),
      fetch(POLISH_COUNTIES_DATA_URL).then((response) => response.json()),
      fetch(POLISH_VOIVODESHIPS_DATA_URL).then((response) => response.json()),
    ])
      .then(([cityPayload, countyPayload, voivodeshipPayload]) => {
        locationCatalog = buildLocationCatalog(
          cityPayload.city || [],
          countyPayload.county || [],
          voivodeshipPayload.voivodeship || [],
        );
        locationCatalogByLabel = new Map(
          locationCatalog.map((entry) => [entry.label, entry]),
        );
        normalizeState();
        persistState();
        return locationCatalog;
      })
      .catch((error) => {
        console.error(error);
        locationCatalog = [];
        locationCatalogByLabel = new Map();
        return [];
      });
  }
  return locationCatalogPromise;
}

function getLocationEntryByLabel(label) {
  return locationCatalogByLabel.get(label) || null;
}

function getSelectedCityNames(currentState = state) {
  return (currentState.cities || [])
    .map((selectedLabel) => getLocationEntryByLabel(selectedLabel))
    .filter((entry) => entry && entry.type === "city")
    .map((entry) => entry.name)
    .filter(Boolean);
}

function hasSelectedCityName(currentState, cityName) {
  return getSelectedCityNames(currentState).includes(cityName);
}

function getDistrictOptions(currentState = state) {
  const selectedCities = getSelectedCityNames(currentState);
  return [...new Set(selectedCities.flatMap((city) => cityDistricts[city] || []))];
}

function normalizeState() {
  delete state.changeBudgetApproach;
  delete state.noWorks;
  delete state.bathroomFeatures;
  delete state.bathroomPreference;
  delete state.voivodeship;

  if (Array.isArray(state.cities) && locationCatalogByLabel.size) {
    state.cities = state.cities
      .map((selectedLabel) => {
        if (locationCatalogByLabel.has(selectedLabel)) {
          return selectedLabel;
        }
        const fallbackEntry = locationCatalog.find((entry) => entry.name === selectedLabel);
        return fallbackEntry?.label || null;
      })
      .filter(Boolean);
  }

  if (!isVisible({ visible: (s) => s.purpose === "dla siebie / rodziny" })) {
    delete state.adults;
    delete state.children;
  }

  if (Number(state.children || 0) <= 0 && state.roomNeeds) {
    delete state.roomNeeds.childRoom;
    delete state.roomNeeds.childRoomCount;
  }

  if (state.roomNeeds?.childRoom === "tak" && Number(state.children || 0) > 0) {
    const maxChildRooms = Math.max(1, Number(state.children || 0));
    const currentChildRoomCount = Number(state.roomNeeds.childRoomCount || 1);
    state.roomNeeds.childRoomCount = Math.min(Math.max(currentChildRoomCount, 1), maxChildRooms);
  }

  if (!hasApartmentSelected(state)) {
    delete state.apartmentLevels;
    delete state.floorAcceptance;
    delete state.liftRequired;
    delete state.balcony;
  }

  if (!styleMatters(state)) {
    delete state.acceptedStyles;
    delete state.styleElements;
  }

  if (!primaryMarketAllowed(state)) {
    delete state.primaryCondition;
    delete state.primaryWait;
  }

  if (!showRenovationBudget(state)) {
    delete state.renovationBudget;
    delete state.renovationFlex;
  }

  if (!includesPurchaseMode(state)) {
    delete state.totalBudget;
    delete state.purchaseBudget;
  }

  if (!includesRentMode(state)) {
    delete state.rentBudget;
  }

  if (!bathroomAllowsSeparateWc(state)) {
    delete state.wcFeatures;
  }

  if (!(state.parking && state.parking !== "bez znaczenia")) {
    delete state.parkingType;
  }

  if (!includesPurchaseMode(state)) {
    delete state.financing;
  }

  const availableDistricts = new Set(getDistrictOptions(state));
  if (Array.isArray(state.districts)) {
    state.districts = state.districts.filter((district) => availableDistricts.has(district));
  }
}

function persistState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch (error) {
    console.error(error);
    return {};
  }
}
