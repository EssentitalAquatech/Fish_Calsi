import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import uiTranslations from "./uiTranslations";

const normalize = (value) =>
  String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();

function AutoTranslate() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const translate = () => {
      const lang = i18n.language?.split("-")[0] || "en";
      const dictionary = uiTranslations[lang] || uiTranslations.en;

      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT
      );

      const textNodes = [];
      let node;

      while ((node = walker.nextNode())) {
        textNodes.push(node);
      }

      textNodes.forEach((textNode) => {
        const raw = textNode.nodeValue || "";
        const original = textNode.__i18nOriginal;
        const lastTranslated = textNode.__i18nLastTranslated;

        let source = original;

        if (!source || (raw !== lastTranslated && raw !== source)) {
          source = normalize(raw);

          if (!source) return;

          textNode.__i18nOriginal = source;
        }

        const translated =
          dictionary[source] ||
          uiTranslations.en[source] ||
          source;

        if (raw.trim() !== translated) {
          const leading = raw.match(/^\s*/)?.[0] || "";
          const trailing = raw.match(/\s*$/)?.[0] || "";

          textNode.nodeValue =
            leading + translated + trailing;
        }

        textNode.__i18nLastTranslated = translated;
      });

      const attributes = [
        "placeholder",
        "aria-label",
        "title",
        "alt",
      ];

      document
        .querySelectorAll(
          "input, textarea, select, option, button, a, img, [title], [aria-label]"
        )
        .forEach((element) => {
          attributes.forEach((attribute) => {
            if (!element.hasAttribute(attribute)) return;

            const current = element.getAttribute(attribute);
            if (!current) return;

            const original =
              element.dataset[`i18n${attribute.replace(/-/g, "")}`] ||
              current;

            if (!element.dataset[`i18n${attribute.replace(/-/g, "")}`]) {
              element.dataset[
                `i18n${attribute.replace(/-/g, "")}`
              ] = original;
            }

            const translated =
              dictionary[normalize(original)] ||
              uiTranslations.en[normalize(original)] ||
              original;

            element.setAttribute(attribute, translated);
          });
        });
    };

    translate();

    const observer = new MutationObserver(() => {
      translate();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, [i18n.language]);

  return null;
}

export default AutoTranslate;
