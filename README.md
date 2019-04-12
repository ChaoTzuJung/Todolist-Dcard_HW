# Todolist-Dcard_HW

> 

[2019 Dcard Web Development Intern - Take Home Test](https://docs.google.com/document/d/1OdP-Hddhr7_QmYhGL83iCPquPnZevQr9ZdALbFKYa2A/edit)

## 簡介

此專案經由 `react-starter` 快速產生的專案，內建 `react` 開發用環境。

## 資源介紹

- 使用 `webpack` 做建置工具並支援 `ES6`、`stage-3` 語法。
- 專案架構提供 

```
eslint、stylelint、react-storybook  (啟用) 
jest、react-router、redux  (尚未啟用)
```

## 功能介紹

新增 Todo (標題/日期時間/檔案/留言)
修改 Todo (標題/日期時間/檔案/留言)
進度管控 (所有代辦事項/進行中/已完成)
拖拉 Todo 跟改順序
標註星星 標示重要

拖拉 Todo 跟改順序
## 如何開始

- 安裝 nodejs v6 以上的版本
- 安裝套件: `npm i` or `yarn`

#### 踏出第一步

啟動開發 server

```
yarn start
```

便可在 <http://localhost:3000> 看到本地伺服器

啟動 storybook server

```
yarn run storybook
```

便可在 <http://localhost:8000> 看到 storybook 開發伺服器

## 專案架構

此架構是參考 [Atom design](http://bradfrost.com/blog/post/atomic-web-design/) 和 [Fractal Project Structure](https://github.com/davezuko/react-redux-starter-kit/wiki/Fractal-Project-Structure) 所整理出來

> 註： atom design 裡的 Template 是這裡的 Layout，而 Page 則是在 routes 資料夾下

以下是這個專案的各資料夾定義
- src
	+ **actions**: 定義 action function 和 request api function
	+ components
		- **atom**: 原子 component ，不可再分割的基本 component， ex `button`, `label`, `html tag`
		- **molecules**: 分子 component，由原子組成的基本 component， ex `地址輸入欄位` (包含 `label`, `input`, `button` 等)
		- **organisms**: 組織 component，由原子、分子組成的多功能 component， ex `header`, `footer`
	+ images
	+ **layouts**: 放置版型的地方，提供不同版型給許多頁面
	- **reducers**: 存放 全域 state 的地方
	- **routes**: 定義每一頁的 routing 規則，底下每一個資料夾就是單獨一頁
	- **store**: 設定 redux middlewares 的地方
- **config**: 設定環境變數和調色盤
- **storybook**: 存放 storybook 的設定檔

## 參數設定

#### 環境變數

#### CSS 標準色

CSS 所用的全域變數，可以於 `config/palette.js` 設定整個網站的標準色等。

```javascript
export default {
	standard: '#999',
	secondary: '#DDD',
	darkBlack: '#404040',
};
```

#### CSS Media Query 設置

CSS 所用的全域變數，可以於 `config/media.js` 設定整個網站的 media query。

```javascript
export default {
	'--phone': '(width < 600px)',
	'--small-tablet': '(900px > width >= 600px)',
	'--tablet': '(1200px > width >= 900px)',
	'--desktop': '(width >= 1200px)',
};
```

## Contribution

此專案 commit message 使用 angular format ，並使用 [commitizen](http://commitizen.github.io/cz-cli/) 輔助產生 commit message

- 加入修改的檔案 `git add .`
- 產生 commit message `npm run commit`

此專案設計稿由六角學院 The F2E - 前端修練精神時光屋 提供 >> https://bit.ly/2HfaR2M

![第一週 - todolist](https://i.imgur.com/e3nbE5q.jpg)

【前端設計師 UI 設計 - 使用者故事】
1. 能夠紀錄每天的待辦事項
2. 可標示每個待辦優先重要級別，預設為無。
3. 可拖拉待辦事項，調整排序。
4. 每筆待辦可新增時間提醒 (yyyy/mm/dd hh:mm)
5. 每筆待辦可再填寫評論與附加檔案
6. 待辦狀態：全部顯示(預設)、待處理、已處理
7. 待辦事項過多時，需考量內容是否需要折疊
