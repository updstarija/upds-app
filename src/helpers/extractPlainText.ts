import { convert } from "html-to-text";

export const extractPlainText = (html: string) => {
  return convert(html);
};
