---
layout: page
title: FPGA-Based Machine Learning Motion Detection System
description: ECE 352 Course Project
img: assets/img/fpga.jpg
importance: 3
category: university
related_publications: false
---

This semester-long project builds a complete FPGA-based activity monitor. Instead of treating each assignment as a separate deliverable, the flow is one cohesive system: a datapath for neural-style math, a serial receiver to ingest sensor data, and a controller that ties everything together into a live classifier.

<!-- [Image idea: final board hooked to 7-seg display or a clean system overview render] -->

## System Overview

At a high level, the design takes accelerometer data, runs a small neural-style pipeline, and displays the detected activity on a 7-segment display. The system emphasizes structured Verilog, reusable components, and a clean separation between datapath, control, and I/O.

## Architecture Highlights

- **Datapath math blocks:** signed multipliers, adders, and RELU units used as the building blocks for a small neural-style pipeline.
- **Pipelined MAC:** a two-stage multiply-accumulate pipeline with registered intermediate values to push clock frequency while managing latency.
- **Serial RX interface:** a lightweight UART-like receiver that samples mid-bit using counters and a small FSM to capture 4-bit sensor data.
- **Control logic:** a compact state machine that wakes, runs the compute steps, and returns to sleep with clock gating to save power.

<!-- [Image idea: block diagram showing serial RX, datapath, controller, and display] -->

## What It Does

The end result is a thigh-mounted activity monitor that classifies motion states (e.g., running, fidgeting, still) and shows the result on a 7-segment display. The build demonstrates end-to-end hardware design: from combinational building blocks, to sequential storage and timing, to full system integration.

## Design Notes

- Built and verified in the FPGA toolchain with simulation and on-board testing.
- Uses a staged datapath to balance throughput and latency.
- Emphasizes modular Verilog components that are easy to test and reuse.

## Repository

- https://github.com/SirAxolott/ECE352-AHW

## Opportunities for Images

- Toolchain screenshots (simulation waveforms or timing diagrams)
- Datapath/serial-RX FSM diagrams
- Final on-board demo with 7-seg output
