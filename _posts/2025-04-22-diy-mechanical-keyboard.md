---
layout: post
title: DIY Mechanical Keyboard Part 1
date: 2025-04-22
description: Make your own mechanical keyboard
tags: 
categories: post
---
# Your First Custom Keyboard PCB: A Step-by-Step Guide

So, you're ready to ditch the off-the-shelf options and build a keyboard that's *truly* yours? Awesome! Designing your own Printed Circuit Board (PCB) is a hugely rewarding part of the custom keyboard hobby. It might seem daunting initially, but breaking it down step-by-step makes it manageable.

This guide walks through my process for designing the **Switch Daughterboard** – the part that holds the keyswitches – using KiCad, a fantastic free and open-source tool. I opted for a two-board design: this Switch Daughterboard connects to a separate Main Logic Board housing the microcontroller (like a Raspberry Pi Pico). Why? Using a pre-made dev board saves complexity, but putting it directly on the main switch PCB would make the keyboard unnecessarily large. Stacking them keeps things compact!

Ready? Let's dive in!

---

## Phase 1: Planning Your Perfect Layout

Before touching any software, we need a clear plan.

### Step 1: Define Your Vision (Features & Form Factor)

What kind of keyboard do you want?
* **Size/Layout:** Full-size? Tenkeyless (TKL)? Compact 60%? Something unique like an Alice layout?
* **Special Features:** Want a rotary encoder (knob) for volume? An OLED screen? RGB LEDs? Extra macro keys?

Think about the core experience you want. For my first build, I aimed for a compact layout similar to a Keycool 84 but added a rotary encoder for volume control. Starting slightly simpler is often wise!

### Step 2: Design the Physical Layout with KLE

The **Keyboard Layout Editor (KLE)** ([https://www.keyboard-layout-editor.com/](https://www.keyboard-layout-editor.com/)) is the standard tool for visualizing and defining your physical key arrangement.

1.  **Visit KLE:** Open the website.
2.  **Start Designing:** You can start from scratch or load a template via the **Preset** menu. (I started with the **Keycool 84** preset and modified it).
3.  **Customize:** Arrange keys, adjust their sizes, and add labels.
    * **Key Properties:** Use the properties panel or the raw data tab. Properties like `{w:2}` define width, `{x:0.25}` adds horizontal spacing, `{a:4}` changes legend alignment. Study the syntax!
    * **My Layout:** I specifically left space in the top-left for my rotary encoder.
        ![Keyboard Layout](keyboard-layout.png)

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/keyboard_layout.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/10.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    A simple, elegant caption looks good between image rows, after each row, or doesn't have to be there at all.
</div>

4.  **Export:** Crucially, export your layout in **TWO formats**:
    * **`.json` file:** This contains the precise positional data we'll use later for placing components. ([My JSON for reference](keyboard-layout.json))
    * **`.png` file:** A visual reference helpful during the process.

### Step 3: Plan Your Electrical Matrix

Underneath the keycaps, keyboards use a grid (matrix) of rows and columns to detect keypresses. When you press a key, it connects a specific row wire to a specific column wire, telling the microcontroller which key was activated.

* **Visualize the Grid:** Look at your KLE layout PNG. Mentally (or physically, if you print it) overlay a grid connecting the *centers* of the keys. You decide how many rows and columns you need. Fewer rows/columns mean fewer pins required on your microcontroller, but the wiring can sometimes be more complex.
* **My Grid:** Here’s how I mapped out my rows and columns, assigning numbers starting from 0. Notice how the rotary encoder's *switch* function also occupies a spot in the matrix (Row 0, Col 15 in my case).
    ![Keyboard Matrix Grid](keyboard-matrix.jpeg)
* **Count Connections:** Note down the number of rows and columns. You'll also need connections for your encoder's rotation pins (A & B) and ground (GND). This count determines the size of the connector between the daughterboard and the main logic board.

---

## Phase 2: Schematic Design in KiCad

Now, let's translate our plan into an electrical blueprint using KiCad.

### Step 4: KiCad Setup (Installation & Resources)

1.  **Install KiCad:** Download and install it from the official website: [https://www.kicad.org/download/](https://www.kicad.org/download/)
2.  **Get Essential Libraries:** We need specific symbols (schematic representation) and footprints (PCB land pattern) for keyboard parts.
    * Download the **'ScottoKicad' library** files from [here](https://github.com/joe-scotto/scottokeebs/tree/main/Extras/ScottoKicad). Follow the instructions on that page to add them to KiCad's library manager. This gives us nice placeholder symbols and other useful bits.
3.  **Install Helpful Plugins:** Use KiCad's **Plugin and Content Manager** (Tools -> Plugin and Content Manager) to install:
    * `Fabrication Toolkit`: Useful for generating manufacturing files later.
    * `Keyswitch Kicad Library`: Provides many switch footprints.
    * `Keyboard footprints placer`: *Essential* for accurately placing switches and diodes based on your KLE file.
    ![KiCad Plugin Manager](plugin-content-manager-ss.png)

### Step 5: Building the Switch Daughterboard Schematic

1.  **Create Project:** Start a new KiCad project for your Switch Daughterboard. Open the schematic file (`<project_name>.kicad_sch`).
2.  **Place Basic Unit:**
    * Press `A` (Add Symbol).
    * Add `Placeholder_Keyswitch` and `Placeholder_Diode` (from the `scottokeebs` library).
    * Arrange them. The diode prevents "ghosting" (false keypresses). We'll connect one switch pin to the column, and the diode connects the other pin to the row.
        ![Single Switch/Diode Unit](unitcell.png)
3.  **Replicate for the Matrix:**
    * Select the switch and diode pair.
    * Copy (`Ctrl+C`) and Paste (`Ctrl+V`) this unit for *every single key* in your layout. Arrange them roughly mirroring your planned grid (from Step 3).
    * **Crucially:** Ensure the reference designators (S1, D1, S2, D2...) are sequential and without gaps. The placement plugin relies on this!
        ![Full Schematic Matrix Layout](schematic-matrix.png)
4.  **Wire Rows & Columns:**
    * Use the Wire tool (`W`).
    * Connect the designated switch pins together for each column.
    * Connect the diodes together for each row.
    * Add Global Labels (`Ctrl+L`): Label each row line (e.g., `ROW0`, `ROW1`...) and each column line (e.g., `COL0`, `COL1`...) according to your plan from Step 3.
        ![Wired and Labeled Matrix](column-row-matrix.png)
5.  **Add Rotary Encoder:**
    * Press `A`, find and add `RotaryEncoder_Switch`.
    * Wire it:
        * Pins `A` and `B` (rotation): Connect to global labels `PIN_A` and `PIN_B`.
        * Common pin (`C`): Connect to a `GND` power symbol (add one if needed).
        * Switch pins (`S1`, `S2`): Connect these *directly* into your matrix like any other switch. I connected mine to `ROW0` and `COL15`.
        * Add a `GND` global label to the ground connection as well.
        ![Rotary Encoder Wiring](rotaryencoder-switch.png)
6.  **Add Daughterboard Connector:**
    * **Calculate Pins:** Sum your rows + columns + encoder pins (`PIN_A`, `PIN_B`, `GND`). (My calculation: 16 cols + 6 rows + 3 encoder = 25 pins).
    * **Choose Connector:** Select a standard header size that fits your pin count. A 2xN pin header is common. I chose a 2x13 (26 pins) for some spare capacity, using the `Conn_02x13_Odd_Even` symbol.
    * **Place & Wire:** Add the connector symbol (`A` key). Wire each pin to the corresponding global label (`ROW0`, `COL0`, `PIN_A`, `GND`, etc.). Plan a logical pinout.
        ![Daughterboard Connector Wiring](connector-daughterboard.png)
7.  **Add Mounting Holes:**
    * Press `A`, add four `MountingHole` symbols. These will be used to screw the PCB into a case.

### Step 6: Assigning Physical Footprints

Now we link each schematic symbol to its physical counterpart on the PCB.

1.  **Open Tool:** Click the "Assign PCB footprints..." button on the top toolbar. ![Assign Footprint Button](assign-footprint-button.png)
2.  **Assign Footprints Window:** ![Assign Footprint Window](assign-footprint.png)
3.  **Diodes:**
    * Filter by `ScottoKeebs_Components` library (left pane).
    * Select all Diodes (D1, D2...) in the center pane.
    * Find and double-click `Diode_SOD-123` in the right pane.
4.  **Switches (Multi-step):**
    * **Default:** Filter by `PCM_Switch_Keyboard_Hotswap_Kailh`. Select *all* Switches (S1, S2...) in the center pane. Assign the standard 1u footprint: `SW_Hotswap_Kailh_MX_Plated_1.00u`.
    * **Custom Widths:** **Refer back to your KLE `.json` file!** Find keys with non-1 `"w"` values. Note the key's position and correlate it to the correct S# in your schematic.
    * **Assign Specifics:** Select *each non-1u switch individually* (e.g., S73). Find and assign the corresponding footprint based on its width (e.g., `SW_Hotswap_Kailh_MX_Plated_1.25u`, `SW_Hotswap_Kailh_MX_Plated_2.00u`, `SW_Hotswap_Kailh_MX_Plated_6.25u` for spacebar, etc.).
        * *My Specifics:* 
	        * S73,74,75=1.25u;
	        * S30,43=1.50u;
	        * S45,70=1.75u;
	        * S28=2.00u;
	        * S57,59=2.25u;
	        * S76=6.25u.
5.  **Rotary Encoder:**
    * Select the encoder symbol (RE1). Filter by `Rotary_Encoder` library. Assign `RotaryEncoder_Alps_EC11E-Switch_Vertical_H20mm_CircularMountingHoles`.
6.  **Connector:**
    * Select the connector symbol (J1). Filter by `Connector_PinSocket_2.54mm`. Assign the corresponding size, e.g., `PinSocket_2x13_P2.54mm_Vertical`. (P2.54mm is the standard 0.1" pitch).
7.  **Mounting Holes:**
    * Select the mounting hole symbols (H1-H4). Filter by `MountingHole`. Assign `MountingHole_4.3mm_M4` (for M4 screws) or `MountingHole_3.2mm_M3` (for M3). Choose based on your planned case hardware.

Click **OK** to save assignments. The schematic is logically complete!

---

## Phase 3: PCB Layout in KiCad

Time to arrange the physical components on the board.

### Step 7: Initial PCB Setup & Switch Placement

1.  **Open PCB Editor:** Go back to the main KiCad project window and open the `<project_name>.kicad_pcb` file.
2.  **Update from Schematic:** Click the "Update PCB from Schematic" button (or Tools menu). Approve the changes. All your footprints will appear, likely in a jumbled pile. Move this pile off the board area for now.
3.  **Place Switches Automatically:**
    * Click the **Keyboard Placer** plugin icon. ![Keyboard Placer Icon](keyboard-plugin.png)
    * **Configure:**
        * Browse and select your **KLE `.json` file**.
        * Set the **switch prefix** to **"S"**.
        * **IMPORTANT:** Make sure **diode placement options are OFF/disabled** for this run.
        * Click **OK**.
        ![Keyboard Placer Settings - Switches Only](kbplacer1.png)
    * The plugin will arrange *only the switch footprints* exactly matching your KLE layout. Magic!

### Step 8: Placing Diodes with Precision

We'll place the diodes relative to the switches using the plugin again, but first, we need to manually position *one* diode as a template.

1.  **Position D1 Relative to S1:**
    * Find the D1 footprint. (Tip: In the PCB editor, hover over an S1 pad and press `X` to highlight the connected net, which will include a pad on D1).
    * Select D1, press `M` (Move), and position it near S1 where you want it (e.g., just above or below).
    * Press `R` (Rotate) to orient it correctly (match the line on the footprint to the line on the schematic symbol).
    * Press `F` (Flip) to move it to the back layer (`B.Cu`). This is common practice.
        ![Switch and Diode Relative Position](switch-diode-position.png)
2.  **Place Remaining Diodes Automatically:**
    * Run the **Keyboard Placer** plugin again.
    * **Configure:**
        * Keep the same `.json` file.
        * This time, **ENABLE diode placement options**.
        * Set the **diode prefix** to "D".
        * The plugin should use the relative position of D1 to S1 as a template for all others.
        * Click **OK**.
        ![Keyboard Placer Settings - Diodes Enabled](kbplacer2.png)
    * All diodes should now snap into place relative to their corresponding switches.

### Step 9: Placing Remaining Components Manually

1.  **Rotary Encoder (RE1):**
    * Decide its exact location relative to nearby switches (e.g., centered between S14 and S15).
    * Use the **Measure Tool** (`Ctrl+Shift+M`): Click the center of a reference switch (like S15), then click the approximate center of the RE1 footprint. Note the `dx` and `dy` distances in the status bar. ![Measurement Tool Example](measurement-tool.png)
    * Select RE1, press `Shift+M` (Move Exactly), enter the measured `dx`/`dy` (watch the signs!), and click OK. You may need to adjust slightly or measure from a second reference point.
        ![PCB Arrangement with Encoder](pcb-arrangment1.png)
2.  **Connector (J1):**
    * Select J1, press `M`, and move it to your desired location (e.g., centered below the main key cluster, perhaps aligned vertically with a specific switch like S5). Use grid snapping or alignment tools.
        ![PCB Arrangement with Connector](pcb-arrangment2.png)
3.  **Mounting Holes (H1-H4):**
    * Select each hole (H1-H4), press `M`, and place them, typically near the corners or strategic points for case mounting. Ensure they don't overlap traces or components.

### Step 10: Routing the Traces (Connecting the Dots)

Now we draw the copper pathways (traces) connecting everything.

1.  **Select Tool:** Choose the **Route Tracks** tool (`X` key).
2.  **Select Layer:** Choose the layer to start on (e.g., `F.Cu` - front copper) in the Layers Manager panel.
3.  **Click and Route:** Click on a component pad. KiCad highlights the corresponding pad(s) it needs to connect to (the "ratsnest" lines). Route the trace by clicking along the path, and finally click the destination pad.
4.  **Switch Layers:** If you need to cross another trace, press `V` while routing. This places a **Via** (a plated hole connecting layers) and switches you to the other copper layer (`B.Cu` - back copper, usually). Press `V` again to switch back.
5.  **Connect Everything:** Methodically connect all pads indicated by the ratsnest lines – rows, columns, encoder pins, connector pins. Aim for neat routes and avoid very sharp angles.
6.  **Check Status:** Look at the bottom status bar. The "Unrouted" count **must be 0** when finished!
    ![Fully Routed PCB](wired-pcb.png)

### Step 11: Defining the Board Shape (Edge Cuts)

We need to tell the manufacturer where to cut the PCB.

1.  **Select Layer:** In the Layers Manager, select the **Edge.Cuts** layer.
2.  **Draw Outline:** Use the graphic tools (rectangle, line, arc) on the right toolbar to draw a *closed* shape around all your components and mounting holes. Leave a reasonable margin between the edge and any copper/components.

---

## Phase 4: Verification & Manufacturing Prep

Almost there! Just need to check our work and generate the files manufacturers need.

### Step 12: Final Checks & Exporting Gerbers

1.  **Design Rule Checker (DRC):**
    * Go to **Inspect -> Design Rules Checker**. Click **Run DRC**.
    * This checks for errors like traces too close, shorts, unconnected items, etc.
    * **Fix any errors reported.**
    * **Note:** You might see clearance errors related specifically to the switch footprints (like my 82 hole clearance violations). These often relate to the large holes in the hotswap sockets and are usually *safe to ignore* if they only concern the switch holes themselves. Address all *other* DRC errors.
2.  **3D Viewer:**
    * Press `Alt+3` (or View -> 3D Viewer). This gives a fantastic preview of your finished board. Check for any obvious physical conflicts.
3.  **Generate Manufacturing Files (Gerbers & Drill File):**
    * Go to **File -> Plot...**. ![Plot/Export Icon](export-pcb.png)
    * **Layers:** Ensure these layers are selected for plotting: `F.Cu`, `B.Cu`, `F.Mask`, `B.Mask`, `F.SilkS`, `B.SilkS`, `Edge.Cuts`. (Front/Back Copper, Solder Mask, Silkscreen, and the Outline).
    * **Plot:** Click **Plot**. This generates the Gerber files in a subfolder.
    * **Generate Drill File:** Click the **Generate Drill Files...** button in the Plot window. Use default settings and click **Generate Drill File**.
    * **Package:** Find the output folder containing all the generated `.gbr` and `.drl` files. Create a **ZIP archive** containing all of these files. This ZIP file is what you will upload to your chosen PCB manufacturer (like JLCPCB, PCBWay, etc.).

---

## You Did It! (Well, Part 1)

Congratulations! You've successfully designed the switch daughterboard PCB for your custom keyboard. That's a huge accomplishment!

The next steps in the overall project would be:

1.  Designing the **Main Logic Board** PCB (to hold the microcontroller and connect to this daughterboard).
2.  Designing or choosing a **Case**.
3.  **Ordering** the PCBs from a manufacturer using your Gerber ZIP file.
4.  **Sourcing** components (switches, diodes, encoder, controller, keycaps, etc.).
5.  **Assembling** the hardware.
6.  **Programming** the firmware (using QMK or ZMK, for example).

Take a break, celebrate this milestone, and get ready for the next phase of your custom keyboard adventure! Happy building!