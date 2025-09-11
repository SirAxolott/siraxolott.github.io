---
layout: page
title: DIY Mechanical Keyboard
description: with background image
img: assets/img/keyboard.jpg
importance: 1
category: work
related_publications: true
---
# opkeyboard

  

A custom mechanical keyboard project designed and built by SirAxolott.

  

## Overview

  

This project features a 75% mechanical keyboard with a custom PCB, case, and fully programmable firmware using [QMK Firmware](https://qmk.fm/). The keyboard supports VIA for easy key remapping and configuration.

  
  
  

## Project Structure

  

- **Case/**  

   Contains the keyboard case design files, including STEP files for 3D modeling.

  

- **PCB/**  

   Includes PCB design files, Bill of Materials (BOM), and pick-and-place files for manufacturing.

  

- **Firmware/**  

   Houses the QMK firmware configuration, including keymaps and VIA support.

  
  

## Features

  

- **QMK Firmware**: Powerful open-source firmware for custom keyboards.

- **VIA Support**: Real-time key remapping using VIA software.

- **Rotary Encoder Support**: The keyboard features a single rotary encoder on the PCB, allowing you to assign custom actions such as volume control, scrolling, or other functions via QMK and VIA.

- **Custom Keymaps**: Easily modify key layouts in `keymaps/`.

- **Open Hardware**: All design files are open for modification and improvement.

  

## Getting Started

  

### 1. Building the Firmware

  

1. Set up the QMK build environment ([QMK Docs](https://docs.qmk.fm/#/newbs_getting_started)).

2. Clone this repository and navigate to the `Firmware` directory.

3. Build the firmware:

```sh
qmk compile -kb opkeyboard -km default
```

### 2. Flashing the Firmware

  

1. Enter bootloader mode (use the reset button or Bootmagic).

2. Flash the firmware:

```sh
   qmk flash -kb opkeyboard -km default
```

  

### 3. VIA Configuration

  

- Open VIA and load the `via.json` file from the `Firmware/` directory to enable advanced remapping.

  

## Maintainer

  

- [SirAxolott](https://github.com/SirAxolott)

  

## License

  

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

  

### Third-Party Licenses

  

- **QMK Firmware**: QMK is licensed under the GNU General Public License v2. See the [QMK License](https://github.com/qmk/qmk_firmware/blob/master/LICENSE).

- **VIA**: VIA configuration files are compatible with the VIA software, which is licensed under the MIT License. See the [VIA License](https://github.com/the-via/releases/blob/main/LICENSE).

  

---

  

For more information, see the [QMK Documentation](https://docs.qmk.fm/) and [VIA](https://usevia.app/).