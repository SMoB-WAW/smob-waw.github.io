# Strona laboratorium

Czysty HTML + CSS, bez generatora i bez kroku budowania. Działa tak samo na GitLab Pages i GitHub Pages.

```
index.html          treść strony (wszystkie sekcje)
assets/style.css    wygląd
assets/kymo.js      symulowany kymogram w nagłówku
.gitlab-ci.yml      publikacja na GitLab Pages
```

Edycja: wszystko w nawiasach `[...]` w `index.html` to miejsca do uzupełnienia.
Podgląd lokalny: otwórz `index.html` w przeglądarce.

## GitLab Pages

1. Utwórz projekt na gitlab.com:
   - nazwa `<login>.gitlab.io` → adres `https://<login>.gitlab.io`
   - dowolna inna nazwa → adres `https://<login>.gitlab.io/<nazwa>`
   (to samo dla grupy, np. grupa `smb-lab` → `https://smb-lab.gitlab.io`).
2. Wgraj pliki (łącznie z `.gitlab-ci.yml`) na gałąź główną.
3. Pipeline uruchomi się sam; po ~1 min strona jest dostępna.
   Adres i ustawienia: *Deploy → Pages*. Tam też wyłączysz opcję „unique domain”, jeśli adres ma mieć prostą postać.
4. Widoczność: *Settings → General → Visibility → Pages* = „Everyone”.

## GitHub Pages

1. Repozytorium `<login-lub-organizacja>.github.io`.
2. Wgraj pliki (`.gitlab-ci.yml` można pominąć).
3. *Settings → Pages → Source: Deploy from a branch → main / (root)*.

## Własna domena

Oba serwisy obsługują własną domenę z darmowym certyfikatem HTTPS
(np. subdomenę instytutu – wymaga wpisu DNS po stronie działu IT).

## Kymogram

Nagłówek pokazuje symulację. Aby wstawić prawdziwy kymogram, zapisz go jako `assets/kymo.png`
i w `index.html` zamień `<canvas …></canvas>` na
`<img src="assets/kymo.png" alt="opis" style="width:100%;display:block">`.
