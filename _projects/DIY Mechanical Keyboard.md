---
layout: page
title: DIY Mechanical Keyboard
description: A customizable home-made keyboard
img: assets/img/keyboard.jpg
importance: 1
category: fun
related_publications: true
---
# opkeyboard

A 75 percent custom mechanical keyboard with a two-PCB stack, QMK firmware, and VIA support.

## Highlights

- 75 percent layout in a compact footprint
- Two-PCB stack: switchboard (daughterboard) + main board (dev board carrier)
- Raspberry Pi Pico (RP2040) as the controller
- Sandwich mount with pin-connector socket between boards for easy swaps
- QMK firmware with VIA for quick remapping
- Rotary encoder support in the design

## Hardware Overview

### PCB Stack

- **Switchboard (daughterboard):** holds the switches and routes the matrix
- **Main board:** carries the Raspberry Pi Pico and interfaces with the switchboard
- **Interconnect:** pin-connector socket between the two boards

This split design is intended for reverse compatibility. If the controller changes in a future revision, the switchboard can remain the same while only the main board is updated.

### Controller

- **MCU:** Raspberry Pi Pico (RP2040)

### Case and Mount

- Sandwich mount with the PCB stack captured between the top and bottom case

## Firmware

- **Firmware:** QMK
- **Configuration:** VIA (load the provided `via.json`)

### Build

1. Install and set up QMK:
   - https://docs.qmk.fm/#/newbs_getting_started
2. From the firmware directory:

```sh
qmk compile -kb opkeyboard -km default
```

### Flashing (QMK)

There are two common ways to flash:

**Option A: QMK flash command**

1. Put the board into bootloader mode (hold BOOTSEL while plugging in the Pico, or use the reset button if available).
2. Flash with QMK:

```sh
qmk flash -kb opkeyboard -km default
```

**Option B: UF2 drag and drop**

1. Put the Pico into bootloader mode.
2. A drive named `RPI-RP2` appears.
3. Copy the compiled UF2 file to that drive.

### VIA Setup

1. Open https://usevia.app/
2. Load the `via.json` from the firmware folder.
3. Remap keys and encoder behavior.

## Project Structure

- `Case/` - case CAD files (STEP)
- `PCB/` - PCB files, BOM, and assembly outputs
- `Firmware/` - QMK firmware and VIA config

## Known Issues

- Case height is taller than desired
- Main board v1.1 has a rotary encoder design error; a v1.2 revision is in progress

## Roadmap

- Per-key addressable RGB LEDs
- Improved case height and fit

## License

MIT