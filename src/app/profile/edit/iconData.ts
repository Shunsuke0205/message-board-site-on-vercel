export interface IconData {
  iconNumber: number;
  fileName: string;
  iconName: string;
  Directory?: string;
}

export const iconDataList : IconData[] = [
  { iconNumber: -1, fileName: "anonymous_user_icon.png", iconName: "未設定", Directory: "user_icon" },
  { iconNumber: 1, fileName: "icon1.png", iconName: "アイコン1", Directory: "user_icon" },
  { iconNumber: 2, fileName: "icon2.png", iconName: "アイコン2", Directory: "user_icon" },
  { iconNumber: 3, fileName: "icon3.png", iconName: "アイコン3", Directory: "user_icon" },
  // { iconNumber: 4, fileName: "icon4.png", iconName: "アイコン4", Directory: "user_icon" },
  // { iconNumber: 5, fileName: "icon5.png", iconName: "アイコン5", Directory: "user_icon" },
  // { iconNumber: 6, fileName: "icon6.png", iconName: "アイコン6", Directory: "user_icon" },
  // { iconNumber: 7, fileName: "icon7.png", iconName: "アイコン7", Directory: "user_icon" },
  // { iconNumber: 8, fileName: "icon8.png", iconName: "アイコン8", Directory: "user_icon" },
  // { iconNumber: 9, fileName: "icon9.png", iconName: "アイコン9", Directory: "user_icon" },
  // { iconNumber: 10, fileName: "icon10.png", iconName: "アイコン10", Directory: "user_icon" },
];

export const iconDictionary: { [key: number]: IconData } = {
  1: { iconNumber: 1, fileName: "icon1.png", iconName: "アイコン1", Directory: "user_icon" },
  2: { iconNumber: 2, fileName: "icon2.png", iconName: "アイコン2", Directory: "user_icon" },
  3: { iconNumber: 3, fileName: "icon3.png", iconName: "アイコン3", Directory: "user_icon" },
  // 4: { iconNumber: 4, fileName: "icon4.png", iconName: "アイコン4", Directory: "user_icon" },
  // 5: { iconNumber: 5, fileName: "icon5.png", iconName: "アイコン5", Directory: "user_icon" },
  // 6: { iconNumber: 6, fileName: "icon6.png", iconName: "アイコン6", Directory: "user_icon" },
  // 7: { iconNumber: 7, fileName: "icon7.png", iconName: "アイコン7", Directory: "user_icon" },
  // 8: { iconNumber: 8, fileName: "icon8.png", iconName: "アイコン8", Directory: "user_icon" },
};

// export default {iconDataList, iconDictionary}; 
