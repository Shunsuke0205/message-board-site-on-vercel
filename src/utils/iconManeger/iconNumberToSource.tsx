import { iconDictionary } from "./iconData";

export default function iconNumberToSource(iconNumber: number | null | undefined) {
  if (iconNumber === undefined || iconNumber === null || iconNumber === -1) {
    return "/user_icon/anonymous_user_icon.png";
  }

  if (iconNumber >= 0 && iconDictionary[iconNumber]) {
    return `/${iconDictionary[iconNumber].Directory}/${iconDictionary[iconNumber].fileName}`;
  }

  return "/user_icon/anonymous_user_icon.png";
}