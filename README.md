# Solvro Rekru

To repozytorium zawiera aplikację webową, która wykorzystuje zaawansowane funkcje, takie jak wyszukiwanie wektorowe. Aplikacja została zbudowana przy użyciu **Next.js** i **TypeScript**, zapewniając nowoczesną i wydajną infrastrukturę.

## Kluczowe funkcje

- **Wyszukiwanie wektorowe**: Umożliwia bardziej precyzyjne i relewantne wyniki wyszukiwania dzięki użyciu embeddingów.
- **Szybkość i skalowalność**: Dzięki **Next.js** i renderowaniu po stronie serwera, aplikacja jest zoptymalizowana pod kątem wydajności.
- **Dostosowany interfejs**: Responsywny design oparty na **Tailwind CSS**.

## Instalacja

1. Sklonuj repozytorium:
    ```bash
    git clone https://github.com/qamarq/solvro-rekru.git
    ```
2. Zainstaluj zależności:
    ```bash
    pnpm install
    ```
3. Uruchom serwer:
    ```bash
    pnpm dev
    ```

  Otwórz localhost:3000 w przeglądarce, aby zobaczyć aplikację.

  ## Stack technologiczny

  Aplikacja wykorzystuje następujące technologie:

- **Next.js**: Framework do renderowania po stronie serwera (SSR) i generowania statycznych stron (SSG).
- **React**: Biblioteka do budowy interfejsu użytkownika.
- **TypeScript**: Statyczne typowanie dla JavaScriptu, zapewniające większe bezpieczeństwo i lepszą organizację kodu.
- **Prisma**: ORM do zarządzania bazą danych, wspierający PostgreSQL.
- **PostgreSQL**: Relacyjna baza danych wykorzystywana do przechowywania danych aplikacji.
- **Rozszerzenie pgvector do PostgreSQL**: Rozszerzenie (na neon.tech) do wyszukiwania wektorowego
- **OpenAI Embedding models**: Modele do tworzenia embeddingów tesktu do wyszukiwania
- **Tailwind CSS**: Narzędzie do szybkiego tworzenia stylów, umożliwiające budowanie responsywnego interfejsu użytkownika.
- **Pnpm**: Menedżer pakietów dla Node.js, optymalizujący instalację zależności.
- **Vercel**: Platforma hostingowa dla aplikacji Next.js, umożliwiająca łatwe wdrożenia.
