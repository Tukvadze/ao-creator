Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

' Get script directory
scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)
backendDir = fso.BuildPath(scriptDir, "backend")

' Run backend in hidden window (0 = hidden, False = don't wait)
WshShell.Run "cmd /c cd /d """ & backendDir & """ && node server.js", 0, False
