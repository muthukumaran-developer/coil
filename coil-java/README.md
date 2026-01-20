# COIL — Java Implementation

COIL (Compact Object Interchange Layer) is a protocol-oriented encoding system
designed for LLM-efficient structured data transfer.

This is the Java core implementation.

## Compile

javac -d build src/com/coil/**/*.java

## Package

jar cf coil.jar -C build .

## Use

COIL.encode(data)
COIL.decode(data)
COIL.stats(original, encoded, decoded)

Author: Muthukumaran S
