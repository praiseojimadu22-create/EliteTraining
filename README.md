# ELITE TRAINING — BUILD GUIDE
Complete step-by-step instructions to build the APK and install it on your phone.

---

## WHAT YOU NEED
- A computer (Windows or Mac/Linux)
- Internet connection
- A free Expo account (you'll create one in Step 3)
- Your Android phone

---

## STEP 1 — INSTALL NODE.JS

Node.js is required to run the build tools.

**Windows:**
1. Go to https://nodejs.org
2. Download the "LTS" version (the button on the left)
3. Run the installer — click Next through all steps, keep all defaults
4. When it's done, open the Start menu, search for "Command Prompt", open it
5. Type this and press Enter to confirm it worked:
   ```
   node --version
   ```
   You should see a version number like `v20.x.x`

**Mac:**
1. Go to https://nodejs.org
2. Download the "LTS" version
3. Run the installer
4. Open Terminal (press Cmd+Space, type "Terminal", press Enter)
5. Type this and press Enter:
   ```
   node --version
   ```

---

## STEP 2 — INSTALL THE BUILD TOOLS

In your Command Prompt (Windows) or Terminal (Mac), type each line and press Enter:

```
npm install -g expo-cli
```
Wait for it to finish, then:
```
npm install -g eas-cli
```
Wait for that to finish too.

---

## STEP 3 — CREATE A FREE EXPO ACCOUNT

1. Go to https://expo.dev
2. Click "Sign Up" in the top right
3. Create a free account (no credit card needed)
4. Remember your username — you'll need it in Step 5

---

## STEP 4 — SET UP THE PROJECT

1. Extract the EliteTraining folder from the zip file to somewhere easy to find, e.g. your Desktop
2. In Command Prompt or Terminal, navigate to the project folder:

**Windows:**
```
cd Desktop\EliteTraining
```

**Mac:**
```
cd ~/Desktop/EliteTraining
```

3. Install all the project dependencies (this downloads the libraries the app needs):
```
npm install
```
This will take 2–5 minutes. You'll see a lot of text scrolling — that's normal.

---

## STEP 5 — LOG IN TO EXPO

In the same Command Prompt/Terminal window:
```
eas login
```
It will ask for your Expo username and password. Type them in (the password won't show as you type — that's normal). Press Enter.

---

## STEP 6 — CONFIGURE THE BUILD

Still in the same window:
```
eas build:configure
```
When it asks questions, press Enter to accept the defaults each time.

---

## STEP 7 — BUILD THE APK

```
eas build -p android --profile preview
```

This sends your code to Expo's cloud servers to build. You will see:
- A progress URL link — you can open it in your browser to watch the build
- The build takes approximately 10–20 minutes
- When it's done, it will print a download URL in the terminal

---

## STEP 8 — DOWNLOAD THE APK

Copy the download URL from the terminal (or from the Expo website) and open it in your browser.

The file that downloads will be named something like `elite-training-preview.apk`

---

## STEP 9 — INSTALL ON YOUR PHONE

**On your Android phone:**
1. Transfer the APK to your phone (via USB cable, WhatsApp to yourself, Google Drive, email, etc.)
2. On the phone, open Settings → Security (or Privacy)
3. Enable "Install from Unknown Sources" or "Allow this source" (exact wording varies by phone)
4. Find the APK file in your phone's Files app and tap it
5. Tap Install

The app will appear on your home screen as "Elite Training".

---

## IF YOU GET ERRORS

**"eas: command not found"**
→ Close the terminal, reopen it, and try again. If still failing, run `npm install -g eas-cli` again.

**"npm: command not found"**
→ Node.js didn't install correctly. Restart your computer and try Step 1 again.

**Build fails on Expo website**
→ Go to https://expo.dev, log in, go to your project, and check the build logs for the specific error. Feel free to share the error message.

---

## NOTES

- The app stores all data (schedule, progress) permanently on the phone using local storage.
  Nothing is sent to the internet — the app works fully offline after installation.
- If you need to wipe your schedule and start over, tap the ⚙ icon on the Schedule screen.
- Progress per session is saved automatically as you tap set checkboxes — no save button needed.
