export const en = {
    // General
    loading: 'Loading',
    welcome: 'Welcome',
    allRightsReserved: 'All rights reserved',
    login: 'Log In',
    signUp: 'Sign Up',
    email: 'Email',
    password: 'Password',
    status: 'Status',
    actions: 'Actions',
  
    // Auth Page
    authPage: {
      subtitle: 'Log in or create an account to unlock local deals',
      loginDescription: 'Enter your details to access your account.',
      signUpDescription: 'Enter your details to create an account.',
      continueWithGoogle: 'Continue with Google',
      orContinueWith: 'Or continue with',
      forgotPassword: 'Forgot password?',
      createAccount: 'Create account',
    },
  
    // Toasts
    toast: {
      loginSuccessTitle: 'Login Successful',
      welcomeBack: 'Welcome back!',
      googleLoginErrorTitle: 'Google Login Error',
      googleLoginErrorDescription: 'There was a problem signing in with Google.',
      loginErrorTitle: 'Login Error',
      loginErrorDescription: 'A problem occurred during login.',
  
      signUpSuccessTitle: 'Account Created!',
      welcomeTo: 'Welcome to LocalKey.',
      googleSignUpErrorTitle: 'Google Sign Up Error',
      googleSignUpErrorDescription: 'Could not create account. Please try again.',
      signUpErrorTitle: 'Sign Up Error',
      signUpErrorDescription: 'Could not create account. Please try again.',
    },
  
    // Validation
    validation: {
        invalidEmail: "Invalid email address.",
        passwordTooShort: "Password must be at least {{min}} characters.",
    },
  
    // Dashboard User
    dashboardUser: {
      nav: {
        dashboard: 'Dashboard',
        getQrCode: 'Get QR Code',
        invites: 'Invites',
        settings: 'Settings',
      },
      page: {
        availableOffers: 'Available Offers',
        browseOffers: 'Browse offers from local partners.',
        noOffers: 'No offers available at the moment.',
        offersNearYou: 'Offers Near You',
        findOffersInArea: 'Find offers in your area. Click a pin for details.',
        mapPlaceholder: 'Map View',
        mapExplanation: 'A real map would display {{count}} offers near you.',
        mapActivation: 'To activate, add your Google Maps API key.',
      },
      invites: {
        title: 'Your Invites',
        subtitle: 'Invite friends to LocalKey and unlock rewards.',
        availableCodes: 'Available Codes',
        remainingInvites: 'You have {{count}} invites left.',
        copyCode: 'Copy Code',
        noAvailableInvites: 'You have no available invites at the moment.',
        history: 'Invite History',
        historySubtitle: 'See the status of invites you\'ve sent.',
        usedBy: 'Used by User ID: {{userId}} on {{date}}',
        statusUsed: 'Used',
        noUsedInvites: 'No used invites yet.',
      },
      settings: {
        title: 'Settings',
        subtitle: 'Manage your account and language preferences.',
        language: 'Language',
        languageDescription: 'Choose the language for the application interface.',
      },
      qr: {
        title: 'Redeem Offer',
        personalCode: 'Your Personal QR Code',
        presentCode: 'Present this code to the partner to redeem the offer.',
        unauthenticated: 'User not authenticated',
        pleaseLogin: 'Please log in to generate a QR code.',
        expiredTitle: 'QR Code Expired',
        expiredDescription: 'Please generate a new code for redemption.',
        expiresIn: 'Expires in {{timeLeft}}s',
        expired: 'Code expired',
        generateNew: 'Generate New Code',
        activeAndSecure: 'Your code is active and secure.',
        couldNotGenerate: 'Could not generate QR code'
      }
    },

    // Admin Layout
    adminLayout: {
      loggedInAs: 'Logged in as {{role}}',
      nav: {
        dashboard: 'Dashboard',
        users: 'Users',
        partners: 'Partners',
        offers: 'Offers',
        invites: 'Invites',
        payments: 'Payments',
        reports: 'Reports',
      },
      dashboard: {
        title: 'Admin Dashboard',
        subtitle: 'Platform-wide overview and management.',
        totalRevenue: 'Total Revenue',
        totalUsers: 'Total Users',
        totalPartners: 'Total Partners',
        totalRedemptions: 'Total Redemptions',
        fromLastMonth: 'from last month'
      },
      fraud: {
        title: 'Fraud Detection Center',
        subtitle: 'Use GenAI to analyze usage patterns and detect potential fraud.',
        button: 'Analyze & Generate Alert',
        alertTitle: 'Potential Fraud Detected!',
        errorTitle: 'Error',
        errorDescription: 'Could not generate fraud alert. Please try again.',
        prompt: 'Press the button to start the fraud analysis.'
      },
      invites: {
        title: 'Invite Codes',
        subtitle: 'Manage and track all invite codes.',
        generate: 'Generate Codes',
        code: 'Code',
        invitedBy: 'Invited by (ID)',
        usedBy: 'Used by (ID)',
        actions: 'Actions',
        statusAvailable: 'Available',
        statusUsed: 'Used',
        viewDetails: 'View Details',
        revoke: 'Revoke'
      },
      offers: {
        title: 'Offers',
        subtitle: 'Manage all offers on the platform.',
        add: 'Add Offer',
        offerTitle: 'Offer Title',
        partner: 'Partner',
        expiresAt: 'Expires At',
        statusActive: 'Active',
        statusPaused: 'Paused',
        edit: 'Edit',
        viewDetails: 'View Details',
        delete: 'Delete'
      },
      partners: {
        title: 'Partners',
        subtitle: 'Manage all partners on the platform.',
        add: 'Add Partner',
        name: 'Name',
        offers: 'Offers',
        redemptions: 'Redemptions',
        joinedDate: 'Date Joined',
        edit: 'Edit',
        viewDashboard: 'View Dashboard',
        deactivate: 'Deactivate'
      },
      payments: {
        title: 'Payments Integration',
        subtitle: 'Manage subscriptions and transactions via Stripe.',
        placeholderTitle: 'Stripe Integration',
        placeholderDescription: 'A dashboard for managing payments would appear here.'
      },
      reports: {
        title: 'Reports & Analytics',
        subtitle: 'Generate and view detailed platform analytics.',
        placeholderTitle: 'Analytics Dashboard',
        placeholderDescription: 'Advanced reporting tools would be available here.'
      },
      users: {
        title: 'Users',
        subtitle: 'Manage all users on the platform.',
        add: 'Add User',
        image: 'Image',
        nameEmail: 'Name/Email',
        role: 'Role',
        invites: 'Invites',
        createdAt: 'Created At',
        edit: 'Edit',
        viewDetails: 'View Details',
        suspend: 'Suspend'
      },
      charts: {
        redemptionsOverview: 'Redemptions Overview',
        redemptionsLabel: 'Redemptions',
        months: {
          january: 'January',
          february: 'February',
          march: 'March',
          april: 'April',
          may: 'May',
          june: 'June'
        },
        dateRange: 'January - June 2024'
      }
    },

     // Partner Layout
     partnerLayout: {
      loggedInAs: 'Logged in as {{role}}',
      nav: {
        dashboard: 'Dashboard',
        scanQrCode: 'Scan QR Code',
        manageOffers: 'Manage Offers',
      },
      dashboard: {
        title: 'Partner Dashboard',
        welcome: 'Welcome back, {{partnerName}}!',
        totalRedemptions: 'Total Redemptions',
        estimatedRevenue: 'Estimated Revenue',
        newCustomers: 'New Customers',
        fromLastMonth: 'from last month',
        recentActivity: 'Recent Activity',
        recentActivitySubtitle: 'A log of the latest offer redemptions.',
        offerRedeemed: '\'{{offerName}}\' offer redeemed.',
        userId: 'User ID: {{userId}}',
        timeAgo: '{{time}} ago'
      },
      offers: {
        title: 'Your Offers',
        subtitle: 'Manage your active and inactive offers.',
        add: 'Add Offer',
        offer: 'Offer',
        category: 'Category',
        expiresAt: 'Expires At',
        statusActive: 'Active',
        statusPaused: 'Paused',
        toggleStatus: 'Toggle offer status',
        edit: 'Edit',
        viewStats: 'View Stats',
        delete: 'Delete'
      },
      scan: {
        title: 'Validate Redemption',
        subtitle: 'Scan a user\'s QR code to redeem their offer.',
        cameraError: 'Camera Error',
        cameraNotSupported: 'Your browser does not support camera functionality.',
        permissionDenied: 'Camera Access Denied',
        permissionPlease: 'Please allow camera access in your browser settings.',
        validating: 'Validating...',
        validated: 'VALIDATED',
        invalid: 'INVALID',
        cameraNotAvailable: 'Camera not available',
        allowCamera: 'Allow camera access to scan.',
        validationSuccess: 'Code Validated Successfully!',
        redemptionSuccess: 'Redemption registered for user {{userId}}...',
        invalidQr: 'Invalid QR Code',
        notAValidCode: 'This is not a valid LocalKey code.',
        pointCamera: 'Point the camera at a QR code',
        permissionNeeded: 'Camera Access Required',
        enterManually: 'Or enter the code manually:',
        validate: 'Validate'
      },
      access: {
        title: 'Partner Access',
        subtitle: 'Log in to validate QR codes.'
      }
    },
    
    userNav: {
        profile: "Profile",
        billing: "Billing",
        settings: "Settings",
        logout: "Log Out",
        login: "Log In",
        user: "User",
    }
  };
