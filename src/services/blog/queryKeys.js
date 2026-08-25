export const blogKeys = {
  all: ['blog'],
  lists: () => [...blogKeys.all, 'list'],
  list: (params) => [...blogKeys.lists(), params ?? {}],
  details: () => [...blogKeys.all, 'detail'],
  detail: (slug) => [...blogKeys.details(), slug],
}
