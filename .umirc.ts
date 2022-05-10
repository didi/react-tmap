import { defineConfig } from 'dumi';

export default defineConfig({
  // logo: '',
  title: 'react-tmap',
  favicon: 'https://s3-gz01.didistatic.com/mapp/img/favicon.ico',
  logo: 'https://s3-gz01.didistatic.com/mapp/img/favicon.ico',
  outputPath: 'docs-dist',
  mode: 'site',
  publicPath: '/react-tmap/',
  history: { type: 'hash' },
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
    {
      title: 'github',
      path: 'https://github.com/didi/react-tmap',
    },
  ],
  menus: {
    '/components': [
      {
        title: '基础',
        children: ['base/start.md', 'base/demo.md', 'base/qa.md'],
      },
      {
        title: '组件',
        children: [
          'Map/index.md',
          'MultiMarker/index.md',
          'MultiLabel/index.md',
          'MarkerCluster/index.md',
          'MultiCircle/index.md',
          'MultiPolygon/index.md',
          'MultiPolyline/index.md',
          'DomOverlay/index.md',
          'InfoWindow/index.md',
        ],
      },
    ],
  },
});

// more config: https://d.umijs.org/config
