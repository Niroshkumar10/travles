export const packageKeys = {
  all: ['packages'],
  lists: () => [...packageKeys.all, 'list'],
  list: (params) => [...packageKeys.lists(), params ?? {}],
  details: () => [...packageKeys.all, 'detail'],
  detail: (slug) => [...packageKeys.details(), slug],
}
