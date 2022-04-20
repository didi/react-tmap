---
nav:
  title: 快速上手
  path: /components
---

# 快速上手

本节将介绍如何在项目中使用 react-tmap。

## 申请腾讯地图密钥

https://lbs.qq.com/dev/console/key/manage

## 安装 react-tmap

### npm 安装

```bash
npm install @didi/react-tmap --save
```

### yarn 安装

```bash
yarn add @didi/react-tmap
```

## 引入 react-tmap

```javascript
import React from 'react';
import { TMap } from '@didi/react-tmap';

export default () => (
  <TMap mapKey="TOZBZ-OU2CX-JJP4Z-7FCBV-CDDJ2-AHFQZ" version="1.exp" />
);
```

> mapKey 为新申请的密钥
