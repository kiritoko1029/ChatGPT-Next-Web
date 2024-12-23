import { SubmitKey } from "../store/config";
import type { PartialLocaleType } from "./index";
import { getClientConfig } from "../config/client";
import { SAAS_CHAT_UTM_URL } from "@/app/constant";
const isApp = !!getClientConfig()?.isApp;

const de: PartialLocaleType = {
  WIP: "In Bearbeitung...",
  Error: {
    Unauthorized: isApp
      ? `😆 Das Gespräch hatte einige Probleme, keine Sorge:
    \\ 1️⃣ Wenn du ohne Konfiguration sofort starten möchtest, [klicke hier, um sofort zu chatten 🚀](${SAAS_CHAT_UTM_URL})
    \\ 2️⃣ Wenn du deine eigenen OpenAI-Ressourcen verwenden möchtest, klicke [hier](/#/settings), um die Einstellungen zu ändern ⚙️`
      : `😆 Das Gespräch hatte einige Probleme, keine Sorge:
    \ 1️⃣ Wenn du ohne Konfiguration sofort starten möchtest, [klicke hier, um sofort zu chatten 🚀](${SAAS_CHAT_UTM_URL})
    \ 2️⃣ Wenn du eine private Bereitstellung verwendest, klicke [hier](/#/auth), um den Zugriffsschlüssel einzugeben 🔑
    \ 3️⃣ Wenn du deine eigenen OpenAI-Ressourcen verwenden möchtest, klicke [hier](/#/settings), um die Einstellungen zu ändern ⚙️
 `,
  },
  Auth: {
    Title: "Passwort erforderlich",
    Tips: "Der Administrator hat die Passwortüberprüfung aktiviert. Bitte geben Sie den Zugangscode unten ein.",
    SubTips: "Oder geben Sie Ihren OpenAI oder Google API-Schlüssel ein.",
    Input: "Geben Sie hier den Zugangscode ein",
    Confirm: "Bestätigen",
    Later: "Später",
    Return: "Zurück",
    SaasTips:
      "Die Konfiguration ist zu kompliziert, ich möchte es sofort nutzen",
    TopTips:
      "🥳 NextChat AI Einführungsangebot, schalte jetzt OpenAI o1, GPT-4o, Claude-3.5 und die neuesten großen Modelle frei",
  },
  ChatItem: {
    ChatItemCount: (count: number) => `${count} Gespräche`,
  },
  Chat: {
    SubTitle: (count: number) => `Insgesamt ${count} Gespräche`,
    EditMessage: {
      Title: "Nachricht bearbeiten",
      Topic: {
        Title: "Chat-Thema",
        SubTitle: "Ändern Sie das aktuelle Chat-Thema",
      },
    },
    Actions: {
      ChatList: "Nachrichtliste anzeigen",
      CompressedHistory: "Komprimierte Historie anzeigen",
      Export: "Chatverlauf exportieren",
      Copy: "Kopieren",
      Stop: "Stoppen",
      Retry: "Erneut versuchen",
      Pin: "Anheften",
      PinToastContent: "1 Gespräch an den voreingestellten Prompt angeheftet",
      PinToastAction: "Ansehen",
      Delete: "Löschen",
      Edit: "Bearbeiten",
      RefreshTitle: "Titel aktualisieren",
      RefreshToast: "Anfrage zur Titelaktualisierung gesendet",
    },
    Commands: {
      new: "Neues Gespräch",
      newm: "Neues Gespräch aus Maske erstellen",
      next: "Nächstes Gespräch",
      prev: "Vorheriges Gespräch",
      clear: "Kontext löschen",
      del: "Gespräch löschen",
    },
    InputActions: {
      Stop: "Antwort stoppen",
      ToBottom: "Zum neuesten Beitrag",
      Theme: {
        auto: "Automatisches Thema",
        light: "Helles Thema",
        dark: "Dunkles Thema",
      },
      Prompt: "Schnellbefehle",
      Masks: "Alle Masken",
      Clear: "Chat löschen",
      Settings: "Gesprächseinstellungen",
      UploadImage: "Bild hochladen",
    },
    Rename: "Gespräch umbenennen",
    Typing: "Tippt…",
    Input: (submitKey: string) => {
      var inputHints = `${submitKey} senden`;
      if (submitKey === String(SubmitKey.Enter)) {
        inputHints += "，Shift + Enter für Zeilenumbruch";
      }
      return inputHints + "，/ für Autovervollständigung, : für Befehle";
    },
    Send: "Senden",
    Config: {
      Reset: "Erinnerung löschen",
      SaveAs: "Als Maske speichern",
    },
    IsContext: "Voreingestellter Prompt",
  },
  Export: {
    Title: "Chatverlauf teilen",
    Copy: "Alles kopieren",
    Download: "Datei herunterladen",
    Share: "Auf ShareGPT teilen",
    MessageFromYou: "Benutzer",
    MessageFromChatGPT: "ChatGPT",
    Format: {
      Title: "Exportformat",
      SubTitle: "Kann als Markdown-Text oder PNG-Bild exportiert werden",
    },
    IncludeContext: {
      Title: "Maske Kontext einbeziehen",
      SubTitle: "Soll der Maskenkontext in den Nachrichten angezeigt werden?",
    },
    Steps: {
      Select: "Auswählen",
      Preview: "Vorschau",
    },
    Image: {
      Toast: "Screenshot wird erstellt",
      Modal: "Lang drücken oder Rechtsklick, um Bild zu speichern",
    },
  },
  Select: {
    Search: "Nachrichten suchen",
    All: "Alles auswählen",
    Latest: "Neueste",
    Clear: "Auswahl aufheben",
  },
  Memory: {
    Title: "Historische Zusammenfassung",
    EmptyContent:
      "Gesprächsinhalte sind zu kurz, keine Zusammenfassung erforderlich",
    Send: "Chatverlauf automatisch komprimieren und als Kontext senden",
    Copy: "Zusammenfassung kopieren",
    Reset: "[nicht verwendet]",
    ResetConfirm: "Zusammenfassung löschen bestätigen?",
  },
  Home: {
    NewChat: "Neues Gespräch",
    DeleteChat: "Bestätigen Sie das Löschen des ausgewählten Gesprächs?",
    DeleteToast: "Gespräch gelöscht",
    Revert: "Rückgängig machen",
  },
  Settings: {
    Title: "Einstellungen",
    SubTitle: "Alle Einstellungsmöglichkeiten",

    Danger: {
      Reset: {
        Title: "Alle Einstellungen zurücksetzen",
        SubTitle: "Setzt alle Einstellungen auf die Standardwerte zurück",
        Action: "Jetzt zurücksetzen",
        Confirm: "Bestätigen Sie das Zurücksetzen aller Einstellungen?",
      },
      Clear: {
        Title: "Alle Daten löschen",
        SubTitle: "Löscht alle Chats und Einstellungsdaten",
        Action: "Jetzt löschen",
        Confirm:
          "Bestätigen Sie das Löschen aller Chats und Einstellungsdaten?",
      },
    },
    Lang: {
      Name: "Sprache", // ACHTUNG: Wenn Sie eine neue Übersetzung hinzufügen möchten, übersetzen Sie diesen Wert bitte nicht, lassen Sie ihn als `Sprache`
      All: "Alle Sprachen",
    },
    Avatar: "Avatar",
    FontSize: {
      Title: "Schriftgröße",
      SubTitle: "Schriftgröße des Chat-Inhalts",
    },
    FontFamily: {
      Title: "Chat-Schriftart",
      SubTitle:
        "Schriftart des Chat-Inhalts, leer lassen, um die globale Standardschriftart anzuwenden",
      Placeholder: "Schriftartname",
    },
    InjectSystemPrompts: {
      Title: "Systemweite Eingabeaufforderungen einfügen",
      SubTitle:
        "Fügt jeder Nachricht am Anfang der Nachrichtenliste eine simulierte ChatGPT-Systemaufforderung hinzu",
    },
    InputTemplate: {
      Title: "Benutzer-Eingabeverarbeitung",
      SubTitle:
        "Die neueste Nachricht des Benutzers wird in diese Vorlage eingefügt",
    },

    Update: {
      Version: (x: string) => `Aktuelle Version: ${x}`,
      IsLatest: "Bereits die neueste Version",
      CheckUpdate: "Auf Updates überprüfen",
      IsChecking: "Überprüfe auf Updates...",
      FoundUpdate: (x: string) => `Neue Version gefunden: ${x}`,
      GoToUpdate: "Zum Update gehen",
    },
    SendKey: "Sende-Taste",
    Theme: "Thema",
    TightBorder: "Randloser Modus",
    SendPreviewBubble: {
      Title: "Vorschau-Bubble",
      SubTitle: "Markdown-Inhalt in der Vorschau-Bubble anzeigen",
    },
    AutoGenerateTitle: {
      Title: "Titel automatisch generieren",
      SubTitle:
        "Basierend auf dem Chat-Inhalt einen passenden Titel generieren",
    },
    Sync: {
      CloudState: "Cloud-Daten",
      NotSyncYet: "Noch nicht synchronisiert",
      Success: "Synchronisation erfolgreich",
      Fail: "Synchronisation fehlgeschlagen",

      Config: {
        Modal: {
          Title: "Cloud-Synchronisation konfigurieren",
          Check: "Verfügbarkeit überprüfen",
        },
        SyncType: {
          Title: "Synchronisationstyp",
          SubTitle: "Wählen Sie den bevorzugten Synchronisationsserver aus",
        },
        Proxy: {
          Title: "Proxy aktivieren",
          SubTitle:
            "Beim Synchronisieren im Browser muss ein Proxy aktiviert werden, um Cross-Origin-Beschränkungen zu vermeiden",
        },
        ProxyUrl: {
          Title: "Proxy-Adresse",
          SubTitle: "Nur für projektinterne Cross-Origin-Proxy",
        },

        WebDav: {
          Endpoint: "WebDAV-Adresse",
          UserName: "Benutzername",
          Password: "Passwort",
        },

        UpStash: {
          Endpoint: "UpStash Redis REST-Url",
          UserName: "Sicherungsname",
          Password: "UpStash Redis REST-Token",
        },
      },

      LocalState: "Lokale Daten",
      Overview: (overview: any) => {
        return `${overview.chat} Chats, ${overview.message} Nachrichten, ${overview.prompt} Eingabeaufforderungen, ${overview.mask} Masken`;
      },
      ImportFailed: "Import fehlgeschlagen",
    },
    Mask: {
      Splash: {
        Title: "Masken-Startseite",
        SubTitle:
          "Zeige die Masken-Startseite beim Erstellen eines neuen Chats",
      },
      Builtin: {
        Title: "Eingebaute Masken ausblenden",
        SubTitle: "Blendet eingebaute Masken in allen Maskenlisten aus",
      },
    },
    Prompt: {
      Disable: {
        Title: "Automatische Eingabeaufforderung deaktivieren",
        SubTitle:
          "Geben Sie am Anfang des Eingabefelds / ein, um die automatische Vervollständigung auszulösen",
      },
      List: "Benutzerdefinierte Eingabeaufforderungsliste",
      ListCount: (builtin: number, custom: number) =>
        `Eingebaut ${builtin} Stück, Benutzerdefiniert ${custom} Stück`,
      Edit: "Bearbeiten",
      Modal: {
        Title: "Eingabeaufforderungsliste",
        Add: "Neu erstellen",
        Search: "Eingabeaufforderungen suchen",
      },
      EditModal: {
        Title: "Eingabeaufforderung bearbeiten",
      },
    },
    HistoryCount: {
      Title: "Anzahl der historischen Nachrichten",
      SubTitle:
        "Anzahl der historischen Nachrichten, die bei jeder Anfrage mitgesendet werden",
    },
    CompressThreshold: {
      Title: "Komprimierungsschwelle für historische Nachrichtenlänge",
      SubTitle:
        "Wenn die unkomprimierten historischen Nachrichten diesen Wert überschreiten, wird komprimiert",
    },

    Usage: {
      Title: "Guthabenabfrage",
      SubTitle(used: any, total: any) {
        return `In diesem Monat verwendet $${used}, Abonnement insgesamt $${total}`;
      },
      IsChecking: "Wird überprüft…",
      Check: "Erneut überprüfen",
      NoAccess:
        "Geben Sie API-Schlüssel oder Zugangspasswort ein, um das Guthaben einzusehen",
    },

    Access: {
      SaasStart: {
        Title: "NextChat AI verwenden",
        Label: "(Die kosteneffektivste Lösung)",
        SubTitle:
          "Offiziell von NextChat verwaltet, sofort einsatzbereit ohne Konfiguration, unterstützt die neuesten großen Modelle wie OpenAI o1, GPT-4o und Claude-3.5",
        ChatNow: "Jetzt chatten",
      },

      AccessCode: {
        Title: "Zugangscode",
        SubTitle:
          "Der Administrator hat die verschlüsselte Zugriffskontrolle aktiviert",
        Placeholder: "Geben Sie den Zugangscode ein",
      },
      CustomEndpoint: {
        Title: "Benutzerdefinierte Schnittstelle",
        SubTitle: "Benutzerdefinierte Azure- oder OpenAI-Dienste verwenden",
      },
      Provider: {
        Title: "Modellanbieter",
        SubTitle: "Wechseln Sie zu verschiedenen Anbietern",
      },
      OpenAI: {
        ApiKey: {
          Title: "API-Schlüssel",
          SubTitle:
            "Verwenden Sie benutzerdefinierten OpenAI-Schlüssel, um Passwortzugangsbeschränkungen zu umgehen",
          Placeholder: "OpenAI API-Schlüssel",
        },

        Endpoint: {
          Title: "Schnittstellenadresse",
          SubTitle: "Neben der Standardadresse muss http(s):// enthalten sein",
        },
      },
      Azure: {
        ApiKey: {
          Title: "Schnittstellenschlüssel",
          SubTitle:
            "Verwenden Sie benutzerdefinierten Azure-Schlüssel, um Passwortzugangsbeschränkungen zu umgehen",
          Placeholder: "Azure API-Schlüssel",
        },

        Endpoint: {
          Title: "Schnittstellenadresse",
          SubTitle: "Beispiel:",
        },

        ApiVerion: {
          Title: "Schnittstellenversion (azure api version)",
          SubTitle: "Wählen Sie eine spezifische Teilversion aus",
        },
      },
      Anthropic: {
        ApiKey: {
          Title: "Schnittstellenschlüssel",
          SubTitle:
            "Verwenden Sie benutzerdefinierten Anthropic-Schlüssel, um Passwortzugangsbeschränkungen zu umgehen",
          Placeholder: "Anthropic API-Schlüssel",
        },

        Endpoint: {
          Title: "Schnittstellenadresse",
          SubTitle: "Beispiel:",
        },

        ApiVerion: {
          Title: "Schnittstellenversion (claude api version)",
          SubTitle: "Wählen Sie eine spezifische API-Version aus",
        },
      },
      Google: {
        ApiKey: {
          Title: "API-Schlüssel",
          SubTitle: "Holen Sie sich Ihren API-Schlüssel von Google AI",
          Placeholder: "Geben Sie Ihren Google AI Studio API-Schlüssel ein",
        },

        Endpoint: {
          Title: "Endpunktadresse",
          SubTitle: "Beispiel:",
        },

        ApiVersion: {
          Title: "API-Version (nur für gemini-pro)",
          SubTitle: "Wählen Sie eine spezifische API-Version aus",
        },
        GoogleSafetySettings: {
          Title: "Google Sicherheitsfilterstufe",
          SubTitle: "Inhaltfilterstufe einstellen",
        },
      },
      Baidu: {
        ApiKey: {
          Title: "API-Schlüssel",
          SubTitle: "Verwenden Sie benutzerdefinierten Baidu API-Schlüssel",
          Placeholder: "Baidu API-Schlüssel",
        },
        SecretKey: {
          Title: "Geheimschlüssel",
          SubTitle: "Verwenden Sie benutzerdefinierten Baidu Geheimschlüssel",
          Placeholder: "Baidu Geheimschlüssel",
        },
        Endpoint: {
          Title: "Schnittstellenadresse",
          SubTitle:
            "Keine benutzerdefinierten Adressen unterstützen, konfigurieren Sie in .env",
        },
      },
      ByteDance: {
        ApiKey: {
          Title: "Schnittstellenschlüssel",
          SubTitle: "Verwenden Sie benutzerdefinierten ByteDance API-Schlüssel",
          Placeholder: "ByteDance API-Schlüssel",
        },
        Endpoint: {
          Title: "Schnittstellenadresse",
          SubTitle: "Beispiel:",
        },
      },
      Alibaba: {
        ApiKey: {
          Title: "Schnittstellenschlüssel",
          SubTitle:
            "Verwenden Sie benutzerdefinierten Alibaba Cloud API-Schlüssel",
          Placeholder: "Alibaba Cloud API-Schlüssel",
        },
        Endpoint: {
          Title: "Schnittstellenadresse",
          SubTitle: "Beispiel:",
        },
      },
      CustomModel: {
        Title: "Benutzerdefinierter Modellname",
        SubTitle:
          "Fügen Sie benutzerdefinierte Modelloptionen hinzu, getrennt durch Kommas",
      },
    },

    Model: "Modell",
    CompressModel: {
      Title: "Kompressionsmodell",
      SubTitle: "Modell zur Komprimierung des Verlaufs",
    },
    Temperature: {
      Title: "Zufälligkeit (temperature)",
      SubTitle: "Je höher der Wert, desto zufälliger die Antwort",
    },
    TopP: {
      Title: "Kern-Sampling (top_p)",
      SubTitle:
        "Ähnlich der Zufälligkeit, aber nicht zusammen mit Zufälligkeit ändern",
    },
    MaxTokens: {
      Title: "Maximale Token-Anzahl pro Antwort",
      SubTitle: "Maximale Anzahl der Tokens pro Interaktion",
    },
    PresencePenalty: {
      Title: "Themenfrische (presence_penalty)",
      SubTitle:
        "Je höher der Wert, desto wahrscheinlicher wird auf neue Themen eingegangen",
    },
    FrequencyPenalty: {
      Title: "Häufigkeitsstrafe (frequency_penalty)",
      SubTitle:
        "Je höher der Wert, desto wahrscheinlicher werden wiederholte Wörter reduziert",
    },
  },
  Store: {
    DefaultTopic: "Neuer Chat",
    BotHello: "Wie kann ich Ihnen helfen?",
    Error:
      "Ein Fehler ist aufgetreten, bitte versuchen Sie es später noch einmal",
    Prompt: {
      History: (content: string) =>
        "Dies ist eine Zusammenfassung des bisherigen Chats als Hintergrundinformation: " +
        content,
      Topic:
        "Geben Sie ein kurzes Thema in vier bis fünf Wörtern zurück, ohne Erklärungen, ohne Satzzeichen, ohne Füllwörter, ohne zusätzliche Texte und ohne Fettdruck. Wenn kein Thema vorhanden ist, geben Sie bitte „Allgemeines Gespräch“ zurück.",
      Summarize:
        "Fassen Sie den Gesprächsinhalt zusammen, um als Kontextaufforderung für den nächsten Schritt zu dienen, halten Sie es unter 200 Zeichen",
    },
  },
  Copy: {
    Success: "In die Zwischenablage geschrieben",
    Failed:
      "Kopieren fehlgeschlagen, bitte erlauben Sie Zugriff auf die Zwischenablage",
  },
  Download: {
    Success: "Inhalt wurde in Ihrem Verzeichnis heruntergeladen.",
    Failed: "Download fehlgeschlagen.",
  },
  Context: {
    Toast: (x: any) => `Beinhaltet ${x} vordefinierte Eingabeaufforderungen`,
    Edit: "Aktuelle Gesprächseinstellungen",
    Add: "Neues Gespräch hinzufügen",
    Clear: "Kontext gelöscht",
    Revert: "Kontext wiederherstellen",
  },
  Plugin: {
    Name: "Plugins",
  },
  FineTuned: {
    Sysmessage: "Du bist ein Assistent",
  },
  SearchChat: {
    Name: "Suche",
    Page: {
      Title: "Chatverlauf durchsuchen",
      Search: "Suchbegriff eingeben",
      NoResult: "Keine Ergebnisse gefunden",
      NoData: "Keine Daten",
      Loading: "Laden",

      SubTitle: (count: number) => `${count} Ergebnisse gefunden`,
    },
    Item: {
      View: "Ansehen",
    },
  },
  Mask: {
    Name: "Masken",
    Page: {
      Title: "Vordefinierte Rollenmasken",
      SubTitle: (count: number) =>
        `${count} vordefinierte Rollenbeschreibungen`,
      Search: "Rollenmasken suchen",
      Create: "Neu erstellen",
    },
    Item: {
      Info: (count: number) => `Beinhaltet ${count} vordefinierte Gespräche`,
      Chat: "Gespräch",
      View: "Anzeigen",
      Edit: "Bearbeiten",
      Delete: "Löschen",
      DeleteConfirm: "Bestätigen Sie das Löschen?",
    },
    EditModal: {
      Title: (readonly: boolean) =>
        `Vordefinierte Maske bearbeiten ${readonly ? "（Nur lesen）" : ""}`,
      Download: "Vorgabe herunterladen",
      Clone: "Vorgabe klonen",
    },
    Config: {
      Avatar: "Rollen-Avatar",
      Name: "Rollenname",
      Sync: {
        Title: "Globale Einstellungen verwenden",
        SubTitle:
          "Soll das aktuelle Gespräch die globalen Modelleinstellungen verwenden?",
        Confirm:
          "Die benutzerdefinierten Einstellungen des aktuellen Gesprächs werden automatisch überschrieben. Bestätigen Sie, dass Sie die globalen Einstellungen aktivieren möchten?",
      },
      HideContext: {
        Title: "Vordefinierte Gespräche ausblenden",
        SubTitle:
          "Nach dem Ausblenden werden vordefinierte Gespräche nicht mehr im Chat angezeigt",
      },
      Share: {
        Title: "Diese Maske teilen",
        SubTitle: "Generieren Sie einen Direktlink zu dieser Maske",
        Action: "Link kopieren",
      },
    },
  },
  NewChat: {
    Return: "Zurück",
    Skip: "Direkt beginnen",
    NotShow: "Nicht mehr anzeigen",
    ConfirmNoShow:
      "Bestätigen Sie die Deaktivierung? Nach der Deaktivierung können Sie jederzeit in den Einstellungen wieder aktivieren.",
    Title: "Wählen Sie eine Maske aus",
    SubTitle:
      "Starten Sie jetzt und lassen Sie sich von den Gedanken hinter der Maske inspirieren",
    More: "Alle anzeigen",
  },

  URLCommand: {
    Code: "Ein Zugangscode wurde im Link gefunden. Möchten Sie diesen automatisch einfügen?",
    Settings:
      "Vordefinierte Einstellungen wurden im Link gefunden. Möchten Sie diese automatisch einfügen?",
  },

  UI: {
    Confirm: "Bestätigen",
    Cancel: "Abbrechen",
    Close: "Schließen",
    Create: "Neu erstellen",
    Edit: "Bearbeiten",
    Export: "Exportieren",
    Import: "Importieren",
    Sync: "Synchronisieren",
    Config: "Konfigurieren",
  },
  Exporter: {
    Description: {
      Title: "Nur Nachrichten nach dem Löschen des Kontexts werden angezeigt",
    },
    Model: "Modell",
    Messages: "Nachrichten",
    Topic: "Thema",
    Time: "Zeit",
  },
  Hitokoto: {
    // 德语
    OnlineCount: (count: number) => `${count} Menschen online`,
    CopySuccess: "Wurde in die Zwischenablage kopiert",
    Actions: {
      Refresh: "Nächste",
      Copy: "Kopieren",
    },
  },
};

export default de;
