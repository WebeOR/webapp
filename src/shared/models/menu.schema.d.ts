export interface MenuSchema {
  items: MenuRoute[]
}

export interface MenuRoute {
  key: string
  route?: RouteRecord
  scopes: string[]
  children?: RouteChild[]
}

export interface RouteChild {
  key: string
  route: RouteRecord
  scopes: string[]
}

export interface RouteRecord {
  meta: RouteRecordMeta
  name: string
  params: Record<string, any>
  query: Record<string, any>
}

export interface RouteRecordMeta {
  icon: string
  title: string
}
