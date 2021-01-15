/*
 * @Date: 2021-01-10 11:25:42
 * @information: d.ts
 */
/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent, ComponentOptions } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module "element-plus"
declare module "AMap"

declare interface Window {
  onDelSpot: Function,
}



