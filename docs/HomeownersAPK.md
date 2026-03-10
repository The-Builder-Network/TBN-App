# MyBuilder UK — APK Forensic Analysis Report

**APK**: `com.instapro.homeownerapp.unitedkingdom.apk`  
**Version**: 11.0.4 (versionCode 123)  
**Analysis Date**: March 2026  
**Analyst**: Forensic extraction from decompiled APK (smali + Hermes bytecode + resources)

---

## 1. WHAT THIS APP IS

**MyBuilder (For Homeowners)** is the **consumer-facing mobile app** for [mybuilder.com](https://www.mybuilder.com) — the UK's leading online marketplace connecting homeowners with local tradespeople (builders, plumbers, electricians, etc.).

### Core Identity

| Field        | Value                                                        |
| ------------ | ------------------------------------------------------------ |
| App Name     | MyBuilder (For Homeowners)                                   |
| App Type     | `homeowner` (consumer, NOT tradesperson)                     |
| Architecture | React Native (New Architecture + Hermes JS, Fabric renderer) |

### What Users Do

The app is used by **homeowners** to:

1. **Post jobs** to find and hire local tradespeople
2. **Search/browse** tradespeople by trade type and location
3. **Post service requests** to receive quotes
4. **Message** tradespeople directly in-app
5. **Manage their jobs and account**

---

## 2. DEEP LINKS / EXTERNAL LINKS

### Android Deep Link Intent Filters (AndroidManifest)

The app intercepts HTTPS links from these domains:

- `mybuilder.com`
- `www.mybuilder.com`
- `mobile.mybuilder.com`
- `links.mybuilder.com`

### Deep Link URL Paths

| Path Prefix             | Description                                        |
| ----------------------- | -------------------------------------------------- |
| `/consumer`             | Homeowner account / dashboard area                 |
| `/find-a-service`       | Find a tradesperson flow                           |
| `/post-a-job`           | Post a new job flow                                |
| `/post-service-request` | Post a service request flow                        |
| `/service-pro`          | Service professional pages (tradesperson profiles) |

### Intent Queries (what the app can launch)

- Email clients (`mailto:` scheme)
- Phone dialer (`tel:` scheme)
- Chrome Custom Tabs (in-app browser)
- Google Pay / Chromium Pay
- Any HTTPS/HTTP URL (web browsing)

---

### API Endpoints

#### Internal API (MyBuilder backend)

| Endpoint                                         | Description                                                                                                                              |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `GET /Assets/api/envelope/ho-app-landingPageUrl` | Fetches the dynamic landing page URL for homeowner app (controls default screen)                                                         |
| `/service-pro/new-service-request`               | Creates a new service request (tradesperson side)                                                                                        |
| `/error-page/create`                             | Error page route                                                                                                                         |
| GraphQL endpoint                                 | Not explicit in bundle but `graphql`, `graphql.data_loader`, `graphql.fetcher`, `graphql.operation` identifiers found — app uses GraphQL |

#### Iterable Push/Email API (`https://api.eu.iterable.com/api/`)

| Endpoint                             | Description                     |
| ------------------------------------ | ------------------------------- |
| `events/track`                       | Generic event tracking          |
| `events/trackPushOpen`               | Push notification open tracking |
| `events/trackInAppOpen`              | In-app message open             |
| `events/trackInAppClick`             | In-app message click            |
| `events/trackInAppClose`             | In-app message click            |
| `events/trackInAppDelivery`          | In-app message delivered        |
| `events/trackInboxSession`           | Inbox session tracking          |
| `events/inAppConsume`                | In-app message consumed         |
| `inApp/getMessages`                  | Fetch in-app messages           |
| `getInboxMessages`                   | Fetch inbox messages            |
| `getMessages`                        | Fetch messages list             |
| `embedded-messaging/messages`        | Embedded messages list          |
| `embedded-messaging/events/click`    | Embedded message click          |
| `embedded-messaging/events/received` | Embedded message received       |
| `embedded-messaging/events/session`  | Embedded message session        |
| `commerce/trackPurchase`             | Purchase tracking               |
| `commerce/updateCart`                | Cart update tracking            |

---

## 4. SCREENS, ROUTES & WIREFRAME DESIGN

> **Note**: The app is React Native using **React Navigation** with **deep linking**. The main RN root component is called `Werkspot`. The JS bundle is compiled as Hermes bytecode, so exact screen names could not be read directly, but route patterns, deep links, Sentry breadcrumbs, navigation events, and bundle strings provide strong inference.

---

### APP ARCHITECTURE OVERVIEW

```
MainActivity (singleTask, portrait-only)
└── Werkspot (React Native root)
    ├── SplashScreen (native, shows splash.png)
    ├── LandingPageUrlProvider (context wrapper)
    └── NavigationContainer
        ├── Consumer Section (/consumer/*)
        │   ├── Home / Dashboard
        │   ├── My Jobs
        │   ├── Messages / Chat
        │   ├── Account / Profile
        │   └── Notifications
        ├── Find a Service (/find-a-service/*)
        │   ├── Trade Category Selection
        │   ├── Location / Postcode Entry
        │   └── Tradesperson Results List
        ├── Post a Job (/post-a-job/*)
        │   ├── Job Type / Category Selection
        │   ├── Job Description Form
        │   ├── Location Form
        │   ├── Photo Upload
        │   └── Confirmation
        ├── Post Service Request (/post-service-request/*)
        │   └── Service Request Form
        ├── Service Pro (/service-pro/*)
        │   └── Tradesperson Profile View
        └── Error Page (/error-page/create)
```

---

### SCREEN 1 — Splash Screen

| Property       | Detail                                                          |
| -------------- | --------------------------------------------------------------- |
| **Type**       | Native Android Activity splash                                  |
| **Layout**     | `launch_screen.xml` — full-screen ImageView, `centerCrop` scale |
| **Image**      | `res/drawable-nodpi/splash.png`                                 |
| **Background** | Fills entire screen                                             |
| **Purpose**    | Shown on cold start while React Native initialises              |
| **Leads To**   | Landing Screen (after RN loads)                                 |
| **Duration**   | Until JS bundle evaluates (Hermes bytecode, fast)               |
| **Notes**      | Uses `org.devio.rn.splashscreen` library                        |

---

### SCREEN 2 — Dynamic Landing Screen

| Property                     | Detail                                                                                    |
| ---------------------------- | ----------------------------------------------------------------------------------------- |
| **Route**                    | Fetched from `GET /Assets/api/envelope/ho-app-landingPageUrl`                             |
| **Type**                     | React Native screen, URL-driven                                                           |
| **Purpose**                  | Server-controlled entry point — can show different landing UIs per A/B test or deployment |
| **Context**                  | `LandingPageUrlProvider` wraps the app, provides the dynamic URL                          |
| **DEFAULT_LANDING_PAGE_URL** | Fallback if API call fails                                                                |
| **Actions**                  | Likely CTA buttons: "Find a Tradesperson" or "Post a Job", login/register                 |
| **Leads To**                 | Post a Job flow, Find a Service flow, or Auth screens                                     |

---

### SCREEN 3 — Authentication Screens

| Property              | Detail                                                                                            |
| --------------------- | ------------------------------------------------------------------------------------------------- |
| **Routes**            | Likely under `/consumer/login`, `/consumer/register`                                              |
| **Purpose**           | Homeowner sign-in / registration                                                                  |
| **Fields (Login)**    | Email address, Password                                                                           |
| **Fields (Register)** | Name (Your Name), Email address, Password, Phone number                                           |
| **Links**             | "Forgot password?", Terms & Conditions, Privacy Policy (open via in-app browser)                  |
| **CTAs**              | "Sign in", "Register", "Sign in with Google"                                                      |
| **Actions**           | Authenticates → navigates to Dashboard/Home                                                       |
| **Notes**             | `common_signin_button_text_long` = "Sign in with Google" found in strings; OAuth likely available |

---

### SCREEN 4 — Home / Dashboard (Consumer Section)

| Property                | Detail                                                                    |
| ----------------------- | ------------------------------------------------------------------------- |
| **Route**               | `/consumer/` or app root after login                                      |
| **Purpose**             | Main homeowner landing after login; overview of activity                  |
| **URL Pattern**         | `^\/consumer\/.*$`                                                        |
| **Notifications Badge** | App icon badge (managed via `RNNotificationsUtils.setAppIconBadgeNumber`) |
| **Content**             | List of active jobs, recent messages, quick-action buttons                |
| **CTAs**                | "Post a Job", "Find a Tradesperson"                                       |
| **Actions**             | Tab nav to Messages, Account; deep-link routing on notification tap       |
| **Navigation**          | Tab bar or drawer navigation                                              |
| **Push Notifications**  | Chat unread counts ("You've received new messages in N conversations")    |

---

### SCREEN 5 — Find a Tradesperson / Find a Service

| Property                   | Detail                                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------------------- |
| **Route**                  | `/find-a-service/`                                                                                |
| **URL Pattern**            | `^\/find-a-service\/.*$`                                                                          |
| **Purpose**                | Browse and search for tradespeople by trade type and location                                     |
| **Form Fields**            | Trade category / service type (selector), Postcode / location                                     |
| **Content**                | Search results list — tradesperson cards                                                          |
| **Each Card Likely Shows** | Tradesperson name, rating (stars), review count, trade types, location, badge/verification status |
| **Actions**                | Tap → Tradesperson Profile (`/service-pro/*`)                                                     |
| **CTAs**                   | "Search", "Find"                                                                                  |
| **Permissions Used**       | None at this stage (location via typed postcode)                                                  |

---

### SCREEN 6 — Tradesperson / Service Pro Profile

| Property        | Detail                                                                                                          |
| --------------- | --------------------------------------------------------------------------------------------------------------- |
| **Route**       | `/service-pro/{id}` or `/service-pro/*`                                                                         |
| **URL Pattern** | `^\/service-pro\/.*$`                                                                                           |
| **Purpose**     | View a tradesperson's public profile                                                                            |
| **Content**     | Name, photo, trade types, location, reviews/ratings, years of experience, verification badges, past jobs/photos |
| **CTAs**        | "Request a Quote", "Message", "Post a Job to This Tradesperson"                                                 |
| **Actions**     | Leads to Post a Job, New Service Request, or Chat                                                               |

---

### SCREEN 7 — Post a Job

| Property                     | Detail                                                                                                 |
| ---------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Route**                    | `/post-a-job/*`                                                                                        |
| **URL Pattern**              | `^\/post-a-job\/.*$`                                                                                   |
| **Purpose**                  | Multi-step form for homeowners to post a job and receive quotes                                        |
| **Step 1 — Trade Category**  | Select trade type (e.g., Builder, Plumber, Electrician)                                                |
| **Step 2 — Job Description** | Text area: describe the job; icon: `tradesperson-add-outline`                                          |
| **Step 3 — Location**        | Postcode entry, address fields                                                                         |
| **Step 4 — Photos**          | Upload photos via camera or gallery (CAMERA + READ_EXTERNAL_STORAGE permissions)                       |
| **Step 5 — Confirmation**    | Summary of job details, submit                                                                         |
| **Form Fields**              | Trade category (dropdown/selector), Job title/description (textarea), Postcode, Address line 1, Photos |
| **CTAs**                     | "Continue", "Back", "Post Job", "Skip" (photos)                                                        |
| **Actions**                  | On submit → job is posted; receives quotes from tradespeople                                           |
| **Leads To**                 | Job Detail / My Jobs screen                                                                            |

---

### SCREEN 8 — Post Service Request

| Property        | Detail                                                        |
| --------------- | ------------------------------------------------------------- |
| **Route**       | `/post-service-request/*`                                     |
| **URL Pattern** | `^\/post-service-request\/.*$`                                |
| **Purpose**     | Alternative job posting flow (potentially simpler / streamed) |
| **Content**     | Similar to Post a Job but may be a lighter form               |
| **API**         | `/service-pro/new-service-request` endpoint                   |
| **CTAs**        | "Submit Request", "Back"                                      |
| **Leads To**    | Confirmation / My Jobs                                        |

---

### SCREEN 9 — My Jobs / Jobs Dashboard

| Property         | Detail                                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------------------------- |
| **Route**        | Under `/consumer/*`                                                                                           |
| **Purpose**      | List all jobs posted by the homeowner                                                                         |
| **Content**      | Job cards: title, trade category, status (open/in-progress/completed), number of quotes received, date posted |
| **Tabs/Filters** | Likely: Active, Completed, Archived                                                                           |
| **CTAs**         | "View Quotes", "Post New Job"                                                                                 |
| **Actions**      | Tap job → Job Detail screen; tap "View Quotes" → Quotes list                                                  |

---

### SCREEN 10 — Job Detail

| Property    | Detail                                                                            |
| ----------- | --------------------------------------------------------------------------------- |
| **Route**   | Under `/consumer/jobs/{id}` (inferred)                                            |
| **Purpose** | Full details of a single posted job                                               |
| **Content** | Job description, location, photos, status, list of quotes/interested tradespeople |
| **Actions** | Accept a quote, Message tradesperson, Edit job, Close job                         |
| **CTAs**    | "Accept Quote", "Message", "Edit Job", "Archive Job"                              |

---

### SCREEN 11 — Messages / Chat

| Property                  | Detail                                                                                             |
| ------------------------- | -------------------------------------------------------------------------------------------------- |
| **Route**                 | Under `/consumer/messages` (inferred)                                                              |
| **Purpose**               | In-app messaging between homeowner and tradespeople                                                |
| **Notification**          | Push: "You've received new messages in N conversations"                                            |
| **Notification Channel**  | `chat_new_unread_messages_title` = "New messages"                                                  |
| **Content**               | List of conversations; each shows tradesperson name, last message preview, timestamp, unread count |
| **Inside a Conversation** | Messages thread (chat-style), send text, possible image sharing                                    |
| **CTAs**                  | "Send", compose message input                                                                      |
| **Features**              | Unread badge on app icon; push notification on new message; in-app inbox                           |

---

### SCREEN 12 — Notifications / Inbox

| Property       | Detail                                                                     |
| -------------- | -------------------------------------------------------------------------- |
| **Route**      | Under `/consumer/notifications` (inferred)                                 |
| **Purpose**    | In-app notification centre (powered by Iterable)                           |
| **Content**    | List of past notifications (new quotes, messages, job status updates)      |
| **Push Types** | New message, New quote, Job update, App link notifications (APP_LINK type) |
| **Actions**    | Tap → deep link to relevant screen                                         |
| **Backend**    | Iterable SDK (`getInboxMessages`, `trackInboxSession`, `trackInAppOpen`)   |

---

### SCREEN 13 — Account / Profile

| Property                       | Detail                                                                                              |
| ------------------------------ | --------------------------------------------------------------------------------------------------- |
| **Route**                      | Under `/consumer/account` or `/consumer/profile`                                                    |
| **Purpose**                    | Homeowner's account management                                                                      |
| **Content**                    | Name, Email, Phone number, Address                                                                  |
| **Form Fields (Edit Profile)** | First name, Last name (honorific-prefix, honorific-suffix), Email, Phone, Address, Postcode         |
| **Actions**                    | Edit details, Change password, Notification preferences, Log out                                    |
| **CTAs**                       | "Save Changes", "Log Out", "Delete Account"                                                         |
| **Links**                      | Privacy Policy, Terms & Conditions (open via in-app browser via `react-native-inappbrowser-reborn`) |
| **Permissions**                | POST_NOTIFICATIONS (for push notification toggle)                                                   |

---

### SCREEN 14 — Notification Permission / Settings

| Property        | Detail                                                          |
| --------------- | --------------------------------------------------------------- |
| **Purpose**     | Request/manage push notification permission                     |
| **Checks**      | `RNNotificationsUtils.isPushEnabledAndroid()`                   |
| **Permissions** | `POST_NOTIFICATIONS`                                            |
| **Actions**     | Enable / disable; links to Android system notification settings |
| **CTAs**        | "Enable notifications", "Not now"                               |

---

### SCREEN 15 — In-App Browser (WebView)

| Property           | Detail                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------- |
| **Library**        | `com.proyecto26.inappbrowser` (react-native-inappbrowser-reborn) + React Native WebView     |
| **Purpose**        | Open web pages without leaving the app                                                      |
| **Used For**       | Terms & Conditions, Privacy Policy, payment pages, external links, possibly some flow steps |
| **Navigation Bar** | "Open in browser", "Copy link", "Share link" (`fallback_menu_item_*` strings)               |
| **Features**       | Chrome Custom Tabs on Android                                                               |

---

### SCREEN 16 — Error Screen

| Property    | Detail                                   |
| ----------- | ---------------------------------------- |
| **Route**   | `/error-page/create`                     |
| **Purpose** | Shown when an unrecoverable error occurs |
| **Content** | Error message, retry button              |
| **CTAs**    | "Try again", "Check again later!"        |
| **Actions** | Retry or navigate home                   |

---

## 5. PERMISSIONS & PLATFORM CAPABILITIES

| Permission                                        | Purpose                                   |
| ------------------------------------------------- | ----------------------------------------- |
| `INTERNET`                                        | All network calls                         |
| `CAMERA`, `CAMERA2`                               | Photo upload for job postings             |
| `READ_EXTERNAL_STORAGE`, `WRITE_EXTERNAL_STORAGE` | Photo picker for job postings             |
| `POST_NOTIFICATIONS`                              | Push notifications                        |
| `ACCESS_NETWORK_STATE`, `ACCESS_WIFI_STATE`       | Network connectivity monitoring           |
| `WAKE_LOCK`                                       | Background tasks / push handling          |
| `RECEIVE_BOOT_COMPLETED`                          | Restart background tasks after reboot     |
| `FOREGROUND_SERVICE`                              | Foreground notification service           |
| `VIBRATE`                                         | Notification vibration                    |
| `SCHEDULE_EXACT_ALARM`                            | Scheduled notifications                   |
| `ACCESS_NOTIFICATION_POLICY`                      | DND access for notifications              |
| Launcher badge permissions                        | App icon unread badge (many OEM-specific) |

---

## 6. THIRD-PARTY LIBRARIES & SDKs

| Library                                         | Purpose                                                |
| ----------------------------------------------- | ------------------------------------------------------ |
| **React Native** (New Architecture)             | Cross-platform mobile framework                        |
| **Hermes** (v96)                                | Compiled JavaScript engine                             |
| **Firebase FCM**                                | Push notification delivery                             |
| **Firebase App Distribution**                   | Beta distribution                                      |
| **Iterable SDK** (3.5.2)                        | Push/in-app/email messaging                            |
| **Notifee**                                     | Local notification management                          |
| **Sentry**                                      | Crash / error reporting (sample rate 20%, traces 0.5%) |
| **React Navigation**                            | Screen routing + deep links                            |
| **React Native Reanimated**                     | Animations                                             |
| **React Native Gesture Handler**                | Touch/gesture recognition                              |
| **React Native Keyboard Controller**            | Keyboard-aware layouts                                 |
| **react-native-safe-area-context**              | Safe area insets                                       |
| **@react-native-community/netinfo**             | Network status                                         |
| **react-native-webview**                        | In-app WebView                                         |
| **react-native-inappbrowser-reborn**            | Chrome Custom Tabs in-app browser                      |
| **react-native-splash-screen**                  | Splash screen                                          |
| **OkHttp3**                                     | HTTP networking                                        |
| **AndroidX Room**                               | SQLite local database (Iterable offline tasks)         |
| **AndroidX WorkManager**                        | Background task scheduling                             |
| **Shortcut Badger**                             | App icon badge (multi-OEM)                             |
| **Font Awesome** (brands/light/regular/solid)   | Icon library                                           |
| **Lato** (regular, bold, italic, bold-italic)   | Typography                                             |
| **Source Sans Pro** (regular, semibold, italic) | Typography                                             |
| **spapp.ttf**                                   | Custom app font                                        |

---

## 7. DESIGN SYSTEM

### Typography

| Font              | Weights                                    | Usage                                 |
| ----------------- | ------------------------------------------ | ------------------------------------- |
| `Lato`            | Regular, Bold, Italic, Bold Italic         | Primary body font                     |
| `Source Sans Pro` | Regular, SemiBold, Italic, SemiBold Italic | Secondary / UI font                   |
| `spapp.ttf`       | Custom                                     | App-specific icons (custom icon font) |
| `Font Awesome`    | Brands, Light, Regular, Solid              | General icons                         |
| Fallback stack    | `Roboto, Helvetica, Arial, sans-serif`     | System fonts                          |

### Theme

- `Theme.AppCompat.Light.NoActionBar` base (but React Native renders its own UI)
- `windowBackground`: dark material bg
- `colorPrimary`: material dark
- Uses React Navigation for all UI — Android native theme is minimal

### Orientation

- **Portrait only** (`screenOrientation="portrait"`)

### Screen Size Adaptations

- `values-h720dp` — tall screen overrides
- `values-large`, `values-xlarge` — tablet layouts
- `values-sw600dp` — 600dp+ smallest width (tablet)
- `values-land` — landscape (despite portrait lock, some resource variants exist)

---

## 8. NOTIFICATION ARCHITECTURE

### Push Notification Pipeline

1. **Firebase FCM** → receives token → forwards to **Iterable SDK**
2. **Iterable SDK** processes message → renders local notification via **Notifee**
3. `InstaproFirebaseMessagingService` delegates to `IterableFirebaseMessagingService`
4. On open: tracks event via `https://simple.notification-service.prod.mybldr.net/track-event/push-open`

### Notification Types

| Type                      | Content                                                        |
| ------------------------- | -------------------------------------------------------------- |
| **Chat / Messages**       | "You've received new messages in N conversations" (pluralised) |
| **New Quote**             | Tradesperson interested in your job (inferred)                 |
| **Job Update**            | Status change on posted job (inferred)                         |
| **App Link** (`APP_LINK`) | Deep link to specific screen                                   |
| **Ghost/Silent**          | Background data push (no visible notification)                 |

### Notification Features

- App icon badge count (`setAppIconBadgeNumber`, `clearAppIconBadgeNumber`)
- Badge support across: Samsung, Huawei, Sony, HTC, OPPO, Xiaomi, LG, ASUS, ZTE, etc.
- Notification channels (with customisable channel name, description)
- In-app messages (banner, modal, full-screen) via Iterable
- Embedded messages (within screens) via Iterable

---

## 9. DEEP LINK HANDLING FLOW

```
User taps link / notification → AndroidManifest intent-filter matches
  ↓
MainActivity.onCreate()
  ↓
React Navigation deep link config
  ↓
Pattern matching:
  /consumer/*       → Consumer/Dashboard sections
  /find-a-service/* → Find Tradesperson flow
  /post-a-job/*     → Post Job flow
  /post-service-request/* → Service Request flow
  /service-pro/*    → Tradesperson Profile
  (default)         → LandingPageUrl from API
```

---

## 10. CLONE REQUIREMENTS SUMMARY

To clone this app, you need:

### Backend Services

- [ ] Tradesperson/homeowner matching marketplace backend
- [ ] GraphQL API server
- [ ] `/Assets/api/envelope/ho-app-landingPageUrl` endpoint (dynamic landing)
- [ ] `/service-pro/new-service-request` endpoint
- [ ] Push notification delivery service (Iterable or equivalent)
- [ ] Notification tracking endpoint (equivalent to `mybldr.net/track-event/push-open`)
- [ ] Firebase project (FCM)
- [ ] Job posting, quote, messaging backend

### Frontend (React Native)

- [ ] React Navigation with deep linking
- [ ] `LandingPageUrlProvider` context (fetches landing URL from server)
- [ ] Screens: Landing, Auth (Login/Register), Home/Dashboard, Find a Service, Post a Job, Service Request, Tradesperson Profile, My Jobs, Messages/Chat, Notifications, Account/Profile, In-App Browser, Error
- [ ] Multi-step job posting form with photo upload
- [ ] In-app chat/messaging
- [ ] Push notification integration (Iterable or Firebase/custom)
- [ ] In-app notification inbox
- [ ] Badge count management

### Libraries to Install

```
react-navigation/native + stack + tab
react-native-reanimated
react-native-gesture-handler
react-native-safe-area-context
react-native-keyboard-controller
@react-native-community/netinfo
react-native-webview
react-native-inappbrowser-reborn
react-native-image-picker (camera/gallery)
react-native-splash-screenq
@notifee/react-native
@react-native-firebase/app
@react-native-firebase/messaging
@iterable/react-native-sdk
@sentry/react-native
react-native-device-info
```

### Fonts

- `Lato` (4 weights)
- `Source Sans Pro` (4 weights)
- `Font Awesome` (brands/light/regular/solid)
- Custom icon font (`spapp.ttf`) — app-specific icons

---
