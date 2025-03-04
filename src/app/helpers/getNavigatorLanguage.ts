export function getNavigatorLanguage (date:Date){
    const browserLocale = navigator.language || "en-US";
    const formatted = date.toLocaleDateString(browserLocale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return formatted;
}