export const ro = {
    // General
    loading: 'Se încarcă',
    welcome: 'Bun venit',
    allRightsReserved: 'Toate drepturile rezervate',
    login: 'Autentificare',
    signUp: 'Înregistrare',
    email: 'Email',
    password: 'Parolă',
    status: 'Stare',
    actions: 'Acțiuni',
  
    // Auth Page
    authPage: {
      subtitle: 'Autentifică-te sau creează un cont pentru a debloca oferte locale',
      loginDescription: 'Introdu datele tale pentru a accesa contul.',
      signUpDescription: 'Introdu datele tale pentru a crea un cont.',
      continueWithGoogle: 'Continuă cu Google',
      orContinueWith: 'Sau continuă cu',
      forgotPassword: 'Ai uitat parola?',
      createAccount: 'Creează cont',
    },
  
    // Toasts
    toast: {
      loginSuccessTitle: 'Autentificare Reușită',
      welcomeBack: 'Bun venit înapoi!',
      googleLoginErrorTitle: 'Eroare de Autentificare Google',
      googleLoginErrorDescription: 'A apărut o problemă la autentificarea cu Google.',
      loginErrorTitle: 'Eroare de Autentificare',
      loginErrorDescription: 'A apărut o problemă la autentificare.',
  
      signUpSuccessTitle: 'Cont Creat!',
      welcomeTo: 'Bun venit la {{appName}}.',
      googleSignUpErrorTitle: 'Eroare la Înregistrare cu Google',
      googleSignUpErrorDescription: 'Nu s-a putut crea contul. Încercați din nou.',
      signUpErrorTitle: 'Eroare la Înregistrare',
      signUpErrorDescription: 'Nu s-a putut crea contul. Încercați din nou.',
    },
  
    // Validation
    validation: {
      invalidEmail: "Adresă de email invalidă.",
      passwordTooShort: "Parola trebuie să aibă cel puțin {{min}} caractere.",
    },
  
    // Dashboard User
    dashboardUser: {
      nav: {
        dashboard: 'Panou',
        getQrCode: 'Obține Cod QR',
        invites: 'Invitații',
        settings: 'Setări',
      },
      page: {
        availableOffers: 'Oferte Disponibile',
        browseOffers: 'Răsfoiește ofertele de la partenerii locali.',
        noOffers: 'Nu există oferte disponibile momentan.',
        offersNearYou: 'Oferte Lângă Tine',
        findOffersInArea: 'Găsește oferte în zona ta. Apasă pe un pin pentru detalii.',
        mapPlaceholder: 'Vizualizare Hartă',
        mapExplanation: 'O hartă reală ar afișa {{count}} oferte lângă tine.',
        mapActivation: 'Pentru a activa, adaugă cheia ta API Google Maps.',
      },
      invites: {
        title: 'Invitațiile Tale',
        subtitle: 'Invită prieteni pe LOCALKEY și deblochează recompense.',
        availableCodes: 'Coduri Disponibile',
        remainingInvites: 'Ai {{count}} invitații rămase.',
        copyCode: 'Copiază Cod',
        noAvailableInvites: 'Nu ai invitații disponibile în acest moment.',
        history: 'Istoric Invitații',
        historySubtitle: 'Vezi starea invitațiilor pe care le-ai trimis.',
        usedBy: 'Folosit de Utilizator ID: {{userId}} pe {{date}}',
        statusUsed: 'Folosit',
        noUsedInvites: 'Nicio invitație folosită încă.',
      },
      settings: {
        title: 'Setări',
        subtitle: 'Gestionează-ți contul și preferințele de limbă.',
        language: 'Limbă',
        languageDescription: 'Alege limba pentru interfața aplicației.',
      },
      qr: {
        title: 'Răscumpără Ofertă',
        personalCode: 'Codul Tău QR Personal',
        presentCode: 'Prezintă acest cod partenerului pentru a răscumpăra oferta.',
        unauthenticated: 'Utilizator neautentificat',
        pleaseLogin: 'Vă rugăm să vă autentificați pentru a genera un cod QR.',
        expiredTitle: 'Cod QR Expirat',
        expiredDescription: 'Te rugăm să generezi un nou cod pentru răscumpărare.',
        expiresIn: 'Expiră în {{timeLeft}}s',
        expired: 'Cod expirat',
        generateNew: 'Generează Cod Nou',
        activeAndSecure: 'Codul tău este activ și securizat.',
        couldNotGenerate: 'Nu s-a putut genera codul QR'
      }
    },

    // Admin Layout
    adminLayout: {
      loggedInAs: 'Autentificat ca {{role}}',
      nav: {
        dashboard: 'Panou',
        users: 'Utilizatori',
        partners: 'Parteneri',
        offers: 'Oferte',
        invites: 'Invitații',
        payments: 'Plăți',
        reports: 'Rapoarte',
      },
      dashboard: {
        title: 'Panou de Administrare',
        subtitle: 'Prezentare generală și management la nivel de platformă.',
        totalRevenue: 'Venit Total',
        totalUsers: 'Utilizatori Totali',
        totalPartners: 'Parteneri Totali',
        totalRedemptions: 'Răscumpărări Totale',
        fromLastMonth: 'față de luna trecută'
      },
      fraud: {
        title: 'Centru de Detecție a Fraudei',
        subtitle: 'Folosește GenAI pentru a analiza modelele de utilizare și a detecta potențiale fraude.',
        button: 'Analizează și Generează Alertă',
        alertTitle: 'Potențială Fraudă Detectată!',
        errorTitle: 'Eroare',
        errorDescription: 'Nu s-a putut genera alerta de fraudă. Vă rugăm să încercați din nou.',
        prompt: 'Apasă butonul pentru a începe analiza de fraudă.'
      },
      invites: {
        title: 'Coduri de Invitație',
        subtitle: 'Gestionează și urmărește toate codurile de invitație.',
        generate: 'Generează Coduri',
        code: 'Cod',
        invitedBy: 'Invitat de (ID)',
        usedBy: 'Folosit de (ID)',
        actions: 'Acțiuni',
        statusAvailable: 'Disponibil',
        statusUsed: 'Folosit',
        viewDetails: 'Vezi Detalii',
        revoke: 'Revocă'
      },
      offers: {
        title: 'Oferte',
        subtitle: 'Gestionează toate ofertele de pe platformă.',
        add: 'Adaugă Ofertă',
        offerTitle: 'Titlu Ofertă',
        partner: 'Partener',
        expiresAt: 'Expiră la',
        statusActive: 'Activă',
        statusPaused: 'Pauză',
        edit: 'Editează',
        viewDetails: 'Vezi Detalii',
        delete: 'Șterge'
      },
      partners: {
        title: 'Parteneri',
        subtitle: 'Gestionează toți partenerii de pe platformă.',
        add: 'Adaugă Partener',
        name: 'Nume',
        offers: 'Oferte',
        redemptions: 'Răscumpărări',
        joinedDate: 'Data Aderării',
        edit: 'Editează',
        viewDashboard: 'Vezi Panou',
        deactivate: 'Dezactivează'
      },
      payments: {
        title: 'Integrare Plăți',
        subtitle: 'Gestionează abonamente și tranzacții prin Stripe.',
        placeholderTitle: 'Integrare Stripe',
        placeholderDescription: 'Aici ar apărea un panou pentru gestionarea plăților.'
      },
      reports: {
        title: 'Rapoarte & Analize',
        subtitle: 'Generează și vizualizează analize detaliate ale platformei.',
        placeholderTitle: 'Panou de Analize',
        placeholderDescription: 'Aici ar fi disponibile instrumente avansate de raportare.'
      },
      users: {
        title: 'Utilizatori',
        subtitle: 'Gestionează toți utilizatorii de pe platformă.',
        add: 'Adaugă Utilizator',
        image: 'Imagine',
        nameEmail: 'Nume/Email',
        role: 'Rol',
        invites: 'Invitații',
        createdAt: 'Creat la',
        edit: 'Editează',
        viewDetails: 'Vezi Detalii',
        suspend: 'Suspendă'
      },
      charts: {
        redemptionsOverview: 'Prezentare Generală Răscumpărări',
        redemptionsLabel: 'Răscumpărări',
        months: {
          january: 'Ianuarie',
          february: 'Februarie',
          march: 'Martie',
          april: 'Aprilie',
          may: 'Mai',
          june: 'Iunie'
        },
        dateRange: 'Ianuarie - Iunie 2024'
      }
    },

    // Partner Layout
    partnerLayout: {
      loggedInAs: 'Autentificat ca {{role}}',
      nav: {
        dashboard: 'Panou',
        scanQrCode: 'Scanează Cod QR',
        manageOffers: 'Gestionează Oferte',
      },
      dashboard: {
        title: 'Panou Partener',
        welcome: 'Bun venit înapoi, {{partnerName}}!',
        totalRedemptions: 'Răscumpărări Totale',
        estimatedRevenue: 'Venit Estimat',
        newCustomers: 'Clienți Noi',
        fromLastMonth: 'față de luna trecută',
        recentActivity: 'Activitate Recentă',
        recentActivitySubtitle: 'Un jurnal al ultimelor răscumpărări de oferte.',
        offerRedeemed: 'Oferta \'{{offerName}}\' răscumpărată.',
        userId: 'ID Utilizator: {{userId}}',
        timeAgo: 'acum {{time}}'
      },
      offers: {
        title: 'Ofertele Tale',
        subtitle: 'Gestionează ofertele tale active și inactive.',
        add: 'Adaugă Ofertă',
        offer: 'Ofertă',
        category: 'Categorie',
        expiresAt: 'Expiră la',
        statusActive: 'Activă',
        statusPaused: 'Pauză',
        toggleStatus: 'Comută starea ofertei',
        edit: 'Editează',
        viewStats: 'Vezi Statistici',
        delete: 'Șterge'
      },
      scan: {
        title: 'Validează Răscumpărare',
        subtitle: 'Scanează codul QR al unui utilizator pentru a-i răscumpăra oferta.',
        cameraError: 'Eroare Cameră',
        cameraNotSupported: 'Browser-ul tău nu suportă funcționalitatea camerei.',
        permissionDenied: 'Acces la Cameră Refuzat',
        permissionPlease: 'Te rugăm să permiți accesul la cameră în setările browser-ului.',
        validating: 'Se validează...',
        validated: 'VALIDAT',
        invalid: 'INVALID',
        cameraNotAvailable: 'Camera nu este disponibilă',
        allowCamera: 'Permite accesul la cameră pentru a scana.',
        validationSuccess: 'Cod Validat cu Succes!',
        redemptionSuccess: 'Răscumpărare înregistrată pentru utilizatorul {{userId}}...',
        invalidQr: 'Cod QR Invalid',
        notAValidCode: 'Acest cod nu este un cod LOCALKEY valid.',
        pointCamera: 'Îndreaptă camera spre un cod QR',
        permissionNeeded: 'Acces la Cameră Necesar',
        enterManually: 'Sau introduceți codul manual:',
        validate: 'Validează'
      },
      access: {
        title: 'Acces Partener',
        subtitle: 'Autentifică-te pentru a valida coduri QR.'
      }
    },
    
    userNav: {
        profile: "Profil",
        billing: "Facturare",
        settings: "Setări",
        logout: "Deconectare",
        login: "Autentificare",
        user: "Utilizator",
    }
  };