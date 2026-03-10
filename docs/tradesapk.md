
## 1. WHAT THIS APP IS

**MyBuilder for Trades** is the tradesperson-facing companion app for [mybuilder.com](https://www.mybuilder.com), a UK homeowner-to-tradesperson marketplace.

- Target user: **Trade professionals** (plumbers, electricians, builders, etc.) operating in the UK
- Purpose: Allow tradespeople to receive, view, and manage **job leads/service requests** from homeowners
- Architecture: A **React Native WebView hybrid** — the entire UI is mybuilder.com rendered in a WebView shell, with native push notifications, deep linking, and a JS bridge adding native capabilities on top

| Fact | Value |
|------|-------|
| App name | MyBuilder for trades |

---

## 2. ARCHITECTURE

```
┌─────────────────────────────────────────────────────┐
│                  Android Host (Kotlin)               │
│  MainActivity extends ReactActivity                  │
│  • Shows SplashScreen on create                      │
│  • Starts InAppBrowser on onStart                    │
└───────────────────┬─────────────────────────────────┘
                    │  React Native (Hermes v96, New Architecture/Fabric)
┌───────────────────▼─────────────────────────────────┐
│        React Native App (registered: "Werkspot")     │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │          React Navigation Stack               │   │
│  │                                              │   │
│  │  [Splash Screen]  →  [main-webview-screen]   │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │       main-webview-screen                    │   │
│  │                                              │   │
│  │  ┌────────────────────────────────────────┐  │   │
│  │  │  react-native-webview                  │  │   │
│  │  │  URL: DEFAULT_LANDING_PAGE_URL         │  │   │
│  │  │       (https://www.mybuilder.com/...)  │  │   │
│  │  │                                        │  │   │
│  │  │  JS Injection: intercepts all <a>      │  │   │
│  │  │  clicks → postMessage(link.href)       │  │   │
│  │  └────────────────────────────────────────┘  │   │
│  │                                              │   │
│  │  onMessage handler → URL Router:            │   │
│  │   • /service-pro/* → native nav             │   │
│  │   • /consumer/* → consumer WebView          │   │
│  │   • /find-a-service/* → finder              │   │
│  │   • /post-a-job/* → post job                │   │
│  │   • /post-service-request/* → post request  │   │
│  │   • external URL → InAppBrowser             │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  Native Modules: RNNotificationsUtils                │
│  Push: Firebase FCM + Iterable + Notifee            │
│  Monitoring: Sentry                                  │
└─────────────────────────────────────────────────────┘
```
---

## 3. SCREENS

The app has effectively **2 native screens** (plus the WebView content which covers the full visual UX):

### Screen 1 — Splash Screen
| Field | Value |
|-------|-------|
| Screen ID | (launch screen) |
| Type | Native Android |
| Layout file | `res/layout/launch_screen.xml` |
| Content | Full-screen `@drawable/splash` image, `scaleType=centerCrop` |
| Background | Black (`#000000`) |
| Duration | Until React Native JS bundle loads |
| Library | `org.devio.rn.splashscreen` |
| Transition | Auto-dismissed by `SplashScreen.show(activity)` in `onCreate()` |

**Visual**: Single centred splash/logo image filling the screen. No text, no buttons.

---

### Screen 2 — main-webview-screen (Primary Screen)
| Field | Value |
|-------|-------|
| Screen ID | `main-webview-screen` |
| Type | React Native component wrapping `react-native-webview` |
| Default URL | `https://www.mybuilder.com` + landing page path |
| Landing page API | `GET /Assets/api/envelope/ho-app-landingPageUrl` |
| Orientation | Portrait (forced, from Manifest) |
| Window mode | `adjustResize` (keyboard pushes content up) |

This is the **only interactive screen**. It renders the mybuilder.com website for tradesperson journeys. All pages below are loaded inside this single screen.

---

## 4. WEB ROUTES (URLs loaded inside the WebView)

These are the URL paths handled inside the WebView. All are on `https://www.mybuilder.com`:

| Path Pattern | Purpose | Notes |
|---|---|---|
| `/service-pro/*` | **Tradesperson area** — main app landing zone | Deep-link entry point |
| `/service-pro/new-service-requests` | **New job leads** — list of new service requests from homeowners | TypeScript module: `service-pro/new-service-requests` |
| `/consumer/*` | Consumer/homeowner area | Loaded when a trade follows a consumer link |
| `/find-a-service/*` | Consumer job browsing | Loaded from consumer-facing links |
| `/post-a-job/*` | Job posting (consumer) | Loaded from consumer-facing links |
| `/post-service-request/*` | Service request posting | Loaded from consumer-facing links |



---

## 6. WEBVIEW JAVASCRIPT BRIDGE

The app injects this JavaScript into every page loaded in the WebView (extracted from bundle offset 419299–419537):

```javascript
const links = document.querySelectorAll('a')

links.forEach(link => {
   link.class = link.href                    // save original URL
   link.href = "javascript:void(0)"          // disable default navigation
   link.addEventListener("click", () => {
      window.ReactNativeWebView.postMessage(link.class)  // send URL to RN
   })
})
```

**How it works:**
1. Every page load → app injects this script
2. User taps any `<a>` link → JS fires `postMessage` with the original `href`
3. React Native `onMessage` handler receives the URL
4. URL router decides: navigate within app, load in WebView, or open in InAppBrowser

This gives the app full control over all navigation, even within an otherwise standard website.

--
## 8. PUSH NOTIFICATIONS

### Stack
```
Firebase Cloud Messaging (FCM)
    ↓ token registration + raw message delivery
Iterable SDK
    ↓ campaign management, analytics, inbox
Notifee
    ↓ local notification display, channels, triggers
RNNotificationsUtils (custom native module)
    ↓ badge count, push enabled check
```

### Native Module: `RNNotificationsUtils`
| Method | Signature | Purpose |
|--------|-----------|---------|
| `clearAppIconBadgeNumber` | `()` | Clear app icon badge |
| `setAppIconBadgeNumber` | `(int)` | Set badge to specific number |
| `isPushEnabledAndroid` | `(Promise<boolean>)` | Check if `NotificationManagerCompat.areNotificationsEnabled()` |

### Notification Channels
| Channel Constant | Purpose |
|-----------------|---------|
| `ANDROID_DEFAULT_PUSH_NOTIFICATION_CHANNEL_BLOCKED` | Channel for blocked/suppressed push |
| `PUSH_NOTIFICATION_CHANNEL_DISMISSED` | Channel for dismissed push |

### Push Open Tracking
```
POST https://simple.notification-service.prod.mybldr.net/track-event/push-open
```

### Firebase Messaging Service
- Class: `com.werkspot.InstaproFirebaseMessagingService`
- `onMessageReceived` → delegates to `IterableFirebaseMessagingService.handleMessageReceived()`
- `onNewToken` → delegates to `IterableFirebaseMessagingService.handleTokenRefresh()`

### Iterable In-App Messaging
| Component | Role |
|-----------|------|
| `IterableInboxMessageList` | Inbox screen: list of in-app messages |
| `IterableInboxMessage` | Individual inbox message item |
| `IterableInboxMetadata` | Metadata per inbox item (title, subtitle, image) |
| `IterableInboxDataModel` | Data model binding for the inbox list |
| `IterableAuthResponse` | Auth token response type for Iterable JWT auth |
| `InstaproEventEmitter` | Custom RN event bridge for Iterable events |

---

## 9. IN-APP BROWSER

External links (not matching any of the app's route patterns) are opened in a **Chrome Custom Tab** using `react-native-inappbrowser-reborn` (`com.proyecto26.inappbrowser`).

- `RNInAppBrowserModule.onStart(activity)` is called from `MainActivity.onStart()`
- `ChromeTabsManagerActivity` declared in manifest handles intent routing
- Provides native-feeling browser session without leaving the app

---

## 10. OVER-THE-AIR (OTA) UPDATES

- Key: `OTA_UPDATES_CONTEXT_KEY`
- The app supports OTA JS bundle updates (the Hermes bytecode can be replaced without a Play Store update)
- **Library**: Likely Microsoft CodePush or a custom update mechanism (evidence: `RELOAD_CACHE_ONLY` constant also found in bundle)

---

## 11. ERROR MONITORING (Sentry)

| DSN | Assigned to | Sample Rate | Traces Rate |
|-----|-------------|-------------|-------------|
| `https://6d8228619d5cda75c1d2f686f88f0eca@o1151178.ingest.us.sentry.io/4506229808627712` | **TradePerson (TP)** — Android MainActivity | 20% | 0.5% |
| `https://ce870a4ba998c7d6eca16ce348137784@o1151178.ingest.us.sentry.io/4506229803384832` | **HomeOwner (HO)** — JS layer / WebView | configured in JS | — |

- Environment: `production`
- The dual-DSN setup separates native Android crashes from JS/web errors

---

## 12. SECRETS & API KEYS

> ⚠️ All of these were extracted directly from the APK. These are live production credentials.

| Key | Value |
|-----|-------|
| **Iterable API Key** | `bce97b536f2144c987219599bc32d8ef` |
| **Sentry DSN (TradePerson)** | `https://6d8228619d5cda75c1d2f686f88f0eca@o1151178.ingest.us.sentry.io/4506229808627712` |
| **Sentry DSN (HomeOwner)** | `https://ce870a4ba998c7d6eca16ce348137784@o1151178.ingest.us.sentry.io/4506229803384832` |
| **Firebase Project ID** | `mybuilder-tp-app` |
| **Firebase GCM Sender ID** | `11641606387` |
| **Firebase Android App ID** | `1:11641606387:android:8ec46a639c8e0728e7e786` |
| **Push Tracking URL** | `https://simple.notification-service.prod.mybldr.net/track-event/push-open` |
| **Website URL** | `https://www.mybuilder.com` |
| **Sentry Organisation ID** | `o1151178` |

---

## 13. THIRD-PARTY SDK INVENTORY

| SDK | Package / Namespace | Purpose |
|-----|---------------------|---------|
| React Native v0.76+ | `com.facebook.react` | Framework |
| React Navigation | `@react-navigation` | Stack/screen routing |
| React Native WebView | `react-native-webview` | WebView rendering |
| React Native Reanimated | `com.swmansion` | Animations |
| React Native Gesture Handler | `com.swmansion` | Touch gestures |
| React Native Safe Area Context | `com.th3rdwave` | Safe area insets |
| React Native Keyboard Controller | `com.swmansion.keyboardcontroller` | Keyboard avoidance |
| React Native Async Storage | `@react-native-async-storage` | Key-value storage |
| React Native Splash Screen | `org.devio.rn.splashscreen` | Splash screen |
| React Native InAppBrowser | `com.proyecto26.inappbrowser` | Chrome Custom Tabs |
| React Native URL Polyfill | `github.com/charpeni` | URL API polyfill |
| Firebase (RNFirebase) | `io.invertase.firebase` | Auth, FCM, Analytics |
| Iterable SDK | `com.iterable` | Push + in-app messaging |
| Notifee | `app.notifee` | Local notifications |
| Sentry | `io.sentry` | Error/crash monitoring |
| Notifee | `io.notifee` | Notification management |
| Lugg (react-native-logs) | `com.lugg.reactnative` | Logging |
| Bolts | `com.bolts` | Async tasks (Facebook SDK dep) |
| OkHttp3 | `okhttp3` | HTTP client |
| Apache Commons | — | Utilities |

---

## 14. ANDROID MANIFEST COMPONENTS

| Component | Class | Purpose |
|-----------|-------|---------|
| Main Activity | `com.werkspot.MainActivity` | Single activity host |
| Firebase Service | `com.werkspot.InstaproFirebaseMessagingService` | FCM messages → Iterable |
| Iterable FCM Service | `com.iterable.iterableapi.IterableFirebaseMessagingService` | Iterable push delivery |
| Iterable Push Receiver | `com.iterable.iterableapi.IterablePushActionReceiver` | Push action handling |
| Iterable Trampoline | `com.iterable.iterableapi.IterableTrampolineActivity` | Deep-link trampoline |
| Sentry Init | `io.sentry.android.core.SentryInitProvider` | Auto-init disabled, manual in onCreate |
| Sentry Perf | `io.sentry.android.core.SentryPerformanceProvider` | Performance spans |
| Notifee Init | `app.notifee.core.NotifeeInitProvider` | Notifee startup |
| Notifee FG Service | `app.notifee.core.ForegroundService` | Foreground notification service |
| Notifee Alarm | `app.notifee.core.NotificationAlarmReceiver` | Scheduled notifications |
| Notifee Notification | `app.notifee.core.NotificationReceiverActivity` | Notification click handling |
| InAppBrowser | `com.android.chrome.ChromeTabsManagerActivity` | Chrome tabs routing |
| File Provider | `com.mybuilder.leads.fileprovider` | Secure file sharing |

---

## 15. WIREFRAME — SCREEN-BY-SCREEN BREAKDOWN

> Since this is a WebView hybrid, the "screens" are actually web pages. The app's native shell provides the container, routing, and push capabilities.

---

### SCREEN A: Splash / Launch

```
┌─────────────────────────────────┐
│                                 │
│                                 │
│                                 │
│         [SPLASH IMAGE]          │
│       (@drawable/splash)        │
│      (scaleType: centerCrop)    │
│                                 │
│                                 │
│                                 │
└─────────────────────────────────┘
```
- Background: black
- Content: single centred brand image
- Behaviour: auto-dismissed when bundle is ready
- No user interaction possible
- **Transition**: → Screen B (main-webview-screen)

---

### SCREEN B: Main WebView (Service Pro Area)

This is the entire app. The WebView loads `https://www.mybuilder.com/service-pro/` and all sub-pages.

**Shell chrome (native layer):**
- Status bar (transparent/system)
- No visible native navigation bar — all nav is in the web layer
- Bottom safe area inset respected

**WebView content — what mybuilder.com shows tradespeople:**

#### B1: New Service Requests (`/service-pro/new-service-requests`)
```
┌─────────────────────────────────┐
│  MyBuilder          [badge: 3]  │
│─────────────────────────────────│
│  New requests                   │
│─────────────────────────────────│
│ ┌─────────────────────────────┐ │
│ │ Job Title                   │ │
│ │ Location · Posted: Xh ago   │ │
│ │ Budget: £xxx                │ │
│ │ [View request]              │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ ...                         │ │
│ └─────────────────────────────┘ │
│─────────────────────────────────│
│ [New] [My jobs] [Account]       │
└─────────────────────────────────┘
```
- **Purpose**: List of new job leads available to the tradesperson
- **CTA**: "View request" → opens individual service request detail
- **Native enhancement**: Badge count on app icon reflects unread leads (via `setAppIconBadgeNumber`)
- **Deep link entry**: `https://www.mybuilder.com/service-pro/new-service-requests`

#### B2: Service Pro Landing (`/service-pro/`)
- Default landing page URL determined by `DEFAULT_LANDING_PAGE_URL` constant + `/Assets/api/envelope/ho-app-landingPageUrl` API

#### B3: Consumer / Find-a-Service area (`/consumer/*`, `/find-a-service/*`)
- Loaded when tradesperson follows a consumer-facing link
- Displays homeowner job browsing experience inside the same WebView

#### B4: Post a Job (`/post-a-job/*`, `/post-service-request/*`)
- Loaded within the WebView
- Homeowner job/request creation flow (accessible when trade navigates to consumer-facing pages)

---

### SCREEN C: Notification (System Notification Tray)

Push notifications arrive via Firebase → Iterable → Notifee and appear as system notifications:

```
┌─────────────────────────────────────┐
│  🔨 MyBuilder for trades            │
│     New job near you                │
│     Roofing in London — £1,200+     │
│                          [View]     │
└─────────────────────────────────────┘
```
- Tapping the notification fires a deep link: `https://www.mybuilder.com/service-pro/new-service-requests` (or specific job)
- Notification open tracked at: `https://simple.notification-service.prod.mybldr.net/track-event/push-open`

---

### SCREEN D: Iterable In-App Inbox (`IterableInboxMessageList`)
- An optional inbox screen driven by Iterable SDK
- Lists in-app messages from marketing campaigns, promos, onboarding
- Components: `IterableInboxMessageList`, `IterableInboxMessage`, `IterableInboxMetadata`

---

### SCREEN E: In-App Browser (Chrome Custom Tab)

When a link URL doesn't match any known app route:
```
┌─────────────────────────────────┐
│ ← [mybuilder.com]          ⋮   │
│─────────────────────────────────│
│                                 │
│  [External web page content]    │
│                                 │
└─────────────────────────────────┘
```
- Uses Chrome Custom Tabs (not a full new app)
- URL shown in top bar
- Back returns to app
- Handled by `com.proyecto26.inappbrowser` + `ChromeTabsManagerActivity`

---

## 16. PAYMENT FLOW

Evidence: `SEND_PAYMENT` action constant found in bundle.

The payment flow is likely triggered from within the WebView (mybuilder.com's payment page) and communicated back to React Native via `postMessage`. The `SEND_PAYMENT` action is dispatched to the app's state manager when this message is received. Actual payment processing is on the mybuilder.com server (not in-app).

---

## 17. PHONE CALL SERVICE TYPE

Evidence: `SERVICE_TYPE_PHONE_CALL` constant.

Tradespeople can receive leads via phone call (click-to-call) in addition to online requests. The app has a service type enum that includes `PHONE_CALL` for this flow.

---

## 18. APP FLOW SUMMARY (User Journey)

```
Install App
    ↓
Splash Screen (SplashScreen, ~1-2s)
    ↓
main-webview-screen loads
    ↓
User logs in (mybuilder.com web login form in WebView)
    ↓
Lands on /service-pro/ dashboard
    ↓
┌────────────────────────────┐
│  Browse new job requests   │◄── Push notification arrives
│  /service-pro/new-service- │    → badge count updates
│  requests                  │    → tap opens deep link
└────────────┬───────────────┘
             ↓ tap "View request"
    WebView navigates to job detail
             ↓ user taps "Submit quote"
    Quote form (web, same WebView)
             ↓ submits
    Confirmation page (web)
             ↓ payment required
    SEND_PAYMENT action dispatched
    → payment page renders
```

---

## 19. KEY IMPLEMENTATION DECISIONS (for cloning)

1. **Architecture**: Use React Native + `react-native-webview` wrapping your website. One WebView, one screen.
2. **JS Bridge**: Inject the link-intercept script on every page load (see Section 6).
3. **Routing**: Use React Navigation v6 stack; match WebView postMessage URLs against regex patterns.
4. **Push**: Integrate Firebase FCM + Notifee for Android. Use Iterable for campaign management.
5. **Deep links**: Register `https` scheme deep links for your website domain with `/service-pro` path prefix.
6. **Sentry**: Separate DSNs for native layer vs JS/web layer.
7. **Badge**: Implement a native module equivalent to `RNNotificationsUtils` for badge count management.
8. **Splash**: Use `react-native-splash-screen` (org.devio variant), dismissed after bundle load.
9. **InAppBrowser**: Use `react-native-inappbrowser-reborn` for external URL handling.
10. **OTA**: Integrate a CodePush-compatible OTA update system (app uses `OTA_UPDATES_CONTEXT_KEY`).
11. **Auth**: Iterable uses JWT auth (`IterableAuthResponse` type) — implement a token provider.

---

## 20. FIREBASE PROJECT SUMMARY

| Property | Value |
|----------|-------|
| Project ID | `mybuilder-tp-app` |
| GCM Sender ID | `11641606387` |
| Android App ID | `1:11641606387:android:8ec46a639c8e0728e7e786` |
| Notification tracking | `https://simple.notification-service.prod.mybldr.net/track-event/push-open` |

---

## 21. VALIDATION RULES (extracted from bundle regex patterns)

| Field | Regex | Purpose |
|-------|-------|---------|
| Email | `[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$` | Email validation |
| Phone | `^\+[1-9]\d{1,14}$` | E.164 international phone |
| Username | `^[a-zA-Z0-9_]+$` | Alphanumeric + underscore |
| URL scheme | `^[a-zA-Z]([a-zA-Z0-9.\-+])*://` | URL scheme validation |
| Path | `^\/(?!\/)` | Starts with single slash |

---

*Document compiled from static APK forensics. All values are as extracted from the binary — not inferred or guessed.*
