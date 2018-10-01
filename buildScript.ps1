#npm install -g uglifyjs
ng build --env=azure;

cd dist;

uglifyjs vendor.bundle.js -o vendor.bundle.js -c -m;
uglifyjs main.bundle.js -o main.bundle.js -c -m;
uglifyjs styles.bundle.js -o styles.bundle.js -c -m;
uglifyjs scripts.bundle.js -o scripts.bundle.js -c -m;
uglifyjs polyfills.bundle.js -o polyfills.bundle.js -c -m;

$exclude = ("*.map");
$files = Get-ChildItem -Path $source -Exclude $exclude

Compress-Archive -Path $files -Force -DestinationPath ..\dist.zip;
