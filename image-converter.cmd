FORFILES /p "public\producto" /M *.jpg /C "cmd /c IF EXIST @fname.webp (del @file) ELSE (echo @file por convertir)"
FORFILES /p "public\producto" /M *.jpeg /C "cmd /c IF EXIST @fname.webp (del @file) ELSE (echo @file por convertir)"
FORFILES /p "public\producto" /M *.png /C "cmd /c IF EXIST @fname.webp (del @file) ELSE (echo @file por convertir)"
FORFILES /p "public\producto" /M *.jpg /C "cmd /c %userprofile%\movil\cwebp.exe -q 50 @file -o @fname.webp"
FORFILES /p "public\producto" /M *.jpeg /C "cmd /c %userprofile%\movil\cwebp.exe -q 50 @file -o @fname.webp"
FORFILES /p "public\producto" /M *.png /C "cmd /c %userprofile%\movil\cwebp.exe -q 50 @file -o @fname.webp"
FORFILES /p "public\producto" /M *.jpg /C "cmd /c del @file"
FORFILES /p "public\producto" /M *.jpeg /C "cmd /c del @file"
FORFILES /p "public\producto" /M *.png /C "cmd /c del @file"