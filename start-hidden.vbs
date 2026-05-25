Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

' Get script directory
scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)

' Run start.bat in hidden window
WshShell.Run """" & scriptDir & "\start.bat""", 0, False
