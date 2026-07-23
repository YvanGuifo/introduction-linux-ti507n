---
title: "No Linux installed? No worries — Codespace to the rescue!"
---

# No Linux installed? No worries — Codespace to the rescue!

!!! danger "IMPORTANT — Do not use Codespaces during class sessions"
    <span style="color:red; font-weight:bold; font-size:1.1em;">
    GitHub Codespaces must NEVER be used during class sessions.<br>
    During sessions, we will exclusively use <strong>MarioNum</strong> as our working environment.<br>
    Codespaces is reserved only for your personal work outside of sessions (revision, practice, lab preparation).
    </span>

!!! objectifs "Learning objective"
    This tutorial guides you step by step to access a **Linux terminal** directly from your browser, using **GitHub Codespaces**. You will be able to practice the course commands without having to install Linux on your machine.

!!! tip "Prerequisites"
    - A modern web browser (Firefox, Chrome, Edge…).
    - A stable internet connection.
    - A GitHub account (if you don't have one yet, follow **Step 1** below).

!!! info "What is GitHub Codespaces?"
    **GitHub Codespaces** is a cloud development environment provided by GitHub. It gives you a Linux virtual machine accessible from your browser, with an integrated terminal. Each GitHub account has a **free monthly quota** (60 hours for free accounts), which is more than enough for practicing the Linux commands from this course.

---

## Step 1: Create a GitHub account (if not already done)

If you already have a GitHub account, skip directly to **Step 2**.

1. Go to [https://github.com](https://github.com).
2. Click the **"Sign up"** button in the top right corner.
3. Fill in the required information:
    - **Email address**: preferably use your student email address.
    - **Password**: choose a strong password.
    - **Username**: choose a simple, professional name (e.g.: `firstname-lastname`).
4. Complete the verification captcha if prompted.
5. Click **"Create account"**.
6. GitHub will send you a **verification code** by email. Open your inbox, copy the code, and paste it into the GitHub form.
7. Once the code is validated, your account is created.

!!! tip "Tip"
    Remember to enable **two-factor authentication (2FA)** in your account settings to secure your access. GitHub requires it for some features.

---

## Step 2: Access GitHub Codespaces

1. Log in to your GitHub account at [https://github.com](https://github.com).
2. Go to the Codespaces page: [https://github.com/codespaces](https://github.com/codespaces).

---

## Step 3: Create a new Codespace with the "Blank" template

!!! warning "Warning"
    You **must** select the **"Blank"** template to get a minimal Linux environment suited for the course exercises. Do not use any other template.

1. On the [https://github.com/codespaces](https://github.com/codespaces) page, find the **"Explore quick start templates"** (or **"Start with a template"**) section.
2. Among the proposed templates, click on **"Blank"**.
3. GitHub will automatically create and start your Codespace. The operation may take a few seconds.
4. Once loading is complete, you will arrive at an interface that looks like a code editor (VS Code) directly in your browser.

---

## Step 4: Open the Linux terminal

1. In your Codespace interface, a **terminal** is normally open at the bottom of the screen.
2. If the terminal is not visible, open it with the keyboard shortcut:
    - ++ctrl+grave++ (the **`** key is located at the top left of the keyboard, below the **Esc** key)
    - Or via the menu: **Terminal** → **New Terminal**
3. You should see a **prompt** (command prompt) like this:
```bash
@your-name ➜ /workspaces/codespace-xxx $
```

!!! info "Note"
    The prompt you see in Codespaces may be slightly different from a classic Debian installation, but Linux commands work the same way.

---

## Step 5: Test your environment

Type the following commands in the terminal to verify everything works:

```bash
whoami
hostname
ls /
uname -a
```

You should get results similar to these:

- `whoami`: displays your username.
- `hostname`: displays the machine name.
- `ls /`: displays the contents of the Linux file system root.
- `uname -a`: displays information about the Linux kernel.

!!! success "Well done!"
    If the commands above execute correctly, your Linux environment is ready. You can now practice the commands covered in class!

---

## Step 6: Stop and resume your Codespace

### Stopping a Codespace

When you have finished your work session, **stop your Codespace** to preserve your free hours quota:

1. Go back to [https://github.com/codespaces](https://github.com/codespaces).
2. Find your active Codespace in the list.
3. Click the **three dots** (`...`) to the right of your Codespace.
4. Select **"Stop codespace"**.

### Resuming a Codespace

To resume your work later:

1. Go back to [https://github.com/codespaces](https://github.com/codespaces).
2. Click on the name of your existing Codespace to relaunch it.

!!! warning "Quota management"
    Each free GitHub account has **60 free hours** per month for Codespaces. Remember to **always stop** your Codespace when you are not using it. A Codespace left active consumes your quota even if you are not working on it.

### Deleting a Codespace

If you no longer need a Codespace:

1. On [https://github.com/codespaces](https://github.com/codespaces), click the **three dots** (`...`).
2. Select **"Delete"**.

---

## Summary

| Step | Action |
|------|--------|
| 1 | Create a GitHub account (if necessary) |
| 2 | Go to [github.com/codespaces](https://github.com/codespaces) |
| 3 | Create a Codespace with the **Blank** template |
| 4 | Open the terminal in the interface |
| 5 | Test with `whoami`, `hostname`, `ls /`, `uname -a` |
| 6 | Stop the Codespace after each session |

!!! danger "Reminder"
    <span style="color:red; font-weight:bold;">
    Codespaces is reserved for your personal work outside of class sessions.<br>
    During sessions, exclusively use MarioNum.
    </span>
