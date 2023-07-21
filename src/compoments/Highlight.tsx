import { useRef, useState, useEffect } from "react";
import highlight from "highlight.js/lib/common";

import { Languages, Themes } from "../types/types";

interface Props {
  code: string;
  theme: Themes;
  id: string;
  language?: Languages;
  allowAutodetect?: boolean;
}

const Highlight = ({
  code,
  theme,
  id,
  language,
  allowAutodetect = true,
}: Props) => {
  const [matchedLanguage, setMatchedLanguage] = useState("");
  const currentTheme = useRef<string | null>(null);

  useEffect(() => {
    const defaultUrl = "https://d1h56rorfvvwux.cloudfront.net";
    const cssPath = `${defaultUrl}/${theme}.css`;

    if (!theme) return;
    if (currentTheme.current !== theme && currentTheme.current) {
      const currentStyleElement = document.querySelectorAll(
        `#${currentTheme.current || ""}`
      );
      currentStyleElement.forEach((el) => el.remove());
    }

    const styleElement = document.createElement("link");
    styleElement.setAttribute("href", cssPath);
    styleElement.setAttribute("type", "text/css");
    styleElement.setAttribute("rel", "stylesheet");
    styleElement.setAttribute("id", theme);
    document.head.appendChild(styleElement);

    currentTheme.current = theme;
  }, [theme]);

  useEffect(() => {
    const foundLangauge = allowAutodetect && highlight.highlightAuto(code);
    if (!language && foundLangauge) {
      setMatchedLanguage(foundLangauge.language ?? "");
    }
    highlight.highlightAll();
  }, [code, theme, id, language, allowAutodetect]);

  useEffect(() => {
    highlight.highlightAll();
  }, [matchedLanguage]);

  if (!code) return null;

  return (
    <pre id={id}>
      <code
        className={`${
          language
            ? `language-${language}`
            : matchedLanguage
            ? `language-${matchedLanguage}`
            : ""
        }`}
      >
        {code}
      </code>
    </pre>
  );
};

export default Highlight;
