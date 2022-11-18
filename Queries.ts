export const Queries = {
  AnimeDataFromPage: {
    "https://www3.animeflv.net": {
      imageSrc: {
        selector: ".AnimeCover > .Image > figure > img",
        attr: "src",
        convert: "relativeURL",
      },
      state: {
        selector: ".AnmStts > span",
        convert: {
          enum: ["En emision", "Finalizado"],
        },
      },
      type: {
        selector: ".Container .Type",

        convert: {
          normalize: "NFD",
          replace: {
            search: /[\u0300-\u036f]/g,
            replace: "",
          },
          enum: ["Anime", "OVA", "Pelicula", "Especial"],
        },
        required: true,
      },
      name: {
        selector: ".Container > .Title",
        convert: {
          converts: ["trim", "lowercase"],
        },
      },
      description: {
        selector: ".Description > p",
      },
      score: {
        selector: ".Votes > #votes_prmd",
        convert: "float",
      },
      genres: {
        itemList: ".Nvgnrs > a",
        data: {
          selector: "&",
          convert: {
            converts: ["trim", "lowercase"],
            normalize: "NFD",
            replace: {
              search: /[\u0300-\u036f]/g,
              replace: "",
            },
          },
        },
      },
      votes: {
        selector: "#votes_nmbr",
        convert: "int",
      },
      episodes: {
        selector: "script",
        eq: -3,
        convert: {
          match: /\[\s*([^[\]]*?)\s*\]/g,
          map: "json",
          externalProperties: {
            nextEpisode: {
              valueMethod: "shift",
              idx: 3,
              convert: "date",
            },
            episodeUrlParser: {
              valueMethod: "shift",
              idx: 2,
              parse: "$baseUrl$/ver/$value$-$$",
            },
          },
          method: "shift",
          property: "length",
        },
      },
      relAnimes: {
        itemList: ".ListAnmRel > li > a",
        data: {
          selector: "&",
          attr: "href",
          convert: {
            converts: ["relativeURL", "validUrl"],
          },
        },
      },
      names: {
        itemList: ".Container > div > .TxtAlt",
        data: {
          selector: "&",
        },
        convert: {
          filter: {
            not: {
              validation: "empty",
            },
          },
          map: {
            replaces: [
              ["OVA", ""],
              ["『氷結の絆』", ""],
              ["ParallelWorld", ""],
            ],
            converts: ["trim", "lowercase"],
          },
        },
      },
      relAnime: {
        selector: ".ListAnmRel > li > a",
        attr: "href",
        convert: {
          converts: ["relativeURL", "validUrl"],
        },
      },
    },
  },
};
