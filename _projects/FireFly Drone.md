---
layout: page
title: FireFly Microdrone
description: Open-source microdrone firmware, control stack, and custom hardware.
img: assets/img/droneV0_1_front.png
importance: 1
category: electronics
related_publications: false
---
# firefly-drone

FireFly is an open-source microdrone project focused on an affordable, customizable platform. I led the firmware development, and the control package is handled by @ModernOctave. The current build uses a NodeMCU 1.0 (ESP8266 dev board) with an MPU6050 IMU, while future revisions aim to move to a native ESP8266 solution.

<!-- [Image idea: hero shot of the drone or a clean CAD render] -->

## Highlights

- Open-source microdrone platform with modular firmware and a ROS2 control stack
- Current controller: NodeMCU 1.0 (ESP8266 dev board)
- Current IMU: MPU6050
- Firmware built as component classes for easy swaps and upgrades
- ROS2 control package with joystick input and Docker deployment
- Custom 4-layer PCB in fabrication with dedicated GND and 5V planes

## Hardware Overview

### Controller and IMU

- **MCU:** NodeMCU 1.0 (ESP8266 dev board)
- **IMU:** MPU6050

Future versions plan to move from a dev board to a direct ESP8266 implementation for tighter integration and size reduction.

### PCB Progress

We prototyped on a perf board first, but it did not perform reliably. We suspect our soldering and interconnect quality were part of the issue, so we are moving to a custom PCB to stabilize the build.

The PCB has already been sent for manufacturing. It is a 4-layer design with dedicated GND and 5V planes to improve current delivery and provide better heat sinking.

<div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; align-items: flex-start;">
  <div style="max-width: 360px; text-align: center;">
    <img src="{{ "/assets/img/droneV0_1_front.png" | relative_url }}" alt="FireFly PCB render, front side" style="width: 100%; height: auto; display: block;">
    <div style="font-size: 0.9em; margin-top: 6px;">Front side</div>
  </div>
  <div style="max-width: 360px; text-align: center;">
    <img src="{{ "/assets/img/droneV0_1_back.png" | relative_url }}" alt="FireFly PCB render, back side" style="width: 100%; height: auto; display: block;">
    <div style="font-size: 0.9em; margin-top: 6px;">Back side</div>
  </div>
</div>

## Firmware

The firmware is organized into classes for each component (IMU, motor control, comms, etc.), which makes it straightforward to replace individual modules or swap in new hardware without a full rewrite.

<!-- [Image idea: firmware architecture diagram or class module map] -->

## Control Package

The control stack is in a separate ROS2 package maintained by @ModernOctave. It supports joystick input and runs via Docker for quick setup.

### Quick Run (Docker)

```bash
docker run --rm --network host --privileged \
  ghcr.io/firefly-microdrone/firefly-control:latest
```

Optionally set the connection target:

```bash
docker run --rm --network host --privileged \
  -e IP=192.168.0.1 -e PORT=80 \
  ghcr.io/firefly-microdrone/firefly-control:latest
```

<!-- [Image idea: joystick control UI or ROS2 node graph] -->

## Repositories

- https://github.com/FireFly-Microdrone/firefly-firmware
- https://github.com/FireFly-Microdrone/firefly-control

## Roadmap

- Validate the 4-layer PCB in flight tests
- Transition from NodeMCU dev board to a native ESP8266 module
- Iterate on IMU mounting, noise isolation, and power delivery

<!-- [Image idea: flight test photo or short GIF] -->
