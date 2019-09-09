# Toggle Character

Toggle Character allows you to quickly toggle a character at the end of a given line

## Features

Adds the "Toggle Character" command, which can be mapped to keys. Calling this command
with no arguments will open up an input box to specify the character to be toggled. 
As an alternative, an argument may be passed to the command specifying the character
to be toggled.

If the character is present as the last character of the line, the character will be
deleted:
```
Test ; line 123;
<Toggle Character ;>
Test ; line 123
```

If the character is not present as the last character of the line, it will be added.
```
Test ; line 123
<Toggle Character ;>
Test ; line 123;
```