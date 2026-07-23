---
title: Installing a Linux distribution
---

# Installing a Linux distribution

## Installing a Linux distribution via VirtualBox on Windows and macOS

!!! objectifs "Learning objective"
    In this tutorial, you will learn how to install a Linux distribution (Debian 12) in a virtual machine using the **VirtualBox** software.

!!! tip "Prerequisites"

    Before you begin, make sure you have:

    - A stable internet connection
    - At least **10 GB of free disk space**
    - **VirtualBox** installed on your system:

        > **Windows** 
      
        > or **macOS (Intel processors)**
     
    - The Debian **ISO file** (disk image)

!!! warning "Apple Silicon chips (M1/M2/M3)"
    VirtualBox does not yet fully support Apple Silicon chips. For these machines, use UTM instead.

!!! info "Instructions"

    It is essential to follow the instructions carefully, as some steps are specific to Windows, macOS (Intel processor), or both. Make sure to follow the steps corresponding to your system.

    For installation on:
    
    - **Windows:** follow steps 1, 2, 3, 4, 5, 6, 7, 9
    - **macOS:** follow steps 1, 2, 3, 5, 6, 8, 9



### Step 1: Download VirtualBox

1. Go to the official website: [https://www.virtualbox.org](https://www.virtualbox.org)
2. Click the **Download VirtualBox** button.
![Download VirtualBox](../assets/img/vbox-download.png)
3. Choose the version suited to your operating system (Windows, macOS, Linux).
![VirtualBox version](../assets/img/OSVirtualBox-download.png)
4. Once the file is downloaded, **install VirtualBox** by following the installation wizard.

!!! info "Extension Pack"
    It is recommended to install the "VirtualBox Extension Pack" for additional features such as copy-paste between host and guest.

---

### Step 2: Download the Debian ISO image

1. Go to: [https://www.debian.org/](https://www.debian.org/)
2. Download the 64-bit version (amd64): **debian-12.11.0-amd64-netinst.iso**

![Download Debian](../assets/img/debian-download.png)

---

### Step 3: Create a virtual machine

1. Launch VirtualBox and click **"New"**.
![Create new VM](../assets/img/vbox-new.png)
2. Give your virtual machine a name (e.g. "**Debian12**").
3. Choose:
     - **Type:** Linux
     - **Version:** Debian (64-bit)
4. Then click **"Next"**.   
![VM settings](../assets/img/vbox-settings.png)


---

### Step 4: User settings configuration

!!! info "Note"

    **This step applies to Windows installations only.**
    
    Make sure the username is entirely in lowercase. 
    
    - **Example:** yvan
    - You can also keep the default username suggested

### Step 5: Allocate RAM

Allocate at least **2048 MB** (2 GB) if you have enough RAM.

!!! tip "Recommendation"
    Do not exceed 50% of your total memory.
![VM RAM](../assets/img/RAMs.png)



---


### Step 6: Create a virtual hard disk

1. Choose **"Create a virtual hard disk now"**.
2. Keep the default **VDI** (VirtualBox Disk Image) type.
3. Choose **dynamically allocated**.
4. Set a disk size of **10 GB or more**.
![VM virtual disk](../assets/img/VirtualDisks.png)
5. Review your **"Settings"**.
6. Then click **"Finish"**
![VM configuration](../assets/img/vbox-config.png)

### Step 7: Finalizing the installation on Windows

1. Once the installation is complete, enter your login credentials
![VM login settings](../assets/img/connexion_Windows.png) 
2. Close the various windows that appear.
3. Then click on **"Show Applications"**
4. You can then open the **"Terminal"**
![Terminal](../assets/img/terminal.png) 

### Step 8: Verify that the ISO image is inserted and finalize the installation on macOS

1. Once the VM is created, select it and click **"Settings"**.
![VM configurations](../assets/img/vbox-configs.png)
2. Go to the **"Storage"** tab.
3. Click on the empty drive and select **"Choose a disk file"**.
4. Select the downloaded Debian ISO.
![Debian ISO choice](../assets/img/vbox-isos.png)
5. Click **"Start"** to launch the VM.
6. The Debian installer will appear. Choose **Install** or **Graphical Install**.
![Debian install screen](../assets/img/debian-install-start.png)
7. Follow the steps:
    - Choose language, location, keyboard layout
    - Set the computer name
    - **Create user account + password** (use a simple lowercase name without spaces)
8. Partition the disk
    - Choose **Guided – use entire disk**
    - Select the suggested disk (**sda** usually)
    - Choose **All files in one partition**
    - Confirm with **Finish partitioning and write changes to disk**
9. System installation
    - The installation starts — wait for it to finish
    - Accept the **GRUB bootloader** installation if prompted
    - Finish and reboot the virtual machine
---

### Step 9: Final verification and testing

!!! info "To do"
    1. Once the installation is complete, remember to remove the installation ISO:
        - Go to "**Devices**" > "**Optical Drives**"
        - If the ISO image has not been removed (**debian-12.11.0-amd64-netinst.iso**), click on "**Remove disk**"
    2. Test a few commands:
    ```bash
        whoami
        hostname
        ls /
        uname -a
    ```

---
## Installing a Linux distribution via UTM on macOS (M1/M2/M3 chips)


!!! objectifs "Learning objective"
    Enable students to install a GNU/Linux Debian system in a virtualized environment suited for Macs with Apple Silicon chips (M1/M2/M3), in order to explore a free OS and practice safely.

### Prerequisites

Before you begin, make sure you have: 

- A **Mac with an Apple Silicon chip (M1, M2, or M3)**.
- At least **8 GB of RAM** and **20 GB of free space.**
- A good internet connection

### Step 1: Download and install UTM

1. Go to the official website: [https://mac.getutm.app/](https://mac.getutm.app/)
2. Click on Download
![UTM](../assets/img/UTM.png)
3. Open the .dmg file then drag UTM.app into your Applications folder.

### Step 2: Download Debian for ARM64

!!! warning
    Do not use an "**x86_64**" image, as it is incompatible with M1/M2/M3 chips without slow emulation.
    
1. Go to: [https://cdimage.debian.org/debian-cd/current/arm64/iso-cd/](https://cdimage.debian.org/debian-cd/current/arm64/iso-cd/)
2. Download the netinst version (click for example on **debian-12.11.0-arm64-netinst.iso**).
![ARM](../assets/img/ARM_Netinst.png)
3. Save the file in an accessible location (for example **Downloads**).


### Step 3: Create a new virtual machine in UTM

1. Open UTM.
2. Click + to create a new VM.
3. Click **Virtualize** (not Emulate).
4. Choose the Linux option, then select the previously downloaded file.
<img src="../assets/img/UtmLinux.png" alt="Installing Linux on UTM" width="500"/>
5. Click Continue.



### Step 4: Set memory, storage and create the VM

1. Allocate 4 GB of RAM (4096 MB).
2. Allocate at least 2 CPUs.
<img src="../assets/img/Materiel.png" alt="UTM" width="500"/>

3. Allocate at least 20 GB of storage.
4. Give it a name (e.g.: **Debian-UTM-M1**).
5. Click **Save**

### Step 5: Launch the virtual machine

1. Click on the VM in the list (e.g.: **Debian-UTM-M1**).
2. Click Play. 
<img src="../assets/img/ImageUTM.png" alt="UTM" width="500"/>
3. Click on "**Install**". Then follow the distribution installation instructions:
     - Language choice;
     - Automatic partitioning;
     - User creation;
     - Root password
4. Reboot once the installation is complete.

!!! tip
    If you see a black screen on reboot, shut down the VM, go to **Settings --> Drives** and remove the ISO.
    Then restart the virtual machine again. 

### Step 6: First use

1. Log in with your user credentials
2. Open the terminal (`Ctrl + Alt + T` or via the menu).
3. Type the following commands:
```bash
uname -a
lscpu
lsblk
```
4. Update the distribution:
```bash
sudo apt update && sudo apt upgrade
```
