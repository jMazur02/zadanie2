# zadanie2

#1 Ponieważ obraz musi wspierać dwie architektury (linux/arm64 i linux/amd64), podzieliłem proces w pliku YAML na etapy. Najpierw buduję obraz tylko lokalnie, korzystając z pobranego cache. Następnie skanuję go w poszukiwaniu luk. Jeśli wszystko jest w porządku, odpalam ostateczne budowanie dla obu architektur i wysyłam gotowy obraz do rejestru.  

#2 Do sprawdzenia bezpieczeństwa obrazu wybrałem skaner Trivy. Zdecydowałem się na niego, bo jest po prostu najprostszy w konfiguracji w porównaniu do np. Docker Scout. Wystarczyło dodać oficjalną akcję do skryptu, która automatycznie zatrzymuje cały proces, jeśli wykryje podatności na poziomie CRITICAL lub HIGH.

#3 Obrazy na GHCR: Używam standardowego tagu "latest", żeby łatwo pobierać najnowszą wersję, ale oprócz tego dodaję tag z hashem commita z Gita. Dzięki temu zawsze wiem, z jakiej dokładnie wersji kodu powstał konkretny obraz, co bardzo ułatwia szukanie błędów.  Cache na DockerHub : Dane cache trzymam na zewnętrznym, dedykowanym repozytorium na DockerHubie, pod stałym tagiem "buildcache". Wykorzystałem eksporter registry i tryb max, żeby zapisywać wszystkie warstwy tymczasowe. Zgodnie z poleceniem, łańcuch został uruchomiony i przetestowany. Skaner poprawnie wyłapał luki w obrazie bazowym i zablokował wysyłkę.
