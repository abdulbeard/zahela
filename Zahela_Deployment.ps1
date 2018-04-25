$currentLocation = $MyInvocation.MyCommand.Path
$currentLocation = (Split-Path $currentLocation);
Set-Location $currentLocation;

#remove old zahela.zip
Remove-Item -Path "./zahela.zip"

#do ng build
.\node_modules\.bin\ng.cmd build --prod --aot

$zipPath = "./zahela.zip"

#zip dir
Compress-Archive -Path ./dist/** -DestinationPath $zipPath


$username = "zahela"
$password = "3rdfigureskater"
$filePath = $zipPath
$apiUrl = "https://zahelatest.scm.azurewebsites.net/api/zipdeploy"
$base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(("{0}:{1}" -f $username, $password)))
$userAgent = "powershell/1.0"
Invoke-RestMethod -Uri $apiUrl -Headers @{Authorization=("Basic {0}" -f $base64AuthInfo)} -UserAgent $userAgent -Method POST -InFile $filePath -ContentType "multipart/form-data"

