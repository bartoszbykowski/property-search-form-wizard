const STORAGE_KEY = "property-search-form-state-v1";

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
      {
        id: "mode",
        label: "1.2. Interesuje Cię zakup, najem czy oba warianty?",
        type: "multi",
        options: ["kupno", "najem"],
      },
      {
        id: "adults",
        label: "1.3. Ile osób dorosłych będzie mieszkać lub korzystać z tej nieruchomości?",
        type: "number",
        min: 1,
        visible: (state) => state.purpose === "dla siebie / rodziny",
      },
      {
        id: "children",
        label: "1.4. Ile dzieci będzie mieszkać lub korzystać z tej nieruchomości?",
        type: "number",
        min: 0,
        visible: (state) => state.purpose === "dla siebie / rodziny",
      },
    ],
  },
  {
    id: "section-2",
    short: "Lokalizacja",
    title: "Lokalizacja",
    fields: [
      {
        id: "voivodeship",
        label: "2.1. W jakim województwie chcesz szukać?",
        type: "search-single",
        options: Object.keys(countyCitiesByVoivodeship),
      },
      {
        id: "cities",
        label: "2.2. Jakie miasta bierzesz pod uwagę?",
        type: "search-multi",
        visible: (state) => Boolean(state.voivodeship),
      },
      {
        id: "districts",
        label: "2.3. Czy interesują Cię konkretne dzielnice lub obszary?",
        type: "multi-dynamic",
        visible: (state) => (state.cities || []).length > 0,
      },
      {
        id: "locationNeeds",
        label: "2.4. Co jest dla Ciebie ważne w lokalizacji?",
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
        id: "marketType",
        label: "3.1. Który rynek wchodzi w grę?",
        type: "matrix",
        columns: ["preferuję", "dopuszczam", "nie chcę"],
        rows: ["rynek wtórny", "rynek pierwotny"],
      },
      {
        id: "propertyTypes",
        label: "3.2. Jakiego typu nieruchomości szukasz?",
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
        label: "3.3. Czy mieszkanie może być dwupoziomowe?",
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
        label: "3.4. Jakie położenie mieszkania bierzesz pod uwagę?",
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
        label: "3.5. Czy winda jest dla Ciebie ważna?",
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
        label: "3.6. Jak ważny jest dla Ciebie standard budynku i części wspólnych?",
        type: "matrix",
        columns: [
          "wysoka jakość",
          "bez znaczenia",
          "może być słabe, jeśli cena to rekompensuje",
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
    title: "Metraż i pokoje",
    fields: [
      {
        id: "area",
        label: "4.1. Jakiej powierzchni szukasz?",
        description: "Wprowadź przedział w m². Krok rekomendowany: 5 m².",
        type: "range",
        minLabel: "Od",
        maxLabel: "Do",
        min: 0,
        step: 5,
      },
      {
        id: "rooms",
        label: "4.2. Ile pokoi bierzesz pod uwagę?",
        type: "range",
        minLabel: "Od",
        maxLabel: "Do",
        min: 0,
        step: 1,
      },
    ],
  },
  {
    id: "section-5",
    short: "Układ",
    title: "Układ",
    fields: [
      {
        id: "storageNeeds",
        label: "5.1. Jakie miejsca do przechowywania są dla Ciebie ważne?",
        type: "matrix",
        columns: ["konieczne", "preferuję", "bez znaczenia"],
        rows: [
          "garderoba",
          "szafa w zabudowie",
          "piwnica",
          "komórka lokatorska",
          "pomieszczenie gospodarcze",
          "zabudowa w przedpokoju",
        ],
      },
      {
        id: "workSpace",
        label: "5.2. Czy potrzebujesz miejsca do pracy w domu?",
        type: "single",
        options: [
          "tak, osobny pokój do pracy",
          "tak, wystarczy wydzielone miejsce w pokoju",
          "nie",
          "bez znaczenia",
        ],
      },
      {
        id: "layoutChanges",
        label: "5.3. Czy dopuszczasz zmiany w układzie?",
        type: "single",
        options: [
          "nie, układ musi być dobry od razu",
          "tak, dopuszczam drobne zmiany",
          "tak, dopuszczam większą przebudowę",
          "bez znaczenia, jeśli cena to rekompensuje",
        ],
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
        label: "6.1. Jaki układ kuchni Ci odpowiada?",
        type: "matrix",
        columns: ["preferuję", "dopuszczam", "nie chcę"],
        rows: ["osobna kuchnia", "aneks kuchenny", "salon z aneksem"],
      },
      {
        id: "diningSpace",
        label: "6.2. Czy potrzebujesz miejsca do jedzenia?",
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
        label: "6.3. W jakim stanie ma być kuchnia?",
        type: "single",
        options: [
          "tak, kuchnia musi być gotowa",
          "może wymagać drobnego odświeżenia",
          "może wymagać wymiany frontów / blatu",
          "może wymagać pełnej wymiany",
          "bez znaczenia, jeśli cena to rekompensuje",
        ],
      },
      {
        id: "kitchenEquipment",
        label: "6.4. Jakie wyposażenie kuchni jest dla Ciebie ważne?",
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
          "miejsce na stół",
          "wyspa / barek",
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
        label: "7.1. Jaki układ łazienki i WC bierzesz pod uwagę?",
        type: "single",
        options: [
          "jedna łazienka z WC",
          "łazienka + osobne WC",
          "dwie łazienki",
          "łazienka + osobne WC z prysznicem",
          "bez znaczenia",
        ],
      },
      {
        id: "bathroomFeatures",
        label: "7.2. Co jest dla Ciebie ważne w łazience?",
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
        label: "7.3. Co jest dla Ciebie ważne w osobnym WC?",
        type: "matrix",
        columns: ["konieczne", "preferuję", "bez znaczenia", "nie chcę"],
        rows: ["WC", "umywalka", "prysznic", "bidet"],
        visible: (state) =>
          ["łazienka + osobne WC", "łazienka + osobne WC z prysznicem"].includes(
            state.bathroomLayout,
          ),
      },
      {
        id: "washingMachineLocation",
        label: "7.4. Gdzie może znajdować się pralka?",
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
        label: "7.5. Czy potrzebujesz miejsca na suszarkę bębnową?",
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
        label: "7.1. Balkon",
        type: "single",
        options: ["konieczne", "preferuję", "bez znaczenia"],
        visible: (state) => hasApartmentSelected(state),
      },
      {
        id: "terrace",
        label: "7.2. Taras",
        type: "single",
        options: ["konieczne", "preferuję", "bez znaczenia"],
      },
      {
        id: "garden",
        label: "7.3. Ogródek / dostęp do ogródka",
        type: "single",
        options: ["konieczne", "preferuję", "bez znaczenia"],
      },
      {
        id: "parking",
        label: "7.4. Miejsce postojowe / garaż",
        type: "single",
        options: ["konieczne", "preferuję", "bez znaczenia"],
      },
      {
        id: "parkingType",
        label: "7.5. Jaki typ miejsca postojowego bierzesz pod uwagę?",
        type: "multi",
        options: ["miejsce naziemne", "hala garażowa", "garaż indywidualny", "dowolne"],
        visible: (state) => state.parking && state.parking !== "bez znaczenia",
      },
    ],
  },
  {
    id: "section-9",
    short: "Standard",
    title: "Standard, styl i zakres prac",
    fields: [
      {
        id: "maxWorks",
        label: "9.1. Jaki remont jesteś gotów zaakceptować?",
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
        id: "noWorks",
        label: "9.2. Czego nie chcesz robić po zakupie?",
        type: "multi",
        options: [
          "nie chcę robić kuchni",
          "nie chcę robić łazienki",
          "nie chcę robić osobnego WC",
          "nie chcę wymieniać podłóg",
          "nie chcę wymieniać drzwi",
          "nie chcę wymieniać zabudów stałych",
          "nie chcę ruszać instalacji",
          "nie chcę zmieniać układu ścian",
          "wszystko mogę zrobić, jeśli cena to rekompensuje",
        ],
      },
      {
        id: "elementsTolerance",
        label: "9.3. Jak ważne jest, żeby te elementy były w dobrym stanie od razu?",
        type: "matrix",
        columns: [
          "muszą mi pasować, nie chcę ich ruszać",
          "mogą być przeciętne, ale używalne",
          "mogą być słabe, jeśli cena to rekompensuje",
          "bez znaczenia, i tak planuję je zmienić",
        ],
        rows: [
          "kuchnia",
          "łazienka",
          "WC",
          "podłogi",
          "drzwi wewnętrzne",
          "szafy / zabudowy stałe",
          "okna",
          "instalacje",
        ],
      },
      {
        id: "styleImportance",
        label: "9.4. Jak ważny jest dla Ciebie styl wykończenia?",
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
        label: "9.5. Jakie style wchodzą w grę?",
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
        ],
        visible: (state) => styleMatters(state),
      },
      {
        id: "styleElements",
        label: "9.6. W których elementach styl ma dla Ciebie największe znaczenie?",
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
        label: "9.7. Jakie połączenie wieku i jakości wykończenia bierzesz pod uwagę?",
        description:
          "Kliknij wszystkie kombinacje, które są akceptowalne. Dzięki temu łatwo odróżnisz np. nowe budżetowe od starszego, ale jakościowego wykończenia.",
        type: "two-d-grid",
        xAxis: ["budżetowe", "standardowe", "podwyższone", "premium"],
        yAxis: ["nowe", "kilkuletnie", "starsze, ale zadbane", "stare"],
      },
      {
        id: "furnished",
        label: "9.8. Czy lokal ma być umeblowany?",
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
        label: "9.9. Jeśli bierzesz pod uwagę rynek pierwotny, jaki stan lokalu akceptujesz?",
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
        label: "9.10. Jeśli bierzesz pod uwagę rynek pierwotny, jak długo możesz czekać na odbiór?",
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
    id: "section-10",
    short: "Budżet",
    title: "Budżet, czas i finansowanie",
    fields: [
      {
        id: "totalBudget",
        label: "10.1. Jaki budżet łącznie bierzesz pod uwagę?",
        description:
          "Ustaw orientacyjny zakres całkowitego budżetu. Obejmuje zakup lub najem oraz ewentualny remont / wykończenie.",
        type: "budget-range",
        min: 0,
        max: 5000000,
        step: 10000,
        minLabel: "Od",
        maxLabel: "Do",
      },
      {
        id: "purchaseBudget",
        label: "10.2. Ile maksymalnie chcesz przeznaczyć na sam zakup nieruchomości?",
        type: "number",
        min: 0,
        step: 10000,
      },
      {
        id: "renovationBudget",
        label: "10.3. Ile maksymalnie chcesz przeznaczyć na remont lub wykończenie?",
        type: "number",
        min: 0,
        step: 10000,
        visible: (state) => showRenovationBudget(state),
      },
      {
        id: "renovationFlex",
        label: "10.4. Czy ten budżet na remont jest elastyczny?",
        type: "single",
        options: [
          "nie, to twardy limit",
          "tak, jeśli cena zakupu jest niższa",
          "tak, przy bardzo dobrej okazji",
          "nie wiem, chcę żeby system to policzył",
        ],
        visible: (state) => showRenovationBudget(state),
      },
      {
        id: "timeline",
        label: "10.5. Kiedy chcesz kupić lub wynająć nieruchomość?",
        type: "single",
        options: [
          "jak najszybciej",
          "do 1 miesiąca",
          "1-3 miesiące",
          "3-6 miesięcy",
          "nie spieszy mi się",
        ],
      },
      {
        id: "financing",
        label: "10.6. Jak planujesz sfinansować zakup?",
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
  if (currentStep < sections.length - 1) {
    currentStep += 1;
  }
  renderStep();
});

function renderTabs() {
  elements.stepTabs.innerHTML = "";

  sections.forEach((section, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "step-tab";
    if (index === currentStep) {
      button.classList.add("is-active");
    }
    button.innerHTML = `<strong>${index + 1}</strong><span>${section.short}</span>`;
    button.addEventListener("click", () => {
      currentStep = index;
      renderStep();
    });
    elements.stepTabs.appendChild(button);
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

  const section = sections[currentStep];
  elements.sectionTitle.textContent = section.title;
  elements.stepCounter.textContent = `Etap ${currentStep + 1} / ${sections.length}`;
  elements.prevStep.disabled = currentStep === 0;
  elements.nextStep.textContent =
    currentStep === sections.length - 1 ? "Dalej" : "Dalej";

  renderTabs();

  elements.formFields.innerHTML = "";

  section.fields
    .filter((field) => isVisible(field))
    .forEach((field) => {
      elements.formFields.appendChild(renderField(field));
    });
}

function renderField(field) {
  const wrapper = document.createElement("section");
  wrapper.className = "field-card";

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
          options: getDistrictOptions(),
        },
        true,
      );
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
  const values = multiple ? state[field.id] || [] : state[field.id];

  if (!field.options.length) {
    const info = document.createElement("span");
    info.className = "chip-note";
    info.textContent = "Najpierw wybierz miasto, aby odblokować dzielnice.";
    container.appendChild(info);
    return container;
  }

  field.options.forEach((option, index) => {
    const item = document.createElement("div");
    item.className = "choice-card";
    const input = document.createElement("input");
    input.type = multiple ? "checkbox" : "radio";
    input.name = field.id;
    input.id = `${field.id}-${index}`;
    input.checked = multiple ? values.includes(option) : values === option;
    input.addEventListener("change", () => {
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
    });

    const label = document.createElement("label");
    label.htmlFor = input.id;
    label.textContent = option;

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

function renderBudgetRangeField(field) {
  const container = document.createElement("div");
  container.className = "range-grid";

  const current = state[field.id] || {
    min: field.min ?? 0,
    max: field.max ?? 1000000,
  };

  const sliderGroup = document.createElement("div");
  sliderGroup.className = "input-group";
  sliderGroup.innerHTML = `<label>Zakres na suwaku</label>`;

  const minRange = document.createElement("input");
  minRange.type = "range";
  minRange.min = field.min ?? 0;
  minRange.max = field.max ?? 1000000;
  minRange.step = field.step ?? 10000;
  minRange.value = current.min ?? field.min ?? 0;

  const maxRange = document.createElement("input");
  maxRange.type = "range";
  maxRange.min = field.min ?? 0;
  maxRange.max = field.max ?? 1000000;
  maxRange.step = field.step ?? 10000;
  maxRange.value = current.max ?? field.max ?? 1000000;

  const syncBudgetState = (nextMin, nextMax) => {
    const boundedMin = Math.max(field.min ?? 0, Math.min(nextMin, nextMax));
    const boundedMax = Math.min(field.max ?? 1000000, Math.max(nextMin, nextMax));
    state[field.id] = { min: boundedMin, max: boundedMax };
    persistState();
    renderStep();
  };

  minRange.addEventListener("input", () => {
    syncBudgetState(Number(minRange.value), Number(maxRange.value));
  });

  maxRange.addEventListener("input", () => {
    syncBudgetState(Number(minRange.value), Number(maxRange.value));
  });

  sliderGroup.append(minRange, maxRange);
  container.appendChild(sliderGroup);

  [["min", field.minLabel], ["max", field.maxLabel]].forEach(([key, labelText]) => {
    const group = document.createElement("div");
    group.className = "input-group";
    group.innerHTML = `<label for="${field.id}-${key}">${labelText}</label>`;

    const input = document.createElement("input");
    input.type = "number";
    input.id = `${field.id}-${key}`;
    input.min = field.min ?? 0;
    input.max = field.max ?? 1000000;
    input.step = field.step ?? 10000;
    input.value = current[key] ?? "";
    input.addEventListener("input", () => {
      const next = state[field.id] || { min: field.min ?? 0, max: field.max ?? 1000000 };
      next[key] = input.value === "" ? "" : Number(input.value);
      const safeMin = Number(next.min || field.min || 0);
      const safeMax = Number(next.max || field.max || 1000000);
      syncBudgetState(safeMin, safeMax);
    });

    group.appendChild(input);
    container.appendChild(group);
  });

  return container;
}

function renderRangeField(field) {
  const container = document.createElement("div");
  container.className = "range-grid";
  const current = state[field.id] || { min: "", max: "" };

  [["min", field.minLabel], ["max", field.maxLabel]].forEach(([key, labelText]) => {
    const group = document.createElement("div");
    group.className = "input-group";
    group.innerHTML = `<label for="${field.id}-${key}">${labelText || (key === "min" ? "Minimum" : "Maksimum")}</label>`;

    const input = document.createElement("input");
    input.type = "number";
    input.id = `${field.id}-${key}`;
    input.min = field.min ?? 0;
    input.step = field.step ?? 1;
    input.value = current[key] ?? "";
    input.addEventListener("input", () => {
      const next = state[field.id] || { min: "", max: "" };
      next[key] = input.value === "" ? "" : Number(input.value);
      state[field.id] = next;
      persistState();
    });

    group.appendChild(input);
    container.appendChild(group);
  });

  return container;
}

function renderMatrixField(field) {
  const container = document.createElement("div");
  container.className = "matrix-table";
  container.style.setProperty("--cols", field.columns.length);

  const header = document.createElement("div");
  header.className = "matrix-header";
  header.appendChild(document.createElement("span"));
  field.columns.forEach((column) => {
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

    field.columns.forEach((column, colIndex) => {
      const cell = document.createElement("div");
      cell.className = "matrix-cell";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `${field.id}-${rowIndex}`;
      input.id = `${field.id}-${rowIndex}-${colIndex}`;
      input.checked = values[rowLabel] === column;
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
      row.appendChild(cell);
    });

    container.appendChild(row);
  });

  return container;
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

function showRenovationBudget(currentState) {
  const works = currentState.maxWorks;
  const primary = currentState.primaryCondition || [];
  return works && works !== "A0"
    ? true
    : Array.isArray(primary) && primary.includes("stan deweloperski");
}

function getDistrictOptions() {
  const selectedCities = state.cities || [];
  return [...new Set(selectedCities.flatMap((city) => cityDistricts[city] || []))];
}

function getCountyCityOptions() {
  return state.voivodeship ? countyCitiesByVoivodeship[state.voivodeship] || [] : [];
}

function normalizeState() {
  if (!state.voivodeship || !countyCitiesByVoivodeship[state.voivodeship]) {
    delete state.voivodeship;
    delete state.cities;
    delete state.districts;
  }

  const availableCities = new Set(getCountyCityOptions());
  if (Array.isArray(state.cities)) {
    state.cities = state.cities.filter((city) => availableCities.has(city));
  }

  if (!isVisible({ visible: (s) => s.purpose === "dla siebie / rodziny" })) {
    delete state.adults;
    delete state.children;
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

  if (!["łazienka + osobne WC", "łazienka + osobne WC z prysznicem"].includes(state.bathroomLayout)) {
    delete state.wcFeatures;
  }

  if (!(state.parking && state.parking !== "bez znaczenia")) {
    delete state.parkingType;
  }

  if (!(state.mode || []).includes("kupno")) {
    delete state.financing;
  }

  const availableDistricts = new Set(getDistrictOptions());
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
