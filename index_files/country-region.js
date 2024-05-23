FP.CountryRegion = function() {

}

FP.CountryRegion.fnCountryChanged = function(countryName, regionId) {
    var regionOptionsHtml = [];
    FP.CountryRegion.regionSelect = jQuery(regionId + "-select");
    FP.CountryRegion.regionText = jQuery(regionId + "-text");
    // Clear the current text
    FP.CountryRegion.regionText.val('');
    FP.regionOptions[countryName] && jQuery.each(FP.regionOptions[countryName], function(code, text) {
        regionOptionsHtml.push('<option value="' + code + '">' + text + '</option>');
    });
    // Populate Regions
    if (regionOptionsHtml.length) {

        FP.CountryRegion.regionSelect
                .children('option')
                .not(':first-child')
                .remove()
                .end()
                .end()
                .append(regionOptionsHtml.join(''));
        if (FP.CountryRegion.regionSelect.attr('val') != "") {
            FP.CountryRegion.regionSelect.val((FP.CountryRegion.regionSelect.attr('val')));
        }
        FP.CountryRegion.regionSelect.show();
        FP.CountryRegion.regionText.hide();
        FP.CountryRegion.regionSelect.bind('change', function() {
            FP.CountryRegion.regionText.attr('value', jQuery(this).val())
        });
        // Select list
        jQuery('input[name=' + FP.CountryRegion.regionSelect.attr('name') + ']').val(FP.CountryRegion.regionSelect.val());
    } else {
        FP.CountryRegion.regionSelect.hide();
        FP.CountryRegion.regionText.show();
        jQuery('input[name=' + FP.CountryRegion.regionText.attr('name') + ']').val(FP.CountryRegion.regionText.val());
    }

// Hide the errors on change
    FP.CountryRegion.regionSelect.removeClass('error');
    FP.CountryRegion.regionText.removeClass('error');
    jQuery("#" + FP.CountryRegion.regionText.attr('name') + "-element").find('label').hide();
    jQuery("#" + FP.CountryRegion.regionSelect.attr('name') + "-element").find('label').hide();
}


//Fire things up

FP.CountryRegion.initialize = function() {

    if (!FP.CountryRegionInstances) {
        FP.CountryRegionInstances = [];
    }

    FP.CountryRegion.initializeDropLists();
};
FP.CountryRegion.initializeDropLists = function() {
// build country options
    var optionHtml = [];
    jQuery.each(FP.countryOptions, function(code, text) {
        optionHtml.push('<option value="' + code + '">' + text + '</option>');
    });
    // populate country options for every country drop list
    jQuery('select.country-region').each(function() {
        jQuery(this).append(optionHtml.join(''));
        // Using special attribute val on zf-form
        // country region twig to init drop list selected after load
        if (jQuery(this).attr('val') != "") {
            jQuery(this).val(jQuery(this).attr('val'));
        }

        var regiondId = "#" + jQuery(this).attr('region_id');
        jQuery(this).bind('change keyup', function(event) {

// if we just tabbed in do not onchange
            if (event.type == 'keyup' && event.which == '9') {
                return true;
            }
// Pass in the Current Country selected and the id of the region control
            FP.CountryRegion.fnCountryChanged(jQuery(this).val(), regiondId);
            if (jQuery(this).val() != "") {
                jQuery(this).valid();
            }

        }).trigger('change');
        jQuery(regiondId + "-select").bind('change', function() {
            jQuery(regiondId + "-text").val(jQuery(this).val());
        })

        jQuery(regiondId + "-text").val(jQuery(regiondId + "-select").attr('val'));
    });
    // create region instance, following the country to change
    for (var i in FP.CountryRegionInstances) {
        FP.CountryRegion(FP.CountryRegionInstances[i]);
    }
}
// Short list of allowable Merchant Countries
FP.countryOptions = {
    "US": "United States",
    "GB": "United Kingdom",
    "CA": "Canada",
    "AU": "Australia",
    "NZ": "New Zealand",
    "AT": "Austria",
    "BE": "Belgium",
    "BG": "Bulgaria",
    "HR": "Croatia",
    "CY": "Cyprus",
    "CZ": "Czech Republic",
    "DK": "Denmark",
    "EE": "Estonia",
    "FI": "Finland",
    "FR": "France",
    "DE": "Germany",
    "GR": "Greece",
    "HU": "Hungary",
    "IE": "Ireland",
    "IN": "India",
    "IT": "Italy",
    "LV": "Latvia",
    "LT": "Lithuania",
    "LU": "Luxembourg",
    "MT": "Malta",
    "MX": "Mexico",
    "NL": "Netherlands",
    "PL": "Poland",
    "PT": "Portugal",
    "RO": "Romania",
    "SK": "Slovakia",
    "SI": "Slovenia",
    "ES": "Spain",
    "SE": "Sweden"
};
FP.countryOptionsLong = {
    "US": "United States",
    "GB": "United Kingdom",
    "CA": "Canada",
    "AU": "Australia",
    "FR": "France",
    "DE": "Germany",
    "AF": "Afghanistan",
    "AX": "Åland Islands",
    "AL": "Albania",
    "DZ": "Algeria",
    "AS": "American Samoa",
    "AD": "Andorra",
    "AO": "Angola",
    "AI": "Anguilla",
    "AQ": "Antarctica",
    "AG": "Antigua and Barbuda",
    "AR": "Argentina",
    "AM": "Armenia",
    "AW": "Aruba",
    "AU": "Australia",
            "AT": "Austria",
    "AZ": "Azerbaijan",
    "BS": "Bahamas",
    "BH": "Bahrain",
    "BD": "Bangladesh",
    "BB": "Barbados",
    "BY": "Belarus",
    "BE": "Belgium",
    "BZ": "Belize",
    "BJ": "Benin",
    "BM": "Bermuda",
    "BT": "Bhutan",
    "BO": "Bolivia, Plurinational State of",
    "BQ": "Bonaire, Sint Eustatius and Saba",
    "BA": "Bosnia and Herzegovina",
    "BW": "Botswana",
    "BV": "Bouvet Island",
    "BR": "Brazil",
    "IO": "British Indian Ocean Territory",
    "BN": "Brunei Darussalam",
    "BG": "Bulgaria",
    "BF": "Burkina Faso",
    "BI": "Burundi",
    "KH": "Cambodia",
    "CM": "Cameroon",
    "CA": "Canada",
            "CV": "Cape Verde",
    "KY": "Cayman Islands",
    "CF": "Central African Republic",
    "TD": "Chad",
    "CL": "Chile",
    "CN": "China",
    "CX": "Christmas Island",
    "CC": "Cocos (Keeling) Islands",
    "CO": "Colombia",
    "KM": "Comoros",
    "CG": "Congo",
    "CD": "Congo, the Democratic Republic of the",
    "CK": "Cook Islands",
    "CR": "Costa Rica",
    "CI": "Côte d'Ivoire",
    "HR": "Croatia",
    "CU": "Cuba",
    "CW": "Curaçao",
    "CY": "Cyprus",
    "CZ": "Czech Republic",
    "DK": "Denmark",
    "DJ": "Djibouti",
    "DM": "Dominica",
    "DO": "Dominican Republic",
    "EC": "Ecuador",
    "EG": "Egypt",
    "SV": "El Salvador",
    "GQ": "Equatorial Guinea",
    "ER": "Eritrea",
    "EE": "Estonia",
    "ET": "Ethiopia",
    "FK": "Falkland Islands (Malvinas)",
    "FO": "Faroe Islands",
    "FJ": "Fiji",
    "FI": "Finland",
    "FR": "France",
            "GF": "French Guiana",
    "PF": "French Polynesia",
    "TF": "French Southern Territories",
    "GA": "Gabon",
    "GM": "Gambia",
    "GE": "Georgia",
    "DE": "Germany",
            "GH": "Ghana",
    "GI": "Gibraltar",
    "GR": "Greece",
    "GL": "Greenland",
    "GD": "Grenada",
    "GP": "Guadeloupe",
    "GU": "Guam",
    "GT": "Guatemala",
    "GG": "Guernsey",
    "GN": "Guinea",
    "GW": "Guinea-Bissau",
    "GY": "Guyana",
    "HT": "Haiti",
    "HM": "Heard Island and McDonald Islands",
    "VA": "Holy See (Vatican City State)",
    "HN": "Honduras",
    "HK": "Hong Kong",
    "HU": "Hungary",
    "IS": "Iceland",
    "IN": "India",
    "ID": "Indonesia",
    "IR": "Iran, Islamic Republic of",
    "IQ": "Iraq",
    "IE": "Ireland",
    "IM": "Isle of Man",
    "IL": "Israel",
    "IT": "Italy",
    "JM": "Jamaica",
    "JP": "Japan",
    "JE": "Jersey",
    "JO": "Jordan",
    "KZ": "Kazakhstan",
    "KE": "Kenya",
    "KI": "Kiribati",
    "KP": "Korea, Democratic People's Republic of",
    "KR": "Korea, Republic of",
    "KW": "Kuwait",
    "KG": "Kyrgyzstan",
    "LA": "Lao People's Democratic Republic",
    "LV": "Latvia",
    "LB": "Lebanon",
    "LS": "Lesotho",
    "LR": "Liberia",
    "LY": "Libya",
    "LI": "Liechtenstein",
    "LT": "Lithuania",
    "LU": "Luxembourg",
    "MO": "Macao",
    "MK": "Macedonia, the former Yugoslav Republic of",
    "MG": "Madagascar",
    "MW": "Malawi",
    "MY": "Malaysia",
    "MV": "Maldives",
    "ML": "Mali",
    "MT": "Malta",
    "MH": "Marshall Islands",
    "MQ": "Martinique",
    "MR": "Mauritania",
    "MU": "Mauritius",
    "YT": "Mayotte",
    "MX": "Mexico",
    "FM": "Micronesia, Federated States of",
    "MD": "Moldova, Republic of",
    "MC": "Monaco",
    "MN": "Mongolia",
    "ME": "Montenegro",
    "MS": "Montserrat",
    "MA": "Morocco",
    "MZ": "Mozambique",
    "MM": "Myanmar",
    "NA": "Namibia",
    "NR": "Nauru",
    "NP": "Nepal",
    "NL": "Netherlands",
    "NC": "New Caledonia",
    "NZ": "New Zealand",
    "NI": "Nicaragua",
    "NE": "Niger",
    "NG": "Nigeria",
    "NU": "Niue",
    "NF": "Norfolk Island",
    "MP": "Northern Mariana Islands",
    "NO": "Norway",
    "OM": "Oman",
    "PK": "Pakistan",
    "PW": "Palau",
    "PS": "Palestinian Territory, Occupied",
    "PA": "Panama",
    "PG": "Papua New Guinea",
    "PY": "Paraguay",
    "PE": "Peru",
    "PH": "Philippines",
    "PN": "Pitcairn",
    "PL": "Poland",
    "PT": "Portugal",
    "PR": "Puerto Rico",
    "QA": "Qatar",
    "RE": "Réunion",
    "RO": "Romania",
    "RU": "Russian Federation",
    "FP": "Rwanda",
    "BL": "Saint Barthélemy",
    "SH": "Saint Helena, Ascension and Tristan da Cunha",
    "KN": "Saint Kitts and Nevis",
    "LC": "Saint Lucia",
    "MF": "Saint Martin (French part)",
    "PM": "Saint Pierre and Miquelon",
    "VC": "Saint Vincent and the Grenadines",
    "WS": "Samoa",
    "SM": "San Marino",
    "ST": "Sao Tome and Principe",
    "SA": "Saudi Arabia",
    "SN": "Senegal",
    "RS": "Serbia",
    "SC": "Seychelles",
    "SL": "Sierra Leone",
    "SG": "Singapore",
    "SX": "Sint Maarten (Dutch part)",
    "SK": "Slovakia",
    "SI": "Slovenia",
    "SB": "Solomon Islands",
    "SO": "Somalia",
    "ZA": "South Africa",
    "GS": "South Georgia and the South Sandwich Islands",
    "SS": "South Sudan",
    "ES": "Spain",
    "LK": "Sri Lanka",
    "SD": "Sudan",
    "SR": "Suriname",
    "SJ": "Svalbard and Jan Mayen",
    "SZ": "Swaziland",
    "SE": "Sweden",
    "CH": "Switzerland",
    "SY": "Syrian Arab Republic",
    "TW": "Taiwan, Province of China",
    "TJ": "Tajikistan",
    "TZ": "Tanzania, United Republic of",
    "TH": "Thailand",
    "TL": "Timor-Leste",
    "TG": "Togo",
    "TK": "Tokelau",
    "TO": "Tonga",
    "TT": "Trinidad and Tobago",
    "TN": "Tunisia",
    "TR": "Turkey",
    "TM": "Turkmenistan",
    "TC": "Turks and Caicos Islands",
    "TV": "Tuvalu",
    "UG": "Uganda",
    "UA": "Ukraine",
    "AE": "United Arab Emirates",
    "GB": "United Kingdom",
            "US": "United States",
            "UM": "United States Minor Outlying Islands",
    "UY": "Uruguay",
    "UZ": "Uzbekistan",
    "VU": "Vanuatu",
    "VE": "Venezuela, Bolivarian Republic of",
    "VN": "Viet Nam",
    "VG": "Virgin Islands, British",
    "VI": "Virgin Islands, U.S.",
    "WF": "Wallis and Futuna",
    "EH": "Western Sahara",
    "YE": "Yemen",
    "ZM": "Zambia",
    "ZW": "Zimbabwe"
};
FP.regionOptions = {
    "AU": {
        "ACT": "Australian Capital Territory",
        "NSW": "New South Wales",
        "NT": "Northern Territory",
        "QLD": "Queensland",
        "SA": "South Australia",
        "TAS": "Tasmania",
        "VIC": "Victoria",
        "WA": "Western Australia"
    },
    "BR": {
        "AC": "Acre",
        "AL": "Alagoas",
        "AP": "AmapÃ¡",
        "AM": "Amazonas",
        "BA": "Bahia",
        "CE": "CearÃ¡",
        "DF": "Distrito Federal",
        "ES": "EspÃ­rito Santo",
        "GO": "GoiÃ¡s",
        "MA": "MaranhÃ£o",
        "MT": "Mato Grosso",
        "MS": "Mato Grosso do Sul",
        "MG": "Minas Gerais",
        "PB": "ParaÃ­ba",
        "PR": "ParanÃ¡",
        "PA": "ParÃ¡",
        "PE": "Pernambuco",
        "PI": "PiauÃ­",
        "RJ": "Rio de Janeiro",
        "RN": "Rio Grande do Norte",
        "RS": "Rio Grande do Sul",
        "RO": "RondÃ´nia",
        "RR": "Roraima",
        "SC": "Santa Catarina",
        "SP": "SÃ£o Paulo",
        "SE": "Sergipe",
        "TO": "Tocantins"
    },
    "CA": {
        "AB": "Alberta",
        "BC": "British Columbia",
        "MB": "Manitoba",
        "NB": "New Brunswick",
        "NF": "Newfoundland",
        "NWT": "Northwest Territories",
        "NS": "Nova Scotia",
        "NU": "Nunavut",
        "ON": "Ontario",
        "PE": "Prince-Edward Island",
        "QC": "Quebec",
        "SK": "Saskatchewan",
        "YK": "Yukon"
    },
    "ES": {
        "AB": "Albacete",
        "A": "Alicante",
        "AL": "AlmerÃ­a",
        "VI": "Ã?lava",
        "AV": "Ã?vila",
        "BA": "Badajoz",
        "PM": "Baleares",
        "B": "Barcelona",
        "BU": "Burgos",
        "CS": "CastellÃ³n",
        "CC": "CÃ¡ceres",
        "CA": "CÃ¡diz",
        "CO": "CÃ³rdoba",
        "CR": "Ciudad Real",
        "CU": "Cuenca",
        "GE": "Gerona",
        "GR": "Granada",
        "GU": "Guadalajara",
        "SS": "GuipÃºzcoa",
        "H": "Huelva",
        "HU": "Huesca",
        "J": "JaÃ©n",
        "C": "La CoruÃ±a",
        "GC": "Las Palmas",
        "L": "LÃ©rida",
        "LE": "LeÃ³n",
        "LO": "LogroÃ±o",
        "LU": "Lugo",
        "M": "Madrid",
        "MA": "MÃ¡laga",
        "MU": "Murcia",
        "NA": "Navarra",
        "OR": "Orense",
        "O": "Oviedo",
        "P": "Palencia",
        "PO": "Pontevedra",
        "SA": "Salamanca",
        "TF": "Santa Cruz de Tenerife",
        "S": "Santander",
        "SG": "Segovia",
        "SE": "Sevilla",
        "SO": "Soria",
        "T": "Tarragona",
        "TE": "Teruel",
        "TO": "Toledo",
        "V": "Valencia",
        "VA": "Valladolid",
        "BI": "Vizcaya",
        "ZA": "Zamora",
        "Z": "Zaragoza"
    },
    "FI": {
        "AV": "Ã…land",
        "IS": "Eastern Finland",
        "LP": "Lapland",
        "OU": "Oulu",
        "ES": "Southern Finland",
        "LS": "Western Finland"
    },
    "ID": {
        "AC": "Aceh",
        "BA": "Bali",
        "BB": "Bangka-Belitung",
        "BT": "Banten",
        "BE": "Bengkulu",
        "GO": "Gorontalo",
        "JK": "Jakarta Raya",
        "JA": "Jambi",
        "JB": "Jawa Barat",
        "JT": "Jawa Tengah",
        "JI": "Jawa Timur",
        "KB": "Kalimantan Barat",
        "KS": "Kalimantan Selatan",
        "KT": "Kalimantan Tengah",
        "KI": "Kalimantan Timur",
        "LA": "Lampung",
        "MA": "Maluku",
        "MU": "Maluku Utara",
        "NB": "Nusa Tenggara Barat",
        "NT": "Nusa Tenggara Timur",
        "PA": "Papua",
        "RI": "Riau",
        "SN": "Sulawesi Selatan",
        "ST": "Sulawesi Tengah",
        "SG": "Sulawesi Tenggara",
        "SA": "Sulawesi Utara",
        "SB": "Sumatera Barat",
        "SS": "Sumatera Selatan",
        "SU": "Sumatera Utara",
        "YO": "Yogyakarta"
    },
    "IN": {
        "AN": "Andaman and Nicobar Islands",
        "AP": "Andhra Pradesh",
        "AR": "Arunachal Pradesh",
        "AS": "Assam",
        "BR": "Bihar",
        "CH": "Chandigarh",
        "CT": "Chhattisgarh",
        "DN": "Dadra and Nagar Haveli",
        "DD": "Daman and Diu",
        "DL": "Delhi",
        "GA": "Goa",
        "GJ": "Gujarat",
        "HR": "Haryana",
        "HP": "Himachal Pradesh",
        "JK": "Jammu and Kashmir",
        "JH": "Jharkhand",
        "KA": "Karnataka",
        "KL": "Kerala",
        "LD": "Lakshadweep",
        "MP": "Madhya Pradesh",
        "MH": "Maharashtra",
        "MN": "Manipur",
        "ML": "Meghalaya",
        "MZ": "Mizoram",
        "NL": "Nagaland",
        "OR": "Orissa",
        "PY": "Pondicherry",
        "PB": "Punjab",
        "RJ": "Rajasthan",
        "SK": "Sikkim",
        "TN": "Tamil Nadu",
        "TR": "Tripura",
        "UP": "Uttar Pradesh",
        "UT": "Uttaranchal",
        "WB": "West Bengal"
    },
    "IT": {
        "AG": "Agrigento",
        "AL": "Alessandria",
        "AN": "Ancona",
        "AO": "Aosta",
        "AR": "Arezzo",
        "AP": "Ascoli Piceno",
        "AT": "Asti",
        "AV": "Avellino",
        "BA": "Bari",
        "BT": "Barletta-Andria-Trani",
        "BL": "Belluno",
        "BN": "Benevento",
        "BG": "Bergamo",
        "BI": "Biella",
        "BO": "Bologna",
        "BZ": "Bolzano",
        "BS": "Brescia",
        "BR": "Brindisi",
        "CA": "Cagliari",
        "CL": "Caltanissetta",
        "CB": "Campobasso",
        "CI": "Carbonia-Iglesias",
        "CE": "Caserta",
        "CT": "Catania",
        "CZ": "Catanzaro",
        "CH": "Chieti",
        "CO": "Como",
        "CS": "Cosenza",
        "CR": "Cremona",
        "KR": "Crotone",
        "CN": "Cuneo",
        "EN": "Enna",
        "FM": "Fermo",
        "FE": "Ferrara",
        "FI": "Florence",
        "FG": "Foggia",
        "FC": "Forlì-Cesena",
        "FR": "Frosinone",
        "GE": "Genoa",
        "GO": "Gorizia",
        "GR": "Grosseto",
        "IM": "Imperia",
        "IS": "Isernia",
        "AQ": "L'Aquila",
        "SP": "La Spezia",
        "LT": "Latina",
        "LE": "Lecce",
        "LC": "Lecco",
        "LI": "Livorno",
        "LO": "Lodi",
        "LU": "Lucca",
        "MC": "Macerata",
        "MN": "Mantua",
        "MS": "Massa-Carrara",
        "MT": "Matera",
        "VS": "Medio Campidano",
        "ME": "Messina",
        "MI": "Milan",
        "MO": "Modena",
        "MB": "Monza e Brianza",
        "NA": "Naples",
        "NO": "Novara",
        "NU": "Nuoro",
        "OG": "Ogliastra",
        "OT": "Olbia-Tempio",
        "OR": "Oristano",
        "PD": "Padua",
        "PA": "Palermo",
        "PR": "Parma",
        "PV": "Pavia",
        "PG": "Perugia",
        "PU": "Pesaro e Urbino",
        "PE": "Pescara",
        "PC": "Piacenza",
        "PI": "Pisa",
        "PT": "Pistoia",
        "PN": "Pordenone",
        "PZ": "Potenza",
        "PO": "Prato",
        "RG": "Ragusa",
        "RA": "Ravenna",
        "RC": "Reggio di Calabria",
        "RE": "Reggio nell'Emilia",
        "RI": "Rieti",
        "RN": "Rimini",
        "RM": "Rome",
        "RO": "Rovigo",
        "SA": "Salerno",
        "SS": "Sassari",
        "SV": "Savona",
        "SI": "Siena",
        "SO": "Sondrio",
        "SR": "Syracuse",
        "TA": "Taranto",
        "TE": "Teramo",
        "TR": "Terni",
        "TP": "Trapani",
        "TN": "Trento",
        "TV": "Treviso",
        "TS": "Trieste",
        "TO": "Turin",
        "UD": "Udine",
        "VA": "Varese",
        "VE": "Venice",
        "VB": "Verbano-Cusio-Ossola",
        "VC": "Vercelli",
        "VR": "Verona",
        "VV": "Vibo Valentia",
        "VI": "Vicenza",
        "VT": "Viterbo"
    },
    "JO": {
        "JO20": "Ajlun",
        "JO16": "Amman",
        "JO21": "Aqaba",
        "JO02": "Balqa",
        "JO18": "Irbid",
        "JO22": "Jarash",
        "JO09": "Karak",
        "JO23": "Madaba",
        "JO15": "Mafraq",
        "JO19": "Ma`an",
        "JO12": "Tafilah",
        "JO17": "Zarqa"
    },
    "MX": {
        "AGS": "Aguascalientes",
        "BC": "Baja California Norte",
        "BCS": "Baja California Sur",
        "CAM": "Campeche",
        "CHIS": "Chiapas",
        "CHIH": "Chihuahua",
        "COAH": "Coahuila",
        "COL": "Colima",
        "DF": "Distrito Federal",
        "DGO": "Durango",
        "GTO": "Guanajuato",
        "GRO": "Guerrero",
        "HGO": "Hidalgo",
        "JAL": "Jalisco",
        "MEX": "MÃ©xico",
        "MICH": "MichoacÃ¡n",
        "MOR": "Morelos",
        "NAY": "Nayarit",
        "NL": "Nuevo LeÃ³n",
        "OAX": "Oaxaca",
        "PUE": "Puebla",
        "QRO": "QuerÃ©taro",
        "QROO": "Quintana Roo",
        "SLP": "San Luis PotosÃ­",
        "SIN": "Sinaloa",
        "SON": "Sonora",
        "TAB": "Tabasco",
        "TAMP": "Tamaulipas",
        "TLAX": "Tlaxcala",
        "VER": "Veracruz",
        "YUC": "YucatÃ¡n",
        "ZAC": "Zacatecas"
    },
    "MY": {
        "01": "Johor",
        "02": "Kedah",
        "03": "Kelantan",
        "14": "Kuala Lumpur",
        "15": "Labuan",
        "04": "Melaka",
        "05": "Negeri Sembilan",
        "06": "Pahang",
        "08": "Perak",
        "09": "Perlis",
        "07": "Pulau Pinang",
        "16": "Putrajaya",
        "12": "Sabah",
        "13": "Sarawak",
        "10": "Selangor",
        "11": "Terengganu"
    },
    "PH": {
        "ABR": "Abra",
        "AGN": "Agusan del Norte",
        "AGS": "Agusan del Sur",
        "AKL": "Aklan",
        "ALB": "Albay",
        "ANT": "Antique",
        "APA": "Apayao",
        "AUR": "Aurora",
        "BAS": "Basilan",
        "BAN": "Bataan",
        "BTN": "Batanes",
        "BTG": "Batangas",
        "BEN": "Benguet",
        "BIL": "Biliran",
        "BOH": "Bohol",
        "BUK": "Bukidnon",
        "BUL": "Bulacan",
        "CAG": "Cagayan",
        "CAN": "Camarines Norte",
        "CAS": "Camarines Sur",
        "CAM": "Camiguin",
        "CAP": "Capiz",
        "CAT": "Catanduanes",
        "CAV": "Cavite",
        "CEB": "Cebu",
        "COM": "Compostela Valley",
        "NCO": "Cotabato",
        "DAV": "Davao",
        "DAS": "Davao del Sur",
        "DAO": "Davao Oriental",
        "EAS": "Eastern Samar",
        "GUI": "Guimaras",
        "IFU": "Ifugao",
        "ILN": "Ilocos Norte",
        "ILS": "Ilocos Sur",
        "ILI": "Iloilo",
        "ISA": "Isabela",
        "KAL": "Kalinga",
        "LUN": "La Union",
        "LAG": "Laguna",
        "LAN": "Lanao del Norte",
        "LAS": "Lanao del Sur",
        "LEY": "Leyte",
        "MAG": "Maguindanao",
        "MAD": "Marinduque",
        "MAS": "Masbate",
        "MNL": "Metropolitan Manila",
        "MSC": "Misamis Occidental",
        "MSR": "Misamis Oriental",
        "MOU": "Mountain",
        "NEC": "Negros Occidental",
        "NER": "Negros Oriental",
        "NSA": "Northern Samar",
        "NUE": "Nueva Ecija",
        "NUV": "Nueva Vizcaya",
        "MDC": "Occidental Mindoro",
        "MDR": "Oriental Mindoro",
        "PLW": "Palawan",
        "PAM": "Pampanga",
        "PAN": "Pangasinan",
        "QUE": "Quezon",
        "QUI": "Quirino",
        "RIZ": "Rizal",
        "ROM": "Romblon",
        "SAM": "Samar",
        "SAR": "Sarangani",
        "SIG": "Siquijor",
        "SOR": "Sorsogon",
        "SCO": "South Cotabato",
        "SLE": "Southern Leyte",
        "SUK": "Sultan Kudarat",
        "SLU": "Sulu",
        "SUN": "Surigao del Norte",
        "SUR": "Surigao del Sur",
        "TAR": "Tarlac",
        "TAW": "Tawi-Tawi",
        "ZMB": "Zambales",
        "ZAN": "Zamboanga del Norte",
        "ZAS": "Zamboanga del Sur"
    },
    "PL": {
        "DS": "Dolnoslaskie",
        "KP": "Kujawsko-pomorskie",
        "LD": "LÃ³dzkie",
        "LU": "Lubelskie",
        "LB": "Lubuskie",
        "MA": "Malopolskie",
        "MZ": "Mazowieckie",
        "OP": "Opolskie",
        "PK": "Podkarpackie",
        "PD": "Podlaskie",
        "PM": "Pomorskie",
        "SL": "Slaskie",
        "SK": "Swietokrzyskie",
        "WN": "Warminsko-mazurskie",
        "WP": "Wielkopolskie",
        "ZP": "Zachodniopomorskie"
    },
    "US": {
        "AL": "Alabama",
        "AK": "Alaska",
        "AZ": "Arizona",
        "AR": "Arkansas",
        "CA": "California",
        "CO": "Colorado",
        "CT": "Connecticut",
        "DE": "Delaware",
        "FL": "Florida",
        "GA": "Georgia",
        "HI": "Hawaii",
        "ID": "Idaho",
        "IL": "Illinois",
        "IN": "Indiana",
        "IA": "Iowa",
        "KS": "Kansas",
        "KY": "Kentucky",
        "LA": "Louisiana",
        "ME": "Maine",
        "MD": "Maryland",
        "MA": "Massachusetts",
        "MI": "Michigan",
        "MN": "Minnesota",
        "MS": "Mississippi",
        "MO": "Missouri",
        "MT": "Montana",
        "NE": "Nebraska",
        "NV": "Nevada",
        "NH": "New Hampshire",
        "NJ": "New Jersey",
        "NM": "New Mexico",
        "NY": "New York",
        "NC": "North Carolina",
        "ND": "North Dakota",
        "OH": "Ohio",
        "OK": "Oklahoma",
        "OR": "Oregon",
        "PA": "Pennsylvania",
        "RI": "Rhode Island",
        "SC": "South Carolina",
        "SD": "South Dakota",
        "TN": "Tennessee",
        "TX": "Texas",
        "UT": "Utah",
        "VT": "Vermont",
        "VA": "Virginia",
        "WA": "Washington",
        "DC": "Washington DC",
        "WV": "West Virginia",
        "WI": "Wisconsin",
        "WY": "Wyoming"
    },
    "ZA": {
        "EC": "Eastern Cape",
        "FS": "Free State",
        "GT": "Gauteng",
        "NL": "KwaZulu-Natal",
        "MP": "Mpumalanga",
        "NW": "North-West",
        "NC": "Northern Cape",
        "NP": "Northern Province",
        "WC": "Western Cape"
    }
};
