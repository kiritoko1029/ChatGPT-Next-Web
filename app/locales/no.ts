import { SubmitKey } from "../store/config";
import type { PartialLocaleType } from "./index";
import { getClientConfig } from "../config/client";
import { SAAS_CHAT_UTM_URL } from "@/app/constant";
const isApp = !!getClientConfig()?.isApp;

const no: PartialLocaleType = {
  WIP: "Arbeid pågår ...",
  Error: {
    Unauthorized: isApp
      ? `😆 Samtalen har støtt på noen problemer, ikke bekymre deg:
    \\ 1️⃣ Hvis du vil starte uten konfigurasjon, [klikk her for å begynne å chatte umiddelbart 🚀](${SAAS_CHAT_UTM_URL})
    \\ 2️⃣ Hvis du vil bruke dine egne OpenAI-ressurser, klikk [her](/#/settings) for å endre innstillingene ⚙️`
      : `😆 Samtalen har støtt på noen problemer, ikke bekymre deg:
    \ 1️⃣ Hvis du vil starte uten konfigurasjon, [klikk her for å begynne å chatte umiddelbart 🚀](${SAAS_CHAT_UTM_URL})
    \ 2️⃣ Hvis du bruker en privat distribusjonsversjon, klikk [her](/#/auth) for å skrive inn tilgangsnøkkelen 🔑
    \ 3️⃣ Hvis du vil bruke dine egne OpenAI-ressurser, klikk [her](/#/settings) for å endre innstillingene ⚙️
 `,
  },
  Auth: {
    Title: "Passord påkrevd",
    Tips: "Administrator har aktivert passordbeskyttelse. Vennligst skriv inn tilgangskoden nedenfor",
    SubTips: "Eller skriv inn din OpenAI eller Google API-nøkkel",
    Input: "Skriv tilgangskoden her",
    Confirm: "Bekreft",
    Later: "Kom tilbake senere",
    Return: "Tilbake",
    SaasTips:
      "Konfigurasjonen er for komplisert, jeg vil bruke det med en gang",
    TopTips:
      "🥳 NextChat AI lanseringstilbud, lås opp OpenAI o1, GPT-4o, Claude-3.5 og de nyeste store modellene nå",
  },
  ChatItem: {
    ChatItemCount: (count: number) => `${count} samtaler`,
  },
  Chat: {
    SubTitle: (count: number) => `Totalt ${count} samtaler`,
    EditMessage: {
      Title: "Rediger meldingshistorikk",
      Topic: {
        Title: "Samtaleemne",
        SubTitle: "Endre nåværende samtaleemne",
      },
    },
    Actions: {
      ChatList: "Vis meldingsliste",
      CompressedHistory: "Vis komprimert historikk",
      Export: "Eksporter samtaler",
      Copy: "Kopier",
      Stop: "Stopp",
      Retry: "Prøv igjen",
      Pin: "Fest",
      PinToastContent:
        "1 samtale er festet til forhåndsdefinerte oppfordringer",
      PinToastAction: "Se",
      Delete: "Slett",
      Edit: "Rediger",
      RefreshTitle: "Oppdater tittel",
      RefreshToast: "Forespørsel om titteloppdatering sendt",
    },
    Commands: {
      new: "Ny samtale",
      newm: "Start samtale fra maske",
      next: "Neste samtale",
      prev: "Forrige samtale",
      clear: "Rydd kontekst",
      del: "Slett samtale",
    },
    InputActions: {
      Stop: "Stopp respons",
      ToBottom: "Rull til nyeste",
      Theme: {
        auto: "Automatisk tema",
        light: "Lyst tema",
        dark: "Mørkt tema",
      },
      Prompt: "Hurtigkommando",
      Masks: "Alle masker",
      Clear: "Rydd samtale",
      Settings: "Samtaleinnstillinger",
      UploadImage: "Last opp bilde",
    },
    Rename: "Gi nytt navn til samtale",
    Typing: "Skriver…",
    Input: (submitKey: string) => {
      var inputHints = `${submitKey} send`;
      if (submitKey === String(SubmitKey.Enter)) {
        inputHints += "，Shift + Enter for linjeskift";
      }
      return (
        inputHints + "，/ for å utløse autoutfylling, : for å utløse kommando"
      );
    },
    Send: "Send",
    Config: {
      Reset: "Fjern minne",
      SaveAs: "Lagre som maske",
    },
    IsContext: "Forhåndsdefinerte oppfordringer",
  },
  Export: {
    Title: "Del samtalehistorikk",
    Copy: "Kopier alt",
    Download: "Last ned fil",
    Share: "Del til ShareGPT",
    MessageFromYou: "Bruker",
    MessageFromChatGPT: "ChatGPT",
    Format: {
      Title: "Eksporterformat",
      SubTitle: "Kan eksporteres som Markdown-tekst eller PNG-bilde",
    },
    IncludeContext: {
      Title: "Inkluder maske kontekst",
      SubTitle: "Skal maske kontekst vises i meldinger",
    },
    Steps: {
      Select: "Velg",
      Preview: "Forhåndsvis",
    },
    Image: {
      Toast: "Genererer skjermbilde",
      Modal: "Langtrykk eller høyreklikk for å lagre bilde",
    },
  },
  Select: {
    Search: "Søk meldinger",
    All: "Velg alle",
    Latest: "Siste meldinger",
    Clear: "Fjern valg",
  },
  Memory: {
    Title: "Historisk sammendrag",
    EmptyContent: "Samtaleinnholdet er for kort, ingen oppsummering nødvendig",
    Send: "Automatisk komprimere samtalehistorikk og sende som kontekst",
    Copy: "Kopier sammendrag",
    Reset: "[unused]",
    ResetConfirm: "Er du sikker på at du vil tømme historisk sammendrag?",
  },
  Home: {
    NewChat: "Ny samtale",
    DeleteChat: "Er du sikker på at du vil slette den valgte samtalen?",
    DeleteToast: "Samtale slettet",
    Revert: "Angre",
  },
  Settings: {
    Title: "Innstillinger",
    SubTitle: "Alle innstillingsalternativer",

    Danger: {
      Reset: {
        Title: "Tilbakestill alle innstillinger",
        SubTitle:
          "Tilbakestill alle innstillingsalternativer til standardverdier",
        Action: "Tilbakestill nå",
        Confirm: "Bekreft tilbakestilling av alle innstillinger?",
      },
      Clear: {
        Title: "Slett alle data",
        SubTitle: "Slett alle samtaler og innstillingsdata",
        Action: "Slett nå",
        Confirm: "Bekreft sletting av alle samtaler og innstillingsdata?",
      },
    },
    Lang: {
      Name: "Language", // ATTENTION: if you wanna add a new translation, please do not translate this value, leave it as `Language`
      All: "Alle språk",
    },
    Avatar: "Profilbilde",
    FontSize: {
      Title: "Skriftstørrelse",
      SubTitle: "Skriftstørrelse for samtaleinnhold",
    },
    FontFamily: {
      Title: "Chat-skrifttype",
      SubTitle:
        "Skrifttypen for chatinnhold, la stå tom for å bruke global standardskrifttype",
      Placeholder: "Skriftnavn",
    },
    InjectSystemPrompts: {
      Title: "Injiser systemprompter",
      SubTitle:
        "Tving inn et systemprompt som simulerer ChatGPT i starten av hver forespørsel",
    },
    InputTemplate: {
      Title: "Forhåndsbehandling av brukerinput",
      SubTitle:
        "Den nyeste meldingen fra brukeren vil bli fylt ut i denne malen",
    },

    Update: {
      Version: (x: string) => `Nåværende versjon: ${x}`,
      IsLatest: "Er den nyeste versjonen",
      CheckUpdate: "Sjekk oppdateringer",
      IsChecking: "Sjekker oppdateringer...",
      FoundUpdate: (x: string) => `Ny versjon oppdaget: ${x}`,
      GoToUpdate: "Gå til oppdatering",
    },
    SendKey: "Send-knapp",
    Theme: "Tema",
    TightBorder: "Ingen ramme-modus",
    SendPreviewBubble: {
      Title: "Forhåndsvisningsboble",
      SubTitle: "Forhåndsvis Markdown-innhold i en forhåndsvisningsboble",
    },
    AutoGenerateTitle: {
      Title: "Automatisk generere tittel",
      SubTitle: "Generer en passende tittel basert på samtaleinnholdet",
    },
    Sync: {
      CloudState: "Skydatasynkronisering",
      NotSyncYet: "Har ikke blitt synkronisert ennå",
      Success: "Synkronisering vellykket",
      Fail: "Synkronisering mislyktes",

      Config: {
        Modal: {
          Title: "Konfigurer sky-synkronisering",
          Check: "Sjekk tilgjengelighet",
        },
        SyncType: {
          Title: "Synkroniseringstype",
          SubTitle: "Velg ønsket synkroniseringsserver",
        },
        Proxy: {
          Title: "Aktiver proxy",
          SubTitle:
            "Når du synkroniserer i nettleseren, må proxy være aktivert for å unngå CORS-restriksjoner",
        },
        ProxyUrl: {
          Title: "Proxy-URL",
          SubTitle: "Kun for prosjektets innebygde CORS-proxy",
        },

        WebDav: {
          Endpoint: "WebDAV-adresse",
          UserName: "Brukernavn",
          Password: "Passord",
        },

        UpStash: {
          Endpoint: "UpStash Redis REST-URL",
          UserName: "Sikkerhetskopinavn",
          Password: "UpStash Redis REST-token",
        },
      },

      LocalState: "Lokal data",
      Overview: (overview: any) => {
        return `${overview.chat} samtaler, ${overview.message} meldinger, ${overview.prompt} oppfordringer, ${overview.mask} masker`;
      },
      ImportFailed: "Import mislyktes",
    },
    Mask: {
      Splash: {
        Title: "Maskestartside",
        SubTitle: "Vis maskestartside når du oppretter en ny samtale",
      },
      Builtin: {
        Title: "Skjul innebygde masker",
        SubTitle: "Skjul innebygde masker i alle maskelister",
      },
    },
    Prompt: {
      Disable: {
        Title: "Deaktiver automatisk fullføring av oppfordringer",
        SubTitle: "Skriv / i tekstboksen for å utløse automatisk fullføring",
      },
      List: "Egendefinerte oppfordringer",
      ListCount: (builtin: number, custom: number) =>
        `Innebygde ${builtin}, brukerdedefinerte ${custom}`,
      Edit: "Rediger",
      Modal: {
        Title: "Oppfordringsliste",
        Add: "Ny",
        Search: "Søk oppfordringer",
      },
      EditModal: {
        Title: "Rediger oppfordring",
      },
    },
    HistoryCount: {
      Title: "Antall historiske meldinger",
      SubTitle: "Antall historiske meldinger som sendes med hver forespørsel",
    },
    CompressThreshold: {
      Title: "Kompressterskel for historiske meldinger",
      SubTitle:
        "Når ukomprimerte historiske meldinger overskrider denne verdien, vil de bli komprimert",
    },

    Usage: {
      Title: "Saldoforespørsel",
      SubTitle(used: any, total: any) {
        return `Brukt denne måneden $${used}, total abonnementsbeløp $${total}`;
      },
      IsChecking: "Sjekker...",
      Check: "Sjekk på nytt",
      NoAccess: "Skriv inn API-nøkkel eller tilgangspassord for å se saldo",
    },

    Access: {
      SaasStart: {
        Title: "Bruk NextChat AI",
        Label: "(Den mest kostnadseffektive løsningen)",
        SubTitle:
          "Offisielt vedlikeholdt av NextChat, klar til bruk uten konfigurasjon, støtter de nyeste store modellene som OpenAI o1, GPT-4o og Claude-3.5",
        ChatNow: "Chat nå",
      },

      AccessCode: {
        Title: "Adgangskode",
        SubTitle: "Administrator har aktivert kryptert tilgang",
        Placeholder: "Skriv inn tilgangskoden",
      },
      CustomEndpoint: {
        Title: "Egendefinert API",
        SubTitle: "Bruk egendefinerte Azure- eller OpenAI-tjenester",
      },
      Provider: {
        Title: "Modelltilbyder",
        SubTitle: "Bytt til forskjellige tilbydere",
      },
      OpenAI: {
        ApiKey: {
          Title: "API-nøkkel",
          SubTitle:
            "Bruk egendefinert OpenAI-nøkkel for å omgå passordtilgangsbegrensninger",
          Placeholder: "OpenAI API-nøkkel",
        },

        Endpoint: {
          Title: "API-adresse",
          SubTitle: "Må inkludere http(s):// utenom standardadresse",
        },
      },
      Azure: {
        ApiKey: {
          Title: "API-nøkkel",
          SubTitle:
            "Bruk egendefinert Azure-nøkkel for å omgå passordtilgangsbegrensninger",
          Placeholder: "Azure API-nøkkel",
        },

        Endpoint: {
          Title: "API-adresse",
          SubTitle: "Eksempel:",
        },

        ApiVerion: {
          Title: "API-versjon (azure api versjon)",
          SubTitle: "Velg en spesifikk delversjon",
        },
      },
      Anthropic: {
        ApiKey: {
          Title: "API-nøkkel",
          SubTitle:
            "Bruk egendefinert Anthropic-nøkkel for å omgå passordtilgangsbegrensninger",
          Placeholder: "Anthropic API-nøkkel",
        },

        Endpoint: {
          Title: "API-adresse",
          SubTitle: "Eksempel:",
        },

        ApiVerion: {
          Title: "API-versjon (claude api versjon)",
          SubTitle: "Velg en spesifikk API-versjon",
        },
      },
      Google: {
        ApiKey: {
          Title: "API-nøkkel",
          SubTitle: "Hent din API-nøkkel fra Google AI",
          Placeholder: "Skriv inn din Google AI Studio API-nøkkel",
        },

        Endpoint: {
          Title: "Endepunktadresse",
          SubTitle: "Eksempel:",
        },

        ApiVersion: {
          Title: "API-versjon (kun for gemini-pro)",
          SubTitle: "Velg en spesifikk API-versjon",
        },
        GoogleSafetySettings: {
          Title: "Google sikkerhetsfiltreringsnivå",
          SubTitle: "Sett innholdsfiltreringsnivå",
        },
      },
      Baidu: {
        ApiKey: {
          Title: "API-nøkkel",
          SubTitle: "Bruk egendefinert Baidu API-nøkkel",
          Placeholder: "Baidu API-nøkkel",
        },
        SecretKey: {
          Title: "Hemmelig nøkkel",
          SubTitle: "Bruk egendefinert Baidu hemmelig nøkkel",
          Placeholder: "Baidu hemmelig nøkkel",
        },
        Endpoint: {
          Title: "API-adresse",
          SubTitle:
            "Støtter ikke egendefinerte konfigurasjoner. Se .env-konfigurasjon.",
        },
      },
      ByteDance: {
        ApiKey: {
          Title: "API-nøkkel",
          SubTitle: "Bruk egendefinert ByteDance API-nøkkel",
          Placeholder: "ByteDance API-nøkkel",
        },
        Endpoint: {
          Title: "API-adresse",
          SubTitle: "Eksempel:",
        },
      },
      Alibaba: {
        ApiKey: {
          Title: "API-nøkkel",
          SubTitle: "Bruk egendefinert Alibaba Cloud API-nøkkel",
          Placeholder: "Alibaba Cloud API-nøkkel",
        },
        Endpoint: {
          Title: "API-adresse",
          SubTitle: "Eksempel:",
        },
      },
      CustomModel: {
        Title: "Egendefinert modellnavn",
        SubTitle: "Legg til egendefinerte modellalternativer, skill med komma",
      },
    },

    Model: "Modell",
    CompressModel: {
      Title: "Komprimeringsmodell",
      SubTitle: "Modell brukt for å komprimere historikken",
    },
    Temperature: {
      Title: "Tilfeldighet (temperature)",
      SubTitle: "Høyere verdi gir mer tilfeldige svar",
    },
    TopP: {
      Title: "Kjerneprøvetaking (top_p)",
      SubTitle:
        "Ligner på tilfeldighet, men endre ikke sammen med tilfeldighet",
    },
    MaxTokens: {
      Title: "Maksimalt antall tokens per svar (max_tokens)",
      SubTitle: "Maksimalt antall tokens brukt i en enkelt interaksjon",
    },
    PresencePenalty: {
      Title: "Emnens ferskhet (presence_penalty)",
      SubTitle:
        "Høyere verdi gir større sannsynlighet for å utvide til nye emner",
    },
    FrequencyPenalty: {
      Title: "Frekvensstraff (frequency_penalty)",
      SubTitle:
        "Høyere verdi gir større sannsynlighet for å redusere gjentakende ord",
    },
  },
  Store: {
    DefaultTopic: "Ny samtale",
    BotHello: "Hva kan jeg hjelpe deg med?",
    Error: "Noe gikk galt, prøv igjen senere",
    Prompt: {
      History: (content: string) =>
        "Dette er oppsummeringen av historiske samtaler som bakgrunn:" +
        content,
      Topic:
        'Bruk fire til fem ord for å returnere en kort oppsummering av temaet, uten forklaring, uten tegnsetting, uten fyllord, uten ekstra tekst, uten fet skrift. Hvis det ikke er noe tema, returner bare "sladder".',
      Summarize:
        "Oppsummer samtalen kort som en kontekstuell prompt for fremtidige referanser, hold det innen 200 tegn",
    },
  },
  Copy: {
    Success: "Kopiert til utklippstavlen",
    Failed: "Kopiering mislyktes, vennligst gi tillatelse til utklippstavlen",
  },
  Download: {
    Success: "Innholdet er lastet ned til katalogen din.",
    Failed: "Nedlasting mislyktes.",
  },
  Context: {
    Toast: (x: any) => `Inneholder ${x} forhåndsinnstilte oppfordringer`,
    Edit: "Nåværende samtaleinnstillinger",
    Add: "Legg til en ny samtale",
    Clear: "Konteksten er tømt",
    Revert: "Gjenopprett konteksten",
  },
  Plugin: {
    Name: "Plugin",
  },
  FineTuned: {
    Sysmessage: "Du er en assistent",
  },
  SearchChat: {
    Name: "Søk",
    Page: {
      Title: "Søk i chatthistorikk",
      Search: "Skriv inn søkeord",
      NoResult: "Ingen resultater funnet",
      NoData: "Ingen data",
      Loading: "Laster inn",

      SubTitle: (count: number) => `Fant ${count} resultater`,
    },
    Item: {
      View: "Vis",
    },
  },
  Mask: {
    Name: "Maske",
    Page: {
      Title: "Forhåndsdefinerte rollemasker",
      SubTitle: (count: number) =>
        `${count} forhåndsdefinerte rolledefinisjoner`,
      Search: "Søk etter rollemasker",
      Create: "Opprett ny",
    },
    Item: {
      Info: (count: number) => `Inneholder ${count} forhåndsdefinerte samtaler`,
      Chat: "Samtale",
      View: "Vis",
      Edit: "Rediger",
      Delete: "Slett",
      DeleteConfirm: "Bekreft sletting?",
    },
    EditModal: {
      Title: (readonly: boolean) =>
        `Rediger forhåndsdefinert maske ${readonly ? "（kun lesing）" : ""}`,
      Download: "Last ned forhåndsdefinert",
      Clone: "Kopier forhåndsdefinert",
    },
    Config: {
      Avatar: "Rollebilde",
      Name: "Rolle navn",
      Sync: {
        Title: "Bruk globale innstillinger",
        SubTitle: "Bruker nåværende samtale globale modellinnstillinger",
        Confirm:
          "De tilpassede innstillingene for den nåværende samtalen vil bli overskrevet automatisk. Bekreft at du vil bruke globale innstillinger?",
      },
      HideContext: {
        Title: "Skjul forhåndsdefinerte samtaler",
        SubTitle:
          "Når skjult, vil forhåndsdefinerte samtaler ikke vises i chat-grensesnittet",
      },
      Share: {
        Title: "Del denne masken",
        SubTitle: "Generer en direkte lenke til denne masken",
        Action: "Kopier lenke",
      },
    },
  },
  NewChat: {
    Return: "Tilbake",
    Skip: "Start direkte",
    NotShow: "Vis ikke igjen",
    ConfirmNoShow:
      "Bekreft deaktivering? Du kan aktivere det igjen i innstillingene når som helst.",
    Title: "Velg en maske",
    SubTitle: "Start nå, og få tanker som kolliderer med sjelen bak masken",
    More: "Se alle",
  },

  URLCommand: {
    Code: "Oppdaget at lenken allerede inneholder tilgangskode. Ønsker du å fylle den ut automatisk?",
    Settings:
      "Oppdaget at lenken inneholder forhåndsinnstillinger. Ønsker du å fylle dem ut automatisk?",
  },

  UI: {
    Confirm: "Bekreft",
    Cancel: "Avbryt",
    Close: "Lukk",
    Create: "Opprett",
    Edit: "Rediger",
    Export: "Eksporter",
    Import: "Importer",
    Sync: "Synkroniser",
    Config: "Konfigurer",
  },
  Exporter: {
    Description: {
      Title: "Bare meldinger etter at konteksten er ryddet vil bli vist",
    },
    Model: "Modell",
    Messages: "Meldinger",
    Topic: "Emne",
    Time: "Tid",
  },
  Hitokoto: {
    // 挪威语
    OnlineCount: (count: number) => `${count} personer online`,
    CopySuccess: "Kopiert til utklippstavlen",
    Actions: {
      Refresh: "Neste",
      Copy: "Kopier",
    },
  },
};

export default no;
